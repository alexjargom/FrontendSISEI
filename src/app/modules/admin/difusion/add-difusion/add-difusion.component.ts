// import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { FormCheckService, HttpResponseModel, NotificationService, TemaModel } from 'src/app/core';
import { DifusionService } from 'src/app/core/http/difusion/difusion.service';
import { DifusionModel } from 'src/app/core/models/difusion.model';
import {differenceInCalendarDays,setHours} from 'date-fns';
import {DisabledTimeFn} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-add-difusion',
  templateUrl: './add-difusion.component.html',
  styleUrls: ['./add-difusion.component.scss']
})
export class AddDifusionComponent implements OnInit {
  
  public form!: FormGroup;
  public loading = true;
  private isUpdate = false;
  private id: string;
  private file: any = null;
  archivos: any[]=[];
  archPermitidos = 6;
  public disable= false;
  timeDefaultValue = setHours(new Date(), 0);

  today = new Date();
  constructor(
    private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private formCheck: FormCheckService,
              private service: DifusionService,
              private notify: NotificationService,
              private msg: NzMessageService
  ) {
    this.id = this.route.snapshot.params.id;
    if (this.id){
      this.loading = true
    }
    this.loading= false;
  }

  ngOnInit(): void {
    if (this.isUpdate) {
      // this.get();
      return;
    }
    this.createForm();
  }

  createForm(data?: DifusionModel): void {
    this.form = this.fb.group({
      Tema: this.fb.group({
        Tema:[data?.Tema.Tema, [Validators.required]],
        Descripcion: [data?.Tema.Descripcion, [Validators.required]],
      }),
      Fecha:[data?.Fecha,[Validators.required]],
    });
    this.formCheck.formInit(this.form);
    this.loading = false;
  }

  submitForm(){
    if(!this.formCheck.formIsValid()){
      return
    }
    if(this.archivos.length<=0){
      this.notify.errorNotification("ingrese por lo menos un archivo");
      return
    }
    if(this.isUpdate){
      return
    }
    this.create()
  }

  create():void{
    const tema = this.form.value as TemaModel
    this.service.createFile(this.form.value,this.archivos).subscribe(
      data=>{
        this.formCheck.cleanForm();
        this.archivos = [];
        this.router.navigate(['difusion'])
      },(err: HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
      }
    )
  }

  beforeUpload = (files: NzUploadFile): boolean => {
    this.file = files;
    this.archivos = this.archivos.concat(files);
    if (this.archivos.length >= this.archPermitidos){
      this.quitarArchivosSobrantes()
    }
    return false;
  }

  quitarArchivosSobrantes():void{
    this.archivos.forEach((item,index)=>{
      if( index >= this.archPermitidos){
        this.archivos.splice(index,1);
      }
    });
    this.notify.infoNotificacion('Solo se permite la carga de '+ this.archPermitidos+' archivos')
    this.disable= true;
  }

  quitarArchivo(i:number):void{
    this.archivos.forEach((item, index)=>{
      if(index == i){
        this.archivos.splice(index,1)
        this.notify.successNotification("Archivo eliminado correctamente");
      } 
    })
    this.disable= false;
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };
}


