import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtHelper: JwtHelperService) {}

  public setSession(jwt: any) {
    localStorage.setItem('jwt', jwt);
  }

  public logout() {
    localStorage.removeItem('jwt');
  }

  public isLoggedIn() {
    return DateTime.now() < this.getExpiration();
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  private getExpiration() {
    let expiration = this.jwtHelper.getTokenExpirationDate();
    expiration = expiration ?? DateTime.now().toJSDate();
    return DateTime.fromJSDate(expiration);
  }
}
