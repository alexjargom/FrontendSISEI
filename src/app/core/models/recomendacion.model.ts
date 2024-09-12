import {TemaModel} from './user.model';

export interface RecomendacionModel {
  Id: string;
  Tema: TemaModel;
  Dependencias: string[];
}
