import {environment} from '../../../../environments/environment';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {FormCheckService, Logger, NotificationService, TypeFileDetail} from 'src/app/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {viewerType} from 'ngx-doc-viewer/document-viewer.component';
import { TipoDocumentacion } from 'src/app/core/var/variables';
import { TreeMapModule } from '@swimlane/ngx-charts';

const log = new Logger('FileDetailComponent');

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent implements OnInit, OnChanges {
  public importType = TypeFileDetail;
  public form!: FormGroup;
  public loading = true;

  private file: any = null;

  @Input() title = '';
  @Input() description = '';
  @Input() fileUrl = '';
  @Input() index = 0;
  @Input() typeFileDetail: TypeFileDetail = TypeFileDetail.CHECK_COMITE_FILES;
  @Output() setFile = new EventEmitter<any>();

  @Input() dataFormUpdate: any | null = null;
  @Output() formValue = new EventEmitter<any>();

  @Input() editable=true;

  public exist = true;
  public tipoDocumentacion = TipoDocumentacion;
  @Input() tipo='';
  @Input() anio='';

  // buttons event
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  // config ngx-doc-viewer
  viewer: viewerType = 'url';
  constructor(private fb: FormBuilder,
              private notify: NotificationService,
              private formCheck: FormCheckService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkUrl();
  }

  ngOnInit(): void {
    this.buildFromType();
    this.checkUrl();
  }

  checkUrl(): void {
    const sv = environment.serverUrl + '/';
    const split = this.fileUrl.split(sv);
    if (split.length > 1 && split[1].length > 0) {
      // se revisa si se trada de un PDF o de un documento de word
      const ext = this.fileUrl.split('.')[ this.fileUrl.split('.').length - 1 ];
      if (ext === 'pdf') {
        this.viewer = 'url';
      }else if (ext === 'ppt' || ext === 'pptx' || ext === 'doc' || ext === 'docx' || ext === 'xls' || ext === 'xlsx' ) {
        this.viewer  = 'mammoth';
      }
      this.exist = true;
      return;
    }
  }

  buildFromType(): void {
    switch (this.typeFileDetail) {
      case TypeFileDetail.CHECK_COMITE_FILES:
      case TypeFileDetail.CHECK_FORMATO:
      case TypeFileDetail.CHECK_DOCUMENTACION:
        this.loading = false;
        break;
      case TypeFileDetail.UPLOAD_COMITE_FILE:
        this.loading = false;
        break;
      case TypeFileDetail.UPLOAD_DOCUMENTACION:
        this.formDocumentacion();
        break;
      case TypeFileDetail.UPLOAD_FORMATO:
        this.formatoUploadInit();
        break;
      case TypeFileDetail.UPLOAD_SIMPLE_FILE:
          this.loading= false;
        break
      case TypeFileDetail.UPLOAD_VERIFICACION:
        this.formatoUploadInit();
        break;
      case TypeFileDetail.ONLY_VIEW:
        this.loading = false;
      break;
    }
  }

  formatoUploadInit(): void {
    this.form = this.fb.group({
      Nombre: [this.dataFormUpdate?.Nombre , [Validators.required]],
      Descripcion: [this.dataFormUpdate?.Descripcion , [Validators.required]]
    });
    this.formCheck.formInit(this.form);
    this.loading = false;
  }

  formDocumentacion(): void{
    this.form = this.fb.group({
      Tipo:[this.dataFormUpdate?.Tipo,[Validators.required]],
      Anio:[ this.dataFormUpdate?.Anio,[Validators.required]]
    });
    this.formCheck.formInit(this.form);
    this.loading = false;
  }


  submitForm(): void {
    if (!this.formCheck.formIsValid()) { return; }
    if (this.file === null) {
      this.notify.infoNotificacion( 'Suba archivo a registrar' );
      return;
    }
    this.formValue.next(this.form.value);
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file;
    this.setFile.next(file);
    this.checkFile();
    return false;
  }

  checkFile(): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const respSplit = e.target.result.split(',');
      if (respSplit[0] === 'data:application/pdf;base64') {
        this.exist = false;
        this.viewer = 'url';
        this.fileUrl = e.target.result;
        this.exist = true;
      }else {
        this.notify.createBasicNotification('Información', 'Archivo cargado, preview no disponible');
        this.exist = false;
      }

    };
    if (this.file) {
      reader.readAsDataURL( this.file );
    }

  }

  sendEditEvent(){
    this.editEvent.emit(true);
  }

  sendDeleteEvent(){
    this.deleteEvent.emit(true);
  }

}
