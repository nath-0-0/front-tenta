import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilComponent } from 'src/app/features/user/containers/profil/profil.component';
import { SearchComponent } from 'src/app/features/lend/containers/search/search.component';

import { ItemsComponent } from 'src/app/features/user/containers/items/items.component';
import { ItemsLentComponent } from 'src/app/features/user/containers/items-lent/items-lent.component';
import { EditProfilComponent } from 'src/app/features/user/containers/edit-profil/edit-profil.component';
import { FavoritesComponent } from 'src/app/features/user/containers/favorites/favorites.component';
import { FooterMenuPage } from './footer-menu.page';

// coucou
const routes: Routes = [
  {
    path: 'tabs',
    component: FooterMenuPage,
    children:[
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('src/app/features/user/user-routing.module').then(m => m.UserRoutingModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('src/app/features/user/user-routing.module').then(m => m.UserRoutingModule)
          }
        ]
      },
  ]
      },
      {
        path: '',
        redirectTo: 'src/app/home/home',
        pathMatch: 'full'
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class FooterMenuRoutingModule { }


