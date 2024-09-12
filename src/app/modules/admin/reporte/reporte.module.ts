import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { IndexReportesComponent } from './index-reportes/index-reportes.component';
import {SharedModule} from '../../../shared';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';

@NgModule({
  declarations: [IndexReportesComponent, ReporteGeneralComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    SharedModule
  ]
})
export class ReporteModule { }
