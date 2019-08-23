import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { map, tap, find, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tenta-items',
  templateUrl: './tenta-items.component.html',
  styleUrls: ['./tenta-items.component.scss'],
})
export class TentaItemsComponent implements OnInit {

    private user: any;
  
    items$: Observable<any>;
    
    constructor(private _http: HttpService) { 
      this.user = this._http.getUser();
      console.log('coucou');
    }
  
    ngOnInit() {
      this.getItems();
      console.log('coucou');
      }
    // TOASK je prends comment mon iuser?
    getItems() {  // 5d3fff60dc91fe4729f39fb3
      this.items$ = this._http.get(`/user/${this.user._id}/listItem`).pipe(
        map((user: any) => {
          return user;
        })
      );
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