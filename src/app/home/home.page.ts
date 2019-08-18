import { Component } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   public user$: Observable<any>;
  constructor(
    private authService: AuthService) {
  }

}
