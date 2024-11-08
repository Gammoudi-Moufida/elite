import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { ConfigService } from '../shared/config/config.service';
import { BrandsComponent } from './brands/brands.component';
import { Meta, Title, TransferState, makeStateKey } from '@angular/platform-browser';
import { CardsComponent } from './cards/cards.component';
import { ModelsComponent } from './models/models.component';
import { NewOffersComponent } from './new-offers/new-offers.component';
import algoliasearch from 'algoliasearch';
import { RecompensesComponent } from './recompenses/recompenses.component';
import { SliderComponent } from './slider/slider.component';
import { HomeNextService } from './home-next.service';
import { OccasionsComponent } from './occasions/occasions.component';
import { BrandsLeasingComponent } from './brands-leasing/brands-leasing.component';

@Component({
  selector: 'app-home-next',
  standalone: true,
  imports: [CommonModule, FiltersComponent, SliderComponent, BrandsComponent, CardsComponent,
            ModelsComponent, NewOffersComponent, RecompensesComponent, OccasionsComponent, BrandsLeasingComponent],
  templateUrl: './home-next.component.html',
  styleUrls: ['./home-next.component.css']
})
export class HomeNextComponent implements OnInit{
  screenWidth: number;
  screenMode: number;
  homeTagData: any;
  titlePage: any;
  descriptionPage: any;
  subDomaine: string;
  nbMarque : any;
  nbModels : any;
  brands: any = [];
  models : any;
  nbModelMax: any;
  listColonnes : any | [];
  nosmarques_url : any = "#";
  type : string;
  index: any;
  searchClient: any;
  totalStock :any;
  categoriesModels: any;
  newOffers: any;
  textesSeo: any;
  txt: any;
  carrouselData: any;
  HOME_TAG_DATA_KEY = makeStateKey('homeTagData');
  TITLE_KEY = makeStateKey('titlePage');
  DESCRIPTION_KEY = makeStateKey('descriptionPage');
  H1_KEY = makeStateKey('h1Page');
  BRANDS_KEY = makeStateKey('brands');
  NOS_MARQUES_URL_KEY = makeStateKey('nosmarques_url');
  TOTAL_STOCK_KEY = makeStateKey('totalStock');
  CATEGORIES_URL_KEY = makeStateKey<any>('categories_url');
  NEW_OFFERS_KEY = makeStateKey<any>('NewOffers');
  TEXTES_SEO_KEY = makeStateKey<any>('textes_seo');
  CARROUSEL_DATA_KEY = makeStateKey<any>('carrousel_data');
  BRANDS_OCCASIONS_KEY = makeStateKey<any>('brands_occasions');
  INFOS_KEY = makeStateKey<any>('infos');
  INFOS_CARDS_KEY = makeStateKey<any>('infos_cards');
  BRANDS_LEASING_KEY = makeStateKey<any>('brands_leasing');
  TXT_KEY = makeStateKey('txt');
  BEST_DISCOUNT_KEY = makeStateKey('bestDiscount');


  bgImgUrl: string;
  brandsOccasions: any;
  infosCards: any;
  brandsLeasing: any;
  marques_url_leasing: void;
  h1Page: any;
  bestDiscount: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.screenWidth = this.configService.getWindow().innerWidth;
      this.visibleItemsDetector();
  }
  constructor(
    private configService: ConfigService,
    private state: TransferState,
    private service: HomeNextService,
    private title: Title, 
    private meta: Meta,
    ) {
      this.searchClient = algoliasearch(this.configService.algolia.appId, this.configService.algolia.appKey);
      this.index = this.searchClient.initIndex(this.configService.algolia.indexName);
    }

  ngAfterViewInit() {
      this.addHtmlElements();
  }

  ngOnInit() {
    this.subDomaine = this.configService.getType()
    this.screenWidth = this.configService.getWindow().innerWidth;
    this.visibleItemsDetector();
    this.homeTagData = this.state.get(this.HOME_TAG_DATA_KEY, null);
    this.titlePage = this.state.get(this.TITLE_KEY, null);
    this.descriptionPage = this.state.get(this.DESCRIPTION_KEY, null);
    this.h1Page = this.state.get(this.H1_KEY, null);
    this.totalStock = this.state.get(this.TOTAL_STOCK_KEY, null);
    this.bestDiscount = this.state.get(this.BEST_DISCOUNT_KEY, null);
    
    if( !this.homeTagData && !this.homeTagData)
         this.getTags();
        
     if(!this.totalStock){
          this.index.search('', {
            facetFilters: [
              ["disponibiliteForFO:en stock","disponibiliteForFO:en arrivage"]
            ]
          }).then(( hits ) => {
            this.totalStock = hits.nbHits;
            this.state.set(this.TOTAL_STOCK_KEY, <any> this.totalStock );
          });
    }
    if(!this.titlePage && !this.descriptionPage){
        this.service.getDatas().subscribe(data => {
          this.h1Page = data.h1Page
          this.bestDiscount = data.bestDiscount
            this.title.setTitle(data.title); 
            if(this.totalStock){
                data.description = data.description.replace('[totalStock]',this.totalStock)
            }  
            this.meta.addTag({
                name: 'description',
                content: data.description,
            });
            this.state.set(this.TITLE_KEY, <any> data.title);
            this.state.set(this.DESCRIPTION_KEY, <any> data.description);
            this.state.set(this.H1_KEY, <any> this.h1Page);
            this.state.set(this.BEST_DISCOUNT_KEY, <any> this.bestDiscount);
        });
    }

    

    this.createCanonicalURL();
    this.getBrands()
    this.getSlider()
    this.getInfoModels()
    this.getNewOffers()
    this.getTextesSeo()
    this.getBrandsOccasions()
    this.getBrandsLeasing()
  }

  getSlider(){
    this.carrouselData = this.state.get(this.CARROUSEL_DATA_KEY, null)
   
    if(!this.carrouselData){
      this.service.getSlider(this.subDomaine).subscribe(
        data => {
          this.carrouselData = data
          this.state.set(this.CARROUSEL_DATA_KEY, <any> this.carrouselData);
        })
    }
  }

  getBrands() {
    this.brands = this.state.get(this.BRANDS_KEY, null);
    this.nosmarques_url = this.state.get(this.NOS_MARQUES_URL_KEY, null);
    if(!this.brands ){
        this.service.getBrandsDatas(this.subDomaine).subscribe( 
            data => {
                this.brands = data.brands;
                this.nosmarques_url = data.nosmarques_url;
                this.state.set(this.BRANDS_KEY, <any> data.brands);
                this.state.set(this.NOS_MARQUES_URL_KEY, <any> data.nosmarques_url);
            },
            err => console.error('observer got error' + err),
        );  
    }
  }

  getBrandsLeasing() {
    this.brandsLeasing = this.state.get(this.BRANDS_LEASING_KEY, null);
    if (!this.brandsLeasing) {
      this.service.getBrandsDatas('leasing').subscribe(
        data => {
          this.brandsLeasing = data.brands.sort((a, b) => { 
            return a.name.localeCompare(b.name)
          });
          this.state.set(this.BRANDS_LEASING_KEY, <any> data.brands); 
        },
        err => console.error('observer got error' + err),
      );
    }
  }

  getInfoModels(){
    this.categoriesModels = this.state.get(this.CATEGORIES_URL_KEY, null)
    this.infosCards = this.state.get(this.INFOS_CARDS_KEY, null)
    if(!this.categoriesModels && !this.infosCards){
      this.service.getInfoHomeVn().subscribe(
        data => {
          this.categoriesModels = data.categories
          this.infosCards = data.cards
          this.state.set(this.INFOS_CARDS_KEY, <any> this.infosCards);
          this.state.set(this.CATEGORIES_URL_KEY, <any> this.categoriesModels);
        })
    }
  }

  getNewOffers(){
    this.newOffers = this.state.get(this.NEW_OFFERS_KEY, null)
    if(!this.newOffers){
      if(this.subDomaine =='entreprise'){
        this.index.search('', {
          facetFilters: [
            ["isNouveaute:true"],
            ["typeForRecherche:Professionnel"],
            ["category:1"],
            ["isReserved:false"]
          ]
        }).then(( hits ) => {
          this.newOffers = hits.hits;
          this.state.set(this.NEW_OFFERS_KEY, <any> this.newOffers);
        });
      }else{
        this.index.search('', {
          facetFilters: [
            ["isNouveaute:true"],
            ["isReserved:false"]
          ]
        }).then(( hits ) => {
          this.newOffers = hits.hits;
          this.state.set(this.NEW_OFFERS_KEY, <any> this.newOffers);
        });
      }
    }
  }

  getBrandsOccasions(){
    this.brandsOccasions = this.state.get(this.BRANDS_OCCASIONS_KEY, null)

    if(!this.brandsOccasions){
      this.service.getGammesOccasions().subscribe(
        data => {
          const order = ['Audi','Bmw', 'Citroen', 'Dacia', 'Fiat', 'Ford', 'Mercedes', 'Peugeot', 'Renault', 'Volkswagen'];
          const orderedBrands = data.list.filter(item => order.includes(item.nom));
          this.brandsOccasions = orderedBrands.sort((a, b) => order.indexOf(a.nom) - order.indexOf(b.nom));
          this.state.set(this.BRANDS_OCCASIONS_KEY, <any> this.brandsOccasions );
        })
    }
  }

  getTextesSeo(){
    this.textesSeo = this.state.get(this.TEXTES_SEO_KEY, null)
    this.txt = this.state.get(this.TXT_KEY, null)
    let arrayOfObjects: any[];
    if(!this.textesSeo && !this.txt){
      this.service.getTextesSeo().subscribe(data => {
        this.txt = data.title
        this.state.set(this.TXT_KEY, <any> this.txt);    
        arrayOfObjects = data.activites.flatMap(array => array.map(item => ({
          title: item.title,
          content: item.content
        })));
         this.service.getConfiance().subscribe(data => {
          this.textesSeo = [...arrayOfObjects, ...data];  
          this.textesSeo = this.textesSeo.map(item => ({ ...item, isTextOpen: true }));
          this.state.set(this.TEXTES_SEO_KEY, <any> this.textesSeo);    
        });
      })
    }
      

  }

  getTags() {
    this.service.getTagsHome().subscribe(data => {
        this.configService.getWindow().document.getElementById('taghome').innerHTML = data.content;
        this.homeTagData = data
        this.state.set(this.HOME_TAG_DATA_KEY, <any>data.content);
    })
}

  createCanonicalURL() {
    (this.configService.getWindow().document.querySelectorAll('[rel="canonical"]')).forEach(link => link.remove())
    let link;
    link = this.configService.getWindow().document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href',this.configService.getProtocol() + "//" +this.configService.getLocation().host + this.configService.getLocation().pathname);
    this.configService.getWindow().document.head.appendChild(link);
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

  addHtmlElements() {
    const scriptElement = this.configService.getWindow().document.createElement('script');
    scriptElement.src = 'https://elite-auto.my.join-stories.com/widgets/hp-haut-de-page-black-friday/index.js';
    scriptElement.setAttribute('data-join-widget-id', 'list-square-hp-haut-de-page-black-friday');
    scriptElement.setAttribute('data-join-widget-alias', 'hp-haut-de-page-black-friday');
    scriptElement.type = 'text/javascript';
    this.configService.getWindow().document.body.appendChild(scriptElement);
    this.addScriptElements();
  }
  addScriptElements() {
    const audienceScript = this.configService.getWindow().document.createElement('script');
    audienceScript.innerHTML = `
      function sendAudienceData(a) {
        window.jDataLayer = window.jDataLayer || [];
        window.jDataLayer.push({ type: "audience", data: a });
      }
    `;
    this.configService.getWindow().document.body.appendChild(audienceScript);
  }
    
}
