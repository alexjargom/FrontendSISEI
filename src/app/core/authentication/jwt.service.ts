import { Injectable } from '@angular/core';

const tokenKey = 'jwtToken';

@Injectable()
export class JwtService {

  getToken(): string {
    return window.localStorage[tokenKey];
  }

  saveToken(token: string): void {
    window.localStorage[tokenKey] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem(tokenKey);
  }
}
