import { FormCheckService } from './services/form-check.service';
import { ApiService } from './http/api.service';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';
import { ApiPrefixInterceptor } from './interceptors/api.prefix.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
   HttpTokenInterceptor,
  } from './interceptors/http.token.interceptor';
import { JwtService } from './authentication/jwt.service';
import { UserService } from './http/user/user.service';
import { NotificationService } from './services';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { DependenciaService } from './http/dependencia/dependencia.service';
import { ComiteService } from './http';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass : ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass : HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    ApiService,
    JwtService,
    UserService,
    FormCheckService,
    NotificationService,
    DependenciaService,
    ComiteService
  ],
  declarations: []
})
export class CoreModule { }
