import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module'

import { PlanAnualRoutingModule } from './plan-anual-routing.module';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { ListPlanComponent } from './list-plan/list-plan.component';
import { FilePlanComponent } from './file-plan/file-plan.component';
import { ActividadesPlanComponent } from './actividades-plan/actividades-plan.component';
import { FormsModule } from '@angular/forms';
import { AddVerificacionComponent } from './add-verificacion/add-verificacion.component';
import { AvancePlanComponent } from './avance-plan/avance-plan.component';
import { DocumentoComponent } from './documento/documento.component';


@NgModule({
  declarations: [AddPlanComponent, ListPlanComponent, FilePlanComponent, ActividadesPlanComponent, AddVerificacionComponent, AvancePlanComponent, DocumentoComponent],
  imports: [
    CommonModule,
    PlanAnualRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PlanAnualModule { }
