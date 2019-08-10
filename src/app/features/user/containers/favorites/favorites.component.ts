import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { Observable, of } from 'rxjs';
import { map, tap, find, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  items$: Observable<any>;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getFavorites();
    //console.log();
  }

  getFavorites() {  // 5d3fff60dc91fe4729f39fb3
    this.items$ = this.http.get('http://0.0.0.0:8080/api/v1/user/5d3fff60dc91fe4729f39fb3/listItem').pipe(
      map((user: any) => {
        return user.user.items;
      })
    );
    // TO post$ = (of)coucou   >> rend coucou observable
    //.pipe(map(i => i.items));
    //his.items$ = user$
    // //.pipe(map(i => return i));
    // this.items$ = user$;
    // console.log(this.items$);
  }

}/*

// pour l'affichage permet de savoir si on doit présenté l'objet checké
    find(key){
      return  this.database.ref('user/'+ this.user.uid).child('listObjPret').once('value').then( (snap) => {
        snap.forEach( (childSnap) => {
          if (childSnap.val().idObj === key){
            let ck =document.querySelector(this.root + ' ul li#'+key+' input');
            ck.checked = true;
          }
        });
      })
    }
*/