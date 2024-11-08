import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaResultsService {

  constructor(private http: HttpClient, private config : ConfigService) { }

  getDatas(data): Observable<any> {
    return this.http.post(this.config.getElasticUrl() + 'api/search/',JSON.stringify(data))
  }

  similarModel(filter,type): Observable<any> {
    return this.http.get<any>( this.config.getSiteUrl() + 'api/model/suggestion-models/'+filter+'/'+type, {});
  }
}
