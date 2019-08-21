
import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  @Input() title: string;
  @Input() color = 'primary';

  @HostListener('click', ['$event.target']) onClick(target) {
    const url = target.getAttribute('data-url');
    if (!url) { return; }
    console.log('Clicked on: ', target, url);
    this._router.navigateByUrl(url);
  }

  constructor(private _router: Router) {}
}
