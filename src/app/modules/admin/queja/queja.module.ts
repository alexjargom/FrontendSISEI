import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuejaRoutingModule } from './queja-routing.module';
import { AddQuejaComponent } from './add-queja/add-queja.component';
import { ListQuejaComponent } from './list-queja/list-queja.component';
import { SharedModule } from '../../../shared';
import { CardQuejaComponent } from './card-queja/card-queja.component';
import { ViewQuejaComponent } from './view-queja/view-queja.component';
import { FormsModule } from '@angular/forms';
import { ChartQuejaComponent } from './chart-queja/chart-queja.component'; 

@NgModule({
  declarations: [AddQuejaComponent, ListQuejaComponent, CardQuejaComponent, ViewQuejaComponent, ChartQuejaComponent],
  imports: [
    CommonModule,
    QuejaRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class QuejaModule { }
