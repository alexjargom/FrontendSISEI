import { Documento } from "../models/documentacion.model";

export enum TipoUsuario {
  Root = '1',
  Admin = '2',
  Dependencia = '3'
}

// export enum TipoDocumentacion {
//   CodigoDeConducta = 'a',
//   ProtocoloQuejasDenuncias = 'b',
//   PlanAnualDeTrabajo = 'c'
// }

export enum TipoEvidencia {
  DifusionEvidencia = 'A',
  SesionEvidencia = 'B',
  QuejaEvidencia = 'C',
  SolicitudEvidencia = 'D',
  VerificacionEvidencia = 'E'
}

export enum TipoSolicitud {
  Curso = 'A',
  Capacitacion = 'B',
  Asesoria = 'C',
  Material = 'D'
}

export enum TypeNotify {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error'
}

export enum Status{
  Registrado,
  Solicitado,
  Aceptado,
  Rechazado
}

export enum TipoSesion{
  ordinaria = 1,
  extraordinaria= 2
}

export enum Periodos{
  Abril=1,
  Julio=2,
  Octubre=3,
  Enero=4,
}

export var TipoDocumentacion:Documento[]=[
  {name:'Acta de instalación de comite', tipo:'A'},
  {name:'Plan Anual de Trabajo', tipo:'B'},
  {name:'Actas de sesiones ordinarias', tipo:'C'},
  {name:'Actas de sesiones extraordinarias', tipo:'D'},
  {name:'Informe anual de actividades', tipo:'E'},
  {name:'Codigo de Conducta',tipo:'F'},
  {name: 'Protocolo Para someter a queja y/o Denuncias', tipo:'G'},
  {name: 'Bases para la integración y funcionamiento del CEPCI',tipo:'H'},
  {name: 'Protocolo HAS',tipo:'I'}
]

export var ArchivosPermanentes:Documento[] = [
  {name:'Codigo de Conducta',tipo:'F'},
  {name: 'Protocolo Para someter a queja y/o Denuncias', tipo:'G'},
  {name: 'Bases para la integración y funcionamiento del CEPCI',tipo:'H'},
  {name: 'Protocolo HAS',tipo:'I'}
];

export var ArchivosAnuales:Documento[]=[
  {name:'Acta de instalación de comite', tipo:'A'},
  {name:'Plan Anual de Trabajo', tipo:'B'},
  {name:'Actas de sesiones ordinarias', tipo:'C'},
  {name:'Actas de sesiones extraordinarias', tipo:'D'},
  {name:'Informe anual de actividades', tipo:'E'},
]

export enum TipoQueja{
  Queja = 'a',
  Denuncia= 'b',
}

export enum TipoFormato {
  txt=1,
  video=2,
  pdf=3
}