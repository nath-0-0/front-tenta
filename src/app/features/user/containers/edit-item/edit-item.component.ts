import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/service/http.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-edit-item-page',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
 // pour dev user.id = 5d3fff60dc91fe4729f39fb3
 user: any;
 public form: FormGroup;
 
  constructor(
    private _http: HttpService
  ) { 
    this.user = this._http.getUser();
  }

  ngOnInit() {
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
        image: new FormControl(''
      )
    });
  }

  async submit() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    const {error = null, ...post} = await this._http.post({
      param: `/user/${this.user._id}/addItem`,
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
