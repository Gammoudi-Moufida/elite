import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

    apiUrl: string;

  constructor(
      private http: HttpClient,
      private config: ConfigService
  ) {
      this.apiUrl = this.config.getSiteUrl() + 'api'
  }

  getBrands(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/marque/liste-marques/'+this.config.getType(), {});
  }
}
