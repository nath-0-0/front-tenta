import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AskToLendComponent } from './ask-to-lend.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AskToLendComponent
      }
    ])
  ],
  declarations: [AskToLendComponent,],

})

export class AskToLendModule { }
