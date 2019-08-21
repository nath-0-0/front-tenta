
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
      selector: 'app-input-message',
      templateUrl: './input-message.component.html'
    })
export class InputMessageComponent {

  @Input() control: FormControl;

  @Input() textError: string;

}
