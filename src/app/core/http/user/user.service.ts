import { ApiFunction } from './../../models/api.model';
import { Credentials, UserModel } from './../../models/user.model';
import { environment, routes } from 'src/environments/environment';
import { Logger } from './../../logger.service';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { map, distinctUntilChanged } from 'rxjs/operators';
import { JwtService } from '../../authentication/jwt.service';
import {  Router } from '@angular/router';
import { HttpResponseModel } from '../..';
import { TipoUsuario } from '../../var/variables';

const log = new Logger('UserService');

@Injectable()
export class UserService implements ApiFunction {
  private currentUserSubject = new BehaviorSubject<UserModel>({} as UserModel);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  // Verigy JWT in localstorage
  // This runs once on application startup.
  populate(): void {
    if (this.jwtService.getToken()) {
      this.apiService.get(routes.profile)
        .subscribe(
          data => this.setAuth(data.Data),
          err =>  this.purgeAuth()
        );
    } else {
      this.purgeAuth();
    }
  }

  public login(c: Credentials): Observable<UserModel> {
    return this.apiService.post(routes.login, c).pipe( map( (resp: HttpResponseModel) => {
      const user = resp.Data as UserModel;
      this.setAuth(user);
      this.router.navigate(['']);
      return user;
    } ));
  }

  setAuth(user: UserModel): void {
    this.jwtService.saveToken(user.Token ?? '');
    log.debug(user);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as UserModel);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['login']);
    log.debug('user not fonund , logout');
  }

  logout(): void {
    this.purgeAuth();
  }

  getCurrentUser(): UserModel {
    return this.currentUserSubject.value;
  }

  // create user
  create(user: UserModel): Observable<HttpResponseModel> {
    return this.apiService
    .post(routes.usuario ,  user );
  }

  // get
  getAll(): Observable<UserModel[]> {
    return this.apiService
    .get(routes.usuario)
    .pipe(map( e => e.Data));
  }

  // getOne
  get(id: string): Observable<UserModel> {
    return this.apiService
    .get(`${routes.usuario}/${id}`)
    .pipe(map( e => e.Data));
  }

  // delete

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
    .delete(`${routes.usuario}/${id}`);
  }

  update(id: string, user: UserModel): Observable<HttpResponseModel> {
    return this.apiService
    .put(`${routes.usuario}/${id}`, user);
  }

   //checar el tipo de usuario
   checkIsAdmin():boolean{
    const us = this.getCurrentUser();
    if(us.TipoUsuarioId == TipoUsuario.Admin || us.TipoUsuarioId == TipoUsuario.Root){
      return true;
    }else{
      return false;
    }
  }
}
