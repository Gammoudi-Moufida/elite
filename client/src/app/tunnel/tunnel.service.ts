import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../shared/config/config.service';
import { BasicObj, Carousel, ChoiceOptions, Colors, CurrentUser, Devis, EstimationRepriseData, GeneralInfo, ImgObj, InitDevis, RepriseData, RepriseOptions, RepriseSelectedVehicule, RepriseVehiculeInfos, resDevis, Selleries, SeriesEquipment, SimulationFinancement, VideoTesting } from './devis';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {

  apiUrl: string;
  constructor(private config:ConfigService, private http:HttpClient) { 
    this.apiUrl = this.config.getSiteUrl()+'api/v2/devis/';
  }
 getDiscount(offreId: number): Observable<any> {
    return this.http.get<GeneralInfo>(this.apiUrl + 'remise/' + offreId );
  }
  getSummaryInfo(offreId: number, typeForApi:string): Observable<GeneralInfo> {
    return this.http.get<GeneralInfo>(this.apiUrl + 'recap/' + offreId + '/' + typeForApi);
  }
  getCarouselInfo(offreId: number, typeForApi:string): Observable<Carousel> {
    return this.http.get<Carousel>(this.apiUrl + 'carousel/' + offreId + '/' + typeForApi);
  }
  getColors(offreId: number, typeForApi:string): Observable<Colors> {
    return this.http.get<Colors>(this.apiUrl + 'couleurs/' + offreId + '/' + typeForApi);
  }
  getChoiceOptions(offreId: number, typeForApi:string): Observable<ChoiceOptions> {
    return this.http.get<ChoiceOptions>(this.apiUrl + 'options/' + offreId + '/' + typeForApi);
  }
  getSeriesEquipment(offreId: number, typeForApi:string): Observable<SeriesEquipment> {
    return this.http.get<SeriesEquipment>(this.apiUrl + 'equipements-serie/' + offreId + '/' + typeForApi);
  }
  getVideoTesing(offreId: number): Observable<VideoTesting> {
    return this.http.get<VideoTesting>(this.apiUrl + 'essais-video/' + offreId);
  }
  getRepriseInfo(offreId: number, typeForApi:string): Observable<RepriseData> {
    return this.http.get<RepriseData>(this.apiUrl + 'reprise/' + offreId + '/' + typeForApi);
  }
  getFinancementSimulation(offreId, tarifOptions, tarif, duration, apport, kilometrage, tatoPrice, error = 0, typeForApi: string ): Observable<SimulationFinancement> {
    return this.http.get<SimulationFinancement>( this.apiUrl + 'financement/estimation/' + offreId + '/' + tarifOptions + '/' + tarif + '/' + duration + '/' + apport + '/' + kilometrage + '/' + tatoPrice + '/' + error + '/' + typeForApi )
  }
  getColorSelleries(offreId: number, colorId: number): Observable<Selleries>  {
    return this.http.get<Selleries>(this.apiUrl + 'couleur/' + offreId + '/' + colorId + '/selleries');
  }
  getInitDevis(offreId: number, devisId, typeForApi:string): Observable<InitDevis>  {
    return this.http.get<InitDevis>(this.apiUrl + 'init/' + offreId + '/' + devisId + '/' + typeForApi);
  }
  getcodePostaux(postal_code:number): Observable<any>  {
    return this.http.get<InitDevis>(this.apiUrl + 'getcodePostaux/'+postal_code) ;
  }
  getDeliveryPartners(offreId: number, postalCode): Observable<any>  {
    return this.http.get<InitDevis>(this.apiUrl + 'getDeliveryPartners/' + offreId + '/' + postalCode) ;
  }
  getRedirectConfig(offreId: number, typeForApi:string, mark:string, model:string, generation:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'redirection/'+ offreId + '/' + typeForApi + '/' + mark + '/' + model + '/' + generation);
  }
  save(devis:Devis, typeForApi:string): Observable <resDevis> {
    return this.http.post<resDevis>(this.apiUrl + 'mappingtoform' + '/' + typeForApi + '/v2',{ devis: JSON.stringify(devis) });
  }
  saveCallback(devis):Observable<any> {
    return this.http.post(this.apiUrl + 'save/callback',JSON.stringify({devis:devis}));
  }
  getEstimation(estimationId: string, estimationMail: string): Observable<EstimationRepriseData> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<EstimationRepriseData>(this.apiUrl + 'getEstimation', {
      headers: headers, params: new HttpParams().set("idReprise", estimationId).set("email", estimationMail)
    });
  }

  getVehiculesByImmat(matricule: string): Observable<any> {
    return this.http.get(this.apiUrl + 'getVehiculesByImmat/' + matricule);
  }

  getBrandList(selectedYear: number, selectedMonth: string) {
    return this.http.get(this.apiUrl + 'getBrandList/' + selectedYear + '-' + selectedMonth + '-01');
  }

  getModelList(selectedYear: number, selectedMonth: string, selectedMarque: BasicObj) {
    return this.http.get(this.apiUrl + 'getModelList/' + selectedYear + '-' + selectedMonth + '-01/' + selectedMarque.id);
  }
  getModelListReprise(selectedYear: number, selectedMonth: string, selectedMarque: number) {
    return this.http.get(this.apiUrl + 'getModelList/' + selectedYear + '-' + selectedMonth + '-01/' + selectedMarque);
  }

  getEnergie(selectedYear: number, selectedMonth: string, selectedMarque: BasicObj, selectedModel: BasicObj) {
    return this.http.get(this.apiUrl + 'getEnergie/' + selectedYear + '-' + selectedMonth + '-01/' + selectedMarque.id + '/' + selectedModel.id);
  }

  getFinition(selectedYear: number, selectedMonth: string, selectedMarque: BasicObj, selectedModel: BasicObj, selectedMotorisation: BasicObj) {
    return this.http.get<any>(this.apiUrl + 'getFinition/' + selectedYear + '-' + selectedMonth + '-01/' + selectedMarque.id + '/' + selectedModel.id + '/' + selectedMotorisation.id);
  }

  getVehicule(selectedYear: number, selectedMonth: string, selectedMarque: BasicObj, selectedModel: BasicObj, selectedMotorisation: BasicObj, selectedFinition: BasicObj): Observable<RepriseSelectedVehicule[]> {
    return this.http.get<RepriseSelectedVehicule[]>(this.apiUrl + 'getVehicule/' + selectedYear + '-' + selectedMonth + '-01/' + selectedMarque.id + '/' + selectedModel.id + '/' + selectedMotorisation.id + '/' + selectedFinition.id);
  }

  getVehiculePicture(selectedVehicule: RepriseSelectedVehicule): Observable<ImgObj> {
    return this.http.get<ImgObj>(this.apiUrl + 'getVehiculePicture/' + selectedVehicule.sTypNatcode);
  }


  repriseGetOptions(selectedVehicule: RepriseSelectedVehicule): Observable<RepriseOptions> {
    return this.http.get<RepriseOptions>(this.apiUrl + 'repriseGetOptions/' + selectedVehicule.sTypNatcode + '/' + selectedVehicule.dDateMec);
  }


  createEstimation(data: RepriseVehiculeInfos): Observable<EstimationRepriseData> {
    return this.http.post<EstimationRepriseData>(this.apiUrl + 'createEstimation', { data: JSON.stringify(data) });
  }

  getUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(this.apiUrl + 'getUser/');
  }

  getGoogleTags(offreId: number, typeForApi:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'google-tag/' + offreId + '/' + typeForApi);
  }
  getSchemaTag(offreId: number, typeForApi:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'schema-tag/' + offreId + '/' + typeForApi);
  }
  getConversionTag(emailClient: string, montantDevis: number, idDevis: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'conversion-tag/' + emailClient +'/'+ montantDevis + '/'+ idDevis );
  }

  getTotalMensualite(financement) {
    var mensualite = financement.result.mensualite;
    financement?.result?.assurances.forEach(assurance => {
      if (assurance.isChecked)
        mensualite = mensualite + assurance.mensualite;
    });
    if (financement.garantie)
      mensualite = mensualite + Number(financement.result.extensionGarantie);

    return mensualite;
  }

  visibleItemsDetector(screenWidth: number, isClosedCollapse: boolean) {
    if (screenWidth < 600) {
      isClosedCollapse = true;
    }else{
      isClosedCollapse = false;
    }
    return  isClosedCollapse;
  }

  getOffreEliteVo(offreId : number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'offreEliteVo/' + offreId);
  }
  
}
