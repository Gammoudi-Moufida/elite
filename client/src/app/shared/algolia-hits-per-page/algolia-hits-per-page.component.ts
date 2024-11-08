import { Component,  Inject, forwardRef, Optional, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectHitsPerPage, {
  HitsPerPageWidgetDescription,
  HitsPerPageConnectorParams
} from 'instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { PromoService } from 'src/app/promo/promo.service';

@Component({
    selector: 'app-algolia-hits-per-page',
    templateUrl: './algolia-hits-per-page.component.html',
    styleUrls: ['./algolia-hits-per-page.component.css'],
    standalone: true,
    imports: [NgFor, FormsModule]
})
export class AlgoliaHitsPerPageComponent extends TypedBaseWidget<HitsPerPageWidgetDescription, HitsPerPageConnectorParams> {
  public state: HitsPerPageWidgetDescription['renderState']; // Rendering options
  @Input() searchResults: any
  @Input() flashSaleData: any
  @Input() encartVisible: boolean =true
  @Input() sortBy: any
  index: string;
  query: string;
  PROMO_DATA = makeStateKey('encartDataHeader');
  promoData: any;

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    private route: ActivatedRoute,
    private transferState:TransferState,
    private promoService: PromoService
  ) { 
    super('HitsPerPage');

  }

  ngOnInit(): void {

    if (!this.encartVisible) {
      this.createWidget(connectHitsPerPage, {
        // instance options
        items: [
          { label: '15', value: 15, default: true },
          { label: '30', value: 30 },
          { label: '60', value: 60 },
          { label: '100', value: 100 },
        ],
      });
    } else {
      this.promoData = this.transferState.get(this.PROMO_DATA, null);
      if (!this.promoData) {
        this.promoService.getPromo().subscribe((res) => {
          if (res) {
            this.promoData = res.find((item) => item.encartPromotion);
            this.transferState.set(this.PROMO_DATA, <any>this.promoData);
            this.getWidget()
          }
        });
      }else{
        this.getWidget()
      }
    }

    
    this.route.queryParams.subscribe(params => {
      if(params['prod_ELITE_OFFERS[sortBy]'] ){
        this.sortBy = params['prod_ELITE_OFFERS[sortBy]']
      }
      if(params['prod_ELITE_LOYERS[sortBy]']){
        this.sortBy = params['prod_ELITE_LOYERS[sortBy]']
      }
    }
    );    
  }

  getWidget() { 
    if ((this.promoData && this.promoData?.encartPromotion) || (this.flashSaleData && this.flashSaleData?.encartPromotion)) {
      this.createWidget(connectHitsPerPage, {
        // instance options
        items: [
          { label: '14', value: 14, default: true },
          { label: '29', value: 29 },
          { label: '59', value: 59 },
          { label: '99', value: 99 },
        ],
      });
    } else {
      this.createWidget(connectHitsPerPage, {
        // instance options
        items: [
          { label: '15', value: 15, default: true },
          { label: '30', value: 30 },
          { label: '60', value: 60 },
          { label: '100', value: 100 },
        ],
      });
    }
    super.ngOnInit();
  }

  ngOnChanges(){
    if(this.searchResults?.results?.index == "prod_ELITE_LOYERS" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_brands_asc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_brands_desc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_discount_asc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_discount_desc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_price_asc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_price_desc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_monthlyPayment_asc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_monthlyPayment_desc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_year_asc" || this.searchResults?.results?.index == "prod_ELITE_LOYERS_year_desc" ){
      this.index = "prod_ELITE_LOYERS"
    }else{
      this.index = "prod_ELITE_OFFERS"
    }
    if(this.searchResults?.results){
      this.query = this.searchResults?.results?.query
    }
  }

  redirect(hitsPerPage) {
    var urlToSearchFilter = ""
    
    urlToSearchFilter = this.index + "%5BhitsPerPage%5D=" + hitsPerPage
    
    if(this.searchResults?.state?.disjunctiveFacetsRefinements) {
      const keys = Object.keys(this.searchResults?.state?.disjunctiveFacetsRefinements) as (keyof typeof this.searchResults.state.disjunctiveFacetsRefinements)[];
      keys.forEach((key) => {
        let keyName = key
        if (this.searchResults?.state?.disjunctiveFacetsRefinements[key]?.length) {
          this.searchResults?.state?.disjunctiveFacetsRefinements[key].forEach((el, index) => {
            urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5BrefinementList%5D%5B" + keyName.toString() + "%5D%5B" + index + "%5D=" + el
          })
        }
      });
    }

    if(this.searchResults?.state?.numericRefinements) {
      const keys2 = Object.keys(this.searchResults?.state?.numericRefinements) as (keyof typeof this.searchResults.state.numericRefinements)[];
      keys2.forEach((key) => {
        let keyName = key
    
        if (this.searchResults?.state?.numericRefinements[key][">="]?.length && !this.searchResults?.state?.numericRefinements[key]["<="]?.length) {
          urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.searchResults?.state?.numericRefinements[key][">="] + "%3A"
        } else if ((this.searchResults?.state?.numericRefinements[key]["<="]?.length && !this.searchResults?.state?.numericRefinements[key][">="]?.length)) {
          urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5Brange%5D%5B" + keyName.toString() + "%5D=%3A" + this.searchResults?.state?.numericRefinements[key]["<="]

        } else if ((this.searchResults?.state?.numericRefinements[key][">="]?.length && this.searchResults?.state?.numericRefinements[key]["<="]?.length)) {
          urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.searchResults?.state?.numericRefinements[key][">="] + "%3A" + this.searchResults?.state?.numericRefinements[key]["<="]
        }
      });
    }

    if(this.sortBy){
      urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5BsortBy%5D=" + this.sortBy
    }

    if(this.query){
      urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5Bquery%5D=" + this.query
    }
      
    window.location.href = '/recherche?' + urlToSearchFilter
  }

}
