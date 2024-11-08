import { PathLocationStrategy, registerLocaleData, Location } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, HammerModule } from '@angular/platform-browser';
registerLocaleData(localeFr);
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserStateInterceptor } from './app-interceptors/browser-state.interceptor';
import { HttpErrorInterceptor } from './app-interceptors/http-error.interceptor';
import { AppRoutingModule } from './app-routing.module';


export default class CustomUrlSerializer implements UrlSerializer {
  private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
     // Encode parentheses
     url = url.replace(/\(/g, '%28').replace(/\)/g, '%29');
     // Use the default serializer.
     return this._defaultUrlSerializer.parse(url)
  }

  serialize(tree: UrlTree): string {
     return this._defaultUrlSerializer.serialize(tree).replace(/%28/g, '(').replace(/%29/g, ')');
  }
}

@NgModule({

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserTransferStateModule,
    HammerModule
  ],
  providers: [
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
  ],
})

export class AppModule { }

const _orig_prepareExternalUrl = PathLocationStrategy.prototype.prepareExternalUrl;

PathLocationStrategy.prototype.prepareExternalUrl = function (internal) {
  const url = _orig_prepareExternalUrl.call(this, internal);
  return url;

};

Location.stripTrailingSlash = function (url) {
  const /** @type {?} */ match = url.match(/#|\?|$/);
  const /** @type {?} */ pathEndIdx = match && match.index || url.length;
  const /** @type {?} */ droppedSlashIdx = pathEndIdx - (url[pathEndIdx - 1] === '/' ? 1 : 0);
  const first = url.slice(0, droppedSlashIdx);
  const last = url.slice(pathEndIdx);

  if (url.includes('leasing-')) {
    const splitter = url.split('leasing-')[1].split('/')[1]
    if (!splitter || splitter == "") {
      return first + '/' + last;
    }
  }
  return first + last;

};

