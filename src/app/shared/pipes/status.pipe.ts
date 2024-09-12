import { Pipe, PipeTransform } from '@angular/core';
import {Status} from '../../core/var/variables'

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(st: number): string {
    const status = st as Status
    switch (status) {
      case Status.Aceptado:
        return "Aceptado";
        break;
      case Status.Rechazado:
        return "Rechazado";
        break;
      case Status.Registrado:
        return "Registrado";
        break;
       case Status.Solicitado:
         return "Solicitado";
         break; 
      default:
        return '';
        break;
    }
  }

}
