import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/service/http.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  @Input() user: any;
  @Input() txt: string;

  myUser: any; // user conected

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private _router: Router,
    private _http: HttpService) { }

  ngOnInit() {
    this.myUser = this._http.getUser();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  // lendRouter.post('/:borrower_id/:lender_id/:item_id', authMiddleware, askLendHandler); // TODO add validate for item_id -->
  ask(itemId: string) {
    this.closeModal();
    this._router.navigate(['/x/fm/askToLend', this.myUser._id, this.user._id, itemId, ]);
  }

}
