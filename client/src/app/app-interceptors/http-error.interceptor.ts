import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if ( error instanceof HttpErrorResponse && (error.status == 500 || error.status == 404) && !(request.url.includes('v2/devis/') && !request.url.includes('v2/devis/redirection'))) {
             this.router.navigateByUrl('/not-found', {skipLocationChange: true});
          }
          return throwError(error);
        })
      )
  }
}