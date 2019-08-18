import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { CameraComponent } from './components/camera/camera.component';
//import { NgxErrorsModule } from '@ultimate/ngxerrors';  TOASK

const COMPONENTS = [
  HeaderComponent,
  CameraComponent,
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
