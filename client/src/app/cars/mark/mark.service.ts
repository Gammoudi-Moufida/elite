import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  apiUrl: string;

  constructor(
    private http: HttpClient, 
    private config: ConfigService) { 
      this.apiUrl = this.config.getSiteUrl() + 'api/marque'
    }

  getGammeList(id: number, type: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/listvoiture/'+ id + '/' + type);
  }

  getGammeLinks(id: number, type: string, eurotaxModelId): Observable<any> {
    if(eurotaxModelId)
      return this.http.get<any>(this.apiUrl + '/menugauche/'+ id + '/' + type + '/' + eurotaxModelId);
    else{
      return this.http.get<any>(this.apiUrl + '/menugauche/'+ id + '/' + type);
    }
    
  }
  getSubHeader(id: number, type: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ventevoituresubheader/'+ id + '/' + type);
  }

  getTopText(id: number, type: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ventevoituretexthaut/'+ id + '/' + type);
  }

  getFootText(id: number, type: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ventevoituretextbas/'+ id + '/' + type);
  }

  getSalesRate(id: number, type: string, page:number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ventevoitureavis/'+ id + '/' + type + '/' + page);
  }

  getEkomi(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ventevoitureekomi');
  }
  getReferencement(id: number, slug:string, type: string): Observable<any> {
    if(!id && !slug)
      return this.http.get<any>(this.apiUrl + '/referencement/'+ type);
    return this.http.get<any>(this.apiUrl + '/referencement/'+ id + '/' + slug + '/' + type);
  }
  getTagSchema(id: number, type: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/tag-schema/'+ id + '/' + type);
  }
  getTagGoogle(id: number, type: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/tag-google/'+ id + '/' + type);
  }

}
