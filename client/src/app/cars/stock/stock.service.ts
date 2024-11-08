import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = this.config.getSiteUrl() + 'api/marque'
  }

  getMarkStock(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/marque-stock');
  }

  getVoitureStock(marque): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/voiture-en-stock-marque/' + marque);
  }
    
}
