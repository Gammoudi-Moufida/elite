import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../shared/config/config.service';


@Injectable({
  providedIn: 'root'
})
export class CarburantService {
  apiUrl: string;
  elasticUrl: string;

  constructor(private http: HttpClient, private config:ConfigService) { 
    this.apiUrl = this.config.getSiteUrl() + 'api/model/';
    this.elasticUrl = this.config.getElasticUrl();
  }
 

  getVoitureNeuve(eurotaxId,eurotaxModelId,fuel): Observable<any>  {
    return this.http.get<any>(encodeURI(this.apiUrl + 'voitureneuve-tarif/' + eurotaxId +'/'+ eurotaxModelId+'/'+ fuel));
  }

  getDatas(data:any): Observable<any> {
    return this.http.post(this.elasticUrl + 'api/search/',JSON.stringify(data))
  }
  getMetas(eurotaxModelId,fuel): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'referencement-tarif/'+ eurotaxModelId + '/' + fuel));
  }
  getTagSchema(eurotaxId, eurotaxModelId, type, totalOffre): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'tag-schema/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/' + totalOffre));
  }
  getRedirectConfig(eurotaxMarkId:number, eurotaxModelId:number, markSlug: string, modelSlug:string): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'redirection/'+ eurotaxMarkId + '/' + eurotaxModelId + '/' + markSlug + '/' + modelSlug));
  }
  getTagGoogle(marqueEurotaxId,eurotaxId,type): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'tag-google/'+ marqueEurotaxId + '/'+ eurotaxId + '/' + type));
  }
}

