import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/service/http.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-ad-item-page',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
 // pour dev user.id = 5d3fff60dc91fe4729f39fb3
 private user_id = "5d3fff60dc91fe4729f39fb3";
 public form: FormGroup;
 
  constructor(
    private _http: HttpService
  ) { }

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
      console.log(this.form);
      return;
    }
    const {error = null, ...post} = await this._http.post({
      param: `/user/${this.user_id}/addItem`,
      body: this.form.value
    }).pipe(
      tap(data => console.log('data-> ', data))
    ).toPromise().then((res: any) => res);
    if (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('Success :', post);
  }

 
}
