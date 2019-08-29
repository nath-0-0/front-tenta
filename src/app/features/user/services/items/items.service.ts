import { Injectable, Inject } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  _items$ = new BehaviorSubject([]);
  item$ = this._items$.asObservable();

  constructor(
    @Inject(HttpService) private _http: HttpService
  ) { }


  get(param: string) {
    return this._http.get( param).pipe(
      tap(res => console.log('http GET response-> ', res)),
      map((res: any) => {
        this._items$.next(res);
        return res;
      })
    );
  }

  post({param, body}: {param: string, body: any}) {
  // post(data: {param: string, body: any}) {
  // post(param: string, body: any) {
    return this._http.post( {param, body} ).pipe(
      tap(res => console.log('http POST response-> ', res)),
      tap((res: any) => {
        const clean = this._items$.value;
        clean.push(res);
        this._items$.next(clean);
      })
    );
  }


  put({param, body}: {param: string, body: any}) {
    // post(data: {param: string, body: any}) {
    // post(param: string, body: any) {
      return this._http.put({ param, body} ).pipe(
        tap(res => console.log('http PUT response-> ', res)),
        tap((res: any) => {
          const clean = this._items$.value.filter(el => el._id !== res._id);
          clean.push(res);
          this._items$.next(clean);
        })
      );
    }

  delete(param: string) {
    return this._http.delete( param).pipe(
      tap(res => console.log('http DELETE response-> ', res)),
      tap((res: any) => {
       console.log(this._items$);
       const clean = this._items$.value.filter(el => el._id !== res._id);
       // clean.push(res);
       this._items$.next([...this._items$.value.filter(el => el._id !== res._id)]);
       console.log(this._items$.value);
      })
    );
  }
}
