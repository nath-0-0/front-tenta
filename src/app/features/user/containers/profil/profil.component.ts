import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { tap, find, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
     // TODO V2 amliorer stockage user

  private user: any;

  user$: Observable<any>;
  private profilePicture = '';

// userRouter.get('/edit/:user_id', getUserHandler);
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpService,
              // tslint:disable-next-line: variable-name
              private _router: Router, ) {

  }

  ngOnInit() {
    this.user = this._http.getUser();
    this.getItems();

    }
  getItems() {
    this.user$ = this._http.get(`/user/edit/${this.user._id}`).pipe(
      map((user: any) => {
        return user;
      })
    );
  }

  logout() {
    localStorage.setItem('auth-token', null);
    this._router.navigate(['auth/login']);
  }


}
