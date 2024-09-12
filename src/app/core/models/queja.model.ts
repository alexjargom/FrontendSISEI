import { DependenciaModel } from "./dependencia.model";

export interface QuejaModel {
  Id: string;
  DependenciaId: string;
  Dependencia: DependenciaModel
  // Cantidad: number;
  // Periodo: number;
  // Anio: number;
  FechaPresentacion: Date;
  Tipo: string;
  Quejoso: string;
  Quejado: string;
}

export interface QuejaChart{
  Value: number;
  Name: string;
  DependenciaId: string;
  Periodo: number;
}

export interface DependenciaQueja{
  DependenciaId: string;
  Name: string;
  Series:QuejaChart[];
}

export interface DataChart{
  Data: DependenciaQueja[];
}

export interface BuzonQueja{
  Id: string;
  Correo: string;
  Telefono: string;
  Ext: string;
  DependenciaId: string;
  Dependencia: DependenciaModel;
  NombreConsejero: string;
  TelefonoConsejero: string;
}