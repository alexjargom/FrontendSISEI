import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DemoPublicComponent} from './demo-public/demo-public.component';
import { ViewComiteComponent } from './view-comite/view-comite.component';
import { ViewDifusionComponent } from './view-difusion/view-difusion.component';
import { ViewDocumentacionComponent } from './view-documentacion/view-documentacion.component';
import { GeneralComponent } from './general/general.component'

const routes: Routes = [
  {
    path: '',
    component: DemoPublicComponent
  },
  {
    path:'difusion/:id',
    component: ViewDifusionComponent
  },
  {
    path:'doc/:id',
    component: ViewDocumentacionComponent
  },
  {
    path:'comite/:id',
    component: ViewComiteComponent
  },
  {
    path:'principal/:id',
    component: GeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
