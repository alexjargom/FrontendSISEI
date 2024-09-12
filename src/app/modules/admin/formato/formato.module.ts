import { SharedModule } from '../../../shared/shared.module';
import { AddFormatoComponent } from './add-formato/add-formato.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatoRoutingModule } from './formato-routing.module';
import { ListFormatoComponent } from './list-formato/list-formato.component';


@NgModule({
  declarations: [ListFormatoComponent, AddFormatoComponent],
  imports: [
    CommonModule,
    FormatoRoutingModule,
    SharedModule
  ]
})
export class FormatoModule { }
