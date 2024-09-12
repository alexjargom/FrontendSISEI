import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpResponseModel, NotificationService, TypeFileDetail } from 'src/app/core';
import { VerificacionActividadService } from 'src/app/core/http/planAnual/verificacion-actividad.service';
import { VerificacionActividadModel } from 'src/app/core/models/plan-anual.model';

@Component({
  selector: 'app-add-verificacion',
  templateUrl: './add-verificacion.component.html',
  styleUrls: ['./add-verificacion.component.scss']
})
export class AddVerificacionComponent implements OnInit {
  @Input() idActividad!: string;
  @Input() datos: any;
  @Output() actualiza = new EventEmitter<boolean>();
  isVisible = false;

  private file: File | null=null;
  urlFile = '';
  typeDetailFile = TypeFileDetail.UPLOAD_VERIFICACION;
  loading:boolean= false;
  data: VerificacionActividadModel | null= null;

  constructor(
    private service:VerificacionActividadService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
  }

  formComplete(data:any):void{
    const act: VerificacionActividadModel = {
      Basic:data,
      FechaVerificacion : new Date(),
      ActividadPlanId: this.idActividad,
      Id:this.idActividad,
      Completado: true,
      Archivo:'',
    }
    this.create(act);
  }

  create(data: VerificacionActividadModel): void {
    this.service.createFile(this.file!,data).subscribe(e =>{
      this.isVisible= false;
      this.actualiza.emit(true);
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
    })
  }

  delete(id:string):void{
    this.service.delete(id).subscribe(e =>{
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
    })
  }

  setFile(file: File): void {
    this.file = file;
  }

  saveFile(event:any){
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
