import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';
​
​
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
​
  constructor(private http: HttpClient, private config: ConfigService) { }
​
  save(phone,time):Observable<any> {
   
    return this.http.post(this.config.getSiteUrl() + 'api/home/save',JSON.stringify({phone:phone,time:time}));
  }

  getBannerTop(domain):Observable<any> {
    return this.http.get(this.config.getSiteUrl() + 'api/home/bandeauhaut/' + domain)
  }
}