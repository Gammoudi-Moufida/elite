import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaFiltersService {
  apiFilterUrl: string;
  permitSearch: boolean = true;
  
  constructor(private http: HttpClient, private config : ConfigService) {
    this.apiFilterUrl = this.config.getSiteUrl() + 'api/filter/';
   }

  getAvailability(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl + 'type');
  }

  getUtilitaire(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl + 'utilitaire');
  }
  getCarsTypeAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'type-vehicule');
  }

  getMarkAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'marque');
  }

  getModelAccordion(idsMark): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'v2/model/'+idsMark.join('-'));
  }

  getEnergyAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'energy');
  }

  getDoorAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'doors');
  }

  getFinishAccordion(models): Observable<any> {
    let params = {models: JSON.stringify(models.join(','))}
    return this.http.get<any>(this.apiFilterUrl+'v2/finition', { params: params });
  }

  getRentDurationAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'rent/contribution');
  }

  getMotorizationAccordion(models): Observable<any> {
    let params = {models: JSON.stringify(models.join(','))}
    return this.http.get<any>(this.apiFilterUrl+'v2/motorisation', { params: params });
  }
  
  getDisponibilityAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'disponibility');
  }

  getTransmissionAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'transmission');
  }
  getSeatAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'seats');
  }

  getColorAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'color');
  }

  getPowerAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'power');
  }

  getCo2Accordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'co2');
  }
  
  getDiscountAccordion(): Observable<any> {
    return this.http.get<any>(this.apiFilterUrl+'remise');
  }
  getGenerationAccordion(models): Observable<any> {
    let params = {models: JSON.stringify(models.join(','))}
    return this.http.get<any>(this.apiFilterUrl+'generation', { params: params });
  }
  getGroupeOfAModel(model:number): Observable<any> {
    return this.http.get<any>(encodeURI(this.apiFilterUrl + 'groupe-of-model/'+ model));
  }
}
