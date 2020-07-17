import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'src/app/config/storage_keys.config';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: StorageService) {}

  ngOnInit() {
    this.refreshToken();
  }

  //Precisa de melhorias
  refreshToken() {
    let localUser = this.storage.getLocalUser();
    if(localUser != null) {
      this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['categorias']);
      },
      error => {});
    }
    else {
      console.log('Usuário precisa realizar login')
    }
  }

  login() {
    this.authService.autheticate(this.creds)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'))
        this.router.navigate(['categorias']);
      },
      error => {});
  }

  signup() {
    this.router.navigate(['signup']);
  }

}
