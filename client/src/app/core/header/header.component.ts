import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { HeaderService } from './header.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PromoService } from 'src/app/promo/promo.service';
import { ActivationEnd, Router, Event } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { TunnelService } from 'src/app/tunnel/tunnel.service';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from '../account/account.component';
import { ToTopComponent } from '../../shared/to-top/to-top.component';
import { BannerTopComponent } from './banner-top/banner-top.component';
import { NgIf, NgClass, NgFor, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { RoadMatchFiltersComponent } from 'src/app/promo/road-match/road-match-filters/road-match-filters.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [NgIf, BannerTopComponent, NgClass, ToTopComponent, AccountComponent, FormsModule, NgFor, NgOptimizedImage,RoadMatchFiltersComponent],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class HeaderComponent implements OnInit {

  eliteAutoUrl: string;
  webUrl: string;
  imgUrl: string;
  protocol: string;
  menuOpen: boolean = false;
  showAccount: boolean;
  message: string = "";
  phone: string = '';
  time: string = '';
  Horaires: any = ['9h-11h', '11h-13h', '13h-15h', '15h-17h', '17h-19h']
  showMsg: boolean = false;
  rappel: any;
  type: string;
  pathName: string;
  altText: string = 'Mandataire auto Elite-Auto';
  screenWidth: number;
  screenMode: number;
  showBlocFilter: boolean;
  bannerTop: any;
  showBanner: boolean = false;
  domaine: any;
  promoData: any;
  offreId: number;
  numPhone: string = "";
  ready:boolean = false;
  isModalOpen:boolean = false;
  showList:boolean = false;
  showMenu:boolean = false;
  showModal: boolean
  @Input() modalClosed:any;



  BANNER_TOP = makeStateKey('bannerTop');
  PROMO_DATA = makeStateKey('promoDataHeader');
  ENCART_DATA = makeStateKey('encartDataHeader');

  flashSaleData: any;
  

  constructor(private config: ConfigService, private modalService: NgbModal, private addCallback: HeaderService,private promoService: PromoService,
    private devisService: TunnelService, private router: Router, private state: TransferState) {
  }

  ngOnInit() {
    this.promoService.getVisibility().subscribe((visibility: boolean) => {
      this.showModal = !visibility;
    });

    this.eliteAutoUrl = this.config.getEliteAutoHostName()
    this.protocol = this.config.getProtocol()
    this.imgUrl = this.config.getNewImgUrl()
    this.webUrl = this.config.getWebUrl()
    this.pathName= this.config.getWindow().document.location.pathname;
    this.type = this.config.getType();  
    this.promoData = this.state.get(this.PROMO_DATA, null);
    this.flashSaleData = this.state.get(this.ENCART_DATA, null);
    
    if (!this.promoData?.length) {
      this.promoService.getPromo().subscribe(
        res => {
        if(res) {
          this.promoData = res
          this.state.set(this.PROMO_DATA, <any>this.promoData);
          this.flashSaleData = this.promoData.find((item) => item.encartPromotion);
          this.state.set(this.ENCART_DATA, <any>this.flashSaleData);
        }
      })
    }

    if (this.pathName == "/") {
      this.showBlocFilter = true;
    }
    if (
      (this.pathName.indexOf('vente-voiture')!=-1 && this.pathName.replace('/vente-voiture/','').split('/').length==2)
       || (this.type == 'entreprise' && this.pathName.split(',').length==3)
       || (this.pathName.indexOf('ref_marques_seule.asp') == -1 && this.pathName.indexOf('_.asp') != -1)
       || (this.pathName.indexOf('voiture-neuve')!=-1 && this.pathName.replace('/voiture-neuve/','').split('/').length==2 && this.pathName.indexOf('tarifs.html') == -1)
       || (this.pathName.indexOf('finition-') != -1 && this.pathName.indexOf('leasing-') == -1)
       || (this.pathName.indexOf('moteur-') != -1 && this.pathName.indexOf('leasing-') == -1)
       ){
      //change alt logo image for pages models
      this.altText = 'Site de vente de voiture'

    } else {
      //change alt logo image for pages marks
      if (
         this.pathName.indexOf('vehicule-') != -1 ||
         this.pathName.indexOf('pas-chere') != -1 || 
         this.pathName.indexOf('remise-') != -1 || 
         this.pathName.indexOf('collaborateur-') != -1 ||
         this.pathName.indexOf('ref_marques_seule.asp') != -1
          ) {
        this.altText = 'Vente de voiture'
      }
      else if (this.pathName.indexOf('tarifs.html') != -1) {
        this.altText = 'Prix voiture neuve'
      }
      else {
        if (this.type == 'leasing'){
            this.altText = 'Leasing automobile';
            if(this.pathName.indexOf('leasing-') == -1)
              this.altText = 'Leasing';
        } 
        if (this.type == 'entreprise') this.altText = 'Véhicule Utilitaire';
      }
    }
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();

    this.bannerTop = this.state.get(this.BANNER_TOP, null);
    if (!this.bannerTop) {
      this.addCallback.getBannerTop(this.type).subscribe(data => {
        this.bannerTop = data
        this.bannerTopData()
        this.state.set(this.BANNER_TOP, <any> this.bannerTop);
      })
    } else {
      this.bannerTopData()
    }


    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationEnd && !this.ready) {
        this.ready = true
          this.offreId = event.snapshot.params.offerId
          if(this.offreId){
            this.devisService.getOffreEliteVo(this.offreId).subscribe(
              res => {
                  if(res.isEliteVo){
                    this.numPhone = "01 34 82 85 64"
                  }else if(res.isProxauto){
                    this.numPhone = "01 64 57 20 00"
                  }
                  else{
                    this.numPhone = "01 30 49 40 40"
                  }
              })
          }else{
            this.numPhone = "01 30 49 40 40"
          }
      }
    });

  }

  bannerTopData() {
    this.domaine = this.bannerTop.domaine
    if(this.domaine){
        if(this.domaine.indexOf(this.type) != -1){
          this.showBanner = true
        }else{
          this.showBanner = false
        }
     }
  }


  closeMenu() {
    this.menuOpen = false;
    this.showMenu = false;
    this.showAccount = false;
  }

  toggleAccount() {
    this.menuOpen = false;
    this.showAccount = !this.showAccount;
  }


  openSm(content) {
    this.time = ''
    this.phone = ''
    this.message = ""
    this.showMsg = false
    this.modalService.open(content, { size: 'sm', centered: true ,backdrop: 'static', keyboard: false});
  }

  setMessage(msg) {
    this.message = msg;
  }

  verif() {

    this.message = "";

    if (this.phone == "") {
      this.message = "Veuillez entrer votre N° de tél !";
      return false;
    }

    if ((!/^[0-9]{10}$/.test(this.phone)) || ((this.phone[0] != '0'))) {
      this.setMessage("Veuillez entrer un N° de tél valide");
      return false;
    }

    if (this.time == "") {
      this.message = "Veuillez sélectionner un horaire !";
      return false;
    }

    return true;
  }

  Onsubmit() {
    this.runScript("form_rappel_submit");
    this.showMsg = false;
    if (!this.verif()) {
      return;
    }
    this.addCallback.save(this.phone, this.time).subscribe(data => {
      this.rappel = data;
    })
    if(this.verif())
    this.runScript('form_rappel_succes');
    this.showMsg = true;
    this.time = ''
    this.phone = ''

  }

  runScript(evName: string) {
    const script = this.config.getWindow().document.createElement('script');
    script.innerHTML  = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          "event": "${evName}"
      });
    `;
    this.config.getWindow().document.getElementById('taggoogle').append(script);
  }

  visibleItemsDetector() {
    if (this.screenWidth < 992) {
        // mobile mode
        this.screenMode = 1;
    } else if (this.screenWidth < 1140) {
        // tablet mode
        this.screenMode = 2;
    }
    else {
        // desktop mode
        this.screenMode = 3;
    }
}
OpenModal(){
  this.isModalOpen =!this.isModalOpen;
}
openList(){
  this.showList=!this.showList;

}

toggleNavbar(){
  this.showMenu = !this.showMenu;
}

openRoadMatch() {
 let roadMatchValue  = this.promoService.getRoadMatchCookie();
  if(roadMatchValue){
    this.router.navigateByUrl('/road-match')
  }else{
    this.showModal = true;
  }
}

handleModalClosed(eventData: boolean) {
  this.modalClosed = eventData;
  this.showModal=this.modalClosed;
}
}
