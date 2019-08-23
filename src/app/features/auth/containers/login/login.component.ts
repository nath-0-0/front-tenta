import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailControl } from '../../../../shared/utils/formValidators';
import { Router } from '@angular/router';
import { AuthService} from '../../../../core/service/auth.service';
import { HttpService } from 'src/app/core/service/http.service';


import { ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: FormControl = emailControl;
  password: FormControl = new FormControl('',
  Validators.compose([
    Validators.required,
  ])
);
  form: FormGroup;



  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _toast: ToastController,
    private _http: HttpService
  ) { }

  ngOnInit() {
    this.form = this._builder.group({
      email: this.email,
      password: this.password
    });
  }

  async send(btn) {
    // const user = {
    //   user: {email: this.email.value , password: this.password.value}
    // };
    let auth;

    if (btn === 'login') {
      console.log('login');
      auth = await this._authService.login({email: this.email.value , password: this.password.value}).
        toPromise().then(res => res).catch(err => err);

    } else {
      console.log('register');
      auth = await this._authService.register({email: this.email.value , password: this.password.value}).
        toPromise().then(res => res).catch(err => err);
    }

    if (auth === true) {
            const user:any = this._http.getUser(); // TODO faire mieux
            if (user.homeLocation.coordinates.lenght === 0 || !user.pseudo) {
              this._router.navigate(['x/fm/home']);
            } else {
              this._router.navigate(['x/fm/search']);
            }
      } else {
              this.showToast('Utilisateur déjà existant ou mdp/login erronné');
              // console.log(auth.error);
    }

  }

  async showToast(msg: string) {
    const toast = await this._toast.create({
      message: msg,
      closeButtonText: 'Fermer',
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  }

}

