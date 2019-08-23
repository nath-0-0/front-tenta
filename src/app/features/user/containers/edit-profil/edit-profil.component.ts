// TODO  https://stackoverflow.com/questions/52771445/best-way-to-show-error-messages-for-angular-reactive-forms-one-formcontrol-mult
// https://uploadcare.com/
// https://github.com/codedamn/social-media-app-ionic4/blob/master/src/app/edit-profile/edit-profile.page.ts
// TODO https://ionicframework.com/docs/v3/developer-resources/forms/
// TOASK https://angular.io/api/forms/FormControlName#use-with-ngmodel
// this.form.get('first').setValue('some value'); et enlever le  [(ngModel)]="value" ?


import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit {
  public form: FormGroup;
  email: FormControl = emailControl;
  // password: FormControl = new FormControl('');
  avatar: FormControl = new FormControl('');
  user$: Observable<any>;
  userId: string;
  public position;


// TOASK quand mettre les variables dans le constructeur ou en dehors? ici
  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _toast: ToastController,
    private _http: HttpService,
  ) {}

  getUser() {  
    // get user id
    const userFromlocalStorage: any = this._http.getUser();
    this.userId = userFromlocalStorage._id;
    // récupoération position gps user
    this.position = {
      coords: {
        latitude: userFromlocalStorage.homeLocation.coordinates[0],
        longitude: userFromlocalStorage.homeLocation.coordinates[1]
      }
    };
    // création observable user
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
          Validators.required,
          Validators.minLength(4),
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
      ),
      coordinates: new FormControl(''
          // Validators.required,
      )
    });
  }

  pictureSelected(image) {
    console.log('newPictureSelected', image.length);
    this.avatar = image;
    console.log(this.avatar);
  }
 
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
      avatar: this.avatar,
      homeLocation: {
        type: 'Point', coordinates: [this.position.coords.latitude, this.position.coords.longitude]
      }
     // avatar: this.user.avatar,
    };
    console.log('user.homeLocation', user.homeLocation);


    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    const {error = null, ...put} = await this._http.put({
      param: `/user/update/${this.userId}`,
      body: user,   // this.form.value // TOASK et le body
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
    color: 'Success'
  });
  toast.present();
}

async getCurrentPosition() {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Current', coordinates);
  this.position = {
    coords: {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    }
  };
  this.showToast(`Position définie`);
  }


  watchPosition() {

    console.log('watchPosition');
    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log(position.coords.latitude, position.coords.longitude);
      this.position = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };
    });
  }
  
}
