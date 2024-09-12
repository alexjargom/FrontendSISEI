import { ModulesModule } from './modules/modules.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CoreModule } from './core';
import { SharedModule } from './shared';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

export function playerFactory(): any{
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    ModulesModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
