import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../domain-model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetMacDeviceComponent } from '../set-mac-device/set-mac-device.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [User, SetMacDeviceComponent]
})
export class LoginComponent implements OnInit {

	email: string = '';
	password: string = '';

	constructor(private router:Router, private user:User, public afAuth: AngularFireAuth, private setMacDevice: SetMacDeviceComponent) { }

	ngOnInit() {
		if(this.user.isLoggedIn()) {
			this.router.navigate(['map']);
		}
	}

	loginUser() {
		this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((response) => {
			console.log(response);
			this.user.setUserLoggedIn();
			this.user.setUserId(response.uid);
			this.setMacDevice.verifyAssignedMacAddresToCurrentUser(() => {
				this.router.navigate(['map']);
			});
		});
	}
}
