import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';

import CustomUrlSerializer from "./app/app.module";
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, BrowserTransferStateModule, HammerModule, bootstrapApplication } from '@angular/platform-browser';
import { UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { BrowserStateInterceptor } from './app/app-interceptors/browser-state.interceptor';
import { HttpErrorInterceptor } from './app/app-interceptors/http-error.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import 'hammerjs';
if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, NgbModule, BrowserTransferStateModule, HammerModule),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BrowserStateInterceptor,
            multi: true,
        },
        { provide: UrlSerializer, useClass: CustomUrlSerializer },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
});
