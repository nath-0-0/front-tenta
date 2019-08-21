import { Component, Output , Input, EventEmitter} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {

  @Output()
  public pictureSelected: EventEmitter<string> = new EventEmitter<string>();

  public image: SafeResourceUrl;



  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  async takePhoto() {
    console.log('tackPicture....');
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  async takePicture() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      height: 20
    }).then((data) => {
      // data = 'data:image/jpg;base64,' + data;
      this.pictureSelected.emit('data:image/jpg;base64,' + data);
      // if (this.profilePictureMode) {
      //   this.imageData = data;
      // }
    }, (err) => {
      // this.showToast(`Un problème est survenu lors de la récupération de l'image.`);
    });

   // this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
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

  //    <smart-image-picker (pictureSelected)="pictureSelected($event)"
  // [imageData]="profilePicture" [profilePictureMode]="true" [pictWidth]="256" [pictHeight]="256"></smart-image-picker>

}
