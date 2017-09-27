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
  days: any = [];
  daysRoutes:any = [];
  currentRoute: any = [];
  selectedOption: string = '0';
  selectedDay: string;
  firstLoad: boolean = true;

  suscriptionLocation: any;

  msgVal: string = '';

  reportedAsLost: boolean  = false;

  macAddress: string;

  constructor(private router:Router, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private user: User) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.user.getMacAddresDevice().subscribe((data) => {
        if(data) {
          this.macAddress = data.toString();
          this.alreadyMacAddressAssociate = true;
          if(this.suscriptionLocation) this.suscriptionLocation.unsubscribe();

          let location = this.af.object('/deviceData/' + this.macAddress, { preserveSnapshot: false });
          this.suscriptionLocation = location.subscribe(snapshot => {
            this.reportedAsLost = snapshot.manageActions.reportedAsLost;
            if(this.selectedOption == '0') {
              this.loadLastLocation(snapshot);
              this.firstLoad = true;
            } else if (this.selectedOption == '1' && this.firstLoad)  {
              this.loadSelectedDay(snapshot.navigation);
              this.firstLoad = false;
            }
          });
        }
      }
    );
  }

  loadLastLocation(snapshot: any) {
      this.latitude = snapshot.location.latitude;
      this.longitude = snapshot.location.longitude;
      this.title = snapshot.location.date;
  }

  loadSelectedDay(navigation: any) {
    this.daysRoutes = navigation;
    this.days = Object.keys(navigation);
    this.selectedDay = this.days.length > 0 ? this.days[0] : '';
    this.loadDailyRoute();
  }

  loadDailyRoute() {
    let routes = this.daysRoutes[this.selectedDay];
    this.currentRoute = [];
    let i = 1
    for(let route in routes) {
      routes[route].num = i.toString();
      this.currentRoute.push(routes[route]);
      i++;
    }
  }

  reportLostPhone() {
    let reportAsLostRef = this.af.object('/deviceData/' + this.macAddress + '/manageActions');
    // show spinner loading action
    reportAsLostRef.update({reportedAsLost: this.reportedAsLost}).then(
      () => {
        // hide spinner
      });
  }

  ringPhone() {
    this.updateRingPhoneValue(true).then(() => {
      setTimeout(() => {
        this.updateRingPhoneValue(false);
      }, 5000);
    });
  }

  updateRingPhoneValue(toRing: boolean) {
    let reportAsLostRef = this.af.object('/deviceData/' + this.macAddress + '/manageActions');
    // show spinner loading action
    return reportAsLostRef.update({toRing: toRing});
  }
}

