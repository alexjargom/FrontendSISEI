import { ListDependenciaComponent } from './list-dependencia/list-dependencia.component';
import { AddDependenciaComponent } from './add-dependencia/add-dependencia.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListDependenciaComponent
  },
  {
    path: 'crear',
    component: AddDependenciaComponent
  },
  {
    path: 'editar/:id',
    component: AddDependenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependenciaRoutingModule { }
