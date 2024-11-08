import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ConfianceHome, } from './shared';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl = this.config.getSiteUrl() + 'api/occasion'

  constructor(
    private http: HttpClient,
    private config: ConfigService
    ) { }

  getConfianceInfo(): Observable<ConfianceHome> {
    return this.http.get<ConfianceHome>(this.apiUrl + '/home/confiance/proxauto');
  }
}
