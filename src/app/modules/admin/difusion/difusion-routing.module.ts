import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDifusionComponent } from './add-difusion/add-difusion.component';
import { ListDifusionComponent } from './list-difusion/list-difusion.component';
import { VerDifusionComponent } from './ver-difusion/ver-difusion.component';

const routes: Routes = [
  {
    path:'',
    component: ListDifusionComponent
  },
  {
    path:'crear',
    component: AddDifusionComponent,
  },{
    path:'ver/:id',
    component: VerDifusionComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DifusionRoutingModule { }
