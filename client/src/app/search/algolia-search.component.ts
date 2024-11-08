import { isPlatformBrowser, NgIf, NgClass, JsonPipe, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnChanges, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import algoliasearch from 'algoliasearch';
import { filter } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AlgoliaCardService } from './algolia-card/algolia-card.service';
import { AlgoliaResultsService } from './algolia-results/algolia-results.service';
import { AlgoliaHitsPerPageComponent } from '../shared/algolia-hits-per-page/algolia-hits-per-page.component';
import { AlgoliaPaginationComponent } from '../shared/algolia-pagination/algolia-pagination.component';
import { AlgoliaResultsComponent } from './algolia-results/algolia-results.component';
import { AlgoliaFiltersComponent } from './algolia-filters/algolia-filters.component';
import { AlgoliaFilterOrderComponent } from './algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFilterTextComponent } from './algolia-filters/algolia-filter-text/algolia-filter-text.component';
import { NgAisInstantSearchModule, NgAisConfigureModule, NgAisHitsModule } from 'angular-instantsearch';
import { PromoService } from '../promo/promo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToFragmentService } from '../core/scroll/scroll-to-fragment.service';

@Component({
    selector: 'app-algolia-search',
    templateUrl: './algolia-search.component.html',
    styleUrls: ['./algolia-search.component.css'],
    standalone: true,
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        },
      },
    ],
    imports: [NgIf, NgOptimizedImage, NgAisInstantSearchModule, NgAisConfigureModule, NgAisHitsModule, AlgoliaFilterTextComponent, AlgoliaFilterOrderComponent, NgClass, AlgoliaFiltersComponent, AlgoliaResultsComponent, AlgoliaPaginationComponent, AlgoliaHitsPerPageComponent, JsonPipe]
})
export class AlgoliaSearchComponent implements OnInit {

  @ViewChild('divTop', { static: true }) divTop: ElementRef;

  screenWidth: number;
  blockFixed: boolean;
  event: Event;
  totalCompare: number = 0;
  loadingResult: boolean;
  isBrowser: boolean;
  previousUrl: string = null;
  currentUrl: string = null;
  totalResult: number;
  totalFilter: number = 0;
  filterMobileShow: boolean = false;
  isSearchPage: boolean = true;
  scrollTop: boolean = false;
  configResults: any;
  hitsPerPage: number = 0;
  currentPage: number = 0;
  countPerPage: number = 0;
  showComparator: boolean;

  offreIdTab: any;
  index2: any;
  configResultsLoyers: any;
  t: any;
  totalRes: any;
  objectLoyers: any;
  filterLoyerChecked: boolean = false;
  filterItsOk: boolean = false;
  configToCheck: any;
  searchState: any;
  searchNumericState: any;
  loyerState: any;
  algoliaResults: any;
  algoliaResultsLoyers: any;
  dataIsReady : boolean = false;
  dataLoyerIsReady: boolean = false;
  totalResultLoyers: any;
  clearQuery: boolean = false;
  clearAll: boolean = false;
  searchResults: any;
  searchResultsLoyers: any;
  sortBy: string;
  priceFilterTerminals: { min: any; max: any; };
  rentFilterTerminals: { min: any; max: any; };
  flashSaleData: any;
  isProxautoPromoChecked: boolean = false;
  mode: string;
  textForModal: string;

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

  index: any;
  searchClient: any;
  constructor(
    private service: AlgoliaResultsService,
    private router: Router,
    private config: ConfigService,
    private cardService: AlgoliaCardService,
    private promoService: PromoService,
    private state: TransferState,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platform: Object,
    private scrollToFragmentService: ScrollToFragmentService
  ) {
    this.configResults = {
      searchClient: algoliasearch(this.config.algolia.appId, this.config.algolia.appKey),
      indexName: this.config.algolia.indexName,
      routing: true
    };
    this.configResultsLoyers = {
      searchClient: algoliasearch(this.config.algolia.appId, this.config.algolia.appKey),
      indexName: 'prod_ELITE_LOYERS',
      routing: true
    };
    let found = false;
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if (e.url.includes('prod_ELITE_LOYERS')) {
        let url = e.url
        let addedUrl = ''
        if (!url.includes('kilometres')) {
          addedUrl = addedUrl + '&prod_ELITE_LOYERS[refinementList][kilometres][0]=5000'
        }
        if (!url.includes('apport')) {
          addedUrl = addedUrl + '&prod_ELITE_LOYERS[range][apport]=2000:2000'
        }
        if (!url.includes('nbLoyer')) {
          addedUrl = addedUrl + '&prod_ELITE_LOYERS[refinementList][nbLoyer][0]=48'
        }
        if (addedUrl.length != 0 && !found) {
          found = true;
          addedUrl = encodeURI(addedUrl)
          this.router.navigateByUrl(`${url}${addedUrl}`)
        } else {
          this.filterItsOk = true
        }
      }
    });
  }
  ngOnInit() {
    this.configToCheck = this.configResults
    this.showComparator = true
    this.screenWidth = this.config.getWindow()?.innerWidth;
    this.visibleItemsDetector(this.screenWidth);
    this.loadingResult = true;
    if (this.scrollTop)
      this.divTop.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    this.scrollTop = false;
    this.isBrowser = isPlatformBrowser(this.platform);
    if (this.isBrowser) {
      this.checkCompareEvent();
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
        }
      })
      this.textForModal =
      "<p><strong>Payez l'essentiel, rien que l’essentiel !</strong>&nbsp;</p><p>Avec notre sélection de véhicules d’occasion " +
      '“' +
      '<strong>Prix malin</strong>' +
      '”' +
      ', optimisez votre budget automobile !</p><p >Parce que votre <strong>sécurité</strong> est notre priorité, tous nos véhicules sont soumis à un contrôle qualité avec plus de 100 points de contrôle et bénéficient d’une <strong>garantie minimale de 12 mois</strong>.</p><p>Tous nos véhicules ' +
      '"' + 'Prix malin' + '”' +
      ' sont commercialisés <strong >sans aucun frais superflus</strong> de carrosserie afin de vous garantir le <strong >meilleur prix.</strong>&nbsp;</p>';
  }
  ngAfterViewInit() {
    this.scrollToFragmentService.scrollToFragment();
  }
  comparatorRedirect() {
    this.router.navigate(['recherche/comparateur']);
  }
  checkCompareEvent() {
    this.totalCompare = this.cardService.getCompareSelectedVeh().length
  }
  closeFilterEvent() {
    this.filterMobileShow = false
  }
  getSearchResults($event) {
    this.searchState = $event.state?.disjunctiveFacetsRefinements
    if (
      ($event.state?.numericRefinements["loyers.loyer_mensuel"] && !Object.keys($event.state?.numericRefinements["loyers.loyer_mensuel"]).every(el => el === undefined))
      || ($event.state?.numericRefinements["loyers.apport"] && !Object.keys($event.state?.numericRefinements["loyers.apport"]).every(el => el === undefined)) 
      || $event.state?.disjunctiveFacetsRefinements["loyers.kilometres"]?.length 
      || $event.state?.disjunctiveFacetsRefinements["loyers.nb_loyer"]?.length
    ) {
      this.searchState = $event.state?.disjunctiveFacetsRefinements
      this.searchNumericState = $event.state?.numericRefinements
      this.redirectToLoyerIndex()

    } else {
      this.filterItsOk = false
    }

    this.hitsPerPage = $event.state?.hitsPerPage
    this.currentPage = $event.state?.page
    this.countPerPage = this.hitsPerPage * (this.currentPage + 1)
    if ($event.results?.nbHits) {
      this.totalResult = $event.results?.nbHits
      this.algoliaResults = $event.results['hits']
      this.dataIsReady = true
    } else {
      this.dataIsReady = false
    }
    ///get total filters///
    if ($event.state?.disjunctiveFacetsRefinements != null) {
      let numRefinement = 0
      var refinementTable = Object.keys($event.state?.disjunctiveFacetsRefinements).map(function (cle) {
        return [(cle), $event.state?.disjunctiveFacetsRefinements[cle]];
      });
      refinementTable.forEach(el => {
        numRefinement = numRefinement + el[1].length
      });
      this.totalFilter = numRefinement
    }

    if ($event.state?.numericRefinements != null) {
      let numNumericRefinement = 0
      var numericRefinementTable = Object.keys($event.state?.numericRefinements).map(function (cle) {
        return [(cle), $event.state?.numericRefinements[cle]];
      });

      let priceFilter = numericRefinementTable.filter(el => el[0]==="priceForFront")

      if(priceFilter?.length > 0){

        priceFilter = priceFilter[0][1]
        let priceValueMin = priceFilter[">="] ? priceFilter[">="][0] : null;
        let priceValueMax = priceFilter["<="] ? priceFilter["<="][0] : null;
        this.priceFilterTerminals = {min:priceValueMin,max:priceValueMax}
        
      }

      numericRefinementTable.forEach(el => {
        if (!Object.keys(el[1]).every(el => el === undefined)) {
          if (el[1]["<="] != null || el[1][">="] != null) {
            numNumericRefinement = numNumericRefinement + 1
          }
        }
      });
      this.totalFilter = this.totalFilter + numNumericRefinement
    }

    if($event.state?.query?.length > 0){
      this.totalFilter += 1
    }

    this.loadingResult = false;

    if($event.state?.page > 0 && !this.checkCompareEvent ){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if($event.results){
    this.searchResults = $event
    }
  }
  redirectToLoyerIndex() {
    var urlToLoyerFilter = ""
    const keys = Object.keys(this.searchState) as (keyof typeof this.searchState)[];

    keys.forEach((key:string) => {
      let keyName = encodeURI(key)
      if (key == 'loyers.nb_loyer') {
        keyName = 'nbLoyer'
      }
      if (key == 'loyers.kilometres') {
        keyName = 'kilometres'
      }
      if (this.searchState[key]?.length) {
        this.searchState[key].forEach((el, index) => {
          urlToLoyerFilter = urlToLoyerFilter + "&prod_ELITE_LOYERS%5BrefinementList%5D%5B" + keyName.toString() + "%5D%5B" + index + "%5D=" +encodeURI(el)
        })
      }
    });

    const keys2 = Object.keys(this.searchNumericState) as (keyof typeof this.searchNumericState)[];
    //transform filters object to array of filters

    keys2.forEach((key:string) => {
      let keyName = encodeURI(key)
      if (key == 'loyers.loyer_mensuel') {
        keyName = 'loyerMensuel'
      }
      if (key == 'loyers.apport') {
        keyName = 'apport'
      }
      if (this.searchNumericState[key][">="]?.length && !this.searchNumericState[key]["<="]?.length) {
        urlToLoyerFilter = urlToLoyerFilter + "&prod_ELITE_LOYERS%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.searchNumericState[key][">="] + "%3A"
      } else if ((this.searchNumericState[key]["<="]?.length && !this.searchNumericState[key][">="]?.length)) {
        urlToLoyerFilter = urlToLoyerFilter + "&prod_ELITE_LOYERS%5Brange%5D%5B" + keyName.toString() + "%5D=%3A" + this.searchNumericState[key]["<="]

      } else if ((this.searchNumericState[key][">="]?.length && this.searchNumericState[key]["<="]?.length)) {
        urlToLoyerFilter = urlToLoyerFilter + "&prod_ELITE_LOYERS%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.searchNumericState[key][">="] + "%3A" + this.searchNumericState[key]["<="]
      }
    });
    //transform the array of filters to url 

    if (urlToLoyerFilter?.length) {
      let addedUrl = ''
      if (!urlToLoyerFilter.includes('kilometres')) {
        addedUrl = addedUrl + encodeURI('&prod_ELITE_LOYERS[refinementList][kilometres][0]=5000')
      }
      if (!urlToLoyerFilter.includes('apport')) {
        addedUrl = addedUrl + encodeURI('&prod_ELITE_LOYERS[range][apport]=2000:2000')
      }
      if (!urlToLoyerFilter.includes('nbLoyer')) {
        addedUrl = addedUrl + encodeURI('&prod_ELITE_LOYERS[refinementList][nbLoyer][0]=48')
      }
      if (addedUrl.length != 0 ) {
        this.router.navigateByUrl(`/recherche?${urlToLoyerFilter}${addedUrl}`)
      } else {
        this.router.navigateByUrl(`/recherche?${urlToLoyerFilter}`)
      }
    }
    this.filterItsOk = true

  }

  getSearchResultsLoyers($event) {
    this.searchResultsLoyers = $event
    if (
      (($event.state?.numericRefinements?.loyerMensuel) && Object.keys($event.state?.numericRefinements?.loyerMensuel).every(el => el === undefined)
      || ($event.state?.numericRefinements?.loyerMensuel) && Object.values($event.state?.numericRefinements?.loyerMensuel).every(el => el == 0))
      && (($event.state?.numericRefinements?.apport) && Object.keys($event.state?.numericRefinements?.apport).every(el => el === undefined)
      || ($event.state?.numericRefinements?.apport) && Object.values($event.state?.numericRefinements?.apport).every(el => el == 0))
      && !$event.state?.disjunctiveFacetsRefinements?.kilometres[0]?.length
      && !$event.state?.disjunctiveFacetsRefinements?.nbLoyer[0]?.length) {
      this.loyerState = $event.state
      this.redirectToSearchIndex()
    } else {
      this.filterItsOk = true
    }
    
    this.hitsPerPage = $event.state?.hitsPerPage
    this.currentPage = $event.state?.page
    this.countPerPage = this.hitsPerPage * (this.currentPage + 1)
    
    if ($event.results?.nbHits) {
      this.totalResultLoyers = $event.results?.nbHits
      this.algoliaResultsLoyers = $event.results['hits']
    }
    ///get total filters///
    if ($event.state?.disjunctiveFacetsRefinements != null) {
      let numRefinement = 0
      var refinementTable = Object.keys($event.state?.disjunctiveFacetsRefinements).map(function (cle) {
        return [(cle), $event.state?.disjunctiveFacetsRefinements[cle]];
      });
      refinementTable.forEach(el => {
        numRefinement = numRefinement + el[1].length
      });
      this.totalFilter = numRefinement
    }

    if ($event.state?.numericRefinements != null) {
      let numNumericRefinement = 0
      var numericRefinementTable = Object.keys($event.state?.numericRefinements).map(function (cle) {
        return [(cle), $event.state?.numericRefinements[cle]];
      });

      let priceFilter = numericRefinementTable.filter(el => el[0]==="priceForFront")

      if(priceFilter?.length > 0){

        priceFilter = priceFilter[0][1]
        let priceValueMin = priceFilter[">="] ? priceFilter[">="][0] : null;
        let priceValueMax = priceFilter["<="] ? priceFilter["<="][0] : null;
        this.priceFilterTerminals = {min:priceValueMin,max:priceValueMax};

      }

      let rentFilter = numericRefinementTable.filter(el => el[0]==="loyerMensuel")

      if(rentFilter?.length > 0){

        rentFilter = rentFilter[0][1]
        let rentValueMin = rentFilter[">="] ? rentFilter[">="][0] : null;
        let rentValueMax = rentFilter["<="] ? rentFilter["<="][0] : null;
        this.rentFilterTerminals = {min:rentValueMin,max:rentValueMax}
        
      }

      numericRefinementTable.forEach(el => {
        if (!Object.keys(el[1]).every(el => el === undefined)) {
          if (el[1]["<="] != null || el[1][">="] != null) {
            numNumericRefinement = numNumericRefinement + 1
          }
        }
      });
      this.totalFilter = this.totalFilter + numNumericRefinement
    }

    if($event.state?.query?.length > 0){
      this.totalFilter += 1
    }

    if(this.totalResultLoyers){
      this.dataLoyerIsReady = true
    } else{
      this.dataLoyerIsReady = false
    }

    this.loadingResult = false

    if($event.state?.page > 0){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

  }
  redirectToSearchIndex() {
    var urlToSearchFilter = ""
    const keys = Object.keys(this.loyerState.disjunctiveFacetsRefinements) as (keyof typeof this.loyerState.disjunctiveFacetsRefinements)[];

    keys.forEach((key:string) => {
      let keyName = encodeURI(key)
      if (this.loyerState.disjunctiveFacetsRefinements[key]?.length) {
        this.loyerState.disjunctiveFacetsRefinements[key].forEach((el, index) => {
          urlToSearchFilter = urlToSearchFilter + "&prod_ELITE_OFFERS%5BrefinementList%5D%5B" + keyName.toString() + "%5D%5B" + index + "%5D=" + encodeURI(el)
        })
      }
    });

    const keys2 = Object.keys(this.loyerState.numericRefinements) as (keyof typeof this.loyerState.numericRefinements)[];

    keys2.forEach((key:string) => {
      let keyName = encodeURI(key)
   
      if (this.loyerState.numericRefinements[key][">="]?.length && !this.loyerState.numericRefinements[key]["<="]?.length) {
        urlToSearchFilter = urlToSearchFilter + "&prod_ELITE_OFFERS%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.loyerState.numericRefinements[key][">="] + "%3A"
      } else if ((this.loyerState.numericRefinements[key]["<="]?.length && !this.loyerState.numericRefinements[key][">="]?.length)) {
        urlToSearchFilter = urlToSearchFilter + "&prod_ELITE_OFFERS%5Brange%5D%5B" + keyName.toString() + "%5D=%3A" + this.loyerState.numericRefinements[key]["<="]

      } else if ((this.loyerState.numericRefinements[key][">="]?.length && this.loyerState.numericRefinements[key]["<="]?.length)) {
        urlToSearchFilter = urlToSearchFilter + "&prod_ELITE_OFFERS%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.loyerState.numericRefinements[key][">="] + "%3A" + this.loyerState.numericRefinements[key]["<="]


      }
    });

    if (urlToSearchFilter?.length) {
      window.location.href = '/recherche?' + urlToSearchFilter

    }
    this.filterItsOk = false

  }

  clearQueryEvent($event){
    this.clearQuery = $event
  }
  async returnClear($event){

     await this.delay(0);
     this.clearQuery = $event
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  clearAllQueryEvent($event){
    this.clearAll = $event
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
  open(infoContent) {
    this.modalService.open(infoContent, { size: 'lg' });
  }
  ngDoCheck(){
    let searchUrl = decodeURI(this.config.getLocation().href)
    this.isProxautoPromoChecked = searchUrl.includes('Prix malin') ? true : false
  }
  selectedOrder($event){
    this.sortBy = $event
  }
}
