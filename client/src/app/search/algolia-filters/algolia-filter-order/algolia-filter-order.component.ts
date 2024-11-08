import { Component, Inject, forwardRef, Optional, Input, EventEmitter, Output } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectSortBy, {
  SortByWidgetDescription,
  SortByConnectorParams
} from 'instantsearch.js/es/connectors/sort-by/connectSortBy';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';
@Component({
    selector: 'app-algolia-filter-order',
    templateUrl: './algolia-filter-order.component.html',
    styleUrls: ['./algolia-filter-order.component.css'],
    standalone: true,
    imports: [NgFor, NgIf, FormsModule, NgbDropdownModule],
    
})
export class AlgoliaFilterOrderComponent extends TypedBaseWidget<SortByWidgetDescription, SortByConnectorParams> {
  showList:boolean = false;
  @Input() filterLoyerChecked:boolean;
  @Input() isPromoPage:boolean;
  @Output() orderChecked = new EventEmitter<any>(); 
  public state: SortByWidgetDescription['renderState']; // Rendering options
  sortByDetected: string;
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    private config: ConfigService
  ) {
    super('SortBy');
    this.sortByDetected = this.config.getWindow().location.href.includes('sortBy') ? decodeURI(this.config.getWindow().location.href).split('[sortBy]=')[1].split('&')[0] : 'prod_ELITE_OFFERS'
  
  }
  ngOnInit() {
    if(this.filterLoyerChecked){
      this.createWidget(connectSortBy, {
        items: [
          { label: 'Pertinence', value: 'prod_ELITE_LOYERS' },
          { label: 'Marque (croissant)', value: 'prod_ELITE_LOYERS_brands_asc' },
          { label: 'Marque (décroissant)', value: 'prod_ELITE_LOYERS_brands_desc' },
          { label: 'Remise (croissant)', value: 'prod_ELITE_LOYERS_discount_asc' },
          { label: 'Remise (décroissant)', value: 'prod_ELITE_LOYERS_discount_desc' },
          { label: 'Prix (croissant)', value: 'prod_ELITE_LOYERS_price_asc' },
          { label: 'Prix (décroissant)', value: 'prod_ELITE_LOYERS_price_desc' },
          { label: 'Mensualités (croissant)', value: 'prod_ELITE_LOYERS_monthlyPayment_asc' },
          { label: 'Mensualités (décroissant)', value: 'prod_ELITE_LOYERS_monthlyPayment_desc' },
          { label: 'Année (croissant)', value: 'prod_ELITE_LOYERS_year_asc' },
          { label: 'Année (décroissant)', value: 'prod_ELITE_LOYERS_year_desc' },
          { label: 'Kilométrage (croissant)', value: 'prod_ELITE_LOYERS_mileage_asc' },
          { label: 'Kilométrage (décroissant)', value: 'prod_ELITE_LOYERS_mileage_desc' },
        ],
      });
    }else{
      this.createWidget(connectSortBy, {
        items: [
          { label: 'Pertinence', value: 'prod_ELITE_OFFERS' },
          { label: 'Marque (croissant)', value: 'prod_ELITE_OFFERS_brands_asc' },
          { label: 'Marque (décroissant)', value: 'prod_ELITE_OFFERS_brands_desc' },
          { label: 'Remise (croissant)', value: 'prod_ELITE_OFFERS_discount_asc' },
          { label: 'Remise (décroissant)', value: 'prod_ELITE_OFFERS_discount_desc' },
          { label: 'Prix (croissant)', value: 'prod_ELITE_OFFERS_price_asc' },
          { label: 'Prix (décroissant)', value: 'prod_ELITE_OFFERS_price_desc' },
          { label: 'Mensualités (croissant)', value: 'prod_ELITE_OFFERS_monthlyPayment_asc' },
          { label: 'Mensualités (décroissant)', value: 'prod_ELITE_OFFERS_monthlyPayment_desc' },
          { label: 'Année (croissant)', value: 'prod_ELITE_OFFERS_year_asc' },
          { label: 'Année (décroissant)', value: 'prod_ELITE_OFFERS_year_desc' },
          { label: 'Kilométrage (croissant)', value: 'prod_ELITE_OFFERS_mileage_asc' },
          { label: 'Kilométrage (décroissant)', value: 'prod_ELITE_OFFERS_mileage_desc' },
        ],
      });
    }
    
    super.ngOnInit();
  }

  orderSelected($event){
    this.orderChecked.emit($event);
    this.showList= !this.showList;
     
  }
  showListButton () {
   this.showList = !this.showList;
  }

}