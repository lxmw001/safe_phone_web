import { Component, OnInit } from '@angular/core';
import { User } from '../domain-model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [User]
})
export class HeaderComponent implements OnInit {

  userLogged : boolean = false;

  constructor(private router:Router, private user:User) { }

  ngOnInit() {
  }

  logout() {
    this.user.setLoggedOut();
    this.router.navigate(['']);
  }

  goSetMacAddress() {
    console.log("aadfds");
    this.router.navigate(['set-mac-address']);
  }

}
