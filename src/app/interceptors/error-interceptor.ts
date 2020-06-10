import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService, private alertController: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        console.log('Event: ', event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {

                    let errorObj = error;

                    if (errorObj.error) {
                        errorObj = errorObj.error;
                    }
                    if (!errorObj.status) {
                        errorObj = JSON.parse(errorObj.toString())
                    }

                    console.log("Erro detectado pelo interceptor:");
                    console.log(errorObj);
                    console.log(errorObj.status);

                    switch (errorObj.status) {
                        case 401:
                            this.handle401();
                            break;

                        case 403:
                            this.handle403();
                            break;

                        default:
                            this.handleDefaultError(errorObj);
                    }

                    return throwError(errorObj);
                })) as any;
    }

    async handle401() {
        const alert = await this.alertController.create({
            header: 'Erro 401: Falha de autenticação',
            message: 'Email ou senha incorretos',
            backdropDismiss: false,
            buttons: ['Ok']
        });
        await alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

   async handleDefaultError(errorObj) {
        const alert = await this.alertController.create({
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: ['Ok']
        });
        await alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};