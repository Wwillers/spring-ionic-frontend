import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
    private authService: AuthService) {}

  login() {
    this.authService.autheticate(this.creds)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'))
        this.router.navigate(['categorias']);
      },
      error => {});
  };

}
