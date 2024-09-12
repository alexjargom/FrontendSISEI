import { Component, Input, OnInit } from '@angular/core';
import { TableService } from 'src/app/core';
import { SesionModel } from 'src/app/core/models/sesion.model';
import { TimeService } from '../../settings/time.service'

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  @Input() sesionesCalendar: SesionModel[]=[];
  @Input() fullCalendar: boolean= false;

  status = 'success';
  innerWidth: any = {};
  constructor(
    public time: TimeService,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
  }
  getDayData(date: Date): SesionModel[] | null {
    const xs = this.sesionesCalendar.filter(e =>{
      let fecha = new Date(e.Fecha);
      if (fecha.getDate() === date.getDate() &&
      fecha.getFullYear() === date.getFullYear() &&
      fecha.getMonth() === date.getMonth()){
        return true;
      }
      return false;
    });
    return xs.length > 0 ? xs : null;
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

}
