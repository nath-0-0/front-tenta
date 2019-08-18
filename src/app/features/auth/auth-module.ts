import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';


import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})


export class AuthModule { }
