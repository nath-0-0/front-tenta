import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { FavoritesComponent } from './containers/favorites/favorites.component';
import { LoginComponent } from './containers/login/login.component';
import { AddItemComponent } from './containers/add-item/add-item.component';
import { ItemsComponent } from './containers/items/items.component';
import { ItemsBorrowedComponent } from './containers/items-borrowed/items-borrowed.component';
import { ProfilComponent } from './containers/profil/profil.component';
import { ItemsLentComponent } from './containers/items-lent/items-lent.component';
import { EditProfilComponent } from './containers/edit-profil/edit-profil.component';


// import { UserItemPageComponent } from './containers/blog-item-page/blog-item-page.component';



import { SharedModule } from 'src/app/shared/shared.module';
// import { UserEditPageComponent } from './containers/user-edit-page/blog-edit-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    FavoritesComponent,
    AddItemComponent,
    ItemsComponent,
    ItemsBorrowedComponent,
    ProfilComponent,
    ItemsLentComponent,
    EditProfilComponent

  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
