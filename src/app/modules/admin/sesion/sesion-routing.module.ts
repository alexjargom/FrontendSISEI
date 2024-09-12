import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListSesionComponent} from './list-sesion/list-sesion.component';
import {AddSesionComponent} from './add-sesion/add-sesion.component';

const routes: Routes = [
  {
    path: '',
    component: ListSesionComponent
  },
  {
    path: 'crear',
    component: AddSesionComponent
  },
  {
    path: 'editar/:id',
    component: AddSesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionRoutingModule { }
