import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private provider = "http://0.0.0.0:8080/api/v1";  // TOASK variable global?
  constructor(
    private _http: HttpClient
  ) { }

  get(param: string) {
    return this._http.get(this.provider + param).pipe(
      tap(res => console.log('http GET response-> ', res))
    );
  }

  post({param, body}: {param: string, body: any}) {
  // post(data: {param: string, body: any}) {
  // post(param: string, body: any) {
    return this._http.post(this.provider + param, body, {}).pipe(
      tap(res => console.log('http POST response-> ', res))
    );
  }
}
