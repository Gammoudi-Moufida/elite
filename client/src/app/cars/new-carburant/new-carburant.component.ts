import { isPlatformBrowser, NgIf, NgClass } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import {  makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NewCarburantService } from './new-carburant.service';
import { history } from 'instantsearch.js/es/lib/routers'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlgoliaResultsService } from 'src/app/search/algolia-results/algolia-results.service';
import { AlgoliaFiltersService } from 'src/app/search/algolia-filters/algolia-filters.service';
import { AlgoliaHitsPerPageComponent } from '../../shared/algolia-hits-per-page/algolia-hits-per-page.component';
import { AlgoliaPaginationComponent } from '../../shared/algolia-pagination/algolia-pagination.component';
import { AlgoliaResultsComponent } from '../../search/algolia-results/algolia-results.component';
import { AlgoliaFiltersComponent } from '../../search/algolia-filters/algolia-filters.component';
import { AlgoliaFilterOrderComponent } from '../../search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFilterTextComponent } from '../../search/algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { TextSeoComponent } from '../shared/text-seo/text-seo.component';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';
import { NgAisInstantSearchModule, NgAisConfigureModule, NgAisStatsModule, createSSRSearchClient } from 'angular-instantsearch';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { PromoService } from 'src/app/promo/promo.service';
import { TwNavLinkComponent } from '../shared/tw-nav-link/tw-nav-link.component';
import { OccasionNavLinkComponent } from '../occasion/occasion-nav-link/occasion-nav-link.component';
import { ScrollToFragmentService } from 'src/app/core/scroll/scroll-to-fragment.service';
@Component({
    selector: 'app-new-carburant',
    templateUrl: './new-carburant.component.html',
    styleUrls: ['./new-carburant.component.css'],
    standalone: true,
    imports: [NgAisInstantSearchModule, OccasionNavLinkComponent, NgIf, NgAisConfigureModule, SubHeaderComponent, TextSeoComponent, AlgoliaFilterTextComponent, AlgoliaFilterOrderComponent, NgClass, NgAisStatsModule, AlgoliaFiltersComponent, AlgoliaResultsComponent, AlgoliaPaginationComponent, AlgoliaHitsPerPageComponent, TwNavLinkComponent]
})
export class NewCarburantComponent implements OnInit {
  fuel: string;
  typeCar: string;
  markId: string;
  filterMobileShow: boolean = false;
  imgUrl: any;
  loadingResult: boolean=true;

  dataMark: any;
  isBrowser: any;
  currentPage: number = 1;
  hitsPerPage: number = 0;
  countPerPage: number = 0;
  mark: any = null;
  blockFixed: boolean;
  data: any;
  typePage: any;
  type: string;
  configResults: any;
  initialUiState: any;
  totalFilter: number = 0;
  showComparator:boolean=false;
  screenMode: number;
  nbHits : number = 29;

  totalResult: any;
  hits:any
  TOTAL_RESULT = makeStateKey<number>('modelTotalResults');
  SEARCH_RESULT = makeStateKey<any>('modelSearchResults');
  FLASHSALE_DATA = makeStateKey<number>('flashsaledata');
  GAMME_LINKS = makeStateKey<number>('gammelinksdata');

  searchResults: any;
  sortBy: string;
  searchClient: any;
  index: any;
  subDomaine: string;
  vehType: string;
  itsNotSearchPage: boolean = false;
  flashSaleData: any;
  screenWidth: number;
  segment: any;
  segmentVeh: any;
  gammeLinks: any;
  breadcrumbList: any;
  siteUrl: string;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    if (this.config.getWindow().document.scrollingElement.scrollTop > 70) {
      this.blockFixed = true;
    }
    else
      this.blockFixed = false;
  }
  constructor(private activatedRoute: ActivatedRoute,
               private router: Router,
               private config: ConfigService,
               private service: AlgoliaResultsService,
               private filterService: AlgoliaFiltersService,
               private newCarburantService: NewCarburantService,
               private promoService: PromoService,
               private title: Title,
               private meta: Meta,
               private state: TransferState,
               private httpClient: HttpClient,
               @Inject(PLATFORM_ID) private platform: Object,
               @Optional() @Inject(RESPONSE) private response: Response,
               private scrollToFragmentService: ScrollToFragmentService
               ) {}

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.isBrowser = isPlatformBrowser(this.platform);
    this.hits = this.state.get(this.SEARCH_RESULT, null);
    this.gammeLinks = this.state.get(this.GAMME_LINKS, null);
    this.screenWidth = this.config.getWindow().innerWidth;
    this.siteUrl = this.config.getSiteUrl();
    this.visibleItemsDetector();

    if(this.hits){
      this.loadingResult = false
    }
    this.flashSaleData = this.state.get(this.FLASHSALE_DATA, null);

    if(this.config.getWindow().document.location.pathname.includes('/leasing')){
      this.subDomaine = 'leasing'
    }else{
      this.subDomaine = this.config.getType();
    }
   
    
    this.totalResult = this.state.get(this.TOTAL_RESULT, null);
    this.activatedRoute.paramMap.subscribe(params => {
      if (params) {
        this.type = params['params']['type']
       
        if (params['params']['energie'] === 'hydrogene'  ) {
          this.fuel = 'hydrogène' 
        }else {
          this.fuel = params['params']['energie']?params['params']['energie']:null
        }
        if (params['params']['typeCar']) {
          this.typeCar = params['params']['typeCar']?params['params']['typeCar']:null
        }
        
        if (params['params']['segment']) {
         this.segment = params['params']['segment'];
        
          const segmentMapping = {
            "coupe": "coupe",
            "cabriolet": "cabriolet",
            "roadster": "cabriolet",
            "spider": "cabriolet",
            "ludospace": "ludospace",
            "monospace": "monospace",
            "multispace": "multispace",
            "4x4": "suv_4x4_crossover",
            "suv": "suv_4x4_crossover",
            "berline": "berline_compacte",
            "compacte": "berline_compacte",
            "break": "break",
            "citadine": "citadine",
            "fourgon" : "fourgon",
            "fourgonnette" : "fourgonnette",
            "camion" :"camion",
            "pick_up" : "pick_Up"
          };
        
          this.segmentVeh = segmentMapping[this.segment] || null;
        }
       
        
        this.typePage = params['params']['typePage']
        this.sortBy = "prod_ELITE_OFFERS_fuel"        

        if(this.type == "marque_carburant_utility"){
          this.vehType = "utility"
          this.totalFilter++
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
                  typeForRecherche: ["Professionnel"],
                }
              }
            },
            onStateChange: function ({ uiState, setUiState }) {
              setUiState(uiState);
            },
          };
        }else if (this.typePage == 'occasion') {
          this.totalFilter++
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
                sortBy:'prod_ELITE_OFFERS_fuel'
              }
            },
            onStateChange: function ({ uiState, setUiState }) {
              setUiState(uiState);
            },
          };
        } else {
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
                },
                sortBy:'prod_ELITE_OFFERS_fuel'
              }
            },
            onStateChange: function ({ uiState, setUiState }) {
              setUiState(uiState);
            },
          };
        }

        if (params['params']['mark']) {
          this.mark = params['params']['mark']?params['params']['mark']:null
          this.filterService.getMarkAccordion().subscribe(data => {
            this.dataMark = data
            for (let i = 0; i < this.dataMark.length; i++) {
              if (data[i]['nom'] == this.mark.toUpperCase().replace("_", " ").replace("-", " ")) {
                this.markId = data[i]['id'].toString()
              }
            }
          })
        }     
      }
    });
  
    this.setMeta();
    if(this.typePage == "segmentVehicule"){
      this.getModelsLinks();
    }
    

    if(this.fuel!= null){
      this.totalFilter++
      let key='energieNormalized'
      this.configResults=this.addRouteConfig(key,this.fuel.replace('leasing-','').replace('_',' / '))
    }
    if(this.mark!= null){
      this.totalFilter++
      let key='marque'
      this.configResults=this.addRouteConfig(key,this.mark.toUpperCase().replace("_", " ").replace(/-/g, " "))
      this.itsNotSearchPage = true;
    }

    if (this.typeCar != null || this.segmentVeh != null) {
      this.totalFilter++;
      let key = 'segmentEliteGroup';
      let value = this.typeCar != null ? this.typeCar : this.segmentVeh;
      this.configResults = this.addRouteConfig(key, value);
    }

    if(this.type == "marque_carburant_utility" && this.subDomaine != 'entreprise'){
        if (this.response)
          this.response.status(404);
        this.router.navigateByUrl('/not-found', { skipLocationChange: true });
      }else if(this.isBrowser){
      this.configResults.routing = {
        router: history({
          createURL({ qsModule, location, routeState, }) {
            const { origin, pathname, hash } = location;
            const indexState = routeState || {};
            const objFilters = { prod_ELITE_OFFERS: { refinementList: {}, range: {}, sortBy: null, query: "" } }
            objFilters.prod_ELITE_OFFERS.refinementList = routeState.prod_ELITE_OFFERS.refinementList
            objFilters.prod_ELITE_OFFERS.range = routeState.prod_ELITE_OFFERS.range
            // objFilters.prod_ELITE_OFFERS.sortBy = routeState.prod_ELITE_OFFERS.sortBy
            objFilters.prod_ELITE_OFFERS.query = routeState.prod_ELITE_OFFERS.query
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

            if (!indexState.query && !window.location.href.includes('comparateur')) {
               window.location.href = `${origin}${'/recherche'}?${queryString}${hash}`
            }
            return `${origin}${'/recherche'}?${queryString}${hash}`
          },
        })
      }
    }

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

  setMeta() {
    
    let functionName =this.typePage == 'occasion'?'getMetaOccasion':'getMeta';
    let typeVeh = this.typeCar != null ? this.typeCar : this.segment;
        typeVeh = typeVeh ? typeVeh : null;
    this.newCarburantService[functionName](this.fuel, this.mark, typeVeh, this.typePage).subscribe(
      data => {
        this.data = data
        this.title.setTitle(data.metaTitle)
        this.meta.addTag({
          name: 'description',
          content: data.metaDescription,
        });
        if(data?.menu){
          this.generateAndAppendBreadcrumbScript(data.menu)
        }
      }
    )
  }
  getSearchResults($event) {
    this.hitsPerPage = $event.results?.hitsPerPage
    this.currentPage = $event.state?.page
    this.countPerPage = this.hitsPerPage * (this.currentPage + 1)
    this.searchResults = $event
    if(!this.hits){
      if ($event.results?.nbHits != null) {
        this.totalResult = $event.results?.nbHits;
        this.hits = $event.results?.hits
        this.loadingResult = false
        this.state.set(this.TOTAL_RESULT, <any> this.totalResult);
        this.state.set(this.SEARCH_RESULT, <any> this.hits);
      }
    }
  }

  getModelsLinks(){
    if(!this.gammeLinks){
      this.newCarburantService.getModelsLinks(this.segment).subscribe(
        res => {
          this.gammeLinks = res
          this.state.set(this.GAMME_LINKS, <any> this.gammeLinks);
        }
      )
    }
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
