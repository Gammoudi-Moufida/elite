import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {
  
  apiUrl: string;
  typeForApi: string;

  constructor(
    private http: HttpClient, 
    private config: ConfigService
    ) { 
    this.apiUrl = this.config.getSiteUrl() + 'api/v2/devis/'
    this.typeForApi = this.config.getType();
  }

  getPromoData(data:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'comparator/'+data + '/' + this.typeForApi);
  }
}
