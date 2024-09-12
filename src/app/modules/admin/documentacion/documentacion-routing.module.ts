import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListDocumentacionComponent} from './list-documentacion/list-documentacion.component';
import {AddDocumentacionComponent} from './add-documentacion/add-documentacion.component';

const routes: Routes = [
  {
    path: '',
    component: ListDocumentacionComponent
  },
  {
    path: 'crear/:tipo/:anio',
    component: AddDocumentacionComponent
  },
  {
    path: 'editar/:id',
    component: AddDocumentacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionRoutingModule { }
