import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../domain-model/user';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [User]
})
export class MapsComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  // user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(private router:Router, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private user: User) {
    let location = af.object('/F0:27:65:90:DC:87', { preserveSnapshot: false });
    // console.log(location);
     location.subscribe(snapshot => {
      console.log(snapshot)
      this.lat = snapshot.latitue;
      this.lng = snapshot.longitude;
      console.log(this);
      // env.pregunta = snapshot[0];
      // env.generarPreguntas();

    });

    // this.items = af.list('/00:0a:f5:89:89:80', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });

    // console.log(this.items);

    // this.user = this.afAuth.authState;
  }

  ngOnInit() {
  }

  logout() {
    this.user.setLoggedOut();
    this.router.navigate(['']);
  }


}
