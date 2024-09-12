import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListQuejaComponent} from './list-queja/list-queja.component';
import {AddQuejaComponent} from './add-queja/add-queja.component';
import { CardQuejaComponent } from './card-queja/card-queja.component';
import { ViewQuejaComponent } from './view-queja/view-queja.component';
import { ChartQuejaComponent } from './chart-queja/chart-queja.component';

const routes: Routes = [
  {
    path: '',
    component: ListQuejaComponent
  },
  {
    path: 'crear',
    component: AddQuejaComponent
  },
  {
    path: 'editar/:id',
    component: AddQuejaComponent
  },
  {
    path:'view/:id',
    component: ViewQuejaComponent
  },
  {
    path:'chart',
    component: ChartQuejaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuejaRoutingModule { }
