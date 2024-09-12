import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DependenciaModel, DependenciaService, FormCheckService, HttpResponseModel, NotificationService, TypeFileDetail, UserService } from 'src/app/core';
import { PlanAnualService } from 'src/app/core/http/planAnual/plan-anual.service';
import { PlanAnualModel } from 'src/app/core/models/plan-anual.model';
import { TipoUsuario } from 'src/app/core/var/variables';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {
  date = null;
  public form!: FormGroup;
  public loading = true;

  public isUpdate = false;
  private id: string;
  public current = 0;

  // file data
  private file: File | null=null;
  urlFile = '';
  typeDetailFile = TypeFileDetail.UPLOAD_SIMPLE_FILE;

  //tipo de user
  public isAdmin:boolean = false;
  public deps: DependenciaModel[]=[];

  constructor(private fb:FormBuilder,
    private formCheck:FormCheckService,
    private notify: NotificationService,
    private service:PlanAnualService,
    private route:ActivatedRoute,
    private router:Router,
    private userS: UserService,
    private depSer: DependenciaService ) { 
      this.id = this.route.snapshot.params.id
      if(this.id){
        this.isUpdate = true;
      } 
    }

  ngOnInit(): void {
    if (this.isUpdate){
      this.get();
      this.checkIsAdmin();
      if(this.isAdmin){
        this.getDependenciaInfo();
      }
      return
    }
    this.createForm();
    this.checkIsAdmin();
    if(this.isAdmin){
      this.getDependenciaInfo();
    }
  }

  createForm(data?: PlanAnualModel): void {
    this.form = this.fb.group({
      FechaInicio: [data?.FechaInicio, [Validators.required]],
      FechaFinal: [data?.FechaFinal, [Validators.required]],
      Anio: [data? data.FechaInicio:'', [Validators.required]],
      DependenciaId:[data? data.DependenciaId:'',[Validators.required]],
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

  create(): void {
    this.loading = true;
    let d = this.form.value as PlanAnualModel;
    d.FechaInicio = new Date(this.form.value?.FechaInicio);
    d.Anio = new Date(this.form.value?.Anio).getFullYear();
    d.FechaFinal = new Date(this.form.value?.FechaFinal);
    this.service.create(this.file! ,d).subscribe(
      data => {
        this.notify.successNotification(data.Mensaje);
        this.formCheck.cleanForm();
        this.current= 0;
        this.loading= false;
        this.redirectActividades(data.Data?.Id);
      }, (err: HttpResponseModel) =>{
        this.notify.errorNotification(err.Mensaje);
        this.loading = false
      } 
    );

  }

  get(): void {
    this.service.get(this.id).subscribe(
      data => {
        this.createForm(data);
        // this.urlFile = data.PlanArchivo;
        this.urlFile = `${environment.serverUrl}/${data.PlanArchivo}`;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.isUpdate = false;
        this.createForm();
      }
    );
  }

  update(): void {
    this.loading = true
    let d = this.form.value as PlanAnualModel;
    d.FechaInicio = new Date(this.form.value?.FechaInicio);
    d.Anio = new Date(this.form.value?.Anio).getFullYear();
    d.FechaFinal = new Date(this.form.value?.FechaFinal);
    this.service.update(this.id, d,this.file!).subscribe(
      data => {
        this.notify.successNotification(data.Mensaje);
        this.router.navigate(['plan']);
        this.loading= false
      }, (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading= false;
      }
    );
  }

  onChange(result: Date): void {
    var inicio = result.setMonth(0,1)
    var final  = result.setMonth(11,31)
    this.form.controls.FechaInicio?.setValue(inicio);
    this.form.controls.FechaFinal?.setValue(final);
  }

  nextIndex(index:number):void{
    this.formCheck.formCheck();
    if (!this.formCheck.formIsValid()) {
      return;
    }
    this.current = index+1;
  }

  setFile(file: File): void {
    this.file = file;
  }
  
  saveFile(event:any){
  }

  redirectActividades(id:string){
    this.router.navigate([`plan/actividad/${id}/${true}`])
  }

  //checar el tipo de usuario
  checkIsAdmin(){
    const us = this.userS.getCurrentUser()
    if(us.TipoUsuarioId == TipoUsuario.Admin || us.TipoUsuarioId == TipoUsuario.Root){
      this.isAdmin = true;
    }else{
      this.form.controls.DependenciaId.clearValidators();
    }
  }

  getDependenciaInfo(){
    this.depSer.getAll().subscribe(da=>{
      this.loading = false;
      this.deps = da;
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }
  
}
