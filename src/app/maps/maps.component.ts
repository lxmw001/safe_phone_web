import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/00:0a:f5:89:89:80', {
      query: {
        limitToLast: 50
      }
    });

    console.log(this.items);

    this.user = this.afAuth.authState;
  }

  ngOnInit() {
  }

  // loadLocation() {
  //   let env = this;
  //   let refPreguntas = this.angularFire.database.object('/preguntas', { preserveSnapshot: false });
  //   refPreguntas.subscribe(snapshot => {
  //     env.savePreguntas(snapshot);
  //     // env.pregunta = snapshot[0];
  //     // env.generarPreguntas();

  //   });
  // }


}
