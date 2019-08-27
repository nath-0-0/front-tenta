import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchResultComponent } from './search-result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalPageComponent } from './modal-page/modal-page.component';


@NgModule({
  entryComponents: [
    ModalPageComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchResultComponent
      }
    ])
  ],
  declarations: [SearchResultComponent, ModalPageComponent],
  exports: [
    ModalPageComponent
  ]
})
export class SearchResultModule {}
