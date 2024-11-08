import { Component, Input, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ConfigService } from 'src/app/shared/config/config.service';
import { SliderOutValues, SliderParams } from 'src/app/shared/shared';
import algoliasearch from 'algoliasearch';
import { FormsModule } from '@angular/forms';
import { IntervalSliderComponent } from '../../shared/interval-slider/interval-slider.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DecimalPipe } from '@angular/common';
import { CarsFilters, CarsTypes, Disponibilities, Fuels } from 'src/app/home-next/filters/filters';

@Component({
    selector: 'app-home-leasing-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.css'],
    standalone: true,
    imports: [LazyLoadImageModule, IntervalSliderComponent, FormsModule, DecimalPipe]
})
export class FiltresComponent implements OnInit {

  @Input() screenMode: number = 1;

  screenWidth: number;
  filterBgImage: string;
  minMonthBudget: number = 0;
  minMonthBudget1: number = 0;
  maxMonthBudget: number = 5000;
  maxMonthBudget1: number = 0;
  financingTerm: number = 48;
  AnnualMileage: number = 5000;
  apport: number = 0;

  sliderParams = new SliderParams(0,0,5000,5000,0,5000,100);


  public imgUrl: string;
  public searchResult: string;

  SEARCH_RESULT_KEY = makeStateKey<any>('searchResult');

  carsFilters: CarsFilters = new CarsFilters();
  searchClient: any;
  index: any;

  constructor(
    private config: ConfigService,
    private state: TransferState,
  ) { 
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex("prod_ELITE_LOYERS");
  }

  ngOnInit(): void {
    if (this.screenMode == 1) {
      this.filterBgImage = this.config.getNewImgUrl() + '/lease/home/banniere_tablet.webp';
    } else if (this.screenMode == 2) {
      this.filterBgImage = this.config.getNewImgUrl() + '/lease/home/banniere_tablet.webp';
    } else {
      this.filterBgImage = this.config.getNewImgUrl() + '/lease/home/banniere_desktop.webp';
    }

    this.screenWidth = this.config.getWindow().innerWidth;


    this.sliderParams.minLeft = 0;
    this.sliderParams.minRight = 0;
    this.sliderParams.maxLeft = 5000;
    this.sliderParams.maxRight = 5000;
    this.sliderParams.minValue = 0;
    this.sliderParams.maxValue = 5000;
    this.sliderParams.step = 100;

    this.minMonthBudget1 = 0;
    this.maxMonthBudget1 =  5000;  

    this.carsFilters.minMonthBudget = this.minMonthBudget1;
    this.carsFilters.maxMonthBudget = this.maxMonthBudget1;
    
    this.carsFilters.carType = new CarsTypes();
    this.carsFilters.disponibility = new Disponibilities();
    this.carsFilters.fuel = new Fuels()

    this.carsFilters.text = '';

    this.searchResult = this.state.get(this.SEARCH_RESULT_KEY, null);

    if (!this.searchResult) {
      this.filterAction();
    }
  }

  sliderValues($event:SliderOutValues){
    this.minMonthBudget1 = $event.valueLeft ;
    this.maxMonthBudget1 = $event.valueRight ;
    this.carsFilters.minMonthBudget =  Math.min($event.valueLeft,$event.valueRight) ;
    this.carsFilters.maxMonthBudget =  Math.max($event.valueLeft,$event.valueRight) ;
    this.filterAction();
  }
  
  redirect() {
    var url_recherche = location.protocol + "//" + this.config.getEliteAutoHost() + '/recherche';
    var url = ""

    if (this.carsFilters.maxMonthBudget < 5000 && this.carsFilters.minMonthBudget > 0) {
      url = url + "prod_ELITE_LOYERS[range][loyerMensuel]=" + this.carsFilters.minMonthBudget + ":" + this.carsFilters.maxMonthBudget 
    }
    else if (this.carsFilters.maxMonthBudget < 5000) {
      url = url + "prod_ELITE_LOYERS[range][loyerMensuel]=:" + this.carsFilters.maxMonthBudget 
    }
    else if (this.carsFilters.minMonthBudget > 0) {
      url = url + "prod_ELITE_LOYERS[range][loyerMensuel]=" + this.carsFilters.minMonthBudget + ":" 
    }

    url = url + "prod_ELITE_LOYERS[refinementList][nbLoyer][0]=" + this.financingTerm
    url = url + "prod_ELITE_LOYERS[range][apport]=" + this.apport + ':' + this.apport
    url = url + "prod_ELITE_LOYERS[refinementList][kilometres][0]=" + this.AnnualMileage
    
    url = url_recherche + url
    var split =  url.split('prod_ELITE_LOYERS'); 
    var replaced = split[0] + '?prod_ELITE_LOYERS' + split.slice(1).join('&prod_ELITE_LOYERS')
    this.config.getWindow().location.href = replaced

  }

  filterAction() {
    let numericFilter = []
    let dureeFilter = []
    let annualMileageFilter = []
    let apportFilter = []

     if (this.carsFilters.maxMonthBudget < 5000 && this.carsFilters.minMonthBudget > 0) {
      numericFilter.push("loyerMensuel>="+ this.carsFilters.minMonthBudget , "loyerMensuel<="+ this.carsFilters.maxMonthBudget) 
    }
    else if (this.carsFilters.maxMonthBudget < 5000) {
      numericFilter.push("loyerMensuel<="+ this.carsFilters.maxMonthBudget) 
    }
    else if (this.carsFilters.minMonthBudget > 0) {
      numericFilter.push("loyerMensuel>="+ this.carsFilters.minMonthBudget) 
    }
    
    dureeFilter.push("nbLoyer:" + this.financingTerm)
    apportFilter.push("apport:" + this.apport)
    annualMileageFilter.push("kilometres:" + this.AnnualMileage)
    

    this.index.search('', {
      facetFilters: [
        dureeFilter,
        annualMileageFilter,
        apportFilter
      ],
      numericFilters: numericFilter
      
    }).then(( hits ) => {
      if (hits.nbHits > 0)
        this.searchResult = 'Voir les <strong>' + hits.nbHits + ' Véhicules</strong>';
      else
        this.searchResult = 'Aucun Véhicule Disponible';
      this.state.set(this.SEARCH_RESULT_KEY, <any> this.searchResult );
    });
  }
}
