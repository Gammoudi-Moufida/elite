import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class OccasionService {

  apiUrl:string;
  constructor(private http: HttpClient, private config:ConfigService) {
    this.apiUrl = this.config.getSiteUrl() + 'api/offre-occasion/';
  }

  getGammeAndServices(mark=null, model=null, transmission=null, fuel=null, typeCar=null,typeVeh=null): Observable<any> {
    if(fuel && typeCar)             
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/type/'+typeCar+'/fuel/'+fuel));
    if(fuel && mark)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/fuel/'+fuel+'/mark/'+mark));
    if(typeCar)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/segment-'+ typeCar));
    if(mark && transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/marque/'+mark+'/transmission/'+transmission));
    if(fuel)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/energie-'+fuel));
    if(mark && model)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/'+mark+'/'+model));
    if(mark)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/'+mark));
    if(transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/boite-'+transmission));
    if (typeVeh) 
      return this.http.get<any>(encodeURI(this.apiUrl + 'services/type-' + typeVeh ));
    return this.http.get<any>(encodeURI(this.apiUrl + 'services'));
  } 
  getFilterData(mark,model=null,modelNomComplForApi=null): Observable<any> {
    if(modelNomComplForApi)
      return this.http.get<any>(encodeURI(this.apiUrl + 'filter/'+mark+'/'+model+'/'+modelNomComplForApi));
    if(model)
      return this.http.get<any>(encodeURI(this.apiUrl + 'filter/'+mark+'/'+model));
    return this.http.get<any>(encodeURI(this.apiUrl + 'filter/'+mark));
  } 
  getTextRef(mark=null, model=null,generation=null, typeCar=null, price=null, typePage=null, transmission = null, finition=null, typeVehicule = null): Observable<any> {

    if(typeVehicule)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/type-vehicule/'+ typeVehicule));
    if(price && typeCar)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/budget-'+price + '/' + typeCar));
    if(price) 
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/budget-'+price));  
    if(typeCar)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/categorie-' + typeCar));
    if(generation)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + mark + '/' + model+ '/' + generation));
    if (transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + mark + '/' + model + '/boite-' + transmission));
    if (finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + mark + '/' + model + '/finition-' + finition));
    if(model && !transmission && !finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + mark + '/' + model));
    if(typePage == "occasion_pas_chere")
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/typePage/'+typePage));
    if(mark && !transmission && !finition)
      return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs/' + mark ));
    return this.http.get<any>(encodeURI(this.apiUrl + 'textrefs' ));
  }

  getTextReferencement(typeVehicule=null, mark=null, typePage=null, typeCar=null, transmission=null, fuel=null, model=null, color=null){

    if(fuel && mark && model)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/' + fuel + '/marque-' + mark + '/modele-' + model + '/' + typePage));
    if(mark && typeCar && fuel)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/' + fuel + '/categorie-' + typeCar + '/marque-' + mark + '/' + typePage));
    if(typeVehicule && mark)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/type-' + typeVehicule + '/marque-' + mark + '/' + typePage));
    if(mark && typeCar)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/categorie-' + typeCar + '/marque-' + mark + '/' + typePage));
    if(mark && transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/transmission-' + transmission + '/marque-' + mark + '/' + typePage));
    if(typeVehicule)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/type-' + typeVehicule + '/' + typePage));
    if(!fuel && !typeCar && transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/transmission-' + transmission + '/' + typePage ));
    if(fuel && transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/' + fuel + '/transmission-' + transmission + '/' + typePage));
    if(color)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/color-' + color + '/' + typePage));
    if(typeCar && transmission)
      return this.http.get<any>(encodeURI(this.apiUrl + 'referencement/categorie-' + typeCar + '/transmission-' + transmission + '/' + typePage));
  }
  
}
