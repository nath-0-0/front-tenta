import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { tap, find, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})




export class ItemsComponent implements OnInit {

  items$: Observable<any>;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getItems();
    console.log(this._http);
    }
  // TOASK je prends comment mon iuser?
  getItems() {  // 5d3fff60dc91fe4729f39fb3
    this.items$ = this._http.get('/user/5d3fff60dc91fe4729f39fb3/listItem').pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  async toogleEnabled(event) {

    console.log(event.detail.value); 
    const {error = null, ...post} = await this._http.post({
      param: `/item/5d3fff60dc91fe4729f39fb3/${event.detail.value}`,  //  TOASK
      body: {} // TOASK je n'arrive pas à modifier qu'un champs
    }).pipe(
      tap(data => console.log('data-> ', data))
    ).toPromise().then((res: any) => res);
    if (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('Success :', post);
  // itemRouter.post('/:user_id/:item_id', updateItemHandler);

  }

async delete(id) {
        console.log(id);
        const {error = null, ...del} = await this._http.delete(
          `/user/5d3fff60dc91fe4729f39fb3/${id}` //  TOASK
        ).pipe(
          tap(data => console.log('data-> ', data))
        ).toPromise().then((res: any) => res);
        if (error) {
          console.log('Error: ', error);
          return;
        }
        console.log('Success :', del);
        //userRouter.delete('/:user_id/:item_id', removeItemHandler);

      }
}
