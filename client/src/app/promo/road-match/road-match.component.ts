import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { PromoService } from '../promo.service';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgAisConfigureModule, NgAisHitsPerPageModule, NgAisInstantSearchModule, NgAisPaginationModule } from 'angular-instantsearch';
import { AlgoliaCardComponent } from 'src/app/search/algolia-card/algolia-card.component';
import algoliasearch from 'algoliasearch';
import { AlgoliaPaginationComponent } from 'src/app/shared/algolia-pagination/algolia-pagination.component';
import { AlgoliaFilterOrderComponent } from 'src/app/search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoadMatchFiltersComponent } from './road-match-filters/road-match-filters.component';

@Component({
  selector: 'app-road-match',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, AlgoliaCardComponent, NgAisInstantSearchModule,
    NgAisConfigureModule, NgAisPaginationModule, NgAisHitsPerPageModule, AlgoliaPaginationComponent,
    AlgoliaFilterOrderComponent, RoadMatchFiltersComponent],
  templateUrl: './road-match.component.html',
  styleUrls: ['./road-match.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class RoadMatchComponent {
  roadMatchValue: string;
  configResults:  any;
  hitsPerPage: any;
  currentPage: any;
  countPerPage: number;
  hitsSearch: any;
  searchResults: any;
  totalResult: any;
  results: any;
  mode: string;
  totalCompare: number;
  facetFilters: any;
  searchClient: any;
  index: any;
  indexName: string;
  numericFilters: string;
  loadingResult: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.visibleItemsDetector();
  }

  constructor(
    private service: PromoService,
    private config: ConfigService,
    private router: Router
    ) {}

  ngOnInit() {
    this.visibleItemsDetector();
    
    this.roadMatchValue  = this.service.getRoadMatchCookie();

    if(!this.roadMatchValue){
      this.openRoadMatchFilters()
    }
    // Extracting indexName
    const indexNameMatch = this.roadMatchValue.match(/indexName=([^&]*)/);
    this.indexName = indexNameMatch ? indexNameMatch[1] : null;

    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex(this.indexName);

    this.configResults = {
      searchClient: algoliasearch(this.config.algolia.appId, this.config.algolia.appKey),
      indexName: this.indexName
    };

    // Extracting facetFilters
    const facetFiltersMatch = this.roadMatchValue?.match(/facetFilters=([^&]*)/);
    this.facetFilters = facetFiltersMatch ? decodeURIComponent(facetFiltersMatch[1]) : null;

    // // Extracting numericFilters
    const numericFiltersMatch = this.roadMatchValue?.match(/numericFilters=([^&]*)/);
    this.numericFilters = numericFiltersMatch ? decodeURIComponent(numericFiltersMatch[1]) : null;
    this.facetFilters = this.facetFilters.replace(/\+/g, ' ');
    
    this.index.search('', {
      facetFilters:  this.facetFilters,
      numericFilters: this.numericFilters
    }).then(( hits ) => {
      this.results = hits
      this.totalResult = hits.nbHits
    });
  }

  getSearchResults($event) {
    if ($event.results) {
      this.hitsPerPage = $event.state?.hitsPerPage;
      this.currentPage = $event.state?.page;
      this.countPerPage = this.hitsPerPage * (this.currentPage + 1);
      this.hitsSearch = $event.results?.hits;
      this.searchResults = $event;
      if ($event.results?.nbHits != null) {
          this.totalResult = $event.results?.nbHits;
          this.results = $event.results
      }
      this.generateTrackingEvent(this.hitsSearch)
      this.loadingResult = false
    }
  }

  reset(){
    this.service.deleteCookie()
    this.openRoadMatchFilters()
    const existingScript = this.config.getWindow().document.getElementById('eventTracking');
    if (existingScript) {
      existingScript.remove();
    }
  }

  openRoadMatchFilters(){
    this.router.navigate(["/"]);
    this.service.setVisibility(false);
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

  visibleItemsDetector() {
    let screenWidth = this.config.getWindow()?.innerWidth;
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
  
}
