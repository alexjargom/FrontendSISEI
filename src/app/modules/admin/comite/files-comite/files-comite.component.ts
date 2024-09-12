import { TypeFileDetail } from '../../../../core/models/detailFile.model';
import { ArchivosComite } from '../../../../core/models/comite.model';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { ComiteFiles, ComiteModel, ComiteService, HttpResponseModel, NotificationService } from 'src/app/core';

@Component({
  selector: 'app-files-comite',
  templateUrl: './files-comite.component.html',
  styleUrls: ['./files-comite.component.scss']
})
export class FilesComiteComponent implements OnInit {

  @Input() id = '';
  @Input() data: ComiteModel | null = null;
  @Output() finish = new EventEmitter<boolean>();

  loading = true;
  typeDetailFile = TypeFileDetail.UPLOAD_COMITE_FILE;
  filesCtl: ComiteFiles[] = [];
  constructor(public service: ComiteService,
              private notify: NotificationService) { }

  ngOnInit(): void {
    this.filesCtl = [];
    this.filesCtl.push( new ComiteFiles(this.id, ArchivosComite.NOMBRAMIENTO , 'Nombramiento dentro del comité', 'Archivo validador de nombramiento del integrante de comite, firmado por el responsable de la dependencia', this.data! ));
    this.filesCtl.push( new ComiteFiles(this.id, ArchivosComite.COMPROBANTE , 'Nombramiento de la dependencia', '', this.data! ));
    this.filesCtl.push( new ComiteFiles(this.id, ArchivosComite.CARTA_COMPROMISO , 'Acuerdo de confidencialidad', '', this.data! ));
    this.loading = false;
  }

  upload(file: File , ctl: ComiteFiles ): void {
    this.service.uploadFile( ctl.comiteId + '/' + ctl.getUrl(), file).subscribe( data => {
      this.data = data;
      ctl.url = ctl.getUrlFile(data);
      this.sendLoadAllEvent(ctl.tpye);
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
      });
  }

  sendLoadAllEvent(tipo:number ){
    const last =this.filesCtl[this.filesCtl.length -1 ]
    if (last.tpye == tipo){
      this.finish.emit(true);
    }
  }

}
