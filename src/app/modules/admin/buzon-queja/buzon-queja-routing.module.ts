import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBuzonComponent } from './list-buzon/list-buzon.component';
import { AddBuzonComponent } from './add-buzon/add-buzon.component';

const routes: Routes = [
  {
    path:'',
    component: ListBuzonComponent
  },
  {
    path:'crear',
    component: AddBuzonComponent,
  },
  {
    path:'editar/:id',
    component:AddBuzonComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuzonQuejaRoutingModule { }
