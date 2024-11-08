import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  apiUrl: string;
  constructor(private http: HttpClient, 
    private config: ConfigService) {
      this.apiUrl = this.config.getSiteUrl() + 'api/marque'
     }

     getFooter(eurotax_mark_id: number, slug_mark:string, eurotax_model_id:number, slug_model:string, type: string, typePage:string): Observable<any> {
      return this.http.get<any>(this.config.getSiteUrl() + 'api/footer/'+ eurotax_mark_id + '/' + slug_mark + '/' + eurotax_model_id + '/' + slug_model + '/' +type + '/' + typePage);
    }
}