import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemComponent } from './containers/add-item/add-item.component';
import { ItemsComponent } from './containers/items/items.component';
import { ItemsBorrowedComponent } from './containers/items-borrowed/items-borrowed.component';
import { ProfilComponent } from './containers/profil/profil.component';
import { ItemsLentComponent } from './containers/items-lent/items-lent.component';
import { EditProfilComponent } from './containers/edit-profil/edit-profil.component';
import { FavoritesComponent } from './containers/favorites/favorites.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addItem',
        component: AddItemComponent
      },
      {
        path: 'items',
        component: ItemsComponent
      },
      {
        path: 'itemsBorrowed',
        component: ItemsBorrowedComponent
      },
      {
        path: 'itemsLent',
        component: ItemsLentComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
      {
        path: 'editProfil',
        component: EditProfilComponent
      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      // {
      //   path: ':id',
      //   component: BlogItemPageComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


