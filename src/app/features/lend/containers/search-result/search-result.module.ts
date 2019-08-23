import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchResultComponent } from './search-result.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchResultComponent
      }
    ])
  ],
  declarations: [SearchResultComponent]
})
export class SearchResultModule {}
