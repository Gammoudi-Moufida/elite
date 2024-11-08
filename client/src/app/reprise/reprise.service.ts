import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigService } from '../shared/config/config.service';
import { BasicObj, RepriseSelectedVehicule } from './reprise';

@Injectable({
  providedIn: 'root'
})
export class RepriseService {

  apiUrl: string;
  apiUrlReprise: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = this.config.getSiteUrl() + 'api/reprise-voiture/'
    this.apiUrlReprise = this.config.getSiteUrl() + 'api/reprise/'

  }

  getVehiculesByImmat(matricule: string): Observable<any> {
    return this.http.post(this.apiUrlReprise + 'getVehiculesByImmat/' + matricule,{});
  }

  getTextsForBrandPage(mark: string, model): Observable<any> {
    if (model)
      return this.http.get(this.apiUrl + 'model-texts/' + mark + '/' + model, {});
    else
      return this.http.get(this.apiUrl + 'brand-texts/' + mark, {});
  }

  getBrandsDatas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'brands', {});
  }

  getReferencement(typePage, mark, model): Observable<any> {
    if (model)
      return this.http.get<any>(this.apiUrl + 'referencement/' + typePage + "/" + mark + "/" + model, {})
    else if (!model && mark)
      return this.http.get<any>(this.apiUrl + 'referencement/' + typePage + "/" + mark, {})
    else
      return this.http.get<any>(this.apiUrl + 'referencement/' + typePage, {})
  }

  getInformations(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'informations', {});
  }

  getEurotaxId(slugMark): Observable<any> {
    return this.http.get<any>(this.apiUrlReprise + 'getEurotaxId/'+slugMark, {});
  }

  getVehicule(selectedYear: number, selectedMonth: string, selectedMarque: BasicObj, selectedModel: BasicObj, selectedMotorisation: BasicObj, selectedFinition: BasicObj): Observable<RepriseSelectedVehicule[]> {
    return this.http.post<RepriseSelectedVehicule[]>(encodeURI(this.apiUrlReprise + 'getVehicule/' + selectedYear + '-' + selectedMonth + '-01/' + selectedMarque.id + '/' + selectedModel.id + '/' + selectedMotorisation.id + '/' + selectedFinition.id), {});
  }

  createEstimation( sTransmission:any, sVehTypNatcode: any,sNbPorte : number,carnetEntretien: number, courroie: string,dDateMec: string, fHP : string, importation : number, km : number,
   premiereMain : number,  sTransType : string, sTypNatcode : string, sVersion : string, sEnergie : { id ?: string, name ?: string }, s_rep_canal:any,partnerName:any,typeReprise:any,idPartner:any): Observable<any> {
    return this.http.post<any[]>(this.apiUrlReprise + 'createEstimation', {sTransmission, sVehTypNatcode,sNbPorte, carnetEntretien, courroie, dDateMec, fHP, importation , km ,
      premiereMain ,  sTransType , sTypNatcode , sVersion , sEnergie , s_rep_canal,partnerName,typeReprise,idPartner})
  }

  setInfoToPrepareEstimate(idReprise: number, km: number, premiereMain: boolean, carnetEntretien: boolean): Observable<any> {
    return this.http.post<any[]>(this.apiUrlReprise + 'setInfoToPrepareEstimate', { idReprise, km, carnetEntretien, premiereMain })
  }

  setCoordonnees(idReprise: number, civilite: string, nomClient: string, cpClient: number,
    telClient: number, emailClient: string, repriseRapide: number, immat: string): Observable<any> {
    return this.http.post<any[]>(this.apiUrlReprise + 'setCoordonnees', {
      idReprise, civilite, nomClient, cpClient,
      telClient, emailClient, repriseRapide, immat
    })
  }

  getRenderInformationVeh(idReprise): Observable<any> {
    return this.http.post<any[]>(this.apiUrlReprise + 'getRenderInformationVeh_V2/' + idReprise, {})
  }

  getServiceLinksForMark(slugMark, eurotaxId): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'brand_service_links/' + slugMark + '/' + eurotaxId, {});
  }

}
