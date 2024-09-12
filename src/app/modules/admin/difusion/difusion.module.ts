import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DifusionRoutingModule } from './difusion-routing.module';
import { AddDifusionComponent } from './add-difusion/add-difusion.component';
import { ListDifusionComponent } from './list-difusion/list-difusion.component';
import { SharedModule } from '../../../shared/shared.module';
import { VerDifusionComponent } from './ver-difusion/ver-difusion.component'


@NgModule({
  declarations: [AddDifusionComponent, ListDifusionComponent, VerDifusionComponent],
  imports: [
    CommonModule,
    DifusionRoutingModule,
    SharedModule
  ]
})
export class DifusionModule { }
