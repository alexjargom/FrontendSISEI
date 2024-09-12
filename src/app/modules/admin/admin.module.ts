import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminAuthResolver } from './admin-auth-resolver.service';
import { SharedModule } from '../../shared/shared.module';
import { MaterialApoyoComponent } from './material/material-apoyo/material-apoyo.component';

@NgModule({
  declarations: [HomeComponent, MaterialApoyoComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    AdminAuthResolver
  ]
})
export class AdminModule { }
