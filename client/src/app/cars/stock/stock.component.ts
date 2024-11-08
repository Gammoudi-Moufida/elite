import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import {  Title, TransferState,makeStateKey, Meta } from '@angular/platform-browser';
import { isPlatformBrowser, NgIf, NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';
import { history } from 'instantsearch.js/es/lib/routers';
import { StockService } from './stock.service';
import { AlgoliaCardService } from 'src/app/search/algolia-card/algolia-card.service';
import { AlgoliaHitsPerPageComponent } from '../../shared/algolia-hits-per-page/algolia-hits-per-page.component';
import { AlgoliaPaginationComponent } from '../../shared/algolia-pagination/algolia-pagination.component';
import { AlgoliaResultsComponent } from '../../search/algolia-results/algolia-results.component';
import { AlgoliaFiltersComponent } from '../../search/algolia-filters/algolia-filters.component';
import { AlgoliaFilterOrderComponent } from '../../search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFilterTextComponent } from '../../search/algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { NgAisInstantSearchModule, NgAisConfigureModule, createSSRSearchClient } from 'angular-instantsearch';
import { StockNavLinkComponent } from './stock-nav-link/stock-nav-link.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PromoService } from 'src/app/promo/promo.service';
import { ScrollToFragmentService } from 'src/app/core/scroll/scroll-to-fragment.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  standalone: true,
  imports: [NgIf, NgAisInstantSearchModule, NgAisConfigureModule, AlgoliaFilterTextComponent, AlgoliaFilterOrderComponent, NgClass, AlgoliaFiltersComponent, AlgoliaResultsComponent, AlgoliaPaginationComponent, AlgoliaHitsPerPageComponent, StockNavLinkComponent]
})
export class StockComponent implements OnInit {

  @ViewChild('divTop', { static: true }) divTop: ElementRef;
  results: any[] = null;
  loadingResult: boolean=true;
  imgUrl: string;
  filterMobileShow: boolean = false;
  scrollTop: boolean = false;
  event: Event;
  blockFixed: boolean;
  totalCompare: number = 0;
  isBrowser: boolean;
  previousUrl: string = null;
  currentUrl: string = null;
  screenWidth: number;
  totalFilter: number = 0;
  searchClient: any;
  public configResults :any  ;
  hitsPerPage : number = 0;
  currentPage : number = 0;
  countPerPage : number = 0;
  showComparator: boolean;

  totalResult: any;
  hits:any
  TOTAL_RESULT = makeStateKey<number>('modelTotalResults');
  SEARCH_RESULT = makeStateKey<any>('modelSearchResults');
  FLASHSALE_DATA = makeStateKey<number>('flashsaledata');

  isFlashSale: any;
  searchResults: any;
  mark: any;
  dataMark: any;
  h1Page: any;
  itsNotSearchPage: boolean = false;
  flashSaleData: any;
  screenMode: number;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any): void {
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if (this.config.getWindow().document.scrollingElement.scrollTop > 70) {
      this.blockFixed = true;
    }
    else
      this.blockFixed = false;
  }

  @HostListener('window:click') clickInside() {
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }

  constructor(
    private router: Router,
    private config: ConfigService,
    private cardService: AlgoliaCardService,
    private title: Title,
    private state: TransferState,
    private route: ActivatedRoute,
    private stockService: StockService,
    private promoService: PromoService,
    private meta: Meta,
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platform: Object,
    private scrollToFragmentService: ScrollToFragmentService
  ) {
   }

  ngOnInit() {
    this.loadingResult = true;
    this.hits = this.state.get(this.SEARCH_RESULT, null);
    this.totalResult = this.state.get(this.TOTAL_RESULT, null);
    this.flashSaleData = this.state.get(this.FLASHSALE_DATA, null);

    if(this.hits){
      this.loadingResult = false;
    }
    this.showComparator=true
    this.imgUrl = this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
    this.isBrowser = isPlatformBrowser(this.platform);
    if (this.isBrowser) {
      this.checkCompareEvent();
    }
    this.route.paramMap.subscribe(params => {
      this.mark = params['params']['mark']
    })
    if (!this.mark) {
      this.totalFilter = 2
      this.stockService.getMarkStock().subscribe(data => {
        this.dataMark = data.listMarqueStock
        this.setMeta(data.title, data.description);
        this.h1Page = data.h1
      })
      this.searchResult();
    }else{
      this.totalFilter = 3
      this.stockService.getVoitureStock(this.mark).subscribe(data => {
        if (data?.is404 == true){
          this.router.navigateByUrl('/not-found', { skipLocationChange: true });
        }else{
          this.h1Page = data.h1
          this.setMeta(data.title, data.description)
          this.searchResult();
          this.addRouteConfig('marque', this.mark.replace(/\-/g, ' ').toUpperCase())
          this.itsNotSearchPage = true
        }
      })
    }
   
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      if (this.previousUrl == "/recherche/comparateur" && this.isBrowser) {
        window.scrollTo(0, 0);
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
  setMeta(title, description) {
    this.title.setTitle(title);
    this.meta.updateTag({
      name: 'description',
      content: description,
    });
  }

  checkCompareEvent() {
    this.totalCompare = this.cardService.getCompareSelectedVeh().length
  }

  comparatorRedirect() {
    this.router.navigate(['recherche/comparateur']);
  }
 
  searchResult() {
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
            disponibiliteForFO: ['en stock','en arrivage']
          },
        }
      },
      onStateChange: function ({ uiState, setUiState }) {
        setUiState(uiState);
      },
    }

    if (this.isBrowser) {
      this.configResults.routing = {
        router: history({
          createURL({ qsModule, location, routeState, }) {
            const { origin, pathname, hash } = location;
            const indexState = routeState || {};
            const objFilters = { prod_ELITE_OFFERS: { refinementList: {}, range: {}, sortBy: null, query: "" } }
            if(routeState.prod_ELITE_OFFERS?.refinementList){
            objFilters.prod_ELITE_OFFERS.refinementList = routeState.prod_ELITE_OFFERS.refinementList
            objFilters.prod_ELITE_OFFERS.range = routeState.prod_ELITE_OFFERS.range
            objFilters.prod_ELITE_OFFERS.sortBy = routeState.prod_ELITE_OFFERS.sortBy
            objFilters.prod_ELITE_OFFERS.query = routeState.prod_ELITE_OFFERS.query
            }
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
  }

  addRouteConfig(key, value) {
    this.configResults.initialUiState.prod_ELITE_OFFERS.refinementList[key] = [value]
    return this.configResults
  }

  closeFilterEvent() {
    this.filterMobileShow = false
  }

  getSearchResults($event) { 
    this.hitsPerPage = $event.results?.hitsPerPage
    this.currentPage = $event.state?.page
    this.countPerPage = this.hitsPerPage * (this.currentPage + 1)
    this.searchResults = $event
    if(!this.hits){
    if ($event.results?.nbHits != null) {
      this.hits = $event.results?.hits
      this.totalResult = $event.results?.nbHits
      this.loadingResult = false;
      this.state.set(this.TOTAL_RESULT, <any> this.totalResult);
      this.state.set(this.SEARCH_RESULT, <any> this.hits);
    }
  }
  }
}
