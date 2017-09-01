import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../domain-model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [User]
})
export class LoginComponent implements OnInit {

	constructor(private router:Router, private user:User) { }

	ngOnInit() {
		if(this.user.isLoggedIn()) {
			this.router.navigate(['map']);
		}
	}

	loginUser(e) {
		e.preventDefault();
		var username = e.target.elements[0].value;
		var password = e.target.elements[1].value;
		
		if(username === 'admin' && password === 'admin') {
	  		this.user.setUserLoggedIn();
			this.router.navigate(['map']);
		}
	}

}
