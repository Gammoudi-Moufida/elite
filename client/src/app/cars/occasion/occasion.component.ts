import { Component, OnInit, HostListener, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Event as EventRouter, NavigationStart } from '@angular/router';
import { OccasionService } from './occasion.service';
import { ConfigService } from 'src/app/shared/config/config.service';
import { MetaService } from 'src/app/shared/meta/meta.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { history } from 'instantsearch.js/es/lib/routers'
import { AlgoliaCardService } from 'src/app/search/algolia-card/algolia-card.service';
import { OccasionNavLinkComponent } from './occasion-nav-link/occasion-nav-link.component';
import { AlgoliaHitsPerPageComponent } from '../../shared/algolia-hits-per-page/algolia-hits-per-page.component';
import { AlgoliaPaginationComponent } from '../../shared/algolia-pagination/algolia-pagination.component';
import { AlgoliaResultsComponent } from '../../search/algolia-results/algolia-results.component';
import { AlgoliaFiltersComponent } from '../../search/algolia-filters/algolia-filters.component';
import { AlgoliaFilterOrderComponent } from '../../search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFilterTextComponent } from '../../search/algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { TextSeoComponent } from '../shared/text-seo/text-seo.component';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';
import { NgAisInstantSearchModule, NgAisConfigureModule, NgAisStatsModule, createSSRSearchClient } from 'angular-instantsearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PromoService } from 'src/app/promo/promo.service';
import { HomeNextService } from 'src/app/home-next/home-next.service';
import { ScrollToFragmentService } from 'src/app/core/scroll/scroll-to-fragment.service';
@Component({
    selector: 'app-occasion',
    templateUrl: './occasion.component.html',
    styleUrls: ['./occasion.component.css'],
    standalone: true,
    imports: [NgIf, NgAisInstantSearchModule, NgAisConfigureModule, SubHeaderComponent, TextSeoComponent, AlgoliaFilterTextComponent, AlgoliaFilterOrderComponent, NgClass, NgAisStatsModule, AlgoliaFiltersComponent, AlgoliaResultsComponent, AlgoliaPaginationComponent, AlgoliaHitsPerPageComponent, OccasionNavLinkComponent, DecimalPipe]
})
export class OccasionComponent implements OnInit {
  totalResult: any;
  loadingResult: boolean = true;
  currentPage: number = 1;
  showImg: boolean;
  screenMode: number;
  screenWidth: number;
  event: Event;
  subDomaine: string;
  isBrowser: boolean;
  blockFixed: boolean;
  mark: string;
  generation: string;
  typePage: string;
  markId: number;
  modelId: number[];
  filterMobileShow: boolean = false;
  typeCar: string;
  totalFilter: number = 0;
  hitsPerPage: number = 0;
  countPerPage: number = 0;
  TAG_DATA_KEY = makeStateKey<string>('tagData');
  TEXT_REF_DATA_KEY = makeStateKey<any>('textRefData');
  TOTAL_RESULT = makeStateKey<number>('totalResults');
  SEARCH_RESULT = makeStateKey<any>('searchResults');
  FLASHSALE_DATA = makeStateKey<number>('flashsaledata');
  nbHits : number = 29;

  isFlashSale: any;

  modelForApi: any;
  generationForApi: any;
  data: any;
  markForApi: any;
  offreId: number;
  type: any;
  dataReady: boolean;
  groupeNiveau1: any;
  totalCompare: number = 0;
  homeTagData: string;
  price: any;
  sortByPagePasChere: any;
  configResults: any;
  ready: boolean = false;
  pricePara: any;
  load: boolean = false;
  showComparator: boolean;
  sortBy: string;
  hits: any;
  searchResults: any;
  transmission: any;
  finition: any;
  itsNotSearchPage : boolean = false;
  searchClient: any;
  typeVehicule: any;
  typeVeh: any;
  fuel: any;
  flashSaleData: any;
  color: string;
  breadcrumbList: any;
  siteUrl: string;
 
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.isBrowser = false;
    this.showImg = true
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if(this.config.getWindow().document.scrollingElement.scrollTop > 300) {
      this.blockFixed = true;
    }else {
      this.blockFixed = false;
    }
  }
  @HostListener('window:click') clickInside() {
    this.isBrowser = false;
    this.showImg = true;;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.isBrowser = false;
  }
  constructor(
    private route: ActivatedRoute,
    private config: ConfigService,
    private occasionService: OccasionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platform: Object,
    @Optional() @Inject(RESPONSE) private response: Response,
    private metaService: MetaService,
    private promoService: PromoService,
    private homeService: HomeNextService,
    private state: TransferState,
    private cardService: AlgoliaCardService,
    private httpClient: HttpClient,
    private scrollToFragmentService: ScrollToFragmentService
  ) {
    this.router.events.subscribe((event: EventRouter) => {
      if (event instanceof NavigationStart) {
        //**** reset transferState data when navigate new route ****//
        this.state.remove(this.TEXT_REF_DATA_KEY);
        this.state.remove(this.SEARCH_RESULT);
        this.state.remove(this.TOTAL_RESULT);
        
        this.dataReady = false;
      }
    });
  }
  ngOnInit() {
    this.siteUrl = this.config.getSiteUrl();
    this.totalResult = this.state.get(this.TOTAL_RESULT, null);
    this.hits = this.state.get(this.SEARCH_RESULT, null);
    if(this.hits){
      this.loadingResult = false
    }
    this.showComparator=true
    this.data = this.state.get(this.TEXT_REF_DATA_KEY, null)
    this.homeTagData = this.state.get(this.TAG_DATA_KEY, null);
    this.flashSaleData = this.state.get(this.FLASHSALE_DATA, null);

    if(isPlatformBrowser(this.platform))
      this.config.getWindow().scroll({top: 0, left: 0, behavior: 'smooth'});
    this.screenWidth = this.config.getWindow().innerWidth;
    this.subDomaine = 'occasion';
    this.isBrowser = isPlatformBrowser(this.platform);
    this.visibleItemsDetector();
    this.route.paramMap.subscribe(params => {
      this.typePage = params['params']['typePage'];
      this.type = params['params']['type'];
      this.offreId = params['params']['offreId'];
      this.markForApi = params['params']['mark'];
      this.mark = this.markForApi?.replace(/\-/g, ' ') ?? null;
      this.modelForApi = params['params']['model'];
      this.generationForApi = params['params']['generation'];
      if(params['params']['transmission']){
        this.transmission = params['params']['transmission']
      } 
      if(params['params']['finition'] ){
        this.finition = params['params']['finition']
      }
      if(params['params']['color'] ){
        this.color = params['params']['color']
      }
      if (this.isBrowser) {
        this.checkCompareEvent();
      }
     
      if (params['params']['typeCar']) {
        this.typeCar = params['params']['typeCar']
      }
      if (params['params']['price']) {
        this.price = params['params']['price']
        let str1 = ":"
        this.pricePara = str1.concat(this.price);
      }

      if (params['params']['typeVehicule']) {
        this.typeVeh = params['params']['typeVehicule']
        if( this.typeVeh == 'utilitaire'){
          this.typeVehicule = 'Professionnel'
        }else{
          this.typeVehicule = 'Particulier'
        }
      }

      if (params['params']['energie']) {
        this.fuel = params['params']['energie']
      }

      this.generation = this.generationForApi?.replace(/\-/g, ' ') ?? null;

      if(this.typePage == 'occasion_home' || this.typePage == 'occasion_marque' || this.typePage == 'occasion_model' || this.typePage == 'occasion_generation'|| this.typePage == 'occasion_boite' || this.typePage =='occasion_categorie' || this.typeVeh=='particulier'|| this.typeVeh=='utilitaire' || this.typePage=='occasion_transmission_marque'){
        this.load = true
      }
      this.listDataFilter()
    })

    this.promoService.getPromo().subscribe(
      res => {
        if(res) {
          this.flashSaleData = res.find(item => item.encartPromotion)
          if(!this.flashSaleData) this.nbHits = 30
          this.state.set(this.FLASHSALE_DATA, <any> this.flashSaleData);
        }
      })
  }
  ngAfterViewInit() {
    this.scrollToFragmentService.scrollToFragment();
  }
  onPageChange() {
    window.scrollTo(0, 0);
  }
  addRouteConfig(key, value) {
    this.configResults.initialUiState.prod_ELITE_OFFERS.refinementList[key] = [value]
    return this.configResults
  }
  listDataFilter() {
    if (this.typePage == 'occasion_home' 
    || this.typePage == 'occasion_categorie' 
    || this.typePage == 'occasion_pas_chere' 
    || this.typePage == 'occasion_budget' 
    || this.typePage == 'occasion_type_budget' 
    || this.typePage == 'old_occasion_home' 
    || this.typePage == 'occasion_type_vehicule'
    || this.typePage == 'occasion_boite'
    || this.typePage == 'occasion_carburant_boite'
    || this.typePage == 'occasion_color'
    || this.typePage == 'occasion_categorie_boite'
    ) {
      this.getData();
    }
    else {
      this.occasionService.getFilterData(this.markForApi, this.modelForApi, this.generationForApi).subscribe(res => {
        if (res?.is404 == true) {
          if (this.response)
            this.response.status(404);
          this.router.navigateByUrl('/not-found', { skipLocationChange: true });
        } else {
          this.markId = res?.markId
          this.modelId = res?.modelId
          if (res?.ModelNomCompl)
            this.generation = res.ModelNomCompl
          if (res?.groupeNiveau1) {
            this.groupeNiveau1 = res.groupeNiveau1;
            this.modelForApi = res.groupeNiveau1.replace(/\//g, '-').replace(/\+/g, '-').replace(/ /g, '-');
          }
          if (!res || !this.markId)
            this.markId = -1
          this.getData();
        }
      })
    }
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

  getData() {
    if (!this.data) {
      if (this.typePage == 'occasion_type_vehicule'
        || this.typePage == 'occasion_type_vehicule_marque'
        || this.typePage == 'occasion_categorie_vehicule_marque'
        || this.typePage == 'occasion_transmission_marque'
        || this.typePage == 'occasion_carburant_categorie_marque'
        || this.typePage == 'occasion_carburant_marque_modele'
        || this.typePage == 'occasion_boite'
        || this.typePage == 'occasion_carburant_boite'
        || this.typePage == 'occasion_color'
        || this.typePage == 'occasion_categorie_boite'
      ) {
        this.getReferencementNewUrls()
      }else{
        this.textRef();
      }
    }
    if (!this.homeTagData) {
      this.getTags();
    }
    this.checkRedirect();
    this.dataReady = true
    
    if(this.typePage == "occasion_pas_chere"){
      this.sortBy = 'prod_ELITE_OFFERS_price_asc'
    }else{
      this.sortBy = 'prod_ELITE_OFFERS_occasion'
    }
    this.configResults = {
      searchClient: createSSRSearchClient({
        appId: this.config.algolia.appId,
        apiKey: this.config.algolia.appKey,
        makeStateKey,
        HttpHeaders,
        transferState: this.state,
        httpClient: this.httpClient,
      }),
      indexName: this.config.algolia.indexName,
      initialUiState: {
        prod_ELITE_OFFERS: {
          query: '',
          refinementList: {
            category: [1],
          },
          hitsPerPage : this.nbHits,
          sortBy : this.sortBy 
        },
      },
      onStateChange: function ({ uiState, setUiState }) {
        setUiState(uiState);
      },
    };
    this.totalFilter++;
    if(this.price){
      this.configResults.initialUiState.prod_ELITE_OFFERS.numericMenu = {
        priceForFront: this.pricePara,
      }
      this.configResults.initialUiState.prod_ELITE_OFFERS.range = {
        priceForFront: this.pricePara,
      }
      this.totalFilter++;
    }
    if(this.isBrowser){
      this.configResults.routing = {
        router: history({
          createURL({ qsModule, location, routeState, }) {
            const { origin, pathname, hash } = location;
            const indexState = routeState || {};
            const objFilters = { prod_ELITE_OFFERS: { refinementList: {}, range: {}, sortBy: null, query: "" } }

            if(!routeState.prod_ELITE_OFFERS?.refinementList?.marque || routeState.prod_ELITE_OFFERS?.refinementList?.marque?.length == 0) {
              if (routeState.prod_ELITE_OFFERS?.refinementList) {
                routeState.prod_ELITE_OFFERS.refinementList.modelGroupeNiveau1 = [];
                routeState.prod_ELITE_OFFERS.refinementList.modelNomCompl = [];
              }
            }
            objFilters.prod_ELITE_OFFERS.refinementList = routeState.prod_ELITE_OFFERS?.refinementList
            objFilters.prod_ELITE_OFFERS.range = routeState.prod_ELITE_OFFERS?.range
            if(routeState.prod_ELITE_OFFERS?.sortBy === 'prod_ELITE_OFFERS_price_asc'){
              objFilters.prod_ELITE_OFFERS.sortBy = routeState.prod_ELITE_OFFERS?.sortBy
            }
            // objFilters.prod_ELITE_OFFERS.sortBy = routeState.prod_ELITE_OFFERS?.sortBy
            objFilters.prod_ELITE_OFFERS.query = routeState.prod_ELITE_OFFERS?.query
            let queryString = qsModule.stringify(objFilters);

            if(queryString.includes('loyers.loyer_mensuel')){
              queryString = queryString.replace('loyers.loyer_mensuel','loyerMensuel')
              queryString = queryString.replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS')

            }else if(queryString.includes('loyers.apport')){
              queryString = queryString.replace('loyers.apport','apport')
              queryString = queryString.replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS')

            }else if(queryString.includes('loyers.kilometres')){
              queryString = queryString.replace('loyers.kilometres','kilometres')
              queryString = queryString.replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS')

            }else if(queryString.includes('loyers.nb_loyer')){
              queryString = queryString.replace('loyers.nb_loyer','nbLoyer')
              queryString = queryString.replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS').replace('prod_ELITE_OFFERS','prod_ELITE_LOYERS')

            }

            if (Object.keys(routeState).length !== 0 && !indexState.query && !window.location.href.includes('comparateur')) {
              return window.location.href = `${origin}${'/recherche'}?${queryString}${hash}`
            } 
          },
        })
      }
    }

    if (this.mark != null) {
      let key = 'marque'
      this.configResults = this.addRouteConfig(key, this.mark.toUpperCase())
      this.itsNotSearchPage = true
      this.totalFilter++;
    }
    if (this.modelForApi != null) {
      let key = 'modelGroupeNiveau1'
      this.configResults = this.addRouteConfig(key, this.modelForApi)
      this.itsNotSearchPage = true
      this.totalFilter++;
    }
    if (this.generationForApi != null) {
      let key = 'modelNomCompl'
      this.configResults = this.addRouteConfig(key, this.generationForApi.replace(/-/g, ' '))
      this.itsNotSearchPage = true
      this.totalFilter++;
    }
    if (this.typeCar != null) {
      let key = 'segmentEliteGroup'
      this.configResults = this.addRouteConfig(key, this.typeCar)
      this.totalFilter++;
    }
    if (this.transmission != null) {
      let key = 'transmissionNormalized'
      this.configResults = this.addRouteConfig(key, this.transmission)
      this.itsNotSearchPage = true
      this.totalFilter++;
    }
    if (this.finition != null) {
      let key = 'finitionForElastic'
      this.configResults = this.addRouteConfig(key, this.finition.toLowerCase())
      this.itsNotSearchPage = true
      this.totalFilter++;
    }
    if (this.color != null) {
      let key = 'couleurExterieurNormalized'
      this.configResults = this.addRouteConfig(key, this.color.toLowerCase().replace(this.color[0],this.color[0].toUpperCase()))
      this.itsNotSearchPage = true
      this.totalFilter++;
    }

    if (this.typeVehicule != null) {
      let key = 'typeForRecherche'
      this.configResults = this.addRouteConfig(key, this.typeVehicule)
      this.itsNotSearchPage = true
      this.totalFilter++;
    }

    if(this.fuel!= null){
      let key='energieNormalized'
      this.configResults=this.addRouteConfig(key,this.fuel.replace('_',' / '))
      this.totalFilter++;
    }
  }
  textRef() {
    this.occasionService.getTextRef(this.markForApi, this.modelForApi, this.generationForApi, this.typeCar, this.price, this.typePage, this.transmission, this.finition).subscribe(
      data => {
        this.data = data
        if(this.totalResult){
          this.data.metaDescription = this.data?.metaDescription?.replace('[nbAnnonces]',this.totalResult)
          this.data.metaTitle = this.data?.metaTitle?.replace('[nbAnnonces]',this.totalResult)
          this.data.resume = this.data?.resume?.replace('[nbAnnonces]',this.totalResult)
          this.data.textTop = this.data?.textTop?.replace('[nbAnnonces]',this.totalResult)
          this.data.title = this.data?.title?.replace('[nbAnnonces]',this.totalResult)
        }
        if(this.data?.menu){
          this.generateAndAppendBreadcrumbScript(this.data.menu)
        }
        this.state.set(this.TEXT_REF_DATA_KEY, <any>data);
        this.metaService.updateTitle(this.data.metaTitle)
        this.metaService.updateDescription(this.data.metaDescription)
      }
    );
  }

  getReferencementNewUrls(){
    this.occasionService.getTextReferencement (this.typeVeh, this.markForApi, this.typePage, this.typeCar, this.transmission, this.fuel, this.modelForApi, this.color).subscribe(
      data => {
        this.data = data
        if(this.data?.menu){
          this.generateAndAppendBreadcrumbScript(this.data.menu)
        }
        this.state.set(this.TEXT_REF_DATA_KEY, <any>data);
        this.metaService.updateTitle(data.metaTitle)
        this.metaService.updateDescription(data.metaDescription)
      }
    );
  }
  getTags() {
    this.homeService.getTagsHome().subscribe(data => {
      this.config.getWindow().document.getElementById('taghome').innerHTML = data.content;
      this.homeTagData = data
      this.state.set(this.TAG_DATA_KEY, <string>data.content);
    })
  }

  checkRedirect(){
    let newUrl = "https://" + this.config.getEliteAutoHost()
    let redirectRoute='';
    if (this.config.getLocation().port != "") {
      newUrl = newUrl + ":" + this.config.getLocation().port
    }
    if (this.typePage == 'old_occasion_home' ) {
      redirectRoute = newUrl+ encodeURI(`/occasion`)
    }
    if (this.typePage == 'old_occasion_marque' || this.typePage == 'old_marque_page_occasion' || this.typePage == 'old_model_page_occasion' || this.typePage == 'old_annonce_page_occasion') {
      redirectRoute = newUrl+ encodeURI(`/occasion/${this.markForApi}`)
    }
    if (this.typePage == 'old_occasion_model') {
      redirectRoute = newUrl+ encodeURI(`/occasion/${this.markForApi}/${this.modelForApi}`)
    }
    if (this.typePage == 'old_occasion_tunnel') {
      redirectRoute = newUrl+ encodeURI(`/occasion/${this.markForApi}/${this.modelForApi}/${this.generationForApi}/${this.offreId}`)
    }
    if (redirectRoute && this.response) {
      this.response.status(301);
      this.response.setHeader('Location', redirectRoute);
      this.response.end();
    }
  }
  checkCompareEvent() {
    this.totalCompare = this.cardService.getCompareSelectedVeh().length
  }
  comparatorRedirect() {
    this.router.navigate(['recherche/comparateur']);
  }
  getSearchResults($event) {
    this.hitsPerPage = $event.results?.hitsPerPage
    this.currentPage = $event.state?.page
    this.countPerPage = this.hitsPerPage * (this.currentPage + 1)
    this.searchResults = $event
      if ($event.results?.nbHits != null) {
        if(!this.hits){
          this.totalResult = $event.results?.nbHits;
          this.hits = $event.results?.hits
        }
   
        this.loadingResult = false
        this.state.set(this.TOTAL_RESULT, <any> this.totalResult);
        this.state.set(this.SEARCH_RESULT, <any> this.hits);
      }
  }
  closeFilterEvent() {
    this.filterMobileShow = false
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
