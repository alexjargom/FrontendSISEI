import { DependenciaModel } from "./dependencia.model"
import { BasicModel } from "./user.model";


export interface VerificacionActividadModel {
	Id :string ;
	Basic:BasicModel;
	FechaVerificacion:Date;
	Completado:boolean;
	ActividadPlanId:string;
	Archivo:string;
}

export class ActividadPlanModel {
	public Id:string;
	public Nombre!: string;
	public Objetivo:string;
	public Meta:string;
	public Indicador:string;
	public Actividades:string; 
	public Fecha:Date;
	public FechaConclusion:Date;
	public FactorRiesgo:string;
	public PlanAnualId:string;
	public VerificacionActividad!:VerificacionActividadModel[];
	public Verificacion!: Verificacion[];

	public esDefault: boolean;
	
	constructor(){
		this.Id='';
		this.Nombre='';
		this.Objetivo='';
		this.Meta ='';
		this.Indicador='';
		this.Actividades='';
		this.Fecha = new Date() ;
		this.FechaConclusion = new Date();
		this.FactorRiesgo = '';
		this.PlanAnualId = '';
		this.esDefault = false;
	}
}

export interface PlanAnualModel {
    Id:string;
    FechaInicio:Date;
    FechaFinal:Date;
    PlanArchivo:string;
	Status:number;
	Anio:number;             
	DependenciaId:string;            
	Dependencia?: DependenciaModel;
	Observacion?:string;
	ActividadPlan?: any;
	IsEdit:boolean;
}

export interface DataActividadModel {
	Id:string;
	Nombre: string;
	Objetivo: string;
	Total: number;
	Cargado:number;
	Faltante: number;
}

export interface DataPlanAnulaModel {
	Id: string;
	FechaInicio: Date;
	FechaFinal: Date;
	Anio: number;
	Status: number;
	Actividades: DataActividadModel[];
}

export interface Verificacion {
	Id:string;
	IdActividad: string;
	Nombre: string;
	cargado:boolean;
	Archivo?:string;
  }