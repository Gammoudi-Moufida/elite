import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgAisInstantSearchModule,
  NgAisConfigureModule,
  NgAisStatsModule,
  createSSRSearchClient,
} from 'angular-instantsearch';
import { AlgoliaFilterOrderComponent } from 'src/app/search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFilterTextComponent } from 'src/app/search/algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { AlgoliaFiltersComponent } from 'src/app/search/algolia-filters/algolia-filters.component';
import { AlgoliaResultsComponent } from 'src/app/search/algolia-results/algolia-results.component';
import { AvisComponent } from 'src/app/shared/avis/avis.component';
import { AvisListComponent } from '../shared/avis-list/avis-list.component';
import { NavLinkComponent } from '../shared/nav-link/nav-link.component';
import { RewardComponent } from '../shared/reward/reward.component';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';
import { TextSeoComponent } from '../shared/text-seo/text-seo.component';
import { ConfigService } from 'src/app/shared/config/config.service';
import {
  DomSanitizer,
  Meta,
  Title,
  TransferState,
  makeStateKey,
} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarkService } from '../mark/mark.service';
import { AlgoliaCardService } from 'src/app/search/algolia-card/algolia-card.service';
import { AlgoliaPaginationComponent } from 'src/app/shared/algolia-pagination/algolia-pagination.component';
import { AlgoliaHitsPerPageComponent } from 'src/app/shared/algolia-hits-per-page/algolia-hits-per-page.component';
import { PromoService } from 'src/app/promo/promo.service';
import { history } from 'instantsearch.js/es/lib/routers';
import { BrandsService } from '../brands/brands.service';
import { ScrollToFragmentService } from 'src/app/core/scroll/scroll-to-fragment.service';

@Component({
  selector: 'app-mark-moteur',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgAisInstantSearchModule,
    NgAisConfigureModule,
    SubHeaderComponent,
    AlgoliaPaginationComponent,
    AlgoliaHitsPerPageComponent,
    NgClass,
    AlgoliaFilterTextComponent,
    AlgoliaFilterOrderComponent,
    NgAisStatsModule,
    AlgoliaFiltersComponent,
    AlgoliaResultsComponent,
    NavLinkComponent,
    RewardComponent,
    AvisComponent,
    TextSeoComponent,
    AvisListComponent,
  ],
  templateUrl: './mark-moteur.component.html',
  styleUrls: ['./mark-moteur.component.css'],
})
export class MarkMoteurComponent implements OnInit {
  typePage: any;
  mark: any;
  slugMark: any;
  configResults: any;
  searchResults: any;
  data: any;
  screenMode: number;
  screenWidth: number;
  loadingResult: boolean = true;
  totalResult: any;
  results: any;
  hitsPerPage: any;
  currentPage: any;
  countPerPage: number;
  hitsSearch: any;
  filterMobileShow: any;

  SEARCH_RESULT = makeStateKey<any>('searchResults');
  TOTAL_RESULT = makeStateKey<any>('totalResult');
  DATA_REF = makeStateKey<string>('dataReferencement');
  FLASHSALE_DATA = makeStateKey<number>('flashsaledata');
  SCHEMA_TAG_DATA_KEY = makeStateKey<string>('schemaTagData');
  GOOGLE_TAG_DATA_KEY = makeStateKey<string>('googleTagData');
  BRANDS_LIST_KEY = makeStateKey<any>('brandsList');

  isBrowser: any;
  showImg: boolean;
  event: Event;
  blockFixed: boolean;
  type: any;
  dataRef: any;
  text: any;
  html: any;
  textHtml: any;
  textHtmlSplit: boolean = true;
  showComparator: boolean;
  flashSaleData: any;
  totalCompare: any;
  ekomiAvis: any;
  resume: any;
  listAvis: any;
  breadcrumbList: any;
  siteUrl: string;
  schemaTagData: any;
  googleTagData: any;
  titlePage: any;
  descriptionPage: any;
  brandsList: any;
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
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
    this.showImg = true;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.showImg = true
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  constructor(
    private route: ActivatedRoute,
    private config: ConfigService,
    private state: TransferState,
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platform: Object,
    private service: MarkService,
    private sanitizer: DomSanitizer,
    private cardService: AlgoliaCardService,
    private router: Router,
    private promoService: PromoService,
    private brandService: BrandsService,
    private title: Title,
    private meta: Meta,
    private scrollToFragmentService: ScrollToFragmentService
  ) {}

  ngOnInit() {
    this.visibleItemsDetector();
    this.isBrowser = isPlatformBrowser(this.platform);
    this.showComparator = true;
    this.siteUrl = this.config.getSiteUrl();

    this.route.paramMap.subscribe((params) => {
      this.typePage = params['params']['typePage'];
      this.type = params['params']['type'];
      this.mark = params['params']['mark'] ? params['params']['mark'] : null;
      this.slugMark = params['params']['slugMark'] ? params['params']['slugMark'] : null
      this.slugMark = this.slugMark.replace('-',' ')
    });
    if(this.type == 'marqueVnMoteur'){
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
              marque: [this.slugMark.toUpperCase()],
            },
          },
        },
        onStateChange: function ({ uiState, setUiState }) {
          setUiState(uiState);
        },
      };
    }else{
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
        onStateChange: function ({ uiState, setUiState }) {
          setUiState(uiState);
        },
      };
    }


    if (this.isBrowser) {
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
              routeState.prod_ELITE_OFFERS?.refinementList?.modelId?.length > 0
            ) {
              routeState.prod_ELITE_OFFERS.refinementList.modelId = [];
            }
            if (
              !routeState.prod_ELITE_OFFERS?.refinementList?.marque ||
              routeState.prod_ELITE_OFFERS?.refinementList?.marque?.length == 0
            ) {
              if (routeState.prod_ELITE_OFFERS?.refinementList) {
                routeState.prod_ELITE_OFFERS.refinementList.modelGroupeNiveau1 =
                  [];
                routeState.prod_ELITE_OFFERS.refinementList.modelNomCompl = [];
              }
            }
            objFilters.prod_ELITE_OFFERS.refinementList =
              routeState.prod_ELITE_OFFERS?.refinementList;
            objFilters.prod_ELITE_OFFERS.range =
              routeState.prod_ELITE_OFFERS?.range;
            objFilters.prod_ELITE_OFFERS.sortBy =
              routeState.prod_ELITE_OFFERS?.sortBy;
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
              queryString = queryString.replace('loyers.apport', 'apport');
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
              queryString = queryString.replace('loyers.nb_loyer', 'nbLoyer');
              queryString = queryString
                .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS')
                .replace('prod_ELITE_OFFERS', 'prod_ELITE_LOYERS');
            }
            if (
              !indexState.query &&
              !window.location.href.includes('comparateur')
            ) {
              window.location.href = `${origin}${'/recherche'}?${queryString}${hash}`;
            }
            return `${origin}${'/recherche'}?${queryString}${hash}`;
          },
        }),
      };
    }

    this.totalResult = this.state.get(this.TOTAL_RESULT, null);
    this.results = this.state.get(this.SEARCH_RESULT, null);
    this.flashSaleData = this.state.get(this.FLASHSALE_DATA, null);
    this.dataRef = this.state.get(this.DATA_REF, null);
    this.schemaTagData = this.state.get(this.SCHEMA_TAG_DATA_KEY, null);
    this.googleTagData = this.state.get(this.GOOGLE_TAG_DATA_KEY, null);
    this.brandsList = this.state.get(this.BRANDS_LIST_KEY, null);

    if (!this.flashSaleData) {
      this.promoService.getPromo().subscribe((res) => {
        if (res) {
          this.flashSaleData = res.find((item) => item.encartPromotion);
          this.state.set(this.FLASHSALE_DATA, <any>this.flashSaleData);
        }
      });
    }

    if (this.results) {
      this.loadingResult = false;
    }
    if (this.isBrowser) {
      this.checkCompareEvent();
    }
    
    this.textRef();
    if(this.type == 'voitureNeuve') this.getListOfNewBrands();
    if(this.type == 'marqueVnMoteur') this.subHeader();
    this.visibleItemsDetector();
    this.service.getEkomi().subscribe((data) => {
      this.ekomiAvis = data.listeEkomi;
    });

    if(this.type == 'marqueVnMoteur') this.getTag();
  }
  ngAfterViewInit() {
    this.scrollToFragmentService.scrollToFragment();
  }
  getListOfNewBrands(){
    if(!this.brandsList){
      this.brandService.getBrands().subscribe(
        data =>{
          if(data.marque)
          this.brandsList =  data.marque
          this.state.set(this.BRANDS_LIST_KEY, <any> this.brandsList)
        }
      )
    }else{
      this.state.set(this.BRANDS_LIST_KEY, <any> this.brandsList)
    }
  }
  capitalizeFirstLetter(element) {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
  }
  getTag() {
    if (!this.schemaTagData) {
      this.service.getTagSchema(this.mark, this.type).subscribe((data) => {
        this.config.getWindow().document.getElementById('schematag').innerHTML =
          data;
        this.schemaTagData = data;
        this.state.set(this.SCHEMA_TAG_DATA_KEY, <string>data.content);
      });
    }

    if (!this.googleTagData) {
      this.service.getTagGoogle(this.mark, this.type).subscribe((data) => {
        this.config.getWindow().document.getElementById('taggoogle').innerHTML =
          data;
        this.googleTagData = data;
        this.state.set(this.GOOGLE_TAG_DATA_KEY, <string>data.content);
      });
    }
  }
  checkCompareEvent() {
    this.totalCompare = this.cardService.getCompareSelectedVeh().length;
  }

  comparatorRedirect() {
    this.router.navigate(['recherche/comparateur']);
  }

  closeFilterEvent() {
    this.filterMobileShow = false;
  }
  subHeader() {
    this.service.getSubHeader(this.mark, this.type).subscribe((res) => {
      this.data = res;
      this.data.marque = this.data.mark;
      this.generateAndAppendBreadcrumbScript(this.data.menu);
    });
  }

  textRef() {
    if (!this.dataRef) {
      this.service.getReferencement(this.mark, this.slugMark, this.type).subscribe((res) => {
        this.dataRef = res;
        this.text = this.dataRef.TexteHaut;
        this.html = this.sanitizer.bypassSecurityTrustHtml(this.text);
        this.textHtml = this.html;
        this.resume = this.dataRef.TexteBas;
        if(this.type == 'marqueVnMoteur') this.listAvis = this.dataRef.avisMarque;
        this.title.setTitle(this.dataRef.MetaTitle);
        this.meta.updateTag({ name: 'description', content: this.dataRef.description });
        this.state.set(this.DATA_REF, <any>this.dataRef);
      });
    }else{
      this.text = this.dataRef.TexteHaut;
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.text);
      this.textHtml = this.html;
      this.resume = this.dataRef.TexteBas;
      if(this.type == 'marqueVnMoteur') this.listAvis = this.dataRef.avisMarque;
      this.title.setTitle(this.dataRef.MetaTitle);
      this.meta.updateTag({ name: 'description', content: this.dataRef.description });
      this.state.set(this.DATA_REF, <any>this.dataRef);
    }
    
  }

  getSearchResults($event) {
    if ($event.results) {
      this.hitsPerPage = $event.state?.hitsPerPage;
      this.currentPage = $event.state?.page;
      this.countPerPage = this.hitsPerPage * (this.currentPage + 1);
      this.hitsSearch = $event.results?.hits;
      this.searchResults = $event;
      if ($event.results?.nbHits != null) {
        if (!this.results) {
          this.totalResult = $event.results?.nbHits;
          this.results = $event.results;
        }
        this.loadingResult = false;
        this.state.set(this.TOTAL_RESULT, <any>this.totalResult);
        this.state.set(this.SEARCH_RESULT, <any>this.results);
      }
    }
  }

  visibleItemsDetector() {
    if (this.screenWidth < 700) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 1140) {
      // tablet mode
      this.screenMode = 2;
    } else {
      // desktop mode
      this.screenMode = 3;
    }
  }

  generateAndAppendBreadcrumbScript(data) {
    const itemList = data.map((item, index) => {
      let fullURL = `${ item.url.startsWith('https') ? item.url : `${this.siteUrl.replace(/\/$/, '')}${item.url}` }`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': fullURL },
        name: item.text.replace(/"/g, ''),
      };
    });

    this.breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemList,
    };

    const script = this.config.getWindow().document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.breadcrumbList, null, 2);
    this.config.getWindow().document.head.appendChild(script);
  }
}
