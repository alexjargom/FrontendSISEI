import { StepComiteComponent } from './step-comite/step-comite.component';
import { ListComiteComponent } from './list-comite/list-comite.component';
import { ListCargosComponent } from './cargos/list-cargos/list-cargos.component';
import { AddCargosComponent } from './cargos/add-cargos/add-cargos.component';
import { AddComiteComponent } from './add-comite/add-comite.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListComiteComponent
  },

  {
    path: 'crear',
    component: StepComiteComponent
  },
  {
    path: 'editar/:id',
    component: StepComiteComponent
  },
  {
    path: 'cargo',
    children: [
      {
        path: 'crear',
        component: AddCargosComponent
      },
      {
        path: '',
        component: ListCargosComponent
      },
      {
        path: 'editar/:id',
        component: AddCargosComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComiteRoutingModule { }
