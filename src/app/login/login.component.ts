import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../domain-model/user';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [User]
})
export class LoginComponent implements OnInit {

	email: string = '';
	password: string = '';

	constructor(private router:Router, private user:User, public afAuth: AngularFireAuth) { }

	ngOnInit() {
		if(this.user.isLoggedIn()) {
			this.router.navigate(['map']);
		}
	}

	loginUser() {

		this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((response) => {
			console.log(response);
			this.user.setUserLoggedIn();
			this.router.navigate(['map']);
		});
		
	}

}
