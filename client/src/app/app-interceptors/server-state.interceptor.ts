import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import * as memoryCache from 'memory-cache';


@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState, 
    private ngZone: NgZone) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const stateKey = 'api'+req.urlWithParams.split('api')[1];
    const cachedData = memoryCache.get(stateKey);
    if(req.urlWithParams.includes('https://2IADKFQCGN-dsn.algolia.net')){
      return next.handle(req)
    }else if (cachedData && stateKey!='api/search/'){
      this.transferState.set(makeStateKey(stateKey), cachedData);
        return of(new HttpResponse({ body: cachedData, status: 200 }));
    }else{
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.transferState.set(makeStateKey(stateKey), event.body);
            this.ngZone.runOutsideAngular(() => {
              memoryCache.put(stateKey, event.body, 1000 * 60 * 60);
            })
          }
        })
      );
    }
  }
}
