import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecomendacionRoutingModule } from './recomendacion-routing.module';
import { AddRecomendacionComponent } from './add-recomendacion/add-recomendacion.component';
import { ListRecomendacionComponent } from './list-recomendacion/list-recomendacion.component';
import {SharedModule} from '../../../shared';


@NgModule({
  declarations: [AddRecomendacionComponent, ListRecomendacionComponent],
  imports: [
    CommonModule,
    RecomendacionRoutingModule,
    SharedModule
  ]
})
export class RecomendacionModule { }
