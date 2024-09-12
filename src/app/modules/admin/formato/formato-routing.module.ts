import { AddFormatoComponent } from './add-formato/add-formato.component';
import { ListFormatoComponent } from './list-formato/list-formato.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListFormatoComponent
  },
  {
    path: 'crear',
    component: AddFormatoComponent
  },
  {
    path: 'editar/:id',
    component: AddFormatoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatoRoutingModule { }
