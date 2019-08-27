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
  private takePicture = false;

  public image: SafeResourceUrl;


  constructor(
    private sanitizer: DomSanitizer,
  ) { }

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
      // console.log(image);
      const base64Image = 'data:image/jpeg;base64,' + image.base64String;
      // console.log(base64Image);
      // onst imageUrl = image.webPath;
      this.pictureSelected.emit(image.base64String);
      //this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));

       //his.image = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
      this.image = 'data:image/jpg;base64,' +
        (this.sanitizer.bypassSecurityTrustResourceUrl(image.base64String) as any).changingThisBreaksApplicationSecurity;
        // console.log('this.image',this.image);
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

}
