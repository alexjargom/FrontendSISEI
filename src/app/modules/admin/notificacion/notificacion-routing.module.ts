import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotificacionComponent } from '../../../shared/components/list-notificacion/list-notificacion.component';

const routes: Routes = [
  {
    path:'',
    component: ListNotificacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionRoutingModule { }
