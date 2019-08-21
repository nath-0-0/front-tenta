import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/service/http.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// TODO TOASK meme form pour update et create?

@Component({
  selector: 'app-edit-item-page',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})

//TOASK comment recharger la page avec les modifs sur le bouton retour?
export class EditItemComponent implements OnInit {
 // pour dev user.id = 5d3fff60dc91fe4729f39fb3
 private user: any;
 public form: FormGroup;
 item$: Observable<any>;
 public idItem: string = null;
 
  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.user = this._http.getUser();
  }

  async ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('',
        Validators.compose([
         // Validators.required,
          Validators.minLength(2),
          Validators.maxLength(500)
        ])
      ),
      description: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(500)
        ])
      ),
      deposit: new FormControl('',
        Validators.compose([
          Validators.min(0),
          Validators.max(500)
        ])
      ),
        enabled: new FormControl(''),
        image: new FormControl('')
    });
    // assign value to forms
    const {id = null} = this._route.snapshot.params;
    this.getItem(id);
    if (!id) { this._router.navigateByUrl('user/items'); } // TODO insertion

    this.getItem(id);
    this.idItem = id;
    //  console.log('item--name ----------', this.item$.name);
    const i = this.item$.toPromise().then((it: any) => {
      this.form.get('name').setValue(it.name);
      this.form.get('description').setValue(it.description);
      this.form.get('deposit').setValue(it.deposit);
      this.form.get('enabled').setValue(it.enabled);
    });
  }

  getItem(id: string) { // TOASK un id bidon pour l'însértion??
   // création observable item
    this.item$ =  this._http.get(`/item/edit/${id}`).pipe(
      map((item: any) => {
        return  item;
      })
    );
  }



  async submit() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    console.log(this.form.value);
    const {error = null, ...put} = await this._http.put({
      param: `/item/${this.user._id}/${this.idItem}`, // param: `/user/${this.user._id}/addItem`,
      body: this.form.value
    }).pipe(
      tap(data => console.log('data-> ', data))
    ).toPromise().then((res: any) => res);
    if (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('Success :', this.form.value);
  }

}
