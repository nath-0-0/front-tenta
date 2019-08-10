import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { FavoritesComponent } from './containers/favorites/favorites.component';
import { LoginComponent } from './containers/login/login.component';

// import { UserItemPageComponent } from './containers/blog-item-page/blog-item-page.component';



import { SharedModule } from 'src/app/shared/shared.module';
// import { UserEditPageComponent } from './containers/user-edit-page/blog-edit-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FavoritesComponent,
    LoginComponent,
    // UserItemPageComponent,
    // UserEditPageComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
