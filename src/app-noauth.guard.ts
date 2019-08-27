import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpService } from './app/core/service/http.service';


@Injectable()
export class AppNoAuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _http: HttpService
  ) {}

  canActivate(): boolean {
    return !this._checkUser();
  }

  private async _checkUser(): Promise<boolean> {
    return this._http.get('/auth/whoiam').toPromise()
    .then((data: any) => {
      if (data && data.user ) return true;
      this._router.navigate(['/x/fm/profil']);
      return false;
    })
    .catch(err => {
      this._router.navigate(['/x/fm/profil']);
      return false;
    });



    // const { user = null} = JSON.parse(localStorage.getItem('auth-token') || '{}');
    // if (user) return true; 
    // this._router.navigate(['auth'])
    // return false;
  }
}
