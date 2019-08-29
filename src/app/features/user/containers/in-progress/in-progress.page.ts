import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/core/service/http.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements OnInit {
// TODO V2 pouvoir annuler une demande

  private user: any;
  public lends$: Observable<any>;

  constructor(private _http: HttpService) {
    this.user = this._http.getUser();
  }

  ngOnInit() {
    this.getLends();

  }
// lendRouter.get('/in_progress/:user_id', authMiddleware, getLendInProgressHandler); // TODO add validate for item_id

  getLends() {
    this.lends$ = this._http.get(`/lend/in_progress/${this.user._id}`).pipe(
      map((lends: any) => {
        console.log('lends',lends);
        return lends;
      })
    );
  }
}
