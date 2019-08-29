


import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/core/service/http.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
})
export class NotifPage implements OnInit {
  private user: any;
  notifs$: Observable<any>;

  constructor(private _http: HttpService) {
    this.user = this._http.getUser();
  }

  ngOnInit() {
    this.getNotifs();
    
  }

  getNotifs() {  // 5d3fff60dc91fe4729f39fb3
    this.notifs$ = this._http.get(`/user/${this.user._id}/listNotifications`).pipe(
      map((notifs: any) => {
        return notifs;
      })
    );
  }


async delete(id) {
  const {error = null, ...del} = await this._http.delete(
    `/user/${this.user._id}/${id}/deleteNotif` //  TOASK
  ).pipe(
    tap(data => console.log('data-> ', data))
  ).toPromise().then((res: any) => res);
  if (error) {
    console.log('Error: ', error);
    return;
  }
  console.log('Success :', del);
  // userRouter.delete('/:user_id/:item_id/deleteNotif', removeItemHandler);
}

}



