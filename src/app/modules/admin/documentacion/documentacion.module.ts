import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { AddDocumentacionComponent } from './add-documentacion/add-documentacion.component';
import {SharedModule} from '../../../shared';
import { ListDocumentacionComponent } from './list-documentacion/list-documentacion.component';


@NgModule({
  declarations: [AddDocumentacionComponent, ListDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    SharedModule
  ]
})
export class DocumentacionModule { }
