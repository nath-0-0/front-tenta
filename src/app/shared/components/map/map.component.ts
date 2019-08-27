import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', '../../../../../node_modules/leaflet/dist/leaflet.css'],
})
export class MapComponent implements OnInit {

  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13 ,
    center: latLng(46.1889416, 6.1266369)
  };
  public markers: Layer[] = [];


  constructor() { }

  ngOnInit() {}

  public onMapReady(map: Map): void {
    setTimeout(() => {
      map.invalidateSize();
    });
 }



//  addMarker() {
//   const newMarker = marker(
//     [ 46.2050836,6.109069],
//     {
//       icon: icon({
//         iconSize: [ 25, 41 ],
//         iconAnchor: [ 13, 41 ],
//         iconUrl:  'assets/images/leaflet/marker-icon.png'//'2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
//         //shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
//       })
//     }
//   );

//   this.markers.push(newMarker);
// }
}
