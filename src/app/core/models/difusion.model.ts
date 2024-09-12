import { DependenciaModel } from "./dependencia.model";
import { TemaModel } from "./user.model";

export interface DifusionModel {
    Id:string,
    Tema: TemaModel,
    Fecha:Date,
    DependenciaId:string,
    Dependencia:DependenciaModel
}
