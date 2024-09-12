import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComiteRoutingModule } from './comite-routing.module';
import { AddComiteComponent } from './add-comite/add-comite.component';
import { AddCargosComponent } from './cargos/add-cargos/add-cargos.component';
import { ListCargosComponent } from './cargos/list-cargos/list-cargos.component';
import { ListComiteComponent } from './list-comite/list-comite.component';
import { StepComiteComponent } from './step-comite/step-comite.component';
import { FilesComiteComponent } from './files-comite/files-comite.component';
import { SolicitudComiteComponent } from './solicitud-comite/solicitud-comite.component';
import { FormsModule } from '@angular/forms';
import { AddConformacionComponent } from './conformacion/add-conformacion/add-conformacion.component';

@NgModule({
  declarations: [AddComiteComponent, AddCargosComponent,
     ListCargosComponent, ListComiteComponent,
     StepComiteComponent, FilesComiteComponent, SolicitudComiteComponent, AddConformacionComponent],
  imports: [
    CommonModule,
    ComiteRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ComiteModule { }
