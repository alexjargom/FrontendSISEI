import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuzonQueja, FormCheckService, HttpResponseModel, NotificationService, UserService } from 'src/app/core';
import { BuzonService } from 'src/app/core/http/queja/buzon.service';

@Component({
  selector: 'app-add-buzon',
  templateUrl: './add-buzon.component.html',
  styleUrls: ['./add-buzon.component.scss']
})
export class AddBuzonComponent implements OnInit {

  public loading = true;
  public form !: FormGroup;
  private isUpdate=false;
  private id:string;
  private buzon= {} as BuzonQueja;
  public isAdmin= false;

  constructor(private fb: FormBuilder, 
    private formCheck: FormCheckService,
    private notify: NotificationService,
    private route:ActivatedRoute,
    private bService:BuzonService,
    private uService:UserService,
    private router: Router) { 
      this.id = this.route.snapshot.params.id
      if(this.id){
        this.isUpdate = true;
      }
    }

  ngOnInit(): void {
    this.isAdmin = this.uService.checkIsAdmin();
    if(this.isUpdate){
      this.getData();
      return;
    }
    this.createForm();
  }

  createForm(data?:any):void{
    this.form = this.fb.group({
      Correo: [data?.Correo,[Validators.required, Validators.email]],
      Telefono: [data?.Telefono,[Validators.required, Validators.maxLength(10)]],
      Ext: [data?.Ext,[Validators.maxLength(5)]],
      NombreConsejero: [data?.NombreConsejero,[Validators.required]],
      TelefonoConsejero: [data?.TelefonoConsejero,[Validators.required]]
    });
    this.formCheck.formInit(this.form);
  }

  submitForm():void{
    this.formCheck.formCheck();
    if(!this.formCheck.formIsValid()){
      return;
    }
    if(this.isUpdate){
      this.update();
      return;
    }
    this.create();
  }

  getData(){
    this.loading = true;
    this.bService.get(this.id).subscribe(data=>{
      this.buzon = data;
      if(data){
        this.createForm(data);
      }else{
        this.createForm();
        this.isUpdate = false;
      }
      this.loading = false;
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.createForm();
      this.loading = false;
    })
  }

  update():void{
    this.loading = true;
    const d = this.form.value as BuzonQueja;
    d.DependenciaId = this.id;
    this.bService.update(this.buzon.Id, d).subscribe(data=>{
      if(this.isAdmin){
        this.router.navigate(['buzon']);
        this.loading = false;
      }else{
        this.notify.successNotification("Actualizado correctamente");
        this.loading = false;
      }
    },(err: HttpResponseModel)=>{
      console.log(err);
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  create():void{
    this.loading = true;
    this.bService.create(this.form.value).subscribe(data=>{
      if(this.isAdmin){
        this.router.navigate(['buzon']);
        this.loading= false;
      }else{
        this.notify.successNotification("Registrado correctamente");
        this.loading = false;
      }
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading =false;
    })
  }

}
