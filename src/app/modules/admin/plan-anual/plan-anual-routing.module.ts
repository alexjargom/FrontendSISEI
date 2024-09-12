import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesPlanComponent } from './actividades-plan/actividades-plan.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { AvancePlanComponent } from './avance-plan/avance-plan.component';
import { ListPlanComponent } from './list-plan/list-plan.component';

const routes: Routes = [
  {
    path: '',
    component: ListPlanComponent
  },
  {
    path: 'crear',
    component: AddPlanComponent
  },
  {
    path: 'editar/:id',
    component: AddPlanComponent
  },
  {
    path:'actividad/:id/:edit',
    component: ActividadesPlanComponent
  },
  { 
    path:'avance',
    component: AvancePlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAnualRoutingModule { }
