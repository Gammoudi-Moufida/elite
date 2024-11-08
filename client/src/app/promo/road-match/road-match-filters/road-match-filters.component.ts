import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';
import algoliasearch from 'algoliasearch';
import { IntervalSliderComponent } from 'src/app/shared/interval-slider/interval-slider.component';
import { SliderParams } from 'src/app/shared/shared';
import { PromoService } from '../../promo.service';


@Component({
  selector: 'app-road-match-filters',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, IntervalSliderComponent],
  templateUrl: './road-match-filters.component.html',
  styleUrls: ['./road-match-filters.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
  
})
export class RoadMatchFiltersComponent {
  @Output() modalClosed = new EventEmitter<boolean>();
 
  
  isModalVisible: boolean= true;
  currentStep: number = 1;
  searchClient: any;
  index: any;
  total: any;
  roadMatchFilters: any;
  siteUrl: string;
  selectedVehicles: string[] = [];
  selectedCarburant: string[] = [];
  selectedTransmission: string[] = [];
  selectedCategorie: string[] = [];
  selectedUtilitaire: string[] = [];
  facetFilters: string[][] = [];
  numericFilters:string[] = [];
  vehicleTypes = [
    { description: "Un véhicule tout-terrain pour dompter la route avec style et espace.", value :"suv_4x4_crossover" },
    { description: "Cheveux au vent, soleil au zénith !", values: ["coupe", "cabriolet"] },    
    { description: "Pratique et maniable en ville.", value :"citadine" },    
    { description: "Élégance, confort et espace.", value :"berline_compacte" },  
    // { description: "Pour répondre aux besoins de votre entreprise.", value :"Utilitaire" },
  ];

  vehicleUtilitaire = [
    { description: "Pour répondre aux besoins de votre entreprise.", value :"Professionnel" },
  ];

  carburantTypes = [
    { description: "Le plus connu de tous. Rien ne bat l'odeur de l'essence.", value :"essence" },
    { description: "Puissance et économie, pour les longs trajets.", value :"diesel" },
    { description: "Silencieuse, propre et prête à électriser vos trajets.", value :"electrique" },
    { description: "Conduite plus verte et économe en carburant. ", value :"hybride" },
    { description: "Économique et respectueux de l'environnement, une alternative intelligente.", values: ["gpl / gnv", "ethanol"] },

  ];

  transmissionTypes = [
    { description: "J’aime avoir le contrôle total sur la route.", value:"manuelle" },
    { description: "Facile et sans effort, laissant plus de place à l'appréciation du paysage.", value:"automatique" },
  ];

  categorieTypes = [    
    { description: "Une création sur mesure à la commande.", value:3 },
    { description: "Le frisson du tout premier tour de clé !", value:4 },
    { description: "Les kilomètres racontent des histoires.", value:1 },
  ];
  indexName: any;
  imgUrl: string;
  
  minRent: number = 32;
  maxRent:  number = 3157;
  minPrice:  number = 6285;
  maxPrice:  number = 208545;
  minRent1: number = 32;
  maxRent1:  number = 3157;
  minPrice1:  number = 6285;
  maxPrice1:  number = 208545;

  rentSliderParams = new SliderParams(32,32,3157,3157,32,3157,1);
  priceSliderParams = new SliderParams(6285,6285,208545,208545,6285,208545,1);
  rentInterval: any[];
  filterRentIsChecked: boolean = false;
  priceInterval: any[];
  indexLoyer: any;
  loyerChecked: boolean = false;

  constructor(private config: ConfigService, private service: PromoService) { 
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex("prod_ELITE_OFFERS");
    this.indexLoyer = this.searchClient.initIndex("prod_ELITE_LOYERS");
  }
  
  ngOnInit() {
    this.siteUrl = this.config.getSiteUrl()
    this.imgUrl = this.config.getNewImgUrl();

  }
  isSelected(type: string, item: any): boolean {
    const selectedValues = item.values || [item.value];
    return selectedValues.some(value => this.getSelectedArray(type).includes(`${type}:${value}`));
}
  selectItem(type: string, item: any) {
    const selectedValues = item.values || [item.value];

    selectedValues.forEach(value => {
        const selectedValue = `${type}:${value}`;
        const selectedArray = this.getSelectedArray(type);

        const index = selectedArray.indexOf(selectedValue);
        if (index !== -1) {
            selectedArray.splice(index, 1);
        } else {
            selectedArray.push(selectedValue);
        }
    });
    this.facetFilters = this.combineArrays(this.selectedVehicles, this.selectedCarburant, 
      this.selectedTransmission, this.selectedCategorie,  this.selectedUtilitaire);
    this.filterAction();
}
  
  getSelectedArray(type: string): string[] {
    if (type === "segmentEliteGroup") {
      return this.selectedVehicles;
    } else if (type === "energieNormalized") {
      return this.selectedCarburant;
    } else if (type === "transmissionNormalized") {
      return this.selectedTransmission;
    } else if (type === "category") {
      return this.selectedCategorie;
    } else if (type === "typeForRecherche"){
      return this.selectedUtilitaire
    }
  
    return [];
  }

  combineArrays(...arrays: string[][]): string[][] {
    return arrays;
  }
  
  filterAction(){
    if(this.loyerChecked){
      let numFilter = this.numericFilters.concat("apport<=2000","apport>=2000")
      this.facetFilters = this.combineArrays(this.selectedVehicles, this.selectedCarburant,
        this.selectedTransmission, this.selectedCategorie, this.selectedUtilitaire, ["nbLoyer:48"],["kilometres:5000"]);
      
        this.indexLoyer.search('', {
      facetFilters:  this.facetFilters,
      numericFilters:  numFilter   
    }).then(( hits ) => {
      this.total = hits.nbHits
      this.roadMatchFilters = hits.params
    });
    }else{
      this.facetFilters = this.combineArrays(this.selectedVehicles, this.selectedCarburant,
        this.selectedTransmission, this.selectedCategorie,this.selectedUtilitaire);
      this.index.search('', {
        facetFilters:  this.facetFilters,
        numericFilters:  this.numericFilters    
      }).then(( hits ) => {
        this.total = hits.nbHits
        this.roadMatchFilters = hits.params
      });
    }
   
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  showResult() {

    let concatenatedValue = `indexName=prod_ELITE_OFFERS&${this.roadMatchFilters}`;

    if(this.loyerChecked){
      concatenatedValue = `indexName=prod_ELITE_LOYERS&${this.roadMatchFilters}`;
    }
    this.service.setRoadMatchCookie(`roadMatchCookie=${concatenatedValue}`)
    this.config.getWindow().location.href = this.siteUrl + 'road-match'

  }

  sliderValuesForRentSlider($event){

    this.rentInterval = []
    this.minRent = Math.min($event.valueLeft, $event.valueRight);
    this.maxRent = Math.max($event.valueLeft, $event.valueRight);
    this.minRent1 = $event.valueLeft
    this.maxRent1 = $event.valueRight

    this.rentInterval.push("loyerMensuel>="+ this.minRent , "loyerMensuel<="+ this.maxRent)

    if((this.minRent == 32) && (this.maxRent == 3157)){
      this.rentInterval = []
      this.loyerChecked = false
    }else{
      this.loyerChecked = true
    }  
    
    this.numericFilters = this.priceInterval ?  this.priceInterval.concat(this.rentInterval) : this.rentInterval

    this.filterAction()
  }

  sliderValuesForPriceSlider($event){

    this.priceInterval = []
    this.minPrice = Math.min($event.valueLeft, $event.valueRight);
    this.maxPrice = Math.max($event.valueLeft, $event.valueRight);
    this.minPrice1 = $event.valueLeft
    this.maxPrice1 = $event.valueRight

    this.priceInterval.push("priceForFront>="+ this.minPrice , "priceForFront<="+ this.maxPrice) 

    if((this.minPrice == 6285) && (this.maxPrice == 208545)){
      this.priceInterval = []
    }

    this.numericFilters = this.rentInterval ?  this.priceInterval.concat(this.rentInterval) : this.priceInterval
  
    this.filterAction()
  }

  closeModal() {
    this.isModalVisible = !this.isModalVisible;
    this.modalClosed.emit(false);
  }

}
