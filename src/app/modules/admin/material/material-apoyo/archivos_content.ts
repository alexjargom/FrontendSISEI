import { FormatoMaterial } from "src/app/core";
import { TipoFormato } from "src/app/core/var/variables";
import { environment } from "src/environments/environment";
const juridico = '/juridico';
const tipoFormato = TipoFormato;
export const archivos: FormatoMaterial[]=[
    {
      Nombre: 'Manual de Usuario.',
      Descripcion: 'Manual de usuario de la plataforma SISEI.',
      Archivo: `${environment.serverUrl}${juridico}/material/Manual de Usuario de SISEI.pdf`,
      Tipo: TipoFormato.pdf
    },
    {
      Nombre: 'Alta de integrantes del cómite.',
      Descripcion: 'Video explicativo sobre el proceso de alta de los integrantes del cómite de una dependencia',
      Archivo: `${environment.serverUrl}${juridico}/material/Alta de integrantes SISEI.mp4`,
      Tipo: TipoFormato.video
    },
    {
      Nombre: 'Registro del plan anual.',
      Descripcion: 'Video explicativo sobre el proceso de registro del plan anual.',
      Archivo: `${environment.serverUrl}${juridico}/material/Plan anual SISEI.mp4`,
      Tipo: TipoFormato.video
    },
    {
      Nombre: 'Difusión.',
      Descripcion: 'Video explicativo sobre el proceso de carga de material de difusión.',
      Archivo: `${environment.serverUrl}${juridico}/material/Difusion SISEI.mp4`,
      Tipo: TipoFormato.video
    },
    {
      Nombre: 'Carga de archivos.',
      Descripcion: 'Video explicativo sobre el proceso de carga cargar los diferentes archivos de una dependencia.',
      Archivo: `${environment.serverUrl}${juridico}/material/Carga de archivos SISEI.mp4`,
      Tipo: TipoFormato.video
    },
    {
      Nombre: 'Vista publica.',
      Descripcion: 'Video explicativo acerca de la vista publica generada a partir de la información registrada en la plataforma SISEI .',
      Archivo: `${environment.serverUrl}${juridico}/material/Vista publica SISEI.mp4`,
      Tipo: TipoFormato.video
    },
  ];