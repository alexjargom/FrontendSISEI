import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { DemoPublicComponent } from './demo-public/demo-public.component';
import { ViewDifusionComponent } from './view-difusion/view-difusion.component';
import { SharedModule } from './../../shared/shared.module';
import { ViewDocumentacionComponent } from './view-documentacion/view-documentacion.component'
import { FormsModule } from '@angular/forms';
import { ViewComiteComponent } from './view-comite/view-comite.component';
import { GeneralComponent } from './general/general.component';


@NgModule({
  declarations: [DemoPublicComponent, ViewDifusionComponent, ViewDocumentacionComponent, ViewComiteComponent, GeneralComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PublicModule { }
