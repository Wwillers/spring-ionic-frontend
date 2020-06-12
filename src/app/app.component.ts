import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any = [
    {
      title: "Categorias",
      url: "/categorias",
      icon: "gift-outline"
    },
    {
      title: "Perfil",
      url: "/profile",
      icon: "person-outline"
    },
    {
      title: "Logout",
      url: "/logout",
      icon: "log-out-outline"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router,
  ) {
    this.sideMenu();
    this.logoutUser();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu() {
    return this.navigate;
  }

  logoutUser() {
    this.router.events.subscribe((val: any) => {
      if (val.url === '/logout') {
        this.auth.logout();
        console.log('Fez logout');
      }
    });
  }

}
