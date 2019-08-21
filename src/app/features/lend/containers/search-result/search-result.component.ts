import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { tap, find, switchMap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

    constructor(
      private _http: HttpService,
      private _router: Router,
      private _route: ActivatedRoute) {
    }

    items$: Observable<any>;
    private user: any;

    public location = {
      coordinates: {
          latLng: {
            lat: 51.19506875061893,
            lng: 4.381795173474985,
          },
      },
  };

    

    ngOnInit() {
      this.user = this._http.getUser();
      this.getItems();
      }
// itemRouter.get('/search/:q/:d/:lat/:long', searchItemHandler); // mot / distance/ latitude / longitude
      getItems() {
        const {name = null, distance= null} = this._route.snapshot.params;
        this.items$ = this._http.get
        (`/item/search/${name}/${distance}/${this.user.homeLocation.coordinates[0]}/${this.user.homeLocation.coordinates[1]}`)
        .pipe(
        map((user: any) => {
          return user;
        })
      );
    }

    map: Map;
    ionViewDidEnter() {
      this.leafletMap();
    }
    // TODO V2 demander au user si il veut la recherche et la carte ou il se trouve ou chez lui
    // TOASK icones non trouvé marker-icon-2x.png:1 GET http://localhost:8100/marker-icon-2x.png 404 (Not Found)
    leafletMap() {
      this.map = new Map('mapId').setView([this.user.homeLocation.coordinates[0], this.user.homeLocation.coordinates[1]], 13);
  
      tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: 'edupala.com'
      }).addTo(this.map);
  
      const markPoint = marker([12.972442, 77.594563]);
      markPoint.bindPopup('<p>Tashi Delek - Bangalore.</p>');
      this.map.addLayer(markPoint);
    }
  
    ionViewWillLeave() {
      this.map.remo;
    } 

  }
