import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { FooterMenuRoutingModule } from './footer-menu-routing.module';
import { FooterMenuPage } from './footer-menu.page';


@NgModule({
  declarations: [FooterMenuPage],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    FormsModule,
    FooterMenuRoutingModule
]
})
export class FooterMenuModule { }

