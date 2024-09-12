import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnyMxRecord } from 'dns';
import { FormCheckService, HttpResponseModel, NotificationService, TableService, TypeFileDetail } from 'src/app/core';
import { ActividadPlanService } from 'src/app/core/http/planAnual/actividad-plan.service';
import { PlanAnualService } from 'src/app/core/http/planAnual/plan-anual.service';
import { VerificacionActividadService } from 'src/app/core/http/planAnual/verificacion-actividad.service';
import { ActividadPlanModel, PlanAnualModel, Verificacion, VerificacionActividadModel } from 'src/app/core/models/plan-anual.model';
import { environment } from 'src/environments/environment';
import { Status} from '../../../../core/var/variables'

@Component({
  selector: 'app-actividades-plan',
  templateUrl: './actividades-plan.component.html',
  styleUrls: ['./actividades-plan.component.scss']
})
export class ActividadesPlanComponent implements OnInit {

  editCache: { [key: string]: { edit: boolean; data: ActividadPlanModel } } = {};
  listOfData: ActividadPlanModel[]=[]
  private idPlan: string;

  public form!: FormGroup;
  public loading = true;
  Plan = {} as PlanAnualModel;
  Status = Status

  public isVisible = false;

  innerWidth: any = {};
  public verifisAct: Verificacion[]= [];
  actividadesDefaullt = ["1. Mejora de Procesos","2. Capacitación","3. Difusión","4. Atención a Denuncias","5. Operación del CEPCI"]; 	

  //permitir edicion de los campos de texto
  isEdit=true;

  constructor(
    private fb:FormBuilder,
    private formCheck: FormCheckService,
    private notify: NotificationService,
    private service: ActividadPlanService,
    private serviceVerifi: VerificacionActividadService,
    private route: ActivatedRoute,
    private planService: PlanAnualService,
    private tableService: TableService,
  ) {
    this.idPlan = this.route.snapshot.params.id;
    this.isEdit = this.route.snapshot.params.edit === 'true'? true:false;
  }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    this.loading = true
    this.getPlan();
    if(!this.idPlan){
      this.updateEditCache();
    }else{
      this.getData();
    }
    this.createForm();
    this.loading = false;
  }

  getPlan(){
    this.planService.get(this.idPlan).subscribe(data=>{
      this.Plan = data;
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification('Error al consultar información del Plan Anual')
    })
  }

  getData(){
    this.service.getActividadPlan(this.idPlan).subscribe(
      data=>{
        data.map(e => {
          e.VerificacionActividad.map( ac => {
            ac.Archivo = `${environment.serverUrl}/${ac.Archivo}`;
          });
          e.Verificacion = this.detectarActividadVerficacion(e);
        });
        
         data.forEach(act=> act.esDefault = this.EsDefault(act));
        this.listOfData = data;
        this.updateEditCache();
      },(err: HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
      }
    )
  }

  delete(id:string):void{
    this.loading = true;
    this.service.delete(id).subscribe(
      data=>{
        this.notify.successNotification('Actividad eliminado correctamente');
        this.loading= false
        this.getData();
      },(err:HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
        this.loading= false;
      }
    )
  }

  create(data: ActividadPlanModel){
    this.service.create(data).subscribe(
      e=>{
        this.getData();
        this.notify.successNotification('Actividad registrado correctamente');
      },
      (err: HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
      }
    )
  }

  update(id:string, data:ActividadPlanModel):void{
    this.loading = true;
    this.service.update(id,data).subscribe(e=>{
      this.notify.successNotification('Actualizado correctamente');
      this.loading = false;
      this.getData();
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  createForm(data?:ActividadPlanModel):void{
    this.form = this.fb.group({
      Nombre:[data?.Nombre,[Validators.required]],
      Objetivo:[data?.Objetivo,[Validators.required]],
      Meta:[data?.Meta,[Validators.required]],
      Actividades:[data?.Actividades,[Validators.required]],
      Fecha:[data?.Fecha,[Validators.required]],
      FechaConclusion:[data?.FechaConclusion,[Validators.required]],
      FactorRiesgo:[data?.FactorRiesgo,[Validators.required]],
    });
    this.formCheck.formInit(this.form)
    this.loading= false;
  }

  setDataForm(data?:ActividadPlanModel):void{
    this.form.patchValue({
      Nombre : data?.Nombre,
      Objetivo: data?.Objetivo,
      Meta:data?.Meta,
      Indicador:data?.Indicador,
      Actividades: data?.Actividades,
      Fecha:data?.Fecha,
      FechaConclusion: data?.FechaConclusion,
      FactorRiesgo: data?.FactorRiesgo
    })
  }

  startEdit(id: string): void {
    this.updateEditCache();
    this.editCache[id].edit = true;
    const actual = this.editCache[id].data
    this.verifisAct = actual.Verificacion;
    actual.Actividades = this.agregarSaltoActidades(actual.Actividades);
    actual.FactorRiesgo = this.agregarSaltoActidades(actual.FactorRiesgo);
    this.setDataForm(actual);
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.Id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const data =  this.form.value as ActividadPlanModel;
    data.PlanAnualId = this.idPlan;
    // data.Actividades = this.concatenarActividades(data.Actividades);
    data.Actividades = data.Actividades.replace(/\r/g,'');
    // data.FactorRiesgo = this.concatenarActividades(data.FactorRiesgo);
    data.FactorRiesgo = data.FactorRiesgo.replace(/\r/g,'');
    if(id.length < 3){
      this.create(data);
      this.formCheck.cleanForm();
    }else{
      this.update(id,data);
      this.formCheck.cleanForm();
    }
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.Id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  addRow(): void {
    const act: ActividadPlanModel= new ActividadPlanModel();
    act.Id = this.listOfData.length.toString()
    console.debug(act);
    this.listOfData = [
      ...this.listOfData,
      act
    ]
    this.updateEditCache();
  }

  elimiarActividad(id:string):void{
    this.loading = true;
    this.service.delete(id).subscribe(e=>{
      this.loading = false;
      this.notify.successNotification('Actividad eliminado correctamente');
      this.getData();
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  eliminarVerificacion(id:string):void{
    this.loading = true;
    this.serviceVerifi.delete(id).subscribe(e=>{
      this.notify.successNotification("Verificación eliminado correctamente");
      this.getData();
      this.loading = false;
    }, (err: HttpErrorResponse)=>{
      this.notify.errorNotification(err.message);
      this.loading = false;
    })
  }

  concatenarActividades(actividades:string):string {
    return actividades.split('\n').join(',');
  }

  separarActividades(actividades:string):string[] {
    // console.log(actividades)
    // return actividades.split(',');
    if (actividades == '') {
      return actividades.split(',');
    }else{
      return JSON.parse(actividades)
    }
  }
//para empezar la edición
  agregarSaltoActidades(actividades:string):string{
    console.log(actividades)
    if (actividades == ''){
      const resp =actividades.split(',');
      return resp.join('\r\n');
    }else{
      var acts: string[] = JSON.parse(actividades)
    return  acts.join('\r\n');
    }
    
    // const resp =actividades.split(',');
    // return resp.join('\r\n');
  }

  removeSaltosLinea(acts: string[]): string[]{
    let resp:string[] = [];
    acts.forEach(d=>{
      resp.push(d.replace('\r',''));
    })
    return resp;
  }

  verAvance(){
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  detectarActividadVerficacion(data:ActividadPlanModel): Verificacion[] {
    let resp:Verificacion[] =[]
    let act = this.separarActividades(data.Actividades);
    act.forEach(dt =>{
      if(dt !== " "){
        let dat = this.buscarVerificacionActividad(dt,data.VerificacionActividad);
        let v : Verificacion;
        if(dat !== null){
          v = {
            Id: dat.Id,
            IdActividad: data.Id,
            Nombre : dat.Basic.Nombre,
            Archivo: dat.Archivo,
            cargado: true,
          }
        }else{
          v = {
            Id: '',
            IdActividad: data.Id,
            Nombre: dt,
            Archivo: '',
            cargado: false,
          }
        }
        resp.push(v);
      }
    });
    return resp;
  }

  buscarVerificacionActividad(nombre: string, acts:VerificacionActividadModel[]): any{
   let respuesta=null;
    acts.forEach(ele=> {
      if(ele.Basic.Nombre === nombre){
        respuesta = ele;
      } 
    });
    return respuesta;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  
  EsDefault(actividad: ActividadPlanModel): boolean{
   let existe = this.actividadesDefaullt.findIndex(act => actividad.Nombre === act)
   return existe >= 0? true: false 
  }

}
