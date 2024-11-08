import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { ConfigService } from '../shared/config/config.service';
import { QuestionsComponent } from './questions/questions.component';
import { TopModelsComponent } from './top-models/top-models.component';
import { LeaseCardsComponent } from './lease-cards/lease-cards.component';
import { ModelsComponent } from './models/models.component';
import { BrandsComponent } from './brands/brands.component';
import { FiltresComponent } from './filtres/filtres.component';
import { HomeNextService } from '../home-next/home-next.service';

@Component({
    selector: 'app-home-leasing',
    templateUrl: './home-leasing.component.html',
    styleUrls: ['./home-leasing.component.css'],
    standalone: true,
    imports: [FiltresComponent, BrandsComponent, NgIf, ModelsComponent, LeaseCardsComponent, TopModelsComponent, QuestionsComponent]
})
export class HomeLeasingComponent implements OnInit {

  type: string;
  public imgUrl: string;
  public h1Page: string;
  public totalStock: number;
  showPlaceholder: boolean = true;
  TYPE_KEY = makeStateKey('type');
  H1PAGE_KEY = makeStateKey('h1Page');
  TOTAL_STOCK_KEY = makeStateKey('totalStock');
  showImg: boolean;
  screenWidth: number;
  screenMode: number;
  isBrowser: boolean;
  event: Event;
  HOME_TAG_DATA_KEY = makeStateKey<any>('homeTagData');
  TITLE_KEY = makeStateKey<any>('titlePage');
  DESCRIPTION_KEY = makeStateKey<any>('descriptionPage');
  BRANDS_KEY = makeStateKey<string[]>('brands');
  NB_MARQUE_KEY = makeStateKey<any>('nbMarque');
  MODELS_KEY = makeStateKey<any>('models');
  CATEGORIES_URL_KEY = makeStateKey<any>('categories_url');
  CARDS_KEY = makeStateKey<any>('cards');
  CARDS_QUESTIONS_KEY = makeStateKey<any>('cards_questions');
  DESCRIPTION_CARDS_KEY = makeStateKey<any>('description_cards');
  NB_MODELS_KEY = makeStateKey<any>('nbModels');
  NOS_MARQUES_URL_KEY = makeStateKey<any>('nosmarques_url');
  NB_MODEL_MAX_KEY = makeStateKey<any>('nbModelMax');
  LIST_COLONNES_KEY = makeStateKey<any>('listColonnes');

  nbMarque = 10;
  nbModels = 12;
  brands = [];
  models = [];
  nbModelMax: number;
  listColonnes = [];
  nosmarques_url = "#";
  homeTagData: string;
  titlePage: string;
  descriptionPage: string;
  categories: any;
  cards: any;
  cardsQuestions: any;
  leasingCategoriesUrls: any;
  offersDescriptions: any;
  subDomaine: string;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.showImg = true;
    this.isBrowser = false;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.isBrowser = false;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }

  constructor(
    private homeService: HomeNextService,
    private config: ConfigService,
    private state: TransferState,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platform: Object,
  ) { }

  ngOnInit(): void {
    this.type = 'leasing';
    this.homeTagData = this.state.get(this.HOME_TAG_DATA_KEY, null);
    this.titlePage = this.state.get(this.TITLE_KEY, null);
    this.descriptionPage = this.state.get(this.DESCRIPTION_KEY, null);

    this.imgUrl = this.config.getNewImgUrl()
    this.subDomaine = this.config.getType()

    this.createCanonicalURL();
    if (!this.homeTagData)
      this.getTags();
    this.isBrowser = isPlatformBrowser(this.platform);
    if (!this.titlePage || !this.descriptionPage) {
      this.homeService.getDatas().subscribe(data => {
        this.title.setTitle(data.title);
        this.meta.addTag({
          name: 'description',
          content: data.description,
        });
        this.state.set(this.TITLE_KEY, <string>data.title);
        this.state.set(this.DESCRIPTION_KEY, <string>data.description);
      });
    }

    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
    this.getBrands();
    this.getInfoHomeLeasing();
  }

  createCanonicalURL() {
    (this.config.getWindow().document.querySelectorAll('[rel="canonical"]')).forEach(link => link.remove())
    let link;
    link = this.config.getWindow().document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href',this.config.getProtocol() + "//" +this.config.getLocation().host + this.config.getLocation().pathname);
    this.config.getWindow().document.head.appendChild(link);
  }

  getTags() {
    this.homeService.getTagsHome().subscribe(data => {
      this.config.getWindow().document.getElementById('taghome').innerHTML = data.content;
      this.homeTagData = data
      this.state.set(this.HOME_TAG_DATA_KEY, <string>data.content);
    })
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
  getInfoHomeLeasing(){
    this.leasingCategoriesUrls = this.state.get(this.CATEGORIES_URL_KEY, null)
    this.cards = this.state.get(this.CARDS_KEY, null)
    this.cardsQuestions = this.state.get(this.CARDS_QUESTIONS_KEY, null)
    this.offersDescriptions = this.state.get(this.DESCRIPTION_CARDS_KEY , null)

    if(!this.leasingCategoriesUrls || !this.cards || !this.cardsQuestions || !this.offersDescriptions ){
      this.homeService.getInfoHomeLeasing().subscribe(
        data => {
          data = JSON.parse(data)
          this.cards = data['cards'];
          this.cardsQuestions = data['cardsQuestions'];
          this.leasingCategoriesUrls = data['leasingCategoriesUrls'];
          this.offersDescriptions = data['offersDescriptions'];

          this.state.set(this.CARDS_KEY, <any>data['cards']);
          this.state.set(this.CARDS_QUESTIONS_KEY, <any>data['cardsQuestions']);
          this.state.set(this.CATEGORIES_URL_KEY, <any>data['leasingCategoriesUrls']);
          this.state.set(this.DESCRIPTION_CARDS_KEY, <any> data['offersDescriptions']);
        })
    }
  }

  getBrands() {
    this.brands = this.state.get(this.BRANDS_KEY, null);
    this.nbMarque = this.state.get(this.NB_MARQUE_KEY, null);
    this.models = this.state.get(this.MODELS_KEY, null);
    this.nbModels = this.state.get(this.NB_MODELS_KEY, null);
    this.nosmarques_url = this.state.get(this.NOS_MARQUES_URL_KEY, null);
    this.nbModelMax = this.state.get(this.NB_MODEL_MAX_KEY, null);
    this.listColonnes = this.state.get(this.LIST_COLONNES_KEY, []);
    if (!this.brands && !this.nbMarque && !this.models && !this.nbModels) {
      this.homeService.getBrandsDatas(this.subDomaine).subscribe(
        data => {
          this.brands = data.brands;
          this.nbMarque = data.brands.length;
          this.models = data.models;
          this.nbModels = data.models.length;
          this.nosmarques_url = data.nosmarques_url;
          this.nbModelMax = this.models.length - 1;
          this.nbModelMax = this.nbModelMax > 12 ? 12 : this.nbModelMax;
          this.nbModelMax = this.nbModelMax == -1 ? 0 : this.nbModelMax;
          var n = 0;
          while (n <= this.nbModelMax) {
            this.listColonnes.push(n);
            n = n + 3;
          }
          this.showPlaceholder = false;
          this.state.set(this.BRANDS_KEY, <any>data.brands);
          this.state.set(this.NB_MARQUE_KEY, <number>data.brands.length);
          this.state.set(this.MODELS_KEY, <any>data.models);
          this.state.set(this.NB_MODELS_KEY, <number>data.models.length);
          this.state.set(this.NOS_MARQUES_URL_KEY, <string>data.nosmarques_url);
          this.state.set(this.NB_MODEL_MAX_KEY, <number>this.nbModelMax);
          this.state.set(this.LIST_COLONNES_KEY, <any>this.listColonnes);
        },
        err => console.error('observer got error' + err),
      );
    } else {
      this.showPlaceholder = false;
    };
  }
}