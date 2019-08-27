import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  @Input() user: string;
  @Input() txt: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    console.log('xxxxxxxxxxxxx',this.txt);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
