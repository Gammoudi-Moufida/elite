import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = this.config.getSiteUrl() + 'api/home/'
  }

  login(username, password): Observable<any> {

    return this.http.post<any[]>(this.apiUrl + 'login', { _username: username,_password: password });
  }
  logout(): Observable<any> {

    return this.http.post<any[]>(this.apiUrl + 'logout', { });
  }
  
  infos(): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + 'account_info', { });
  }
}