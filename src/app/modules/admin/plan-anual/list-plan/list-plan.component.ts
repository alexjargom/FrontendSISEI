import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormCheckService, HttpResponseModel, NotificationService, statusModel, TableService, TypeFileDetail, UserService } from 'src/app/core';
import { PlanAnualService } from 'src/app/core/http/planAnual/plan-anual.service';
import { PlanAnualModel } from 'src/app/core/models/plan-anual.model';
import { environment } from 'src/environments/environment';
import { Status, TipoUsuario } from '../../../../core/var/variables'

@Component({
  selector: 'app-list-plan',
  templateUrl: './list-plan.component.html',
  styleUrls: ['./list-plan.component.scss']
})
export class ListPlanComponent implements OnInit {
  public data : PlanAnualModel[] = [];
  innerWidth: any = {};
  loading = true;
  // visible: boolean = false;
  Status: any = Status;
  isVisible = false;
  public form!: FormGroup;

  // file data
  private file: File | null=null;
  urlFile = '';
  typeDetailFile = TypeFileDetail.UPLOAD_SIMPLE_FILE;
  fVisible = false;

  //si es admin
  isAdmin:boolean= false;

  searchValue = '';
  visible = false;
  dataDisplay : PlanAnualModel[]=[];

  private actualPlan={} as PlanAnualModel;
  constructor(
    private service: PlanAnualService,
    private notify: NotificationService,
    private tableService: TableService,
    private router:Router,
    private fb:FormBuilder,
    private formCheck: FormCheckService,
    private usrSer:UserService,
  ) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    this.getListData();
    this.createForm();
    this.verificarAdmin();
  }

  getListData(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        data.map(e => {
          if(e.PlanArchivo){
            e.PlanArchivo = `${environment.serverUrl}/${e.PlanArchivo}`;
          }
        });
        this.data = data;
        this.dataDisplay=[...this.data];
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  delete(id: string): void {
    this.loading = true;
    this.service.delete(id).subscribe(
      data => {
        this.notify.successNotification('Plan eliminada correctamente');
        this.loading = false;
        this.getListData();
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  update(id:string):void {
    this.router.navigate(['plan/editar/'+id]);
  }

  rechazar(id:string){
    this.loading= true
    this.service.updateStatus(id,this.Status.Rechazado).subscribe(
      data=>{
        this.notify.errorNotification("Rechazado")
        this.loading= false;
      },(err: HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    )
  }
  aceptar(id:string){

  }

  createForm(data?:statusModel):void{
    this.form = this.fb.group({
      Status:[data?.Status,[Validators.required]],
      Observacion:[data?.Observacion,[]],
    });
    this.formCheck.formInit(this.form)
    this.loading= false;
  }

  agregarActividades(id:string, estado: boolean){
    this.router.navigate(['plan/actividad/'+id+'/'+estado]);
  }


  //modal status
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(id:string): void {
    const data= this.form.value as statusModel;
    this.service.updateStatus(id,data).subscribe(
      rs=>{
        this.notify.successNotification("Estatus Actualizado");
        this.isVisible = false;
        this.getListData();
      },(err:HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
      }
    )
  }

  handleCancel(): void {
    this.isVisible = false;
    this.formCheck.cleanForm();
  }

  // agregar file
  cargarArchivo(id:string){
    const actual = this.data.find(da=> da.Id == id);
    if(actual){
      this.actualPlan = actual;
      this.urlFile = actual.PlanArchivo;
    }
    this.fVisible = true;
  }

  setFile(file: File): void {
    this.file = file;
  }

  updateFile(data:any){
    this.service.loadFile( this.actualPlan.Id, this.file!).subscribe(data=>{
      this.fVisible = false;
      this.getListData();
    },(err:HttpResponseModel)=>{
      this.fVisible= false;
      this.notify.errorNotification(err.Mensaje);
    });
  }

  cancelarCargaArchivo(){
    this.fVisible = false;
  }

  verificarAdmin(){
    let us= this.usrSer.getCurrentUser();
    if(us.TipoUsuarioId == TipoUsuario.Admin || us.TipoUsuarioId == TipoUsuario.Root ){
      this.isAdmin = true;
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataDisplay = this.data.filter((item: PlanAnualModel) => item.Dependencia?.Nombre.indexOf(this.searchValue) !== -1);
  }

  nuevoPlan():void{
    this.router.navigate(['plan/crear']);
  }

  updateEdit(id: string,estado:boolean):void{
    this.loading = true;
    this.service.updateEditStatusPlan(id, estado).subscribe(d=>{
      // this.notify.successNotification("Estado actualizado");
      this.getListData()
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

}
