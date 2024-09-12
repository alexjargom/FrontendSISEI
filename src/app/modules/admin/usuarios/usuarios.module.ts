import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { AddUsuariosComponent } from './add-usuarios/add-usuarios.component';


@NgModule({
  declarations: [ListUsuariosComponent, AddUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
