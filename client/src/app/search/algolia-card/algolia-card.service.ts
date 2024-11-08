import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaCardService {

  constructor(private http: HttpClient, private config : ConfigService) { }

  setCompareCookie(value:string) {
      this.config.getDocument().cookie = "compareVeh=" + value + ";path=/";
  }
  getCompareCookie() {
      var nameEQ = "compareVeh=";
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

  getCompareSelectedVeh() {
    let result = []
    if (this.getCompareCookie()) {
      let data = this.getCompareCookie().split(',')
      data.forEach(element => {
        if (element != '') {
          result.push(+element)
        }   
      }); 
    }
    return result
  }

  getInfoLoyer(id): Observable<any> {
    return this.http.get(this.config.getSiteUrl() + 'api/marque/info-loyer/'+id,{})
  }
}
