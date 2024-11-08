import { Component, Input, HostListener, Inject, PLATFORM_ID, EventEmitter, Output, OnChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { isPlatformBrowser, NgIf, NgFor, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig, NgClass } from '@angular/common';
import { AlgoliaResultsService } from './algolia-results.service';
import { AlgoliaCardComponent } from '../algolia-card/algolia-card.component';
import { SimilarModelComponent } from '../similar-model/similar-model.component';
import algoliasearch from 'algoliasearch';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { PromoService } from 'src/app/promo/promo.service';

@Component({
    selector: 'app-algolia-results',
    templateUrl: './algolia-results.component.html',
    styleUrls: ['./algolia-results.component.css'],
    standalone: true,
    imports: [NgIf, SimilarModelComponent, NgFor, AlgoliaCardComponent, NgOptimizedImage, NgClass],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class AlgoliaResultsComponent implements OnChanges, OnInit {
  @Input() searchResult: any;
  @Input() filterLoyerChecked:any;
  @Input() dataLoyerIsReady:boolean;
  @Input() filterChecked:any;
  @Input() loadingResult: boolean;
  @Input() showComparator;
  @Input() dataIsReady:boolean;
  @Input() totalResult:number;
  @Input () searchFilter:any;
  @Input() flashSaleData: any;
  @Input() encartVisible: boolean = true;
  @Input() TypeRoute: any;

  @Output() checkCompareResultEvent = new EventEmitter();
  results: any[];
  showImg: boolean;
  imgUrl: string;
  screenMode: number;
  isBrowser = false;
  type: string;
  modelsList: number = 0;
  showPlaceholder: boolean = true;
  rechercheFilter: string;
  FLASHSALE_DATA = makeStateKey<number>('flashsaledata');
  MODELS_LIST_KEY= makeStateKey<any>('modelsList');

  isLcp =true;
  desktopCardCount: number = 2; 
  tabletCardCount: number = 1; 
  dynamicCardCount: boolean= false;
  eventName: string;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.showImg = true;
  }

  @HostListener('window:click') clickInside() {
    this.showImg = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.visibleItemsDetector();
  }
  
  constructor(
    private config: ConfigService,
    private service: AlgoliaResultsService,
    private state : TransferState,
    private promoService: PromoService,
    @Inject(PLATFORM_ID) private platform: Object) {
    this.isBrowser = isPlatformBrowser(this.platform);
  }
  ngOnInit() {
    this.flashSaleData = this.state.get(this.FLASHSALE_DATA, null);
    if(this.encartVisible && !this.flashSaleData){
      this.promoService.getPromo().subscribe((res) => {
        if (res) {
          this.flashSaleData = res.find((item) => item.encartPromotion);
          this.state.set(this.FLASHSALE_DATA, <any>this.flashSaleData);
        }
      });
    }
  }
  ngOnChanges() {
    this.imgUrl = this.config.getNewImgUrl();
    this.type = this.config.getType();
    this.visibleItemsDetector();
    this.modelsList = this.state.get(this.MODELS_LIST_KEY, null);
    if(this.searchFilter?.disjunctiveFacetsRefinements && (this.searchResult.length == 0 || this.totalResult == 0) && !this.modelsList){
      if(this.searchFilter.disjunctiveFacetsRefinements?.modelId && this.searchFilter.disjunctiveFacetsRefinements?.modelId.length > 0){
        this.rechercheFilter =this.searchFilter.disjunctiveFacetsRefinements?.modelId[0];
        this.rechercheFilter = 'model_id_'+ this.rechercheFilter
      }else if(this.searchFilter?.disjunctiveFacetsRefinements?.modelGroupeNiveau1 && this.searchFilter?.disjunctiveFacetsRefinements?.modelGroupeNiveau1.length > 0){
        this.rechercheFilter = this.searchFilter?.disjunctiveFacetsRefinements?.modelGroupeNiveau1[0];
        this.rechercheFilter = 'model_'+  this.rechercheFilter
       }else if(this.searchFilter?.disjunctiveFacetsRefinements?.segmentEliteGroup && this.searchFilter?.disjunctiveFacetsRefinements?.segmentEliteGroup.length > 0){
        this.rechercheFilter = this.searchFilter.disjunctiveFacetsRefinements.segmentEliteGroup[0];
        this.rechercheFilter = 'carstype_'+ this.rechercheFilter
      }else {
        this.rechercheFilter = 'all'
      }
        this.service.similarModel(this.rechercheFilter,this.type).subscribe(data => {
          this.modelsList = data
          this.showPlaceholder = false
          this.state.set(this.MODELS_LIST_KEY,<any>this.modelsList)
        })
    }else{
      this.showPlaceholder = false
    }
    this.eventName = this.config.getWindow().document.location.pathname.includes('/recherche')?'view_search_results' : 'view_item_list';
    this.generateTrackingEvent(this.searchResult)
  }
  checkCompareEvent($event) {
    this.checkCompareResultEvent.emit(true)
  }

  visibleItemsDetector() {
    let screenWidth = this.config.getWindow().innerWidth;
    this.dynamicCardCount = screenWidth >= 1024 && screenWidth <= 1279;
    if (screenWidth < 700) {
      // mobile mode
      this.screenMode = 1;
    } else if (screenWidth < 992) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
  }


  generateTrackingEvent(items) {
    const ids = items.map(item => {
      return this.config.getWindow().document.location.href.includes('ELITE_LOYERS') ? item.offreId : item.id;
    });
    const eventData  = {
        event: this.eventName,
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
