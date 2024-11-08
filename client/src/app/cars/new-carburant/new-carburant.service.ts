import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class NewCarburantService {
  apiUrl: string;

  constructor(private http: HttpClient, private config:ConfigService) { 
    this.apiUrl = this.config.getSiteUrl() + 'api/model/';
  }

  getMeta(fuel, mark, typeCar, typePage): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'referencement-new-carburant/'+ fuel + '/' + mark +'/'+ typeCar + '/' + typePage) );
  }
  
  getMetaOccasion(fuel, mark, typeCar, typePage): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'referencement-new-carburant/'+ fuel + '/' + mark +'/'+ typeCar +'/'+ typePage + '/occasion'));
  }

  getModelsLinks(segment): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'automobile-models/'+ segment);
  }
}
