import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  eliteAutoHost = environment.eliteAutoHost;
  cdnUrl = environment.cdnUrl
  prod = environment.production;
  secureConnexion = environment.secureConnexion;
  cdnUrlNew= environment.cdnUrlNew;
  apiHost = environment.api
  algolia = environment.algolia

  constructor(
    @Inject(DOCUMENT) private _doc: Document,
  ) {
  }

  getAlgolia() {
    return this.algolia
  }

  getDocument() {
    return this._doc;
  }

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  getLocation(): Location {
    return this._doc.location;
  }

  createElement(tag: string): HTMLElement {
    return this._doc.createElement(tag);
  }


  getSiteUrl() { 
      return this.getLocation().protocol + "//" + this.getLocation().hostname + this.prefixApiDev();
  }

  getProtocol() {
    if (!this.secureConnexion) {
      return this.getLocation().protocol
    } else {
      return 'https:'
    } 
  }

  getImgUrl() {
    return this.cdnUrl   
  }

  getNewImgUrl() {
    return this.cdnUrlNew;  
  }

  getElasticUrl() {
    return this.getLocation().protocol + "//" + this.eliteAutoHost + "/"
  }

  private prefixApiDev() {
    let appApi = "";
    if (this.prod == false) {
      appApi = "/app_dev.php/";
    } else {
      appApi = "/"
    }
    return appApi
  }

  private prefixAssetDev() {
    let assetUrl = "";
    if (this.prod == false) {
      assetUrl = ":4200";
    } else {
      assetUrl = ":4000"
    }
    return assetUrl
  }

  getEliteAutoHost() {
    return this.eliteAutoHost;
  }

  getEliteAutoHostName() {
    return this.eliteAutoHost.replace("www.", "")
  }
  getCdnUrl() {
    return this.cdnUrl;
  }

  getWebUrl() {
    return this.getLocation().protocol + "//" + this.getLocation().hostname + "/"
  }

  getType() {
    if(this.getLocation().hostname.split('.')[0] == 'leasing' || this.getLocation().pathname.includes('/leasing')){
      return 'leasing'
    }else{
      return this.getLocation().hostname.split('.')[0]
    }
  }
  getApiNestUrl() {
    if (this.prod == false) {
      return this.apiHost
    } else {
      return this.getSiteUrl() + this.apiHost
    }
  }
  getCanonicalUrl(){
    return environment.protocol+this.getLocation().host+this.getLocation().pathname+this.getLocation().search
  }

}
