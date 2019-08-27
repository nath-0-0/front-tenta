import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.page.html',
  styleUrls: ['./footer-menu.page.scss'],
})
export class FooterMenuPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('auth-token', null);
    this._router.navigate(['auth/login']);

  }

}
