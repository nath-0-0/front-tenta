import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { tap, find, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {

  private user: any;

  user$: Observable<any>;

//userRouter.get('/edit/:user_id', getUserHandler); 
  constructor(private _http: HttpService) { 
    this.user = this._http.getUser(); // TODO TOIMPROVE pas besoin de cahrger 2 fois!
  }

  ngOnInit() {
    this.getItems();

    }
  getItems() {
    this.user$ = this._http.get(`/user/edit/${this.user._id}`).pipe(
      map((user: any) => {
        return user;
      })
    );
  }
}
