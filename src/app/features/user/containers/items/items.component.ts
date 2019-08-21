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

  private user: any;

  items$: Observable<any>;

  
  constructor(private _http: HttpService) { 
    this.user = this._http.getUser();
  }

  ngOnInit() {
    this.getItems();

    }
  // TOASK je prends comment mon iuser?
  getItems() {  // 5d3fff60dc91fe4729f39fb3
    this.items$ = this._http.get(`/user/${this.user._id}/listItem`).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  async toogleEnabled(event) { // pour version 2
    console.log(event.detail.value); 
    const {error = null, ...post} = await this._http.post({
      param: `/item/${this.user._id}/${event.detail.value}`,  //  TOASK
      body: {} // TOASK je n'arrive pas à modifier qu'un champs
    }).pipe(
      tap(data => console.log('data-> ', data))
    ).toPromise().then((res: any) => res);
    if (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('Success :', post);

  }

async delete(id) {
        console.log(id);
        const {error = null, ...del} = await this._http.delete(
          `/user/${this.user._id}/${id}` //  TOASK
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
