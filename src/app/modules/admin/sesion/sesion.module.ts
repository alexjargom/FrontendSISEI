import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionRoutingModule } from './sesion-routing.module';
import { AddSesionComponent } from './add-sesion/add-sesion.component';
import { ListSesionComponent } from './list-sesion/list-sesion.component';
import {SharedModule} from '../../../shared';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [AddSesionComponent, ListSesionComponent],
  imports: [
    CommonModule,
    SesionRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class SesionModule { }
