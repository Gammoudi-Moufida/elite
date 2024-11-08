import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerStateInterceptor } from '../app/app-interceptors/server-state.interceptor';
import { Location, PathLocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    }],
})

export class AppServerModule  implements DoBootstrap  {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent); // Or some other component
  }
}

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