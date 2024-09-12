import {BasicModel} from './user.model';

export interface DocumentacionModel {
  Id: string;
  Nombre: string;
  Descripcion: string;
  DependenciaId: string;
  Archivo: string;
  IsEdit:boolean;
  Anio: number;
  Tipo:string;
  Status:number;
  Observacion:string;
}

export interface Documento {
  name: string
  tipo: string
}

export interface FileController{
  name : string;
  tipo: string;
  permitidos: number;
  files: DocumentacionModel[];
}