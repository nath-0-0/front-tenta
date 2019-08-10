import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ToastController } from '@ionic/angular';


// import { emailControl } from '@app/utils/formValidators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: FormControl ; // = emailControl;
  password: FormControl = new FormControl('');
  form: FormGroup;
 


  constructor(
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });
}

/*
doLogin() {
  this.authentication.login(this.form.value)
                     .subscribe(
                       jwt => {},
                       err => this.presentToast(err.error));
}

async presentToast(err) {
  const toast = await this.toastCtrl.create({
    message: err,
    duration: 2000
  });
  toast.present();
}
*/
}
