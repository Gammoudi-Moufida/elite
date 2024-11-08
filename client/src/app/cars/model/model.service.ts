import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  apiUrl:string;
  constructor(private http: HttpClient, private config:ConfigService) {
    this.apiUrl = this.config.getSiteUrl() + 'api/model/';
   }

  getTextRef(eurotaxId, eurotaxModelId, type, finition, motorisation): Observable<any> {
    if(finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/finition/' + finition));
    if(motorisation)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/motorisation/' + motorisation));
    return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + eurotaxId + '/' + eurotaxModelId+ '/' + type));
  }
  getMetas(eurotaxId, eurotaxModelId, type, finition, motorisation): Observable<any> {
    if(finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/finition/' + finition));
    if(motorisation)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/motorisation/' + motorisation));
    return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type));
  }
  getMarqueModelId(url): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'marque-model/'+ url ));
  }
  getVoiturePasCher(eurotaxModelId): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'voiture-pas-cher/'+ eurotaxModelId ));
  }
  
  getTagSchema(eurotaxId, eurotaxModelId, type, totalOffre, finition, motorisation): Observable<any> {
    if(finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'tag-schema/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/' + totalOffre+ '/finition/' + finition));
    if(motorisation)
      return this.http.get<any>(encodeURI(this.apiUrl + 'tag-schema/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/' + totalOffre+ '/motorisation/' + motorisation));
    return this.http.get<any>(encodeURI(this.apiUrl + 'tag-schema/'+ eurotaxId + '/' + eurotaxModelId+ '/' + type+ '/' + totalOffre));
  }
  getTagGoogle(marqueEurotaxId, eurotaxId, type, finition, motorisation): Observable<any> {
    if(finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'tag-google/'+ marqueEurotaxId + '/' + eurotaxId +  '/' + type+ '/finition/' + finition));
    if(motorisation)
      return this.http.get<any>(encodeURI(this.apiUrl + 'tag-google/'+ marqueEurotaxId + '/' + eurotaxId +  '/' + type+  '/motorisation/' + motorisation));
    return this.http.get<any>(encodeURI(this.apiUrl + 'tag-google/'+ marqueEurotaxId + '/' + eurotaxId +  '/' + type));
  }
  getSalesRate(id: number, type: string, page:number): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'model-avis/'+ id + '/' + type + '/' + page));
  }
  getEkomi(): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'modele-ekomi'));
  }

  getRedirectConfig(eurotaxMarkId:number, eurotaxModelId:number, markSlug: string, modelSlug:string): Observable<any> {
    if(modelSlug)
      return this.http.get<any>(encodeURI(this.apiUrl + 'redirection/'+ eurotaxMarkId + '/' + eurotaxModelId + '/' + markSlug + '/' + modelSlug));
    return this.http.get<any>(encodeURI(this.apiUrl + 'redirection/'+ eurotaxMarkId + '/' + eurotaxModelId + '/' + markSlug));
  }

  getRedirectMoinsCherConfig(marque:string): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'redirection/moins-cher/'+ marque));
  }

}
