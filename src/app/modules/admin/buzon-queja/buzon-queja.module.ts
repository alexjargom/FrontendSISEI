import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuzonQuejaRoutingModule } from './buzon-queja-routing.module';
import { AddBuzonComponent } from './add-buzon/add-buzon.component';
import { ListBuzonComponent } from './list-buzon/list-buzon.component';

import { SharedModule } from '../../../shared/shared.module'


@NgModule({
  declarations: [ AddBuzonComponent,ListBuzonComponent],
  imports: [
    CommonModule,
    BuzonQuejaRoutingModule,
    SharedModule
  ]
})
export class BuzonQuejaModule { }
