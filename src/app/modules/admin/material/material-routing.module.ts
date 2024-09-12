import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthResolver } from '../admin-auth-resolver.service';
import { MaterialApoyoComponent } from './material-apoyo/material-apoyo.component';
import { VerMaterialComponent } from './ver-material/ver-material.component';

const routes: Routes = [
  {
    path:'',
    component: MaterialApoyoComponent,
    resolve: {
      isAuthenticated: AdminAuthResolver
    },
  },
  {
    path:'ver/:id',//position en el arreglo 
    component: VerMaterialComponent,
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
