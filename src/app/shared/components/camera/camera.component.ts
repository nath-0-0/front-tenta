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
  private takePicture:boolean = false;

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
      source: CameraSource.Prompt,
      resultType: CameraResultType.DataUrl
    })
    .then(image => {
      const base64Image = 'data:image/jpeg;base64,' + image;
      console.log(base64Image);
      const imageUrl = image.webPath;
      this.pictureSelected.emit(base64Image);
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    }, (err) => {
       this.displayToast(`Un problème est survenu lors de la récupération de l'image.`);
    });
  }

  async displayToast(txt) {
    const toast = await Toast.show({
      text: txt
    }).catch(err => err);
    console.log('toast:', toast);
  }


  toJson(o: any) {
    return JSON.stringify(o, null, 2);
  }

  //    <smart-image-picker (pictureSelected)="pictureSelected($event)"
  // [imageData]="profilePicture" [profilePictureMode]="true" [pictWidth]="256" [pictHeight]="256"></smart-image-picker>

}
