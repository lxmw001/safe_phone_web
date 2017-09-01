import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

export const firebaseConfig = {
   apiKey: "AIzaSyBtFkGSyXTPl5I6oyF9YDm3njtvBrLatvg",
    authDomain: "safephone-d7a3d.firebaseapp.com",
    databaseURL: "https://safephone-d7a3d.firebaseio.com",
    projectId: "safephone-d7a3d",
    storageBucket: "safephone-d7a3d.appspot.com",
    messagingSenderId: "510160656177"
};

const appRoutes: Routes = [
  { path: 'map', component: MapsComponent },
  { path: '', component: LoginComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // }
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    LoginComponent,  
    FooterComponent, HeaderComponent, NotfoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGrD-ogbYlI3vfUdpFSLSHYfuefF7NetE'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
