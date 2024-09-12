import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { NotificacionRoutingModule } from './notificacion-routing.module';
// import { ListNotificacionComponent } from '../../../shared/components/list-notificacion/list-notificacion.component';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    // ListNotificacionComponent
  ],
  imports: [
    CommonModule,
    NotificacionRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class NotificacionModule { }
