import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ask-to-lend',
  templateUrl: './ask-to-lend.component.html',
  styleUrls: ['./ask-to-lend.component.scss'],
})
export class AskToLendComponent implements OnInit {
// TODO V2 faire les messages d'erreur pour utilisateurs
public form: FormGroup;
item$: Observable<any>;
//
  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    const {item_id = null} = this._route.snapshot.params;
    this.getItem(item_id);
    this.form = new FormGroup({
      dateFrom: new FormControl('',
        Validators.compose([
          Validators.required,
          // Validators.minLength(2),
          // Validators.maxLength(500)
        ])
      ),
      dateTo: new FormControl('',
        Validators.compose([
          Validators.required,
          // Validators.minLength(0),
          // Validators.maxLength(500)
        ])
      ),
        message: new FormControl(''),
        image: new FormControl('')
    });
  }

  getItem(id: string) {
    // création observable item
    console.log(id);
    this.item$ =  this._http.get(`/item/edit/${id}`).pipe(
       map((item: any) => {
         return  item;
       })
     );
  }


  // lendRouter.post('/:borrower_id/:lender_id/:item_id', authMiddleware, askLendHandler); // TODO add validate for item_id
//   this._router.navigate(['/x/fm/askToLend', this.myUser._id, this.user._id, idItem, ]);
//        path: 'askToLend/:borrower_id/:lender_id/:item_id',

  async save() {
    const {borrower_id = null, lender_id= null, item_id = null} = this._route.snapshot.params;

    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    console.log(this.form.value);
    const {error = null, ...post} = await this._http.post({
      param: `/lend/${borrower_id}/${lender_id}/${item_id}`,
      body: this.form.value
    }).pipe(
      tap(data => console.log('data-> ', data))
    ).toPromise().then((res: any) => res);
    if (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('Success :', this.form.value);
    this.presentAlert();
    // TODO  V2 rediriger vers page merci merci et blablablabalbalb
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Bravo',
      message: 'Voius demande de prêt à été e',
      buttons: ['OK']
    });

    await alert.present();
  }
   // TODO V2 à améliorer en employant routing angular
  back() {
    window.history.back();
  }


}
