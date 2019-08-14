import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   public user: any;  
  constructor() {
    const { user = null} = JSON.parse(localStorage.getItem('ng-auth'));
  }

}
