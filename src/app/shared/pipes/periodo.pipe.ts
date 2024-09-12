import { Pipe, PipeTransform } from '@angular/core';
import { Periodos } from 'src/app/core/var/variables';

@Pipe({
  name: 'periodo'
})
export class PeriodoPipe implements PipeTransform {

  transform(periodo:number): string {
    const pe = periodo as Periodos;
    switch(pe){
      case Periodos.Enero:
        return "Cuarto";
        break;
      case Periodos.Abril:
        return "Primer";
        break;
      case Periodos.Julio:
        return "Segundo";
        break;
      case Periodos.Octubre:
        return "Tercer";
      break;
      default:
        return "";
        break;
    }
  }

}
