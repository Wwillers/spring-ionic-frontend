import { ClienteService } from './services/domain/cliente.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { CategoriaService } from './services/domain/categoria.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { ProdutoService } from './services/domain/produto.service';
import { CartService } from './services/domain/cart.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
