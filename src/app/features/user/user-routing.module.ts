import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './containers/favorites/favorites.component';
import { LoginComponent } from './containers/login/login.component';

//import { BlogItemPageComponent } from './containers/blog-item-page/blog-item-page.component';
//import { BlogEditPageComponent } from './containers/blog-edit-page/blog-edit-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: 'login',
        component: LoginComponent
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


