import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoQueja'
})
export class TipoQuejaPipe implements PipeTransform {

  transform(id:string): string {

    switch (id){
      case 'a':
        return 'Queja';
      case 'b':
        return 'Denuncia';
    }
    return '';
  }

}
