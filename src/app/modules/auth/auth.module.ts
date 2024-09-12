import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule { }
