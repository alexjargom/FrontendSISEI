import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { NgZorroModule } from './ng-zorro.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FileDetailComponent } from './components/file-detail/file-detail.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import localeMxExtra from '@angular/common/locales/extra/es-MX';
registerLocaleData(es, 'es' , localeMxExtra);
import { CalendarioComponent } from './components/calendario/calendario.component'

registerLocaleData(es, 'es-MX' , localeMxExtra);

import {en_US, es_ES, NZ_I18N, NzI18nService} from 'ng-zorro-antd/i18n';
import { StatusPipe } from './pipes/status.pipe';
registerLocaleData(es);
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardDifusionComponent } from './components/card-difusion/card-difusion.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { PeriodoPipe } from './pipes/periodo.pipe'
import { TodaySesionComponent } from './components/today-sesion/today-sesion.component'
import { ListNotificacionComponent } from './components/list-notificacion/list-notificacion.component'
import { TipoQuejaPipe } from './pipes/tipo-queja.pipe'


import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

@NgModule({
  declarations: [AdminLayoutComponent , FileDetailComponent , TipoUsuarioPipe, StatusPipe ,CardDifusionComponent,BackButtonComponent,CalendarioComponent,PeriodoPipe,
    TodaySesionComponent, ListNotificacionComponent,TipoQuejaPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroModule,
    ReactiveFormsModule,
    NgxDocViewerModule,
    NgxChartsModule,
    FormsModule,
    // PeriodoPipe,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  exports: [
    AdminLayoutComponent,
    FileDetailComponent,
    ReactiveFormsModule,
    NgZorroModule,
    TipoUsuarioPipe,
    StatusPipe,
    NgxChartsModule,
    CardDifusionComponent,
    BackButtonComponent,
    CalendarioComponent,
    PeriodoPipe,
    TodaySesionComponent,
    FormsModule,
    ListNotificacionComponent,
    TipoQuejaPipe,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxDocViewerModule,
  ],
  providers: [
    PeriodoPipe,
    { provide: NZ_I18N, useValue: en_US },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
})
export class SharedModule {
  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(es_ES);
  }
}
