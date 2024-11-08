import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectPagination, {
  PaginationWidgetDescription,
  PaginationConnectorParams
} from 'instantsearch.js/es/connectors/pagination/connectPagination';
import { NgFor, NgClass } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Component({
    selector: 'app-algolia-pagination',
    templateUrl: './algolia-pagination.component.html',
    styleUrls: ['./algolia-pagination.component.css'],
    standalone: true,
    imports: [NgFor, NgClass]
})
export class AlgoliaPaginationComponent extends TypedBaseWidget<PaginationWidgetDescription, PaginationConnectorParams> {
  public state: PaginationWidgetDescription['renderState']; // Rendering options
  @Input() searchResults: any
  @Input() sortBy: any
  index: string;
  query: string;
  ENCART_DATA = makeStateKey('encartDataHeader');
  flashSaleData: any;
  
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    private route: ActivatedRoute,
    private transferState: TransferState
  ) {
    super('Pagination');
  }

  ngOnInit(): void {
    this.createWidget(connectPagination, {
      // instance options
      
    });
    super.ngOnInit();

    this.flashSaleData = this.transferState.get(this.ENCART_DATA, null);

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

  redirect(page) {   
      var urlToSearchFilter = ""
      let currentPage = page + 1
      
      urlToSearchFilter = this.index + "%5Bpage%5D=" + currentPage
      
      if(this.searchResults?.state?.disjunctiveFacetsRefinements) {
        const keys = Object.keys(this.searchResults?.state?.disjunctiveFacetsRefinements) as (keyof typeof this.searchResults.state.disjunctiveFacetsRefinements)[];
        keys.forEach((key:string) => {
          let keyName = encodeURI(key)
          if (this.searchResults?.state?.disjunctiveFacetsRefinements[key]?.length) {
            this.searchResults?.state?.disjunctiveFacetsRefinements[key].forEach((el, index) => {
              urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5BrefinementList%5D%5B" + keyName.toString() + "%5D%5B" + index + "%5D=" + encodeURI(el)
            })
          }
        });
      }

      if(this.searchResults?.state?.numericRefinements) {
        const keys2 = Object.keys(this.searchResults?.state?.numericRefinements) as (keyof typeof this.searchResults.state.numericRefinements)[];
        keys2.forEach((key:string) => {
          let keyName = encodeURI(key)
      
          if (this.searchResults?.state?.numericRefinements[key][">="]?.length && !this.searchResults?.state?.numericRefinements[key]["<="]?.length) {
            urlToSearchFilter = urlToSearchFilter + "&"+ this.index +"%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.searchResults?.state?.numericRefinements[key][">="] + "%3A"
          } else if ((this.searchResults?.state?.numericRefinements[key]["<="]?.length && !this.searchResults?.state?.numericRefinements[key][">="]?.length)) {
            urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5Brange%5D%5B" + keyName.toString() + "%5D=%3A" + this.searchResults?.state?.numericRefinements[key]["<="]
  
          } else if ((this.searchResults?.state?.numericRefinements[key][">="]?.length && this.searchResults?.state?.numericRefinements[key]["<="]?.length)) {
            urlToSearchFilter = urlToSearchFilter + "&" + this.index +"%5Brange%5D%5B" + keyName.toString() + "%5D=" + this.searchResults?.state?.numericRefinements[key][">="] + "%3A" + this.searchResults?.state?.numericRefinements[key]["<="]
          }
        });
      }

      if(this.sortBy){
        urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5BsortBy%5D=" + this.sortBy
      }

      if(this.searchResults?.results?.hitsPerPage){
        let hitsPerPage =  (this.flashSaleData && this.searchResults?.results?.hitsPerPage == 15) ? 14 : this.searchResults?.results?.hitsPerPage
        urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5BhitsPerPage%5D=" + hitsPerPage
      }

      if(this.query){
        urlToSearchFilter = urlToSearchFilter + "&" + this.index + "%5Bquery%5D=" + this.query
      }
      window.location.href = '/recherche?' + urlToSearchFilter

     
    }
}
