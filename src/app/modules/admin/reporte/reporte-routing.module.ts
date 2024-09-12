import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexReportesComponent } from './index-reportes/index-reportes.component';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';

const routes: Routes = [
  {
    path: "",
    component: IndexReportesComponent
  },
  {
    path:"principal",
    component: ReporteGeneralComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
