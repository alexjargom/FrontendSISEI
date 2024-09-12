import { AdminAuthResolver } from './admin-auth-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: AdminAuthResolver
    },
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'dependencia',
    loadChildren: () => import('./dependencia/dependencia.module').then(m => m.DependenciaModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'comite',
    loadChildren: () => import('./comite/comite.module').then(m => m.ComiteModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'formato',
    loadChildren: () => import('./formato/formato.module').then(m => m.FormatoModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'recomendacion',
    loadChildren: () => import('./recomendacion/recomendacion.module').then(m => m.RecomendacionModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'documentacion',
    loadChildren: () => import('./documentacion/documentacion.module').then(m => m.DocumentacionModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'queja',
    loadChildren: () => import('./queja/queja.module').then(m => m.QuejaModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then(m => m.SesionModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'plan',
    loadChildren: () => import('./plan-anual/plan-anual.module').then(m=> m.PlanAnualModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path: 'difusion',
    loadChildren: () => import('./difusion/difusion.module').then(m=> m.DifusionModule),
    resolve: {
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path:'notificacion',
    loadChildren: () => import ('./notificacion/notificacion.module').then(m => m.NotificacionModule),
    resolve:{
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path:'contacto',
    loadChildren: ()=>import ('./contacto/contacto.module').then(m=>m.ContactoModule),
    resolve:{
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path:'buzon',
    loadChildren: ()=>import ('./buzon-queja/buzon-queja.module').then(m=>m.BuzonQuejaModule),
    resolve:{
      isAuthenticated: AdminAuthResolver
    }
  },
  {
    path:'material',
    loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
    resolve:{
      isAuthenticated: AdminAuthResolver,
    }
  },
  {
    path:"reportes",
    loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule),
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
