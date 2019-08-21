import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { FavoritesComponent } from './containers/favorites/favorites.component';
import { SearchComponent } from './containers/search/search.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'login/:name/:distance',
        component: SearchResultComponent
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
export class LendRoutingModule { }

