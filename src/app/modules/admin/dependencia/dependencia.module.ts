import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependenciaRoutingModule } from './dependencia-routing.module';
import { AddDependenciaComponent } from './add-dependencia/add-dependencia.component';
import { ListDependenciaComponent } from './list-dependencia/list-dependencia.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [AddDependenciaComponent, ListDependenciaComponent],
  imports: [
    CommonModule,
    DependenciaRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class DependenciaModule { }
