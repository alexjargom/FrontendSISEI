import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { InfoComponent } from './info/info.component';
import { SharedModule} from '../../../shared/shared.module'


@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    SharedModule
  ]
})
export class ContactoModule { }
