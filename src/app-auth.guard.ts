import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { HttpService } from './app/core/service/http.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// TODO utiliser librair
@Injectable()
export class AppAuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _http: HttpService
  ) {}

  canActivate() {
  return this._http.get('/auth/whoiam').toPromise()
      .then((data: any) => {
        if (data && data.user ) return true;
        this._router.navigate(['auth/login']);
        return false;
      })
      .catch(err => {
        this._router.navigate(['auth/login']);
        return false;
      });
  }

  private async _checkUser(): Promise<boolean> {
    // try {
    //   const tokenContent: any = jwt.decode(localStorage.getItem('auth-token'));
    //   const { user } = tokenContent;
    //   return !!user;

    // } catch (e) {
    //   this._router.navigate(['index']);
    //   return false;
    // }
    
    // const { user = null} = JSON.parse(localStorage.getItem('auth-token') || '{}');
    // if (!user) { return true; }
    // this._router.navigate(['index']);
    return false;
  }
}
