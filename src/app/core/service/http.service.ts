import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  get(param: string) {
    return this._http.get(param).pipe(
      tap(res => console.log('http GET response-> ', res))
    );
  }

  post({param, body}: {param: string, body: any}) {
  // post(data: {param: string, body: any}) {
  // post(param: string, body: any) {
    return this._http.post(param, body, {}).pipe(
      tap(res => console.log('http POST response-> ', res))
    );
  }
}
