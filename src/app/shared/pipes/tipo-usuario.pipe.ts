import { TipoUsuario } from './../../core/var/variables';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  transform(id: string): string {
    const tipo = id as TipoUsuario;
    switch (tipo) {
      case TipoUsuario.Root:
        return 'Root';
      case TipoUsuario.Admin:
        return 'Administrador';
      case TipoUsuario.Dependencia:
        return 'Dependencia';
    }
    return  '';
  }

}
