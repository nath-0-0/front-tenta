import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { CameraComponent } from './components/camera/camera.component';
import { InputMessageComponent } from './components/input-message/input-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


const COMPONENTS = [
  HeaderComponent,
  CameraComponent,
  InputMessageComponent,
 // FooterMenuPage
  MapComponent
];
const MODULES = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  LeafletModule
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
