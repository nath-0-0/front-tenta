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

  @Input()
  public takePicture = false;

  // @Input()
  // public imageIn: string;

  public image: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
  ) { 
      // if (this.imageIn){
      //   this.image = 'data:image/jpg;base64,' +
      //   (this.sanitizer.bypassSecurityTrustResourceUrl(this.imageIn) as any).changingThisBreaksApplicationSecurity;
      // }
  }

  async takePhoto() {
    console.log('takePicture....');
    const { Camera } = Plugins;

    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    })
    .then(image => {
      const base64Image = 'data:image/jpeg;base64,' + image.base64String;
      this.pictureSelected.emit(image.base64String);
      this.image = 'data:image/jpg;base64,' +
        (this.sanitizer.bypassSecurityTrustResourceUrl(image.base64String) as any).changingThisBreaksApplicationSecurity;
    }, (err) => {
       this.displayToast(`Un problème est survenu lors de la récupération de l'image.`);
    });
  }

  async displayToast(txt) {
    const toast = await Toast.show({
      text: txt
    }).catch(err => err);
  }


  toJson(o: any) {
    return JSON.stringify(o, null, 2);
  }

}
