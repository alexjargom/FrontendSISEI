import { TemaModel } from "./user.model";

export interface SesionModel {
  Id: string;
  Tema: string;
  Descripcion: string;
  Fecha: Date;
  Lugar: string;
  Enlace?: string;
  DependenciaId: string;
  Dependencia: any;
  Tipo: number;
}
