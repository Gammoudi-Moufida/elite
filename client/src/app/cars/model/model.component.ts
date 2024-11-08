import { Component, OnInit, HostListener, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Event as EventRouter, NavigationStart } from '@angular/router';
import { ModelService } from './model.service';
import { ConfigService } from 'src/app/shared/config/config.service';
import { DomSanitizer, makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { isPlatformBrowser, NgIf, NgClass } from '@angular/common';
import { history } from 'instantsearch.js/es/lib/routers';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import algoliasearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
import { AlgoliaCardService } from 'src/app/search/algolia-card/algolia-card.service';
import { AvisListComponent } from '../shared/avis-list/avis-list.component';
import { TextSeoComponent } from '../shared/text-seo/text-seo.component';
import { AvisComponent } from '../../shared/avis/avis.component';
import { RewardComponent } from '../shared/reward/reward.component';
import { NavLinkComponent } from '../shared/nav-link/nav-link.component';
import { AlgoliaResultsComponent } from '../../search/algolia-results/algolia-results.component';
import { AlgoliaFiltersComponent } from '../../search/algolia-filters/algolia-filters.component';
import { AlgoliaFilterOrderComponent } from '../../search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFilterTextComponent } from '../../search/algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';
import { NgAisInstantSearchModule, NgAisConfigureModule, NgAisStatsModule, createSSRSearchClient } from 'angular-instantsearch';
import { PromoService } from 'src/app/promo/promo.service';
import { ScrollToFragmentService } from 'src/app/core/scroll/scroll-to-fragment.service';


@Component({
    selector: 'app-car-sale-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.css'],
    standalone: true,
    imports: [NgIf, NgAisInstantSearchModule, NgAisConfigureModule, SubHeaderComponent, NgClass, AlgoliaFilterTextComponent, AlgoliaFilterOrderComponent, NgAisStatsModule, AlgoliaFiltersComponent, AlgoliaResultsComponent, NavLinkComponent, RewardComponent, AvisComponent, TextSeoComponent, AvisListComponent]
})
export class ModelComponent implements OnInit {

  mark: number;
  model: number;
  data: any;
  ekomiAvis: any;
  avisList: any;
  filterMobileShow: boolean = false;
  text: string;
  resume: string;
  showImg: boolean;
  screenMode: number;
  screenWidth: number;
  modelId: number;
  eurotaxId: number;
  type: string;
  subtexttop: string;
  isAsp: boolean = true;
  finition: string;
  motorisation: string;
  event: Event;
  total: number;
  redirectRoute: string;
  canonical: string;
  subDomaine: string;
  bannerTop: any;
  domaine: any;
  showBanner: boolean;
  isBrowser: boolean;
  blockFixed: boolean;
  groupe: string;
  html: any;
  titlePage: string;
  descriptionPage: string;
  textHtml: string;

  MODEL_TOTAL_RESULT = makeStateKey<number>('modelTotalResults');
  MODEL_SEARCH_RESULT = makeStateKey<any>('modelSearchResults');
  MODEL_TITLE_KEY = makeStateKey<string>('modelTitlePage');
  MODEL_DESCRIPTION_KEY = makeStateKey<string>('modelDescriptionPage');
  FILTER_MOTORISATION = makeStateKey<any>('filterMotorisation');
  FILTER_FINITION = makeStateKey<any>('filterFinition');
  SCHEMA_TAG_DATA_KEY= makeStateKey<string>('schemaTagData');
  GOOGLE_TAG_DATA_KEY= makeStateKey<string>('googleTagData');
  FLASHSALE_DATA = makeStateKey<number>('flashsaledata');

  oldToNewRouteRedirect: boolean=false;
  slugMark: string;
  slugModel: string;
  totalCompare: number = 0;
  textHtmlSplit:boolean=true;
  totalFilter: number = 0;
  public configResults :any  ;
  totalResults: number;
  showComparator: boolean;
  loadingResult: boolean = true;
  searchResults: any;
  modelLeaseRedirect: boolean;
  motorizationWithModel: string;
  motorizationWithModelNomCompl: string;
  searchClient: any;
  index: any;
  finitionWithModel: string;
  finitionWithModelNomCompl: string;
  tabMotor: any = [];
  testMotor: string;
  tabFinition: any = [];
  testFinition: string;
  redirectToMark: boolean = false;
  algoliaData: any;
  filterMotorisation: any;
  filterFinition: any;
  filterIsFinished: boolean;
  schemaTagData: any;
  googleTagData: any;
  flashSaleData: any;
  breadcrumbList: any;
  siteUrl: string;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.showImg = true
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if(this.config.getWindow().document.scrollingElement.scrollTop > 300){
      this.blockFixed = true;
    }else {
      this.blockFixed = false;
    }
  }
  @HostListener('window:click') clickInside() { 
    this.showImg = true;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }
  constructor(
    private route: ActivatedRoute,
    private service: ModelService,
    private config: ConfigService,
    private promoService: PromoService,
    private router: Router,
    private title: Title,
    private meta: Meta,  
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platform: Object,
    private state: TransferState,
    private cardService: AlgoliaCardService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
      @Optional() @Inject(REQUEST) protected request: Request,
      private transferState: TransferState,
    private scrollToFragmentService: ScrollToFragmentService
  ) { 
    this.router.events.subscribe((event: EventRouter) => {
      if (event instanceof NavigationStart) {
        this.state.remove(this.MODEL_TITLE_KEY);
        this.state.remove(this.MODEL_TOTAL_RESULT)
        this.state.remove(this.GOOGLE_TAG_DATA_KEY)
        this.state.remove(this.SCHEMA_TAG_DATA_KEY)
        //**** reset transferState data when navigate new route ****/
         this.loadingResult = true;
      }
    });
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex(this.config.algolia.indexName)
  }

  ngOnInit() {
    this.showComparator=true
    this.isBrowser = isPlatformBrowser(this.platform);
    this.screenWidth = this.config.getWindow().innerWidth;
    this.siteUrl = this.config.getSiteUrl();
    if(this.config.getWindow().document.location.pathname.includes('/leasing')){
      this.subDomaine = 'leasing'
    }else{
      this.subDomaine = this.config.getType();
    }

    this.flashSaleData = this.state.get(this.FLASHSALE_DATA, null);
    this.algoliaData = this.state.get(this.MODEL_SEARCH_RESULT, null);
    this.totalResults = this.state.get(this.MODEL_TOTAL_RESULT, null);
    this.filterMotorisation = this.state.get(this.FILTER_MOTORISATION, null);
    this.filterFinition = this.state.get(this.FILTER_FINITION, null);
    this.googleTagData = this.state.get(this.GOOGLE_TAG_DATA_KEY, null);
    this.schemaTagData = this.state.get(this.SCHEMA_TAG_DATA_KEY, null);

    if(this.algoliaData){
      this.loadingResult = false
    }
    if (this.isBrowser) {
      this.checkCompareEvent();
    }

    this.visibleItemsDetector();
    this.route.paramMap.subscribe(params => {
      this.type = params['params']['type'];
      this.mark = params['params']['mark'];
      this.oldToNewRouteRedirect = params['params']['oldToNewRouteRedirect']?true:false;
      this.modelLeaseRedirect = params['params']['modelLeaseRedirect']?true:false;
      this.finition = params['params']['finition'] ? params['params']['finition'] : '';
      this.motorisation = params['params']['motorisation'] ? params['params']['motorisation'] : '';
      if (
        (this.config.getLocation().hostname.split('.')[0] == "www" && (this.modelLeaseRedirect))
        || (this.config.getLocation().hostname.split('.')[0] == "leasing" && (!this.modelLeaseRedirect))
        || (this.subDomaine == 'entreprise' && ['utility', 'marque_modele_offres_finition_utility', 'marque_modele_offres_motorisation_utility'].indexOf(this.type) == -1)
        || (this.subDomaine == 'www' && (['modelVn', 'modelMoinsCherRewrite', 'marque_modele_offres_finition_vn', 'marque_modele_offres_motorisation_vn', 'marque_modeles_redirect', 'marque_modeles_finition_redirect', 'model_option_devis'].indexOf(this.type) == -1))
      ) {
        if (this.response)
          this.response.status(404);
        this.router.navigateByUrl('/not-found', { skipLocationChange: true });
                 
      }
      else {
        if (params['params']['model'] != '.asp') {
          this.isAsp = false;
          this.modelId = params['params']['model'];
          this.eurotaxId = params['params']['mark'];
          this.mark = params['params']['mark'];
          this.slugMark = params['params']['slugMark'];
          this.slugModel = params['params']['slugModel']? params['params']['slugModel'] : '';
          if(this.type == 'model_option_devis'){
            this.route.queryParams.subscribe(params => {
              this.modelId = params['CODEGAMME'];
              this.eurotaxId = params['CODEMARQUE'];
              this.slugMark = null;
              this.slugModel = null;
            })
          }
          this.checkRedirectAction(+this.eurotaxId, +this.modelId, this.slugMark, this.slugModel, params['params']['type']);
        }
        else {
            this.service.getRedirectMoinsCherConfig(params['params']['mark']).subscribe(
              res => {
                if (res.toRedirect == true) {
                  if (this.response){
                    this.response.status(301);
                    this.response.setHeader('Location',res.newSlug);
                    this.response.end();
                  }                  
                } else {
                  this.service.getMarqueModelId(params['params']['mark']).subscribe(
                    res => {
                      this.modelId = res.modelId;
                      this.eurotaxId = res.eurotaxId;
                      this.onScroll()
                      this.setMetaPasCher();
                    })
                }
              }
            )
        }
      }
    });
    this.promoService.getPromo().subscribe(
      res => {
        if(res) {
          this.flashSaleData = res.find(item => item.encartPromotion)
          this.state.set(this.FLASHSALE_DATA, <any> this.flashSaleData);
        }
      })
  }

  ngAfterViewInit() {
    this.scrollToFragmentService.scrollToFragment();
  }

  checkRedirectAction( eurotaxId: number, modelId: number,slugMark: string, slugModel: string,  type: string) {
    
    this.service.getRedirectConfig(eurotaxId, modelId, slugMark, slugModel).subscribe(
      res => {
        if(res.urlToMark){
          this.redirectToMark = true
        }
        if (type == 'modelVn' && res.isUtilitaire == true) {
          if (res.isEnabled == true ) {
            let newUrl = this.config.getLocation().protocol + "//entreprise." + this.config.getLocation().hostname.replace('www.','')
            if (this.config.getLocation().hostname != "") {
              newUrl = newUrl + ":" + this.config.getLocation().port
            }
            this.redirectRoute = newUrl+ "/vehicule-" + res.marque + "-" + res.newSlug + "," + this.mark + "," + modelId + ".html"
            if (this.response){ 
              this.response.status(301);
              this.response.setHeader('Location',this.redirectRoute);
              this.response.end();
            }
          }
          if (res.isEnabled == false ) {
            this.router.navigateByUrl('/not-found', { skipLocationChange: true });
          }
        }
        
        let newUrl = this.config.getProtocol() + '//' + environment.eliteAutoHost

        this.redirectRoute = newUrl + "/leasing/" + this.slugMark + "-" + this.mark + "/" + this.slugModel + "-" + this.modelId

        if(type == 'lease' && this.config.getLocation().pathname.includes('.html')){
          if (this.response) {
            this.response.status(301);
            this.response.setHeader('Location', this.config.getLocation().pathname.replace('.html',''));
            this.response.end();
          }
        }

        if(this.modelLeaseRedirect){
          if(res.isEnabled){
            if(type == 'marque_modele_offres_finition_lease'){
              this.redirectRoute = this.redirectRoute +'/finition-'+this.finition + ".html"
            }else if(type == 'marque_modele_offres_motorisation_lease'){
              this.redirectRoute = this.redirectRoute +'/moteur-'+this.motorisation + ".html"
            }
            if (this.response) {
              this.response.status(301);
              this.response.setHeader('Location', this.redirectRoute);
              this.response.end();
            }
          }
        }
        
        if (res.toRedirect == true || (this.oldToNewRouteRedirect && !this.redirectToMark)) {

          if (type == "marque_modele_offres_finition_vn" || "marque_modele_offres_motorisation_vn" || "modelVn" || "marque_modeles_redirect" || "marque_modeles_finition_redirect" || "model_option_devis") 
            this.redirectRoute = '/voiture-'+res.marque + '-' + this.eurotaxId + '/' + res.newSlug + '-' + res.newEuroTaxId + '.html'
          if (type == "lease") 
            this.redirectRoute = newUrl + '/leasing/' + res.marque + '-' + this.eurotaxId + '/' + res.newSlug + '-' + res.newEuroTaxId 
          if (type == "marque_modele_offres_finition_lease" || type == 'marque_modele_offres_motorisation_lease') 
            this.redirectRoute = newUrl + '/leasing/' + res.marque + '-' + this.eurotaxId + '/' + res.newSlug + '-' + res.newEuroTaxId 
          if (type == 'utility') 
            this.redirectRoute = '/vehicule-' + res.marque + '-' + res.newSlug + ',' + this.eurotaxId + ',' + res.newEuroTaxId + '.html'
          if (type == "marque_modele_offres_finition_utility" || type == 'marque_modele_offres_motorisation_utility') 
            this.redirectRoute = '/vehicule-' + res.marque + '-' + res.newSlug + ',' + this.eurotaxId + ',' + res.newEuroTaxId + '.html'
          if (this.oldToNewRouteRedirect == true && res.toRedirect == false){
              this.redirectRoute = this.router.url.replace('vente-voiture/','voiture-').replace('voiture-neuve/','voiture-')
          }
          if(res.newModelLib){
            if(this.type == 'modelVn')  this.redirectRoute = '/voiture-' + res.marque + '-' + this.eurotaxId + '/' + res.newModelLib + '-' + this.modelId + '.html'
            if(this.type == 'marque_modele_offres_finition_vn')  this.redirectRoute = '/vente-voiture/' + res.marque + '-' + this.eurotaxId + '/' + res.newModelLib + '-' + this.modelId + '/finition-' + this.finition + '.html'
            if(this.type == 'marque_modele_offres_motorisation_vn')  this.redirectRoute = '/vente-voiture/' + res.marque + '-' + this.eurotaxId + '/' + res.newModelLib + '-' + this.modelId + '/moteur-'+this.motorisation + '.html'
            if(this.type == 'lease')  this.redirectRoute = '/leasing/' + res.marque + '-' + this.eurotaxId + '/' + res.newModelLib + '-' + this.modelId
            if(this.type == 'marque_modele_offres_finition_lease')  this.redirectRoute = '/leasing/' + res.marque + '-' + this.eurotaxId + '/' + res.newModelLib + '-' + this.modelId + '/finition-' + this.finition + '.html'
            if(this.type == 'marque_modele_offres_motorisation_lease')  this.redirectRoute = '/leasing/' + res.marque + '-' + this.eurotaxId + '/' + res.newModelLib + '-' + this.modelId + '/moteur-' + this.motorisation + '.html'
            if(this.type == 'utility') this.redirectRoute = '/vehicule-' + res.marque + '-' + res.newModelLib + ',' + this.eurotaxId+ ',' + this.modelId + '.html'
            if(this.type == 'marque_modele_offres_finition_utility')  this.redirectRoute = '/vehicule-'  + res.marque + '-' + res.newModelLib + ',' + this.eurotaxId+ ',' + this.modelId + '/finition-' + this.finition + '.html'
            if(this.type == 'marque_modele_offres_motorisation_utility')  this.redirectRoute = '/vehicule-'  + res.marque + '-' + res.newModelLib + ',' + this.eurotaxId+ ',' + this.modelId + '/moteur-' + this.motorisation + '.html'
          }
          if (this.response){
            this.response.status(301);
            this.response.setHeader('Location',this.redirectRoute);
            this.response.end();
          }            
        }else if(this.redirectToMark){
         
          if (type == "marque_modele_offres_finition_vn" || "marque_modele_offres_motorisation_vn") {
            this.redirectRoute = '/voiture-neuve/' + res.slugMark + '-' + this.eurotaxId + '/tarifs.html'
          }

          if (type == "modelVn" || "marque_modeles_redirect" || "marque_modeles_finition_redirect" || "model_option_devis"){
            this.redirectRoute = '/voiture-' + res.slugMark + '-' + this.eurotaxId + '.html'
          }

          if (type == "lease" || type == "marque_modele_offres_finition_lease" || type == 'marque_modele_offres_motorisation_lease'){
            this.redirectRoute = newUrl + '/leasing/' + res.slugMark + '-' + this.eurotaxId
          } 
          if (type == "utility" || type == "marque_modele_offres_finition_utility" || type == 'marque_modele_offres_motorisation_utility'){
            this.redirectRoute = '/vehicule-' + res.slugMark + '-neuf,' + this.eurotaxId + '.html'
          }
          if (this.response){
            this.response.status(301);
            this.response.setHeader('Location',this.redirectRoute);
            this.response.end();
          }            
        }else {
          this.onScroll();
          this.setMeta();
        }
      }
    )
  }
  visibleItemsDetector() {
    if (this.screenWidth < 700) {
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
  addRouteConfig(key, value) {
    this.configResults.initialUiState.prod_ELITE_OFFERS.refinementList[key] = [value]
    return this.configResults
  }
  onScroll(): void {
    if ( !this.isBrowser || (this.config.getWindow().innerHeight + this.config.getWindow().scrollY) >= this.config.getWindow().document.body.offsetHeight) {
          this.textRef()
    }
  }

  getData(motorisationFinitionFilter) {
    if (!this.algoliaData || this.algoliaData?.length == 0 && (motorisationFinitionFilter[0] || this.filterIsFinished)) {
      this.getTag();
      if(motorisationFinitionFilter[0]?.length > 0){
        this.addRouteConfig(motorisationFinitionFilter[0].split(':')[0], motorisationFinitionFilter[0].split(':')[1])
        this.index.search('', {
          facetFilters: [
           ["marque:" + this.data.mark.toUpperCase()],
           ["modelId:" + this.data.modelId],
           ["modelGroupeNiveau1:" + this.data.model_groupe_niv1.toLowerCase()],
           ["modelNomCompl:" + this.data.model_nom_compl.toUpperCase()],
           [motorisationFinitionFilter[0]]
          ],
          hitsPerPage:1000
        }).then((hits) => {
        //   let groupeByHashKeyEquipement = []
        //   hits.hits.forEach(edata => {
        //     if (groupeByHashKeyEquipement.some(data => data?.hashKeyVersion == ((edata?.hashKeyVersion && edata?.hashKeyVersion.length > 0) ? edata?.hashKeyVersion : -1)) == false || !edata?.hashKeyVersion) {
        //       groupeByHashKeyEquipement.push(edata)
        //     }
        //     else if (edata?.hashKeyVersion && edata?.hashKeyVersion.length > 0 && edata.isReserved == false) {
        //       let obj = groupeByHashKeyEquipement.find((o, i) => {
        //         if (o?.hashKeyVersion && o?.hashKeyVersion.length >0 && o?.hashKeyVersion === edata?.hashKeyVersion && groupeByHashKeyEquipement[i].isReserved == true) {
        //           groupeByHashKeyEquipement[i] = edata;
        //           return true; // stop searching
        //         }
        //       });
        //   }
        // });
        //   this.algoliaData = groupeByHashKeyEquipement
          this.algoliaData = hits.hits
          this.totalResults = this.algoliaData.length
          this.state.set(this.MODEL_TOTAL_RESULT, <any>this.totalResults);
          this.state.set(this.MODEL_SEARCH_RESULT, <any>this.algoliaData);
          this.loadingResult = false
        })
      }else{
        this.index.search('', {
          facetFilters: [
           ["marque:" + this.data.mark.toUpperCase()],
           ["modelId:" + this.data.modelId],
           ["modelGroupeNiveau1:" + this.data.model_groupe_niv1.toLowerCase()],
           ["modelNomCompl:" + this.data.model_nom_compl.toUpperCase()]
            ],
            hitsPerPage:1000
        }).then((hits) => {
        //   let groupeByHashKeyEquipement = []
        //   hits.hits.forEach(edata => {
        //     if (groupeByHashKeyEquipement.some(data => data?.hashKeyVersion == ((edata?.hashKeyVersion && edata?.hashKeyVersion.length > 0) ? edata?.hashKeyVersion : -1)) == false || !edata?.hashKeyVersion) {
        //       groupeByHashKeyEquipement.push(edata)
        //     }
        //     else if (edata?.hashKeyVersion && edata?.hashKeyVersion.length > 0 && edata.isReserved == false) {
        //       let obj = groupeByHashKeyEquipement.find((o, i) => {
        //         if (o?.hashKeyVersion && o?.hashKeyVersion.length >0 && o?.hashKeyVersion === edata?.hashKeyVersion && groupeByHashKeyEquipement[i].isReserved == true) {
        //           groupeByHashKeyEquipement[i] = edata;
        //           return true; // stop searching
        //         }
        //       });
        //   }
        // });
        //   this.algoliaData = groupeByHashKeyEquipement
          this.algoliaData = hits.hits
          this.totalResults = this.algoliaData.length
          this.state.set(this.MODEL_TOTAL_RESULT, <any>this.totalResults);
          this.state.set(this.MODEL_SEARCH_RESULT, <any>this.algoliaData);
          this.loadingResult = false
        })
      }
    }else{
      this.loadingResult = false
    }
  }

  textRef() {
    this.service.getTextRef(this.eurotaxId, this.modelId, this.type, this.finition, this.motorisation).subscribe(
      res => {
        this.data = res
        if(res?.menu){
          this.generateAndAppendBreadcrumbScript(res.menu)
        }
        this.totalFilter = 3;
        this.configResults = {
          searchClient: createSSRSearchClient({
            appId: this.config.algolia.appId,
            apiKey: this.config.algolia.appKey,
            makeStateKey,
            HttpHeaders,
            transferState: this.transferState,
            httpClient: this.httpClient,
          }),
          indexName: this.config.algolia.indexName,
          initialUiState: {
            prod_ELITE_OFFERS: {
              query: '',
              refinementList: {
                marque: [this.data.mark.toUpperCase()],
                modelGroupeNiveau1: [this.data.model_groupe_niv1.toLowerCase()],
                modelNomCompl: [this.data.model_nom_compl.toUpperCase()],
                modelId: [this.data.modelId],
              }
            }
          },
          onStateChange: function ({ uiState, setUiState }) {
            setUiState(uiState);
          },
        };
        if (!this.motorisation && !this.finition) {
          this.filterIsFinished = true
          this.getData([])
      }
        if (this.motorisation) {
          this.totalFilter++;
          if(!this.filterMotorisation){
            this.motorisation = this.motorisation.replace(/-/g, ' ').replace(/\+/g, ' ');
            this.motorizationWithModel = this.data.model.toString().replace(/-/g, ' ') + " " + this.motorisation;
            this.motorizationWithModelNomCompl = this.data.model_nom_compl.toString().replace(/-/g, ' ') + " " + this.motorisation;

            let tabMotorisations = [this.motorizationWithModel, this.motorizationWithModelNomCompl]

            tabMotorisations.forEach(async el => {
              await this.index.search('', {
                facetFilters: ['motorisationForElastic:' + el.toLowerCase()]
              }).then((hits) => {
                this.tabMotor.push(el)
                if (hits.nbHits > 0) {
                  this.testMotor = el
                }
              })
              if (this.tabMotor.length == 2) {
                if (this.testMotor) {
                  this.filterMotorisation = this.testMotor.toLowerCase()
                  this.state.set(this.FILTER_MOTORISATION,this.filterMotorisation)
                  this.getData(['motorisationForElastic:'+this.filterMotorisation])
                } else {
                  this.filterMotorisation = this.motorisation.toLowerCase()
                  this.state.set(this.FILTER_MOTORISATION,this.filterMotorisation)
                  this.getData(['motorisationForElastic:'+this.filterMotorisation])

                }
              }
            })
          }else{
            this.addRouteConfig('motorisationForElastic', this.filterMotorisation)
          }
          }


        if (this.finition) {
          this.totalFilter++;
          if(!this.filterFinition){
            this.finition = this.finition.replace(/-/g, ' ').replace(/\+/g, ' ');
            this.finitionWithModel = this.data.model.toString().replace(/-/g, ' ') + " " + this.finition;
            this.finitionWithModelNomCompl = this.data.model_nom_compl.toString().replace(/-/g, ' ') + " " + this.finition;

            let tabFinitions = [this.finitionWithModel, this.finitionWithModelNomCompl]

            tabFinitions.forEach(async el => {
              await this.index.search('', {
                facetFilters: ['finitionForElastic:' + el.toLowerCase()]
              }).then((hits) => {
                this.tabFinition.push(el)
                if (hits.nbHits > 0) {
                  this.testFinition = el
                }
              })
              if (this.tabFinition.length == 2) {
                if (this.testFinition) {
                  this.filterFinition = this.testFinition.toLowerCase()
                  this.state.set(this.FILTER_FINITION,this.filterFinition)
                  this.getData(['finitionForElastic:'+this.filterFinition])
                } else {
                  this.filterFinition = this.finition.toLowerCase()
                  this.state.set(this.FILTER_FINITION,this.filterFinition)
                  this.getData(['finitionForElastic:'+this.filterFinition])
                }
              }
            }
            )
          }else{
            this.addRouteConfig('finitionForElastic', this.filterFinition)
          }
        }

        if (this.isBrowser) {
          this.configResults.routing = {
            router: history({
              createURL({ qsModule, location, routeState, }) {
                const { origin, pathname, hash } = location;
                const indexState = routeState || {};
                const objFilters = { prod_ELITE_OFFERS: { refinementList: {}, range: {}, sortBy: null, query: "" } }
                if(routeState.prod_ELITE_OFFERS?.refinementList?.modelId?.length > 0){
                  routeState.prod_ELITE_OFFERS.refinementList.modelId = []
                }
                if(!routeState.prod_ELITE_OFFERS?.refinementList?.marque || routeState.prod_ELITE_OFFERS?.refinementList?.marque?.length == 0){
                  if(routeState.prod_ELITE_OFFERS?.refinementList){
                    routeState.prod_ELITE_OFFERS.refinementList.modelGroupeNiveau1 = [];
                    routeState.prod_ELITE_OFFERS.refinementList.modelNomCompl = [];
                  }
                }
                objFilters.prod_ELITE_OFFERS.refinementList = routeState.prod_ELITE_OFFERS?.refinementList
                objFilters.prod_ELITE_OFFERS.range = routeState.prod_ELITE_OFFERS?.range
                objFilters.prod_ELITE_OFFERS.sortBy = routeState.prod_ELITE_OFFERS?.sortBy
                objFilters.prod_ELITE_OFFERS.query = routeState.prod_ELITE_OFFERS?.query
                let queryString = qsModule.stringify(objFilters);

                if (queryString.includes('loyers.loyer_mensuel')) {
                  queryString = queryString.replace('loyers.loyer_mensuel', 'loyerMensuel')
                  queryString = queryString.replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')

                } else if (queryString.includes('loyers.apport')) {
                  queryString = queryString.replace('loyers.apport', 'apport')
                  queryString = queryString.replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')

                } else if (queryString.includes('loyers.kilometres')) {
                  queryString = queryString.replace('loyers.kilometres', 'kilometres')
                  queryString = queryString.replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')

                } else if (queryString.includes('loyers.nb_loyer')) {
                  queryString = queryString.replace('loyers.nb_loyer', 'nbLoyer')
                  queryString = queryString.replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')

                }
                if (!indexState.query && !window.location.href.includes('comparateur')) {
                  window.location.href = `${origin}${'/recherche'}?${queryString}${hash}`
                }
                return `${origin}${'/recherche'}?${queryString}${hash}`
              },
            })
          }
        }

        this.subtexttop = res.subtexttop
        if (!this.isAsp){
          this.text = this.data.textTop;
          this.html = this.sanitizer.bypassSecurityTrustHtml(this.text);
          this.textHtml=this.html   
        }
        this.resume = this.data.resume;
        this.avisList = this.data.avis;
        if (this.data.type == 'modelVn' || this.data.type == 'marque_modele_offres_finition_vn' || this.data.type == 'marque_modele_offres_motorisation_vn' || this.data.type == 'modelMoinsCherRewrite') {
          this.meta.removeTag('property="og:image"');
          this.meta.removeTag('property="og:title"');
          this.meta.removeTag('property="og:description"');
          this.meta.removeTag('property="og:url"');
          this.meta.addTags([
            {
              property: 'og:image',
              content: this.data.img,
            },
            {
              property: 'og:title',
              content: "J'aime les offres sur les " + this.data.mark.toUpperCase() + " " + this.data.model.toUpperCase() + " neuve proposées par Elite Auto.",
            },
            {
              property: 'og:description',
              content: "Offres de remise sur les " + this.data.mark.toUpperCase() + " " + this.data.model.toUpperCase() + " ! Leader français des mandataires automobiles, Elite Auto vous permet d'acheter votre voiture neuve avec d'importantes remises.",
            },
            {
              property: 'og:url',
              content: this.data.modelVnUrl,
            }
          ]);
        }
        if (this.data.canonical)
          this.canonical = this.data.canonical
        else if (this.config.getCanonicalUrl().includes('.asp') )
          this.canonical = this.config.getCanonicalUrl().split('?')[0]
        else
          this.canonical = this.config.getCanonicalUrl()
        this.createCanonicalURL(this.canonical)
      }
    );
   
    if (this.modelId != 0){
      this.service.getEkomi().subscribe(
        data => {
          this.ekomiAvis = data.listeEkomi
        }
      )
    }
  }
  getTag() {
    if (!this.schemaTagData){
      this.service.getTagSchema(this.mark, this.modelId, this.type, this.totalResults, this.finition, this.motorisation).subscribe(data => {
        this.config.getWindow().document.getElementById('schematag').innerHTML = data;
        this.schemaTagData = data
        this.state.set(this.SCHEMA_TAG_DATA_KEY, <string>data.content);
      })
    }
   
    if (!this.googleTagData){
      this.service.getTagGoogle(this.mark, this.modelId, this.type, this.finition, this.motorisation).subscribe(data => {
        this.config.getWindow().document.getElementById('taggoogle').innerHTML = data;
        this.googleTagData = data
        this.state.set(this.GOOGLE_TAG_DATA_KEY, <string>data.content);
      })
    }
  }
  setMeta() {
    this.titlePage = this.state.get(this.MODEL_TITLE_KEY, null);
    this.descriptionPage = this.state.get(this.MODEL_DESCRIPTION_KEY, null);
    if (!this.titlePage && !this.descriptionPage) {
      this.service.getMetas(this.eurotaxId, this.modelId, this.type, this.finition, this.motorisation).subscribe(data => {
        this.title.setTitle(data.title);
        this.meta.updateTag({
          name: 'description',
          content: data.description,
        });
        this.state.set(this.MODEL_TITLE_KEY, <string> data.title);
        this.state.set(this.MODEL_DESCRIPTION_KEY, <string> data.description);
      });
    } else {
      this.title.setTitle(this.titlePage);
      this.meta.updateTag({
        name: 'description',
        content: this.descriptionPage,
      });
    }
  }
  setMetaPasCher() {
    this.service.getVoiturePasCher(this.modelId).subscribe(data => {
      this.text = data.text
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.text);
      this.textHtml=this.html
      this.title.setTitle(data.title);
      this.meta.updateTag({
        name: 'description',
        content: data.description,
      });
    });
  }
  createCanonicalURL(url) {
    (this.config.getWindow().document.querySelectorAll('[rel="canonical"]')).forEach(link => link.remove())
    let link;
    link = this.config.getWindow().document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.config.getWindow().document.head.appendChild(link);
    link.setAttribute('href', url);
  }
  checkCompareEvent() {
    this.totalCompare = this.cardService.getCompareSelectedVeh().length
  }
  comparatorRedirect() {
      this.router.navigate(['recherche/comparateur']);
  }
  splitText(){
    this.textHtmlSplit=!this.textHtmlSplit;
   }
   closeFilterEvent() {
    this.filterMobileShow = false
  }
  getSearchResults($event) {
    this.searchResults = $event
  }

  generateAndAppendBreadcrumbScript(data) {
    const itemList = data.map((item, index) => {
      let fullURL = `${item.url.startsWith("https") ? item.url : `${this.siteUrl.replace(/\/$/, '')}${item.url}`}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": { "@id": fullURL },
        "name": item.text.replace(/"/g, '')
      };
    });
    
    this.breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList
    };

    const breadcrumbListElement = this.config.getWindow().document.createElement('div');
    breadcrumbListElement.id = 'breadcrumbList';

    const script = this.config.getWindow().document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.breadcrumbList, null, 2);
    breadcrumbListElement.appendChild(script);
    this.config.getWindow().document.body.appendChild(breadcrumbListElement);
  }
}