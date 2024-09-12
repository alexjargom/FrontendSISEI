import { AdminLayoutComponent } from './../shared/components/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserAuthResolver} from '../core';

const routes: Routes = [
  {
    path: '',
    resolve : {
      isAuthenticated: UserAuthResolver
    },
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule ),
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule ),
  },
  {
    path:'**',
    redirectTo:'',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
