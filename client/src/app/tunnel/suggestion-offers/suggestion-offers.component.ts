import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { environment } from 'src/environments/environment';
import { NgIf, DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-suggestion-offers',
    templateUrl: './suggestion-offers.component.html',
    styleUrls: ['./suggestion-offers.component.css'],
    standalone: true,
    imports: [NgIf, DecimalPipe, NgOptimizedImage]
})
export class SuggestionOffersComponent implements OnInit {
  @Input()  offer: any; 
  offreUrl: string
  vo: any;
  isOccasion: any;
  modelGroupeNiveau1: any;
  marque: any;
  model: any;
  motorisation: any;
  modelNomCompl: any;
  marqueSlug: any;
  marqueEurotaxId: any;
  modelEurotaxId: any;
  id: any;
  imgUrl: string;
  imgAlt: string;
  constructor(private config: ConfigService) {}

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.isOccasion = this.offer.isOccasion;
    this.vo = this.offer.vo ? this.offer.vo : false;
    this.modelGroupeNiveau1 = this.offer.modelGroupeNiveau1 ?? null;
    this.marque = this.offer.marque;
    this.model = this.offer.modelNormalized;
    this.motorisation = this.offer.motorisation;
    this.modelNomCompl = this.offer.modelNomCompl ?? null;
    this.marqueSlug = this.offer.marqueSlug;
    this.marqueEurotaxId = this.offer.eurotaxId;
    this.modelEurotaxId = this.offer.eurotaxModeleId;
    this.id = this.offer.id;
    
    this.offreUrl = environment.eliteAutoHost + '/voiture-' + this.marque +'-'+this.marqueEurotaxId+'/'+this.modelNomCompl+'-'+this.modelEurotaxId +'/' + this.id + ".html";
    this.offreUrl = (this.offreUrl.toLowerCase()).replace(/ /g, "-");
    if (this.vo || this.isOccasion == true) {
      let modelGroupeNiveau1 = this.encodeParenthesesForUrl(this.modelGroupeNiveau1).replace(/\//g, '-').replace(/\+/g, '-').replace(/ /g, '-').toLowerCase()
      this.offreUrl = environment.eliteAutoHost + '/occasion/' + this.marqueSlug +'/'+ modelGroupeNiveau1 +'/' + this.modelNomCompl +'/' + this.id;
      this.offreUrl = (this.offreUrl.toLowerCase()).replace(/ /g, "-");
      this.offreUrl = 'www.' + this.offreUrl.replace("www.", "");
    }else{
      if (this.offer.normalizedType == "utilitaire") {
        this.offreUrl = environment.eliteAutoHost + '/devis/' + this.id;
        this.offreUrl = 'entreprise.' + this.offreUrl.replace("www.", "");
      }
    }

     this.offreUrl = this.config.getProtocol() + '//' + this.offreUrl;
     this.imgAlt = this.marque.toString().charAt(0).toUpperCase() + this.marque.toString().slice(1).toLowerCase() + ' ' + this.model.toString().charAt(0).toUpperCase() + this.model.toString().slice(1).toLowerCase() + ' ' + this.motorisation.toString().toLowerCase();
     if(this.offer.isVo == true){
        if(this.offer.vignette){
          this.imgUrl = this.imgUrl + "/vo/small/" + this.offer.vignette
        }else{
          this.imgUrl = this.imgUrl + "/proxauto/apercu_nc.png"
        }
     }else if(this.offer.frontPicture){
      this.imgUrl = this.imgUrl + "/visuel/" + this.offer.frontPicture
     }else {
      this.imgUrl = this.imgUrl + "/general/apercu_nc.jpg"
     }
  }
  encodeParenthesesForUrl(str) {
    return str.replace(/\(/g, '%28').replace(/\)/g, '%29')
  }

}
