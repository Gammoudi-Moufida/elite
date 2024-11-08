import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState,
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const stateKey = 'api' + req.urlWithParams.split('api')[1];    
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    const storedResponse: string = this.transferState.get(makeStateKey(stateKey), null);
    if (storedResponse && stateKey!='api/search/') {
      const response = new HttpResponse({ body: storedResponse, status: 200 });
      return of(response);
    }
    return next.handle(req);
  }
}