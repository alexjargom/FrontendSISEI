import { AddUsuariosComponent } from './add-usuarios/add-usuarios.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListUsuariosComponent
  },
  {
    path: 'crear',
    component: AddUsuariosComponent
  },
  {
    path: 'editar/:id',
    component: AddUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
