import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AppAuthGuard implements CanActivate {

  constructor(
    private _router: Router
  ) {}

  canActivate(): boolean {
    return this._checkUser();
  }

  private _checkUser(): boolean {
    const { user = null} = JSON.parse(localStorage.getItem('ng-auth') || '{}');
    if (!user) { return true; }
    this._router.navigate(['index']);
    return false;
  }
}
