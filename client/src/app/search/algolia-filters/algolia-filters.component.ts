import { isPlatformBrowser, NgIf, DecimalPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FilterColorsComponent } from './filter-colors/filter-colors.component';
import { LoyerKilometresComponent } from './loyer-kilometres/loyer-kilometres.component';
import { LoyerApportComponent } from './loyer-apport/loyer-apport.component';
import { LoyerNbLoyerComponent } from './loyer-nb-loyer/loyer-nb-loyer.component';
import { VehiculeDisponibilitiesComponent } from './vehicule-disponibilities/vehicule-disponibilities.component';
import { FilterModelComponent } from './filter-model/filter-model.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterMarqueComponent } from './filter-marque/filter-marque.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { AlgoliaClearRefinementsComponent } from './algolia-clear-refinements/algolia-clear-refinements.component';
import { AlgoliaCurrentRefinementsComponent } from './algolia-current-refinements/algolia-current-refinements.component';
import { NgAisHitsModule, NgAisRefinementListModule, NgAisRangeSliderModule, NgAisNumericMenuModule } from 'angular-instantsearch';
import { FilterPriceComponent } from './filter-price/filter-price.component';
import { FilterRentComponent } from './filter-rent/filter-rent.component';
import { VehiculeTypeComponent } from './vehicule-type/vehicule-type.component';
import { VehiculeCategorieComponent } from './vehicule-categorie/vehicule-categorie.component';
import { FilterNewnessComponent } from './filter-newness/filter-newness.component';
import { Location } from '@angular/common';
import { FilterLabelComponent } from './filter-label/filter-label.component';
import { FilterFrenshDaysComponent } from './filter-frensh-days/filter-frensh-days.component';
@Component({
    selector: 'app-algolia-filters',
    templateUrl: './algolia-filters.component.html',
    styleUrls: ['./algolia-filters.component.css'],
    standalone: true,
    imports: [NgAisHitsModule, FilterPriceComponent, FilterRentComponent,  VehiculeTypeComponent, VehiculeCategorieComponent, AlgoliaCurrentRefinementsComponent, NgIf, AlgoliaClearRefinementsComponent, FlashSaleComponent, CategoriesComponent, FilterMarqueComponent, NgbAlertModule, FilterModelComponent, NgAisRefinementListModule, NgAisRangeSliderModule, VehiculeDisponibilitiesComponent, NgAisNumericMenuModule, LoyerNbLoyerComponent, LoyerApportComponent, LoyerKilometresComponent, VehiculeTypeComponent, FilterColorsComponent, DecimalPipe, FilterNewnessComponent, NgClass, FilterLabelComponent, FilterFrenshDaysComponent]
})
export class AlgoliaFiltersComponent implements OnInit {

  @Input() filterMobileShow: boolean = false;
  @Input() itsNotSearchPage: boolean = false;
  @Input() totalResult: number;
  @Input() filterLoyers:boolean;
  @Input() isCarbPage:boolean ;
  @Input() priceFilterTerminals;
  @Input() rentFilterTerminals;

  @Output() closeFilterEvent = new EventEmitter();
  @Output() clearQueryEvent = new EventEmitter();
  @Output() clearAllQueryEvent = new EventEmitter();

  markAccordion: boolean = false;
  modelAccordion: boolean = false;
  generationAccordion: boolean = false;
  FinitionAccordion: boolean = false;
  carburantAccordion: boolean = false;
  KilometrageAccordion: boolean = false;
  YearAccordion: boolean = false;
  DisponibilityAccordion: boolean = false;
  priceAccordion: boolean = false;
  rentAccordion: boolean = false;
  discountAccordion: boolean = false;
  motorisationAccordion: boolean = false;
  vehTypeAccordion: boolean = false;
  transmissionAccordion: boolean = false;
  doorsAccordion: boolean = false;
  siegesAccordion: boolean = false;
  colorsAccordion: boolean = false;
  puissanceAccordion: boolean = false;
  co2Accordion: boolean = false;

  screenWidth: number;
  imgUrl: string;

  isBrowser: boolean;
  totalCurrentRefinementsValue: any;

  totalFilters: number = 0;
  nbMarkSelected: number = 0;
  nbModelSelected: number = 0;
  nbGenerationSelected: number = 0;
  nbFinitionSelected: number = 0;
  nbCarburantSelected: number = 0;
  nbLoyerMensuelSelected: number=0;
  nbNbLoyerSelected: number=0;
  nbApportSelected: number=0;
  totalLoyersSelected: number=0;
  nbKilometrageLoyerSelected: number=0;
  nbYearSelected: number;
  nbDispoSelected: number;
  nbPriceSelected: number;
  nbRentSelected: number;
  nbDiscountSelected: number;
  nbVehTypeSelected: number;
  nbMotorisationSelected: number;
  nbTransmissionsSelected: number;
  nbDoorsSelected: number;
  nbSiegesSelected: number;
  nbColorsSelected: number;
  nbPuissanceSelected: number;
  nbCo2Selected: number;
  nbKnmSelected: number;

  minPrice: any;
  maxPrice: any;
  maxKm: any;
  minKm: any;
  minYear: number;
  maxYear: number;
  minRent: number;
  maxRent: number;
  minDiscount: number;
  maxDiscount: number;
  minPuissance: number;
  maxPuissance: number;
  minCo2: number;
  maxCo2: number;

  totatlResults: any;
  hits: any;
  filterIsChecked: boolean = false;
  nbLoyer: any;
  apport: any;
  kilometres: any;
  priceFilterRemovedEvent: any;
  rentFilterRemovedEvent: any;

  constructor(
    private config: ConfigService,
    @Inject(PLATFORM_ID) private platformId,
    private location: Location
    ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    if(this.isCarbPage){
      this.markAccordion = true;
      this.modelAccordion = true;
      this.generationAccordion = true;
    }
    this.imgUrl = this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow().innerWidth;
    if (this.isBrowser) {
      this.rentAccordion = !this.rentAccordion;
      this.priceAccordion = !this.priceAccordion;
      this.DisponibilityAccordion = !this.DisponibilityAccordion;
      this.carburantAccordion = !this.carburantAccordion;
    }
    let config = this.config

    this.config.getWindow().addEventListener('scroll', function (e) {
      if(config.getWindow().document.getElementById("divResult") && config.getWindow().document.getElementById("btnResult1")){
        var posDivResult = config.getWindow().document.getElementById("divResult").getBoundingClientRect();
        var posBtnResult = config.getWindow().document.getElementById("btnResult1").getBoundingClientRect();


        if (posDivResult.top < 70) {
          config.getWindow().document.getElementById("btnResult").classList.remove("unsetPostion", "noShadow");
          config.getWindow().document.getElementById("btnResult1").classList.remove("unsetPostion");
          config.getWindow().document.getElementById("btnResult").classList.add("fixedTop");
          config.getWindow().document.getElementById("btnResult1").classList.add("fixedTop");

        } 
        else if (posDivResult.top <= posBtnResult.top &&
            !(posBtnResult.bottom + 4 >= (config.getWindow().innerHeight || config.getWindow().document.documentElement.clientHeight))) {
            config.getWindow().document.getElementById("btnResult").classList.add("unsetPostion", "noShadow");
            config.getWindow().document.getElementById("btnResult1").classList.add("unsetPostion");
            config.getWindow().document.getElementById("btnResult").classList.remove("fixedTop");
            config.getWindow().document.getElementById("btnResult1").classList.remove("fixedTop");
        }

        else {
          config.getWindow().document.getElementById("btnResult").classList.remove("unsetPostion", "noShadow");
          config.getWindow().document.getElementById("btnResult1").classList.remove("unsetPostion");
          config.getWindow().document.getElementById("btnResult").classList.remove("fixedTop");
          config.getWindow().document.getElementById("btnResult1").classList.remove("fixedTop");
        }
      }
    });

    if (this.location.getState()) {
      let state = this.location.getState()
      if ((Object.keys(state).filter(el => el == "isBlockOpen"))?.length > 0) {
        if (state["isBlockOpen"])
          this.filterMobileShow = true
      }
    }   
  }

  filterByPromotion(items: any[],name: string): boolean {
    return items?.some(item => item.promoName === name) || false;
  }

  isSliderDisabled(results: any, attribute: any): boolean {
    let minValue;
    let maxValue;

    if (!(results?._state?.numericRefinements?.[attribute]?.['>='] && results?._state?.numericRefinements?.[attribute]?.['>=']?.length)) {
        minValue = results?.facets_stats?.[attribute]?.min;
    } else if (results?._state?.numericRefinements?.[attribute]?.['>='] && results?._state?.numericRefinements?.[attribute]?.['>=']?.length) {
        minValue = results?._state?.numericRefinements?.[attribute]?.['>='];
    }

    if (!(results?._state?.numericRefinements?.[attribute]?.['<='] && results?._state?.numericRefinements?.[attribute]?.['<=']?.length)) {
        maxValue = results?.facets_stats?.[attribute]?.max;
    } else if (results?._state?.numericRefinements?.[attribute]?.['<='] && results?._state?.numericRefinements?.[attribute]?.['<=']?.length) {
        maxValue = results?._state?.numericRefinements?.[attribute]?.['<='];
    }

    return minValue === maxValue;
}
  toRound(valueToRound){
    return Math.ceil(Number(valueToRound));
  }

  checkFilter(result: any, filter: any) {
    let filterOk = false
      result = (decodeURIComponent(result)).split('&')
      result.forEach((el: any) => {
        if (el.includes('facetFilters')) {
          if (el.includes(filter) && (this.itsNotSearchPage == false)) {
            filterOk = true
          }
        }
      }
      )
    return filterOk
  }

  typeVehicule(items: any) {
    items.forEach((item: any) => {
      if (item.label == 'true') {
        item.highlighted = 'Occasions';
      } else {
        item.highlighted = 'Neuf (0 km)';
      }
    })
    return items
  }

  transformCarburant(items: any) {
    let listCarburantincludes = ['diesel', 'electrique', 'essence', 'gpl / gnv', 'hybride', 'ethanol', 'hydrogène']
    return items.filter((item: any) => listCarburantincludes.includes(item.label))
  }

  transformTransmission(items: any) {
    let listTransmissions = ['manuelle', 'automatique']
    return items.filter((item: any) => listTransmissions.includes(item.label))
  }

  transformPortes(items: any) {
    items.forEach((item: any) => item.highlighted = item.highlighted + ' portes')
    return items
  }

  transformSieges(items: any) {
    items.forEach((item: any) => item.highlighted = item.highlighted + ' sièges')
    return items
  }

  transformLabel(items: any) {
    items.forEach((item: any) => {item.highlighted = 'BLACK FRIDAY ' + item.highlighted})
    const labelOrder = ["-100 €", "-200 €", "-300 €", "-400 €", "-500 €", "-1000 €"];
    return items.sort((a, b) => labelOrder.indexOf(a.label) - labelOrder.indexOf(b.label));
  }

  closeFilter() {
    this.filterMobileShow = !this.filterMobileShow
    this.closeFilterEvent.emit()
  }
  marqueChecked(e){
    if(e == true){
      this.config.getWindow().document.getElementById("mark").scrollIntoView({behavior:"smooth", block: "start"});
      this.modelAccordion = true
    }
  }

  modelChecked(e){
    if(e == true){
      this.config.getWindow().document.getElementById("model").scrollIntoView({behavior:"smooth", block: "nearest"});
      this.generationAccordion = true
    }
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  clearQueryValue($event){
    this.clearQueryEvent.emit($event)
  }

  clearAllQuery($event){
    this.clearAllQueryEvent.emit($event)
  }

  nbLoyerValue($event){
    if($event)
      this.nbLoyer = $event
  }

  apportValue($event){
    if($event || $event == 0)
      this.apport = $event
  }

  kilometresValue($event){
    if($event)
      this.kilometres = $event
  }

  priceFilterRemoved($event){
    if($event)
    this.priceFilterRemovedEvent=$event
  }

  rentFilterRemoved($event){
    if($event)
    this.rentFilterRemovedEvent=$event
  }
}
