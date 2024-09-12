import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { truncateSync } from 'fs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ConformacionComiteModel, FormCheckService, HttpResponseModel, NotificationService } from 'src/app/core';
import { ConformacionComiteService } from 'src/app/core/http/comite/conformacion_comite.service';

@Component({
  selector: 'app-add-conformacion',
  templateUrl: './add-conformacion.component.html',
  styleUrls: ['./add-conformacion.component.scss']
})
export class AddConformacionComponent implements OnInit {
  public loading = false;
  public form!: FormGroup;
  @Output() actualizar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() conformacion={} as ConformacionComiteModel;
  uploading = false;

  // private conformacion={} as ConformacionComiteModel;
  public fileSolicitud:any=null;
  public fileAceptacio:any=null;
  public ver = false;

  constructor(
    private fb: FormBuilder,
    private formCheck: FormCheckService,
    private service:ConformacionComiteService,
    private notify: NotificationService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (this.conformacion){
      
    }

  }

  createForm(data?: ConformacionComiteModel):void{
    this.form = this.fb.group({
      Distinto:[data?.Distinto,[]],
    });
    this.formCheck.formInit(this.form);
  }

  beforeUpload = (files: NzUploadFile): boolean => {
    this.fileSolicitud = files;
    return false;
  }

  beforeUpload2 = (file: NzUploadFile):boolean=>{
    this.fileAceptacio = file;
    return false;
  }

  quitarArchivo(){
    this.fileSolicitud = null;
  }
  
  quitarArchivoAceptado(){
    this.fileAceptacio = null;
  }

  submitForm(){
    this.loading = true;
    if(!this.formCheck.formIsValid()){
      return;
    }
    if(this.conformacion?.Solicitud == undefined){
      this.registrarConformacion();
    }else{
      this.cargarArchivoAceptacion();
    }
  }

  registrarConformacion():void{
    this.loading = true;
    const conf = this.form.value as ConformacionComiteModel;
    this.service.createWithFile(conf, this.fileSolicitud ).subscribe(data=>{
      this.actualizar.emit(true);      
      this.loading = false;
    },(err:HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  cargarArchivoAceptacion(){
    this.service.UploadFile(this.conformacion.Id, this.fileAceptacio).subscribe(data=>{
      this.notify.successNotification("Archivo de aceptación registrado");
      this.loading = false;
      this.actualizar.emit(true);
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  cambio():void{
    if (this.form.value.Distinto){
      this.ver = true;
    }else{
      this.ver = false;
    }
  }

}
