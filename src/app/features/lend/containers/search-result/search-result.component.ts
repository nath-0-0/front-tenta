import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from './modal-page/modal-page.component';

// https://github.com/Leaflet/Leaflet.markercluster
// https://github.com/Asymmetrik/ngx-leaflet-markercluster
// https://github.com/Asymmetrik/ngx-leaflet
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  items$: Observable<any>;
  private user: any;
  public markers: Layer[] = [];
  public location = {
    coordinates: {
        latLng: {
          lat: 0,
          lng: 0,
        },
    },
  };
  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 11 ,
    center: latLng(46.1889416, 6.1266369)
  };

    constructor(
      private _http: HttpService,
      private _router: Router,
      public  modalController: ModalController,
      private _route: ActivatedRoute) {
    }


  async ngOnInit() {
    this.user = this._http.getUser();
    this.getItems();
    // position du users
    this.location = {
      coordinates: {
          latLng: {
            lat: this.user.homeLocation.coordinates[0],
            lng: this.user.homeLocation.coordinates[1],
          },
      },
    };
  }

// itemRouter.get('/search/:q/:d/:lat/:long', searchItemHandler); // mot / distance/ latitude / longitude
  async getItems() {
     // récupération données
      const {name = null, distance= null} = this._route.snapshot.params;
      // name est équivalent à la chaine de caractère recherchée
      this.items$ = this._http.get
        (`/item/search/${name}/${distance}/${this.user.homeLocation.coordinates[0]}/${this.user.homeLocation.coordinates[1]}`)
      .pipe(
      map((snap: any) => {
        snap.forEach( (childSnap) => {
          this.addMarker(childSnap, name);
        });
        return snap;
      })
    );
  }

  // map: Map;
  ionViewDidEnter() {
  }
  // TODO V2 demander au user si il veut la recherche et la carte ou il se trouve ou chez lui
  addMarker(childSnap, name) {

    const newMarker = marker(
      [ childSnap.homeLocation.coordinates[0],
        childSnap.homeLocation.coordinates[1],
      ],
      {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl:  'assets/images/leaflet/marker-icon.png'
        })
      }
    );
    // newMarker.bindPopup(txt).openPopup();
    newMarker.on('click',  (a) => {
      this.presentModal(childSnap, name);
    });
    this.markers.push(newMarker);
  }

  async presentModal(childSnap, name) {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        user: childSnap,
        txt : name
      }
    });
    return await modal.present();
  }

  leafletMap() {

    // this.map = new Map('mapId', {  } ).setView([this.user.homeLocation.coordinates[0], this.user.homeLocation.coordinates[1]], 13);

    // tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    //   attribution: 'edupala.com'
    // }).addTo(this.map);
    // const markPoint = marker([this.user.homeLocation.coordinates[0], this.user.homeLocation.coordinates[1]]);
    // markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
    // this.map.addLayer(markPoint);
  }

  onMapReady(_map: Map): void {
    setTimeout(() => {
      _map.invalidateSize();
    });
  }

  displayItem(e) {
    console.log(e);
  }

   // TODO V2 à améliorer en employant routing angular
   back() {
    window.history.back();
  }

  }
