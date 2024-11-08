import { Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { IMAGE_LOADER,ImageLoaderConfig,NgClass,NgFor,NgIf,NgOptimizedImage, isPlatformBrowser} from '@angular/common';
import { PromoService } from '../promo.service';
import { TransferState, makeStateKey,} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAisInstantSearchModule, NgAisHitsModule, NgAisQueryRuleCustomDataModule, NgAisConfigureModule, createSSRSearchClient, NgAisPaginationModule, NgAisHitsPerPageModule} from 'angular-instantsearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlgoliaCardComponent } from 'src/app/search/algolia-card/algolia-card.component';
import { AlgoliaFilterOrderComponent } from 'src/app/search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { CategoriesComponent } from 'src/app/search/algolia-filters/categories/categories.component';
import { VehiculeCategorieComponent } from 'src/app/search/algolia-filters/vehicule-categorie/vehicule-categorie.component';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AlgoliaCardService } from 'src/app/search/algolia-card/algolia-card.service';
import { AlgoliaFiltersComponent } from '../../search/algolia-filters/algolia-filters.component';
import { AlgoliaResultsComponent } from 'src/app/search/algolia-results/algolia-results.component';
import { AlgoliaFilterTextComponent } from 'src/app/search/algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { AlgoliaHitsPerPageComponent } from 'src/app/shared/algolia-hits-per-page/algolia-hits-per-page.component';
import { AlgoliaPaginationComponent } from 'src/app/shared/algolia-pagination/algolia-pagination.component';
import { history } from 'instantsearch.js/es/lib/routers';
import { HomeNextService } from 'src/app/home-next/home-next.service';
import { MetaService } from 'src/app/shared/meta/meta.service';
import { ScrollToFragmentService } from 'src/app/core/scroll/scroll-to-fragment.service';

@Component({
  selector: 'app-promo-pages',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgAisInstantSearchModule,
    NgAisHitsModule,
    NgAisQueryRuleCustomDataModule,
    NgAisPaginationModule,
    NgAisHitsPerPageModule,
    CategoriesComponent,
    AlgoliaFilterOrderComponent,
    NgAisConfigureModule,
    NgbAlertModule,
    NgFor,
    AlgoliaCardComponent,
    AlgoliaPaginationComponent,
    AlgoliaHitsPerPageComponent,
    VehiculeCategorieComponent,
    AlgoliaFiltersComponent,
    AlgoliaResultsComponent,
    AlgoliaFilterTextComponent,
    NgClass
  ],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      },
    },
  ],
  templateUrl: './promo-pages.component.html',
  styleUrls: ['./promo-pages.component.css'],
})
export class PromoPagesComponent implements OnInit {
  BANNER_TOP = makeStateKey('bannerTop');
  PROMO_DATA = makeStateKey('promoDataHeader');
  ENCART_DATA = makeStateKey('encartDataHeader');
  TAG_DATA_KEY = makeStateKey<string>('tagData');
  TEXT_REF_DATA_KEY = makeStateKey<any>('textRefData');
  SEARCH_RESULT = makeStateKey<any>('searchresults');
  TOTAL_RESULT = makeStateKey<any>('totalresult');


  promoData: any;
  promoName: string;
  configResults: any;
  facetFilters: any;
  mode: string;
  screenWidth: number;
  hitsPerPage: any;
  currentPage: any;
  countPerPage: number;
  totalResult: any;
  hitsSearch: any;
  loadingResult: boolean = true;
  filterMobileShow: boolean;
  totalCompare: any;
  text: any;
  html: any;
  textHtml: any;
  flashSaleData: any;
  showImg: boolean;
  event: Event;
  blockFixed: boolean;
  results: any;
  isBrowser: boolean;
  searchResults: any;
  filters: any;
  homeTagData: string;
  textHaut: any;
  isTextOpen: boolean = true;
  textForModal: string;
  isProxautoPromo: boolean = false;
  promoNotFound: boolean;
  isPrintempsPromo: boolean = false;
  isFrenshDaysPromo: boolean = false;
  encartVisible: boolean = true;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.isBrowser = false;
    this.showImg = true;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if (this.config.getWindow().document.scrollingElement.scrollTop > 300) {
      this.blockFixed = true;
    } else {
      this.blockFixed = false;
    }
  }
  @HostListener('window:click') clickInside() {
    this.isBrowser = false;
    this.showImg = true;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.isBrowser = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector(this.screenWidth);
  }

  constructor(
    private promoService: PromoService,
    private state: TransferState,
    private route: ActivatedRoute,
    private config: ConfigService,
    private httpClient: HttpClient,
    private transferState: TransferState,
    private cardService: AlgoliaCardService,
    private router: Router,
    private homeService: HomeNextService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platform: Object,
    private modalService: NgbModal,
    private scrollToFragmentService: ScrollToFragmentService
  ) {}

  ngOnInit(): void {

  
    this.isBrowser = isPlatformBrowser(this.platform);
    this.screenWidth = this.config.getWindow()?.innerWidth;
    this.visibleItemsDetector(this.screenWidth);

    this.route.paramMap.subscribe((params) => {
      this.promoName = params['params']['promoName'];
      if (this.promoName == 'Prix malin') this.isProxautoPromo = true;
      if (this.promoName == 'Promo garantie 24 mois') this.isPrintempsPromo = true;
      if (this.promoName == 'French days') this.isFrenshDaysPromo = true;
      this.encartVisible = true
    });

    this.promoData = this.state.get(this.PROMO_DATA, null);
    this.flashSaleData = this.state.get(this.ENCART_DATA, null);
    this.homeTagData = this.state.get(this.TAG_DATA_KEY, null);
    this.textHaut = this.state.get(this.TEXT_REF_DATA_KEY,null);

    if (!this.promoData?.length) {
      this.getData();
    }else{
      this.state.set(this.PROMO_DATA, <any>this.promoData);
      this.getInitialSearchConfig()
      if (this.isProxautoPromo)
        this.textForModal =
          "<p><strong>Payez l'essentiel, rien que l’essentiel !</strong>&nbsp;</p><p>Avec notre sélection de véhicules d’occasion " +
          '“' +
          '<strong>Prix malin</strong>' +
          '”' +
          ', optimisez votre budget automobile !</p><p >Parce que votre <strong>sécurité</strong> est notre priorité, tous nos véhicules sont soumis à un contrôle qualité avec plus de 100 points de contrôle et bénéficient d’une <strong>garantie minimale de 12 mois</strong>.</p><p>Tous nos véhicules ' +
          '"' +
          this.promoName +
          '”' +
          ' sont commercialisés <strong >sans aucun frais superflus</strong> de carrosserie afin de vous garantir le <strong >meilleur prix.</strong>&nbsp;</p>';
    }

    this.totalResult = this.state.get(this.TOTAL_RESULT, null);
    this.results = this.state.get(this.SEARCH_RESULT, null);
    if(this.results){
      this.loadingResult = false
    }

    if (!this.homeTagData) {
      this.getTags();
    }
    this.metaService.updateTitle( 'Vos véhicules au meilleur prix avec Elite Auto' );
    if (this.isProxautoPromo){
      this.metaService.updateTitle('Nos véhicules à prix malin avec Proxauto by Elite-Auto');
      this.metaService.updateDescription('Payez l\'essentiel, rien que l\’essentiel ! Avec notre sélection de véhicules d’occasion Prix malin, optimisez votre budget automobile !');
    }

    this.getTextRef();
  }
  ngAfterViewInit() {
    this.scrollToFragmentService.scrollToFragment();
  }
  getInitialSearchConfig(){

    this.promoData = this.promoData.find((item) => item.promoName == this.promoName);
    this.flashSaleData = this.flashSaleData?.promoName == this.promoName ? this.flashSaleData : null;

    if(!this.promoData){
      this.promoNotFound = true ;
      this.loadingResult = false;
    }
    else{
      this.facetFilters = this.promoData?.facetFilters;
      this.filters = this.promoData?.filters; 
  
      this.configResults = {
        searchClient: createSSRSearchClient({
          appId: this.config.algolia.appId,
          apiKey: this.config.algolia.appKey,
          makeStateKey,
          HttpHeaders,
          transferState: this.transferState,
          httpClient: this.httpClient,
        }),
        indexName: 'prod_ELITE_OFFERS',
        initialUiState: {
          prod_ELITE_OFFERS: {
            query: '',
            refinementList: {},
          },
        },
        onStateChange: function ({ uiState, setUiState }) {
          setUiState(uiState);
        },
      };
  
      let key = this.facetFilters[0][0].split(':')[0];
      let value = this.facetFilters[0][0].split(':')[1];
  
      this.configResults.initialUiState.prod_ELITE_OFFERS.refinementList[key] = [value];
      if (this.isBrowser && (this.isFrenshDaysPromo ||this.isPrintempsPromo || this.isProxautoPromo)) {
        this.configResults.routing = {
          router: history({
            createURL({ qsModule, location, routeState }) {
              const { origin, pathname, hash } = location;
              const indexState = routeState || {};
              const objFilters = {
                prod_ELITE_OFFERS: {
                  refinementList: {},
                  range: {},
                  sortBy: null,
                  query: '',
                },
              };
  
              if (
                !routeState.prod_ELITE_OFFERS?.refinementList?.marque ||
                routeState.prod_ELITE_OFFERS?.refinementList?.marque
                  ?.length == 0
              ) {
                if (routeState.prod_ELITE_OFFERS?.refinementList) {
                  routeState.prod_ELITE_OFFERS.refinementList.modelGroupeNiveau1 =
                    [];
                  routeState.prod_ELITE_OFFERS.refinementList.modelNomCompl =
                    [];
                }
              }
              objFilters.prod_ELITE_OFFERS.refinementList =
                routeState.prod_ELITE_OFFERS?.refinementList;
              objFilters.prod_ELITE_OFFERS.range =
                routeState.prod_ELITE_OFFERS?.range;
              if (
                routeState.prod_ELITE_OFFERS?.sortBy ===
                'prod_ELITE_OFFERS_price_asc'
              ) {
                objFilters.prod_ELITE_OFFERS.sortBy =
                  routeState.prod_ELITE_OFFERS?.sortBy;
              }
              objFilters.prod_ELITE_OFFERS.query =
                routeState.prod_ELITE_OFFERS?.query;
              let queryString = qsModule.stringify(objFilters);
  
              if (queryString.includes('loyers.loyer_mensuel')) {
                queryString = queryString.replace(
                  'loyers.loyer_mensuel',
                  'loyerMensuel'
                );
                queryString = queryString
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS');
              } else if (queryString.includes('loyers.apport')) {
                queryString = queryString.replace(
                  'loyers.apport',
                  'apport'
                );
                queryString = queryString
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS');
              } else if (queryString.includes('loyers.kilometres')) {
                queryString = queryString.replace(
                  'loyers.kilometres',
                  'kilometres'
                );
                queryString = queryString
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS');
              } else if (queryString.includes('loyers.nb_loyer')) {
                queryString = queryString.replace(
                  'loyers.nb_loyer',
                  'nbLoyer'
                );
                queryString = queryString
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                  .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS');
              }
              if (
                Object.keys(routeState).length !== 0 &&
                !indexState.query &&
                !window.location.href.includes('comparateur')
              ) {
                return (window.location.href = `${origin}${'/recherche'}?${queryString}${hash}`);
              }
            },
          }),
        };
      }
    }
  }

  getData(){
    this.promoService.getPromo().subscribe((res) => {
      if (res) {
        this.promoData = res;
        this.flashSaleData = res?.find((item) => item.encartPromotion);
        this.state.set(this.PROMO_DATA, <any>this.promoData);
        this.state.set(this.ENCART_DATA, <any>this.flashSaleData);
        if (!this.promoData) this.loadingResult = false;
        this.getInitialSearchConfig()
      }
    });
  }

  open(infoContent) {
    this.modalService.open(infoContent, { size: 'lg' });
  }
  getTags() {
    this.homeService.getTagsHome().subscribe((data) => {
      this.config.getWindow().document.getElementById('taghome').innerHTML = data.content;
      this.homeTagData = data;
      this.state.set(this.TAG_DATA_KEY, <string>data.content);
    });
  }

  getTextRef() {
    let promoName = this.isProxautoPromo ? 'promoProxauto' : this.promoName;
    this.promoService.getTextRef(promoName).subscribe((res) => {
      this.textHaut = res.textHaut ? res.textHaut : null;
      this.state.set(this.TEXT_REF_DATA_KEY, <string>this.textHaut);
    });
  }

  visibleItemsDetector(screenWidth: number) {
    if (screenWidth < 600) {
      // mobile mode
      this.mode = 'mobile';
    } else if (screenWidth < 992) {
      // tablet mode
      this.mode = 'tablet';
    } else {
      // desktop mode
      this.mode = 'desktop';
    }
  }

  addRouteConfig(key, value) {
    this.configResults.initialUiState.prod_ELITE_OFFERS.refinementList[key] = [value];
    return this.configResults;
  }

  getSearchResults($event) {
    if ($event.results) {
      this.hitsPerPage = $event.state?.hitsPerPage;
      this.currentPage = $event.state?.page;
      this.countPerPage = this.hitsPerPage * (this.currentPage + 1);
      this.hitsSearch = $event.results?.hits;
      this.searchResults = $event;
      if ($event.results?.nbHits != null) {
        if(!this.results || !this.isProxautoPromo || !this.isPrintempsPromo || !this.isFrenshDaysPromo){
          this.totalResult = $event.results?.nbHits;
          this.results = $event.results
        }
        this.loadingResult = false
        this.state.set(this.TOTAL_RESULT, <any> this.totalResult);
        this.state.set(this.SEARCH_RESULT, <any> this.results);
      }
      this.generateTrackingEvent(this.results?.hits)
    }
  }

  closeFilterEvent() {
    this.filterMobileShow = false;
  }

  checkCompareEvent() {
    this.totalCompare = this.cardService.getCompareSelectedVeh()?.length;
  }

  comparatorRedirect() {
    this.router.navigate(['recherche/comparateur']);
  }

  generateTrackingEvent(items) {
    const ids = items.map(item => item.id);
    const eventData  = {
        event: 'view_item_list',
        send_to: 'AW-1025404699',
        items: ids.map(id => ({
            id: id,
            google_business_vertical: 'retail'
        }))
    };
    const eventDataJSON  = JSON.stringify(eventData, null, 2);

    const existingScript = this.config.getWindow().document.getElementById('eventTracking');
    if (existingScript) {
      existingScript.remove();
    }
    const trackingScript = this.config.getWindow().document.createElement('script');
    trackingScript.id = 'eventTracking';
    trackingScript.text = `gtag(${eventDataJSON});`;
    this.config.getWindow().document.body.appendChild(trackingScript);
  }

}
