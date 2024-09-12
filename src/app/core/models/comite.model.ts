import { environment } from './../../../environments/environment';
import {BasicModel, DependenciaModel} from '.';
import {NzResultStatusType} from 'ng-zorro-antd/result/result.component';
import {Status} from '../var/variables';

export interface CargoComiteModel {
  Id: string;
  Basic: BasicModel;
  GeneraUsuario: boolean;
}

export interface ComiteModel {
  Id: string;
  Nombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  CargoDependencia: string;
  Departamento: string;
  Nombramiento: string;
  CartaCompromiso: string;
  ComprobanteCambio: string;
  Correo: string;
  Celular: string;
  TelOficina: string;
  ExtOficina: string;
  FechaIngreso: Date;
  Status: number;
  CargoId: string;
  DependenciaId: string;
  Cargo: CargoComiteModel;
  Dependencia: DependenciaModel;
  IsEdit: boolean;
  UpdatedAt: Date;
}

export class ComiteFiles {
  public comiteId: string;
  public tpye: ArchivosComite;
  public title: string;
  public description: string;
  public url: string;
  constructor(comiteid: string, type: ArchivosComite, title: string, description: string,  comite: ComiteModel) {
    this.comiteId = comiteid;
    this.tpye = type;
    this.title = title;
    this.description = description;
    this.url = this.getUrlFile(comite);
  }

  public getUrl(): string {
    switch (this.tpye) {
      case ArchivosComite.NOMBRAMIENTO:
        return 'nombramiento';
      case ArchivosComite.CARTA_COMPROMISO:
        return 'carta';
        case ArchivosComite.COMPROBANTE:
        return 'comprobante';
    }
  }

  public getUrlFile(comite: ComiteModel): string {
    switch (this.tpye) {
      case ArchivosComite.NOMBRAMIENTO:
        return comite.Nombramiento.length > 0 ? `${environment.serverUrl}/${comite.Nombramiento}` : '';
      case ArchivosComite.CARTA_COMPROMISO:
        return comite.CartaCompromiso.length > 0 ? `${environment.serverUrl}/${comite.CartaCompromiso}` : '';
      case ArchivosComite.COMPROBANTE:
        return comite.ComprobanteCambio.length > 0 ? `${environment.serverUrl}/${comite.ComprobanteCambio}` : '';
    }
  }
}

export enum ArchivosComite {
  NOMBRAMIENTO = 0,
  CARTA_COMPROMISO,
  COMPROBANTE
}

export interface ComiteStatusInfo {
  status: NzResultStatusType;
  title: string;
  subtitle: string;
  textButton1?: string;
  nextStatus: Status;
}

export interface ConformacionComiteModel{
  Id : string;
  Distinto: boolean;
  Solicitud: string;
  Aceptacion: string;
  DependenciaId:string;
  Dependencia: DependenciaModel;
}

export interface ComitePublic{
  Dependencia: DependenciaModel;
  Comites: ComiteModel[];
}