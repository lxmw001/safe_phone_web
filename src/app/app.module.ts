import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';

import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SetMacDeviceComponent } from './set-mac-device/set-mac-device.component';
import { User } from './domain-model/user';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule} from '@angular/material';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';


export const firebaseConfig = {
   apiKey: "AIzaSyBtFkGSyXTPl5I6oyF9YDm3njtvBrLatvg",
    authDomain: "safephone-d7a3d.firebaseapp.com",
    databaseURL: "https://safephone-d7a3d.firebaseio.com",
    projectId: "safephone-d7a3d",
    storageBucket: "safephone-d7a3d.appspot.com",
    messagingSenderId: "510160656177"
};

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'map', component: MapsComponent },
  { path: 'set-mac-address', component: SetMacDeviceComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    LoginComponent,
    FooterComponent, HeaderComponent, NotfoundComponent, SingUpComponent, SetMacDeviceComponent, User
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGrD-ogbYlI3vfUdpFSLSHYfuefF7NetE'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    AsyncLocalStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
