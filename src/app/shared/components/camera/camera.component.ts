import { Component,HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Toast } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {

  public image: SafeResourceUrl;

 

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  async takePicture() {
    console.log('takePicture....');
    const { Camera } = Plugins;
    console.log('takePicture....');
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log('takePicture....');
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async displayToast() {
    const toast = await Toast.show({
      text: 'Well done '
    }).catch(err => err);
    console.log('toast:', toast);
  }


  toJson(o: any) {
    return JSON.stringify(o, null, 2);
  }

}
