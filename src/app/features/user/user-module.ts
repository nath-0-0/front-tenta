import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { FavoritesComponent } from './containers/favorites/favorites.component';
import { EditItemComponent } from './containers/edit-item/edit-item.component';
import { ItemsComponent } from './containers/items/items.component';
import { ItemsBorrowedComponent } from './containers/items-borrowed/items-borrowed.component';
import { ProfilComponent } from './containers/profil/profil.component';
import { ItemsLentComponent } from './containers/items-lent/items-lent.component';
import { EditProfilComponent } from './containers/edit-profil/edit-profil.component';


import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FavoritesComponent,
    EditItemComponent,
    ItemsComponent,
    ItemsBorrowedComponent,
    ProfilComponent,
    ItemsLentComponent,
    EditProfilComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
