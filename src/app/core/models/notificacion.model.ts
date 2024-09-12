import { TemaModel, UserModel } from "./user.model";

export interface NotificacionModel{
    CreatedAt :Date;
    UpdatedAt :Date;
    DeletedAt :Date;
    Id:string;
    UsuarioId: string;
    Usuario: UserModel;
    Tema: TemaModel
}