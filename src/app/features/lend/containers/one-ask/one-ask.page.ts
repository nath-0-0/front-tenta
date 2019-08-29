import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

// TODO V2 : ajouter textarea qui s'affiche si refus cde prêt
// TODO V2 : il faut que dans les enregistrements que je ramène ici les lender_id et borrower_id
// donc dans le backend modifier la requete et faire ici des tests pour affichier une certaine façon, qu'on sopit emprunteur
// ou preteur
@Component({
  selector: 'app-one-ask',
  templateUrl: './one-ask.page.html',
  styleUrls: ['./one-ask.page.scss'],
})
export class OneAskPage implements OnInit {
  public form: FormGroup;
  public lend$: Observable<any>;
  public lend_id: string;
  public item_id: string;
  public myUser: any;
  public item$: Observable<any>;


  constructor(private _http: HttpService,
              private _router: Router,
              private _route: ActivatedRoute,
              public alertController: AlertController
) { }

  ngOnInit() {

    this.form = new FormGroup({
        answer: new FormControl(''),
    });
    this.getLend();
    const {item_id = null} = this._route.snapshot.params;
    if (item_id){
      this.getItem(item_id);
    }

    this.myUser = this._http.getUser();
  }

  // lendRouter.get('/:lend_id', authMiddleware, getLendHandler); // TODO add validate for item_id

  getLend() {
    const {lend_id = null} = this._route.snapshot.params;
    this.lend_id = lend_id;
    this.lend$ = this._http.get(`/lend/${this.lend_id}`).pipe(
      // this.items$ = this._http.get(`/user/${this.user._id}/listItem`).pipe(
        map((user: any) => {
          return user;
        })
      );
  }

  // TODO V2 avoir l'id de l'item pour afficher les infos e l'objet prêté
  getItem(item_id) {

    this.item$ =  this._http.get(`/item/edit/${item_id}`).pipe(
       map((item: any) => {
         return  item;
       })
     );
  }

  // lendRouter.post('/:lend_id/ask', authMiddleware, answerLendHandler);

  async accept(a: boolean) {
    const {lend_id = null} = this._route.snapshot.params;
    console.log(this.form.value);
    const {error = null, ...post} = await this._http.post({
      param: `/lend/ask/${lend_id}`,
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

  }

  async presentAlert() {
    const alert = await this.alertController.create({

      subHeader: 'Bravo',
      message: 'Votre réponse à été envoyée',
      buttons: ['OK']
    });

    await alert.present();
  }


  async personneAlert(user: any) {
    console.log(user[0]);
    const alert = await this.alertController.create({

      subHeader: 'votre gentil voisin',
      message: `${user[0].email}<br />${user[0].tel}<br />${user[0].firstname} ${user[0].lastname}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  

   // TODO V2 à améliorer en employant routing angular
  back() {
    window.history.back();
  }


}
