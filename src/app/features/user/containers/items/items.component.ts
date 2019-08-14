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
      constructor(private http: HttpService) { }

      ngOnInit() {
        this.getItems();
        // console.log();
      }

      getItems() {  // 5d3fff60dc91fe4729f39fb3
        this.items$ = this.http.get('http://0.0.0.0:8080/api/v1/user/5d3fff60dc91fe4729f39fb3/listItem').pipe(
          map((user: any) => {
            return user.user.items;
          })
        );
        // TO post$ = (of)coucou   >> rend coucou observable
        // .pipe(map(i => i.items));
        // his.items$ = user$
        // //.pipe(map(i => return i));
        // this.items$ = user$;
        // console.log(this.items$);
      }

      /*async toogleEnabled(){
        const {error = null, ...post} = await this._http.post({
          param: `/user/${this.user_id}/addItem`,
          body: this.form.value
        }).pipe(
          tap(data => console.log('data-> ', data))
        ).toPromise().then((res: any) => res);
        if (error) {
          console.log('Error: ', error);
          return;
        }
        console.log('Success :', post);
    
      }*/
    }
