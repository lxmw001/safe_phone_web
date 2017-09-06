import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

	email: string = '';
	password: string = '';
	cPassword: string = '';

	constructor(public afAuth: AngularFireAuth) { }

	ngOnInit() {
	}
	  
	registerUser() {
		console.log(this.email, this.password);
		if(this.password !== this.cPassword) return;

		this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((response) => {
			console.log(response.uid);
		});

		// auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		//   // Handle Errors here.
		//   var errorCode = error.code;
		//   var errorMessage = error.message;
		//   // ...
		// });

	}

}
