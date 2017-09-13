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

  title: string = '';
  latitude: number = 0;
  longitude: number = 0;
  date: Date = null;
  alreadyMacAddressAssociate: boolean = true;

  msgVal: string = '';

  constructor(private router:Router, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private user: User) {   
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    let macAddress = this.user.getMacAddresDevice();
    if(!macAddress) return;
    console.log(macAddress);
    this.alreadyMacAddressAssociate = true;
    let location = this.af.object('/deviceData/' + macAddress, { preserveSnapshot: false });
    location.subscribe(snapshot => {
      this.latitude = snapshot.latitue;
      this.longitude = snapshot.longitude;
      this.title = snapshot.date;
    });
  }

}
