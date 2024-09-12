export interface Credentials {
  User: string;
  Password: string;
}

export interface UserModel {
  Id: string;
  Usuario: string;
  Token?: string;
  TipoUsuarioId: string;
  DependenciaId?: string;
  ComiteId?: string;
  Contrasena?: string;
}

export interface BasicModel {
  Nombre: string;
  Descripcion: string;
}

export interface TemaModel {
  Tema: string;
  Descripcion: string;
}
