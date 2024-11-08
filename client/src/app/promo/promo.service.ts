import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config/config.service';
import { PromoPage, EncartPromotion } from './promo'


@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private visibilityModal = new EventEmitter<boolean>();
  apiUrl: string;
  apiNestUrl: string;
  constructor(
    private http: HttpClient, 
    private config: ConfigService
    ) { 
    this.apiUrl = this.config.getSiteUrl() + 'api/home/'
    this.apiNestUrl = this.config.getApiNestUrl()
  }

  getPromoData(): Observable<PromoPage> {
    return this.http.get<PromoPage>(this.apiUrl + 'pagepromo/'+this.config.getType());
  }
  getEncartPromotion(): Observable<EncartPromotion>{
    return   this.http.get<PromoPage>(this.apiUrl + 'encartPromo');
   }
  save(formClient): Observable<any> {
    return this.http.post(this.apiUrl + 'private_sales/save', JSON.stringify(formClient));
  }
  getPromo() : Observable<any> {
    return this.http.get<PromoPage>(this.apiNestUrl + '/algolia/rules');
  }
  getTextRef(promoName): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiUrl + 'pages_promo_textrefs/' + promoName ));
  }

  setRoadMatchCookie(value:string) {
    this.config.getDocument().cookie = "roadMatchCookie=" + value ;
  }

  getRoadMatchCookie() {
    var nameEQ = "roadMatchCookie=";
    var ca = this.config.getDocument().cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        }
      
    }
    return null;
  }

  deleteCookie() {
    this.config.getDocument().cookie = "roadMatchCookie=";
  }

  setVisibility(visibility: boolean) {
    this.visibilityModal.emit(visibility);
  }
  
  getVisibility(): EventEmitter<boolean> {
    return this.visibilityModal;
  }
}
