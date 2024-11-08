import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeNextService {

  apiUrl: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = this.config.getSiteUrl() + 'api/home/'
  }

  getDatas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'referencement/'+this.config.getType());
  }
  
  getTagsHome(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'tags-home', {});
  }
  getSlider(typePage): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'slider/'+ typePage, {});
  }
  getBrandsDatas(typePage): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'brands/v2/' + typePage, {});
  }
  getInfoHomeVn(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'infos/vn', {});
  }
  getTextesSeo(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'recompense/'+this.config.getType(), {});
  }
  getConfiance(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'confiance/'+this.config.getType(), {});
  }
  getGammesOccasions(): Observable<any> {
    return this.http.get<any>(this.config.getSiteUrl() + 'api/offre-occasion/services');
  }
  getInfoLoyer(id, modelId): Observable<any> {
    return this.http.get(this.config.getSiteUrl() + 'api/marque/info-loyer/' + id + '/' + modelId,{})
  }
  getInfoHomeLeasing(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'infoHomeLeasing', {});
  } 
  getScriptForConnectedUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'getScriptForUser', {});
  } 
}
