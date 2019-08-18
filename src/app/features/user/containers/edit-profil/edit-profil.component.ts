import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastController } from '@ionic/angular';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

// import {} from '@types/googlemaps';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailControl } from '../../../../shared/utils/formValidators';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/service/http.service';
import { tap, map } from 'rxjs/operators';
const { Geolocation } = Plugins; // TOASK pourquoi un const dans les import?

// https://uploadcare.com/
// https://github.com/codedamn/social-media-app-ionic4/blob/master/src/app/edit-profile/edit-profile.page.ts
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})

// TOASK https://angular.io/api/forms/FormControlName#use-with-ngmodel
// this.form.get('first').setValue('some value'); et enlever le  [(ngModel)]="value" ?
export class EditProfilComponent implements OnInit {
  // private form: FormGroup;
  public form: FormGroup;
  email: FormControl = emailControl;
  // password: FormControl = new FormControl('');
  avatar: FormControl = new FormControl('');
  user$: Observable<any>;
  userId: string;
  public position: any;


// TOASK quand mettre les variables dans le constructeur ou en dehors? ici
  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _toast: ToastController,
    private _http: HttpService,

  ) {}

  getUser() {  // 5d3fff60dc91fe4729f39fb3   5d3fff60dc91fe4729f39fb3
    const userFromlocalStorage: any = this._http.getUser();
    this.userId = userFromlocalStorage._id;
    console.log('*****userFromlocalStorage._id', this.userId);

    this.user$ = this._http.get(`/user/edit/${this.userId}`).pipe(
      map((user: any) => {
         return user;
      })
    );
   }

  ngOnInit() {
     this.getUser();
     this.form = new FormGroup({
      firstname: new FormControl('',
        Validators.compose([
         // Validators.required,
          Validators.minLength(0),
          Validators.maxLength(100)
        ])
      ),
      lastname: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(100)
        ])
      ),
      pseudo: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(100)
        ])
      ),
      telephone: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(20)  // ^(0|0041|\+41)?[1-9\s][0-9\s]{1,12}$
        ])
      ),
      address: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(100)
      ])
      ),
      zip: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(4)
        ])
      ),
      state: new FormControl('',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(50)
        ])
      ),
        avatar: new FormControl(''
      )
    });
  }




 pictureSelected(image) {
   console.log('newPictureSelected', image.length);
   // this.user$.avatar = image;
 }

  // cancel() {
  //   this.viewCtrl.dismiss();
  // }

  async saveUser() { // TOASK un observable pour récupérer les données et une autre variable pour les stocker
    if (!this.form.valid) {
      return;
    }
    const user: any = {
      _id : this.userId,  // >TOASK comment fait on avec l'user id best practise?
      email: this.form.value.email,
      lastname: this.form.value.lastname,
      firsttname: this.form.value.firstname,
      pseudo: this.form.value.pseudo,
      telephone: this.form.value.telephone,
      adresse: this.form.value.adresse,
      zip: this.form.value.zip,
      state: this.form.value.state,
      homeLocation: {
        type: 'Point', coordinates: [this.form.value.coordinates]
      }
      
     // avatar: this.user.avatar,
    };
  
    // if (this.form.value.password) {
    //   user.password = this.form.value.password;
    // }
    // TODO modification password

 
    // if (!this.form.valid) {
    //   console.log('not valid');
    //   return;
    // }
    const {error = null, ...put} = await this._http.put({
      param: `/user/update/${this.userId}`,
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


async showToast(msg: string) { // TOASK en faire un composant??
  const toast = await this._toast.create({
    message: msg,
    closeButtonText: 'Fermer',
    showCloseButton: true,
    color: 'danger'
  });
  toast.present();
}

watchPosition() {
  console.log('watchPosition');
  const wait = Geolocation.watchPosition({}, (position, err) => {
    console.log(position.coords.latitude, err);
    this.position = {
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    };
  });
}

}









