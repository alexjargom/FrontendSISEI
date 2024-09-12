import {Component, OnInit} from '@angular/core';
import {FormCheckService, HttpResponseModel, NotificationService, QuejaModel, QuejaService} from '../../../../core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Periodos } from 'src/app/core/var/variables';

@Component({
  selector: 'app-add-queja',
  templateUrl: './add-queja.component.html',
  styleUrls: ['./add-queja.component.scss']
})
export class AddQuejaComponent implements OnInit {

  public form!: FormGroup;
  public loading = true;

  private isUpdate = false;
  private id: string;
  //archivos
  archivos: any[]=[];
  public disable= false;
  archPermitidos = 6;
  public file: any = null;
  Periodos:string[]=[];
  private fechaInicio = 2020;
  public anios:number[]=[];
  // archivo= {};

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private formCheck: FormCheckService,
              private service: QuejaService,
              private notify: NotificationService) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isUpdate = true;
    }
  }

  ngOnInit(): void {
    this.listaAnios();
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.createForm();
  }

  createForm(data?: QuejaModel): void {
    this.form = this.fb.group({
      FechaPresentacion: [data?.FechaPresentacion, [Validators.required]],
      Tipo: [data?.Tipo, [Validators.required]],
      Quejoso:[data?.Quejoso,[Validators.required]],
      Quejado:[data?.Quejado,[Validators.required]],
    });
    this.formCheck.formInit(this.form);
    this.loading = false;
  }

  submitForm(): void {
    this.formCheck.formCheck();
    if (!this.formCheck.formIsValid()) {
      return;
    }
    if (this.isUpdate) {
      this.update();
      return;
    }
    this.create();
  }

  get(): void {
    this.service.get(this.id).subscribe(
      data => {
        this.createForm(data);
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.isUpdate = false;
        this.createForm();
      }
    );
  }

  create(): void {
    this.service.createWithFile(this.form.value,this.file).subscribe(
      data => {
        this.formCheck.cleanForm();
        // this.archivos = [];
        this.file = null;
        this.router.navigate(['queja'])
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(): void {
    this.service.update(this.id, this.form.value).subscribe(
      data => {
        this.router.navigate(['queja']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  beforeUpload = (files: NzUploadFile): boolean => {
    this.file = files;
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

  quitarArchivo():void{
    this.file = null;
    this.disable= false;
  }

  listaAnios(){
    var now = new Date();
    var anio = now.getFullYear();
    for(var i = this.fechaInicio; i<= anio; i++){
      this.anios.push(i);
    }
  }
}
