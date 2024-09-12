import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListRecomendacionComponent} from './list-recomendacion/list-recomendacion.component';
import {AddRecomendacionComponent} from './add-recomendacion/add-recomendacion.component';

const routes: Routes = [
  {
    path: '',
    component: ListRecomendacionComponent
  },
  {
    path: 'crear',
    component: AddRecomendacionComponent
  },
  {
    path: 'editar/:id',
    component: AddRecomendacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecomendacionRoutingModule { }
