import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { emailControl } from '../../../../shared/utils/formValidators';
import { Router } from '@angular/router';
import { AuthService} from '../../../../core/service/auth.service';
import { first } from 'rxjs/operators';
// import * as bcrypt from 'bcrypt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: FormControl = emailControl;
  password: FormControl = new FormControl('');
  form: FormGroup;


  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this._builder.group({
      email: this.email,
      password: this.password
    });
  }

  send() {
    //console.log('form valid->', this.form.valid);
    //console.log('from form->', this.email.value , this.password);
    //console.log('from props->', this.email , this.password);

    const user = {
      user: {email: this.email.value , password: this.password.value}  // ASK pourqupi le wrapper?
    };
    // localStorage.setItem('ng-auth', JSON.stringify(user));
    this.authService.login(user.user).subscribe();
    this._router.navigate(['home']);
  }

}

