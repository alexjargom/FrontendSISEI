import { DependenciaModel } from ".";

export interface ReporteModelView {
    Nombre: string;
    Descripcion: string;
    Tipo: string
}

export interface ReporteGeneral{
    DependenciaId: string;
	Dependencia: DependenciaModel;
	IntegrantesCargardos: boolean;
	CantidadIntegrantes: number;
	CodigoConducta: boolean;
	PlanAnual: boolean;
	InformeActividades: boolean;
	AvancePlanAnual: number;
	CantidadDifusion: number;
	Anio: number;
	ProtocoloQuejas: boolean;
	BasesIntegracion: boolean;
	ConformacionDistinta: boolean;
	SesionesOrdinarias: number;
	SesionesEstraordinarias: number;
	ActaSesionOrd: number;
	ActaSesionExtra: number;
	Comisionado: boolean;
}