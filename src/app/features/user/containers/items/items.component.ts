import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})



export class ItemsComponent implements OnInit {

  private user: any;
  items$: Observable<any>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService) {
    this.user = this._http.getUser();
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.items$ = this._http.get(`/user/${this.user._id}/listItem`).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  // userRouter.delete('/:user_id/:item_id', removeItemHandler);
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

  }

 // TODO V2 à améliorer en employant routing angular
  back() {
    window.history.back();
  }

}
