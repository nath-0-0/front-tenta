import { NgModule } from '@angular/core';

import { TentaRoutingModule } from './tenta-routing.module';
import { FavoritesComponent } from './containers/favorites/favorites.component';
// import { TentaItemPageComponent } from './containers/blog-item-page/blog-item-page.component';

// import { SharedModule } from 'src/app/shared/shared.module';
// import { TentaEditPageComponent } from './containers/tenta-edit-page/blog-edit-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FavoritesComponent,
    // TentaItemPageComponent,
    // TentaEditPageComponent
  ],
  imports: [
  //  SharedModule,
    TentaRoutingModule,
    ReactiveFormsModule
  ]
})
export class TentaModule { }
