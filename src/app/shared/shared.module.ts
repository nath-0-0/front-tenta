import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
//import { FooterMenuPage } from './components/footer-menu/footer-menu.page';
import { CameraComponent } from './components/camera/camera.component';
import { InputMessageComponent } from './components/input-message/input-message.component';
// import { NgxErrorsModule } from '@ultimate/ngxerrors';  TOASK

const COMPONENTS = [
  HeaderComponent,
  CameraComponent,
  InputMessageComponent,
 // FooterMenuPage
];
const MODULES = [
  CommonModule,
  IonicModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ]
})
export class SharedModule { }
