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

// TOASK comment recharger la page avec les modifs sur le bouton retour?
export class EditItemComponent implements OnInit {
 private user: any;
 public form: FormGroup;
 item$: Observable<any>;
 public idItem: string = null;
 private _mode: string; // insert or update

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

    const {id = null} = this._route.snapshot.params;
    if (!id) {
      // this.item$ = new Observable();
      // console.log(this.item$);
      this.form.get('enabled').setValue(true);
      this._mode = 'insert';
    } else {
      this.getItem(id); // TODO sortir une erreur     //   this._router.navigateByUrl('x/fm/items');
      this.idItem = id;
      const i = this.item$.toPromise().then((it: any) => {
        this.form.get('name').setValue(it.name);
        this.form.get('description').setValue(it.description);
        this.form.get('deposit').setValue(it.deposit);
        this.form.get('enabled').setValue(it.enabled);
      });
      this._mode = 'update';
    }
  }

  getItem(id: string) {
   // création observable item
    this.item$ =  this._http.get(`/item/edit/${id}`).pipe(
      map((item: any) => {
        return  item;
      })
    );
  }

  async update() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    console.log(this.form.value);
    //if (this.form.value.enabled === '') {this.form.value.enabled = true;}
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

  async addItem() {
    console.log('coucou');
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    console.log(this.form.value);
    const {error = null, ...post} = await this._http.post({
      param: `/user/${this.user._id}/addItem`, // userRouter.post('/:user_id/addItem', addItemHandler);
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
