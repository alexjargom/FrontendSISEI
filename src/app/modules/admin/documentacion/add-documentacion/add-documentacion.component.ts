import {Component, OnInit} from '@angular/core';
import {DocumentacionModel, DocumentacionService, HttpResponseModel, NotificationService, TypeFileDetail} from '../../../../core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import { TipoDocumentacion } from 'src/app/core/var/variables';

@Component({
  selector: 'app-add-documentacion',
  templateUrl: './add-documentacion.component.html',
  styleUrls: ['./add-documentacion.component.scss']
})
export class AddDocumentacionComponent implements OnInit {
  urlFile = '';
  typeDetailFile = TypeFileDetail.UPLOAD_DOCUMENTACION;
  loading = true;
  isUpdate = false;
  data: DocumentacionModel = {} as DocumentacionModel;
  private id: string;
  private file: File | null = null;
  private tipo:string;
  private anio:string;
  private tipoDocumentacion = TipoDocumentacion;
  doc='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DocumentacionService,
    private notify: NotificationService,
  ) {
    this.id = this.route.snapshot.params.id;
    this.tipo = this.route.snapshot.params.tipo;
    this.anio = this.route.snapshot.params.anio;
    if (this.id) {
      this.isUpdate = true;
    }
  }

  ngOnInit(): void {
    this.findDocName();
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.data.Anio = +this.anio;
    this.data.Tipo = this.tipo;
    this.loading = false;
  }

  setFile(file: File): void {
    this.file = file;
  }

  formComplete(data: DocumentacionModel): void {
    if (this.isUpdate) {
      this.update(data);
      return;
    }
    this.create(data);
  }

  create(data: DocumentacionModel): void {
    this.service.create(this.file!, data).subscribe(
      e => {
        this.router.navigate(['documentacion']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(data: DocumentacionModel): void {
    this.service.update(this.id, this.file!, data).subscribe(
      e => {
        this.router.navigate(['documentacion']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  get(): void {
    this.service.get(this.id).subscribe(
      data => {
        this.data = data;
        this.urlFile = `${environment.serverUrl}/${data.Archivo}`;
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.isUpdate = false;
        this.data = {} as DocumentacionModel;
        this.loading = false;
      }
    );
  }

  findDocName():void{
    this.tipoDocumentacion.forEach(element => {
      if(element.tipo == this.tipo){
        this.doc= element.name;
      }
    });
  }
}

