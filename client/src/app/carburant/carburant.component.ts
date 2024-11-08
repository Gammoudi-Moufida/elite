import { Component, HostListener, OnInit, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarburantService } from '../carburant/carburant.service';
import { ConfigService } from '../shared/config/config.service';
import { makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../core/header/header.service';
import { isPlatformBrowser, NgIf, NgClass, NgFor, DecimalPipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { AlgoliaResultsService } from '../search/algolia-results/algolia-results.service';
import { AlgoliaFiltersService } from '../search/algolia-filters/algolia-filters.service';
import { AvisComponent } from '../shared/avis/avis.component';
import { RewardComponent } from '../cars/shared/reward/reward.component';
import { NavLinkComponent } from '../cars/shared/nav-link/nav-link.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SimilarModelComponent } from '../search/similar-model/similar-model.component';
import { SummaryComponent } from '../cars/shared/summary/summary.component';
import { AlgoliaFilterOrderComponent } from '../search/algolia-filters/algolia-filter-order/algolia-filter-order.component';
import { AlgoliaFiltersComponent } from '../search/algolia-filters/algolia-filters.component';
import { TextSeoComponent } from '../cars/shared/text-seo/text-seo.component';
import { SubHeaderComponent } from '../cars/shared/sub-header/sub-header.component';
import { NgAisInstantSearchModule, NgAisConfigureModule, createSSRSearchClient } from 'angular-instantsearch';
import { CategoriesComponent } from '../search/algolia-filters/categories/categories.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import algoliasearch from 'algoliasearch';

@Component({
    selector: 'app-carburant',
    templateUrl: './carburant.component.html',
    styleUrls: ['./carburant.component.css'],
    standalone: true,
    imports: [NgIf,CategoriesComponent, NgAisInstantSearchModule, NgAisConfigureModule, SubHeaderComponent, TextSeoComponent, AlgoliaFiltersComponent, AlgoliaFilterOrderComponent, SummaryComponent, NgClass, SimilarModelComponent,
       NgFor, NgbPopoverModule, NavLinkComponent, RewardComponent, AvisComponent, DecimalPipe, NgOptimizedImage],
       providers: [
         {
           provide: IMAGE_LOADER,
           useValue: (config: ImageLoaderConfig) => {
             return `https://image.elite-auto.fr/${config.src}`;
           }
         },
       ]
})
export class CarburantComponent implements OnInit {
  colorUrl: string;
  modeleurotaxIdId: number;
  eurotaxId: any;
  data: any;
  algoliaData: any;
  totalResult: number = 0;
  equipements: any;
  imgUrl: string;
  screenWidth: number;
  screenMode: number;
  topTextData: any;
  fuel: string = null;
  aFuel: string = null;
  type: string;
  modelId: number;
  markId: number;
  event: Event;
  total: number;
  redirectRoute: string;
  meilleur_loyer: number;
  remise: number;
  subDomaine: string;
  bannerTop: any;
  domaine: any;
  showBanner: boolean;
  isBrowser: any;
  basTextData: any;
  groupe: string;
  schemaTagData: any;
  googleTagData: any;

  RESULT_KEY = makeStateKey<any[]>('result');
  TOTAL_KEY = makeStateKey<number>('total');
  MODELS_LIST_KEY= makeStateKey<any>('modelsList');
  SCHEMA_TAG_DATA_KEY= makeStateKey<string>('schemaTagData');
  GOOGLE_TAG_DATA_KEY= makeStateKey<string>('googleTagData');
  ITEMS_KEY = makeStateKey<any[]>('itemsCategory');

  slugMark: string;
  slugModel: string;
  groupeNiveau1: string;
  totalOccasion: number;
  lienPageOcasion: string;
  urlParamsOffre: any;
  public configResults: any;

  results: any;
  filter: string = 'all';
  modelsList: any;
  showPlaceholder: boolean = true;
  showImg: boolean;

  listCarburantincludes = ['diesel','electrique','essence','gpl_gnv','hybride','ethanol', 'neuve', 'autre', 'ethanol-hybride']
  searchClient: any;
  index: any;
  loadingResults: boolean = true;
  urlToCatalogue: any;
  rechercheFilter: any;
  isFilterClicked = false;
  categoryFilter: any;
  isFilterOrderCategoryChecked: boolean = false;
  dataSorted: any;
  orderFilter: any;
  arrayCategories: any[];
  itemsForCategoryFilter: any;
  breadcrumbList: any;
  siteUrl: string;

  @HostListener('window:click') clickInside() {
    this.showImg = true;
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.showImg = true;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CarburantService,
    private serviceResult: AlgoliaResultsService,
    private config: ConfigService,
    private title: Title,

    private serviceHeader: HeaderService,
    private filterService: AlgoliaFiltersService,
    private meta: Meta, private state: TransferState,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platform: Object,
    private httpClient: HttpClient
  ) {
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
  }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow().innerWidth;
    this.subDomaine = this.config.getType();
    this.isBrowser = isPlatformBrowser(this.platform);
    this.siteUrl = this.config.getSiteUrl();
    this.visibleItemsDetector();

    this.algoliaData = this.state.get(this.RESULT_KEY, null);
    this.totalResult = this.state.get(this.TOTAL_KEY, null);
    this.modelsList = this.state.get(this.MODELS_LIST_KEY, null);
    this.googleTagData = this.state.get(this.GOOGLE_TAG_DATA_KEY, null);
    this.schemaTagData = this.state.get(this.SCHEMA_TAG_DATA_KEY, null);
    this.itemsForCategoryFilter = this.state.get(this.ITEMS_KEY, null);
    
    if(this.algoliaData){
      this.loadingResults = false
    }

    this.imgUrl = this.config.getNewImgUrl();
    this.colorUrl = "https://image.elite-auto.fr/visuel/colors/";

    this.route.paramMap.subscribe(params => {
      this.modeleurotaxIdId = params['params']['model'];
      this.eurotaxId = params['params']['mark'];
      if (this.listCarburantincludes.includes(params['params']['fuel']))
        this.fuel = params['params']['fuel'];
      this.type = params['params']['type'];
      this.slugMark = params['params']['slugMark'];
      this.slugModel = params['params']['slugModel'];

      this.checkUrl()
    });
  }

  addRouteConfig(key, value) {
    this.configResults.initialUiState.prod_ELITE_OFFERS.refinementList[key] = [value]
    return this.configResults
  }

  checkRedirectAction(eurotaxId: number, modelId: number, slugMark: string, slugModel: string, fuel: string) {
    this.service.getRedirectConfig(eurotaxId, modelId, slugMark, slugModel).subscribe(
      res => {
        if(res.toRedirect || res. urlToMark){
          if (res.toRedirect == true) {
            if(res.newModelLib)
              this.redirectRoute = '/voiture-neuve/' + res.marque + '-'+this.eurotaxId+'/'+res.newModelLib + ',prix-' + fuel + '-' + modelId + '.html'
            else
              this.redirectRoute = '/voiture-neuve/'+res.marque+'-'+this.eurotaxId+'/'+res.newSlug + ',prix-' + fuel + '-' + res.newEuroTaxId + '.html'
          }else if (res.urlToMark  == true){
            this.redirectRoute = '/voiture-neuve/'+ res.slugMark+'-'+ this.eurotaxId +'/tarifs.html'
          }
          if(this.response){
            this.response.status(301);
            this.response.setHeader('Location',this.redirectRoute);
            this.response.end();
          }
        } else {
          this.setMeta();
          this.filterService.getGroupeOfAModel(this.modeleurotaxIdId).subscribe(
            res => {
              this.groupe = res.groupe
            }
          )
          this.service.getVoitureNeuve(this.eurotaxId, this.modeleurotaxIdId, this.fuel).subscribe(
            res => {
              this.data = res;
              if(res?.menu){
                this.generateAndAppendBreadcrumbScript(res.menu)
              }
              this.remise = res.remise;
              this.aFuel = res.aFuel;
              this.topTextData = res.textTop;
              this.basTextData = res.textBas;
              this.markId = this.data.markId.toString();
              this.modelId = this.data.modelId.toString();

              this.urlToCatalogue = '/recherche?prod_ELITE_OFFERS%5BrefinementList%5D%5Bmarque%5D%5B0%5D=' + this.data.mark.toUpperCase()
              + '&prod_ELITE_OFFERS%5BrefinementList%5D%5BmodelGroupeNiveau1%5D%5B0%5D=' + this.groupe?.toLowerCase()

              this.configResults = {
                searchClient: createSSRSearchClient({
                  appId: this.config.algolia.appId,
                  apiKey: this.config.algolia.appKey,
                  makeStateKey,
                  HttpHeaders,
                  transferState: this.state,
                  httpClient: this.httpClient,
                }),
                indexName: this.config.algolia.indexName,
                initialUiState: {
                  prod_ELITE_OFFERS: {
                    query: '',
                    refinementList: {
                      marque: [this.data.mark.toUpperCase()],
                      modelGroupeNiveau1: [this.groupe?.toLowerCase()],
                      modelNomCompl: [this.data.modelNomCompl.toUpperCase()],
                      modelId: [res.modelId],
                      category: [
                        "4",
                        "3",
                        "1"
                      ]
                    }
                  }
                },
                onStateChange: function ({ uiState, setUiState }) {
                  setUiState(uiState);
                },
              };

              if (this.aFuel) {
                this.addRouteConfig('energieNormalized', this.aFuel)
              }
              this.meta.removeTag('property="og:image"');
              this.meta.removeTag('property="og:title"');
              this.meta.removeTag('property="og:description"');
              this.meta.removeTag('property="og:url"');
              this.meta.addTags([
                {
                  property: 'og:image',
                  content: this.data.img,
                },
                {
                  property: 'og:title',
                  content: "J'aime les offres sur les " + this.data.mark.toUpperCase() + " " + this.data.model.toUpperCase() + " neuve proposées par Elite Auto.",
                },
                {
                  property: 'og:description',
                  content: "Offres de remise sur les " + this.data.mark.toUpperCase() + " " + this.data.model.toUpperCase() + " ! Leader français des mandataires automobiles, Elite Auto vous permet d'acheter votre voiture neuve avec d'importantes remises.",
                },
                {
                  property: 'og:url',
                  content: this.data.modelVnUrl,
                }
              ]);
            });
          this.createCanonicalURL();
        }
      }
    )
  }

  setMeta() {
    this.service.getMetas(this.modeleurotaxIdId, this.fuel).subscribe(data => {
      this.title.setTitle(data.title);
      this.meta.updateTag({
        name: 'description',
        content: data.description,
      });
    });
  }

  visibleItemsDetector() {
    if (this.screenWidth < 768) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 1024) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
  }

  setRemise(data) {
    let remiseMessage = '';
    let discretionRemise = false;
    if (!this.config.getWebUrl().includes('leasing')) {
      if (data.isOccasion) {
        remiseMessage = data.kilometrage +' Km, '+data.anneeMiseEnCirculation;
      }
      else {
        if (this.showInvoiceLink(data.avantageFinalElastic, JSON.parse(data.eurotaxId), JSON.parse(data.brandsWithLowDiscountAllowed))) {
          remiseMessage = '-' + data.avantageFinalElastic + ' %';
        }
        else {
          remiseMessage = 'à discrétion';
          discretionRemise = true
        }
      }
    }
    else {
      if (data.offerAdvantageTILoa > 0)
        remiseMessage = '-' + Number.parseFloat(data.offerAdvantageTILoa).toFixed(0) + ' €'
      else
        remiseMessage = 'nous contacter'
    }

    data = { remiseMessage: remiseMessage, discretionRemise: discretionRemise}
    
    return data;
  }
  showInvoiceLink(discountValue, EurotaxId, brandsWithLowDiscountAllowed) {
    return (discountValue > 3 || brandsWithLowDiscountAllowed.indexOf(EurotaxId) != -1);
  }

  createCanonicalURL() {
    (this.config.getWindow().document.querySelectorAll('[rel="canonical"]')).forEach(link => link.remove())
    let link;
    link = this.config.getWindow().document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.config.getWindow().document.head.appendChild(link);
    link.setAttribute('href', this.config.getCanonicalUrl());
  }
  checkUrl() {
    if (this.subDomaine != 'www' || !this.fuel) {
      if (this.response)
        this.response.status(404);
      this.router.navigateByUrl('/not-found', { skipLocationChange: true });
    }
    else
      this.checkRedirectAction(this.eurotaxId, this.modeleurotaxIdId, this.slugMark, this.slugModel, this.fuel)
  }

  hrefNavigation(offreUrl: string) {
    this.config.getLocation().href = offreUrl
  }
  getTag() {
    if (!this.schemaTagData && this.totalResult) {
      this.service.getTagSchema(this.eurotaxId, this.modeleurotaxIdId, this.type, this.totalResult).subscribe(data => {
        this.config.getWindow().document.getElementById('schematag').innerHTML = data;
        this.schemaTagData = data
        this.state.set(this.SCHEMA_TAG_DATA_KEY, <string>data.content);
      })
    }
    if (!this.googleTagData) {
      this.service.getTagGoogle(this.eurotaxId, this.modeleurotaxIdId, this.type).subscribe(data => {
        this.config.getWindow().document.getElementById('taggoogle').innerHTML = data;
        this.googleTagData = data
        this.state.set(this.GOOGLE_TAG_DATA_KEY, <string>data.content);
      })
    }
  }

  async filterCategorieEv($event){
    this.categoryFilter = $event
    this.arrayCategories = []
    if(this.categoryFilter)
    this.categoryFilter.forEach(el =>{ if(el.isRefined){ this.arrayCategories.push('category:' + el.value)  } })
    this.arrayCategories = this.arrayCategories?.length ? this.arrayCategories : ['category:1', 'category:3','category:4']
    this.orderFilter = this.orderFilter ? this.orderFilter : 'prod_ELITE_OFFERS'
    await this.getSortedData(this.orderFilter,this.arrayCategories);
  }

  async orderFilterChecked($event) {
    this.orderFilter = $event
    this.arrayCategories = []
    if(this.categoryFilter)
    this.categoryFilter.forEach(el =>{ if(el.isRefined){ this.arrayCategories.push('category:' + el.value)  } })
    this.arrayCategories = this.arrayCategories?.length ? this.arrayCategories : ['category:1', 'category:3','category:4']
    await this.getSortedData(this.orderFilter,this.arrayCategories);
  }

  async getSortedData(orderFilter,arrayCategories){
    this.index = this.searchClient.initIndex(orderFilter);
    let facetFilters = [
      ["marque:" + this.data?.mark.toUpperCase()],
      ["modelGroupeNiveau1:" + this.groupe?.toLowerCase()],
      ["modelNomCompl:" + this.data?.modelNomCompl?.toUpperCase()],
      ["modelId:" + this.data?.modelId],
      arrayCategories
    ];
    if (this.aFuel) {
      facetFilters.push(["energieNormalized : " + this.aFuel])
    }
    await this.index.search('', { facetFilters: facetFilters,  hitsPerPage:1000  }).then((hits) => {
      this.dataSorted = hits.hits
      this.algoliaData = this.dataSorted
      this.algoliaData.forEach(edata => {
        let offreUrl = environment.eliteAutoHost + '/voiture-' + edata.marqueSlug + '-' + edata.eurotaxId + '/' + edata.modeleSlug + '-' + edata.eurotaxModeleId + '/' + +edata.id + '.html';
        if (edata.vo || edata.isOccasion == true) {
          offreUrl = environment.eliteAutoHost + '/occasion/' + edata.marqueSlug + '/' + edata.modeleSlug + '/' + edata.modeleSlug + '/' + edata.id;
        }
        offreUrl = (offreUrl.toLowerCase()).replace(/ /g, "-");
        edata.offreUrl = environment.protocol + offreUrl;
      })
      this.totalResult = hits.nbHits
      this.isFilterOrderCategoryChecked = true
    })
  }

  getSearchResults($event) {
    // if (!this.algoliaData) {
    if (this.isFilterClicked) {
      var urlToSearchFilter = ""
      let markChecked : boolean = true
      const keys = Object.keys($event.state.disjunctiveFacetsRefinements) as (keyof typeof $event.state.disjunctiveFacetsRefinements)[];

      if($event.state.disjunctiveFacetsRefinements.marque?.length == 0)
        markChecked = false;

      keys.forEach((key) => {
        let keyName = key
        if (($event.state.disjunctiveFacetsRefinements[key]?.length && markChecked) ||
         ($event.state.disjunctiveFacetsRefinements[key]?.length && !markChecked 
         && key != 'modelId'  && key != 'modelNomCompl' && key != 'modelGroupeNiveau1') ) {
          $event.state.disjunctiveFacetsRefinements[key].forEach((el, index) => {
            urlToSearchFilter = urlToSearchFilter + "&" + this.config.algolia.indexName + "%5BrefinementList%5D%5B" + keyName.toString() + "%5D%5B" + index + "%5D=" + el
          })
        }
      });

      const keys2 = Object.keys($event.state?.numericRefinements) as (keyof typeof $event.state.numericRefinements)[];

      keys2.forEach((key) => {
        let keyName = key

        if ($event.state.numericRefinements[key][">="]?.length && !$event.state.numericRefinements[key]["<="]?.length) {
          urlToSearchFilter = urlToSearchFilter + "&" + this.config.algolia.indexName + "%5Brange%5D%5B" + keyName.toString() + "%5D=" + $event.state.numericRefinements[key][">="] + "%3A"
        } else if (($event.state.numericRefinements[key]["<="]?.length && !$event.state.numericRefinements[key][">="]?.length)) {
          urlToSearchFilter = urlToSearchFilter + "&" + this.config.algolia.indexName + "%5Brange%5D%5B" + keyName.toString() + "%5D=%3A" + $event.state.numericRefinements[key]["<="]

        } else if (($event.state.numericRefinements[key][">="]?.length && $event.state.numericRefinements[key]["<="]?.length)) {
          urlToSearchFilter = urlToSearchFilter + "&" + this.config.algolia.indexName + "%5Brange%5D%5B" + keyName.toString() + "%5D=" + $event.state.numericRefinements[key][">="] + "%3A" + $event.state.numericRefinements[key]["<="]
        }
      });
      if (urlToSearchFilter?.length) {
        window.location.href = '/recherche?' + urlToSearchFilter
      }
    }
    
    this.algoliaData = this.state.get(this.RESULT_KEY, null);
    this.itemsForCategoryFilter = this.state.get(this.ITEMS_KEY, null);

    if(this.isFilterOrderCategoryChecked){
      this.algoliaData = this.dataSorted
      this.totalResult = this.dataSorted?.length
    }

    if (!this.algoliaData) {
      this.algoliaData = $event?.results?.hits;
      this.totalResult = $event?.results?.nbHits;
      this.getTag();
    }

    if(!this.itemsForCategoryFilter){
      this.itemsForCategoryFilter = [];
      if ($event?.results?.disjunctiveFacets.find((el) => el.name == 'category')?.data) {
        let facetCategoryValues = $event?.results?.disjunctiveFacets.find(
          (el) => el.name == 'category'
        )?.data;
        for (const [key, value] of Object.entries(facetCategoryValues)) {
          if (value != 0) {
            let label = '0 km';
            if (key == '1') label = 'Occasions';
            if (key == '3') label = 'Neuf';

            let item = {
              count: value,
              isRefined: true,
              value: key.toString(),
              label: label,
              highlighted: value.toString(),
            };
            this.itemsForCategoryFilter.push(item);
          }
        }
      this.state.set(this.ITEMS_KEY, <any[]>this.itemsForCategoryFilter);
      }
    }

    if (this.algoliaData) {
      this.algoliaData.forEach(edata => {
        let offreUrl = environment.eliteAutoHost + '/voiture-' + edata.marqueSlug + '-' + edata.eurotaxId + '/' + edata.modeleSlug + '-' + edata.eurotaxModeleId + '/' + +edata.id + '.html';
        if (edata.vo || edata.isOccasion == true) {
          offreUrl = environment.eliteAutoHost + '/occasion/' + edata.marqueSlug + '/' + edata.modeleSlug + '/' + edata.modeleSlug + '/' + edata.id;
        }
        offreUrl = (offreUrl.toLowerCase()).replace(/ /g, "-");
        edata.offreUrl = environment.protocol + offreUrl;
      })
      this.loadingResults = false
      this.state.set(this.RESULT_KEY, <any[]>this.algoliaData);
      this.state.set(this.TOTAL_KEY, <number>this.totalResult);
    }
    this.modelsList = this.state.get(this.MODELS_LIST_KEY, null);
    if ($event?.state?.disjunctiveFacetsRefinements && (this.algoliaData && this.algoliaData.length == 0) && !this.modelsList) {
      if ($event?.state.disjunctiveFacetsRefinements?.modelId && $event?.state.disjunctiveFacetsRefinements?.modelId.length > 0) {
        this.rechercheFilter = $event?.state.disjunctiveFacetsRefinements?.modelId[0];
        this.rechercheFilter = 'model_id_' + this.rechercheFilter
      } else if ($event?.state.disjunctiveFacetsRefinements?.modelGroupeNiveau1 && $event?.state.disjunctiveFacetsRefinements?.modelGroupeNiveau1.length > 0) {
        this.rechercheFilter = $event?.state.disjunctiveFacetsRefinements?.modelGroupeNiveau1[0];
        this.rechercheFilter = 'model_' + this.rechercheFilter
      } else if ($event?.state.disjunctiveFacetsRefinements?.segmentEliteGroup && $event?.state.disjunctiveFacetsRefinements?.segmentEliteGroup.length > 0) {
        this.rechercheFilter = $event?.state.disjunctiveFacetsRefinements.segmentEliteGroup[0];
        this.rechercheFilter = 'carstype_' + this.rechercheFilter
      } else {
        this.rechercheFilter = 'all'
      }
      this.serviceResult.similarModel(this.rechercheFilter, this.subDomaine).subscribe(data => {
        this.modelsList = data
        this.showPlaceholder = false
        this.state.set(this.MODELS_LIST_KEY,<any>this.modelsList)
      })
      }else{
        this.showPlaceholder = false
      }
    // }

    this.generateTrackingEvent(this.algoliaData)
  }

  generateAndAppendBreadcrumbScript(data) {
    const itemList = data.map((item, index) => {
      let fullURL = `${item.url.startsWith("https") ? item.url : `${this.siteUrl.replace(/\/$/, '')}${item.url}`}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": { "@id": fullURL },
        "name": item.text.replace(/"/g, '')
      };
    });
    
    this.breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList
    };

    const breadcrumbListElement = this.config.getWindow().document.createElement('div');
    breadcrumbListElement.id = 'breadcrumbList';

    const script = this.config.getWindow().document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.breadcrumbList, null, 2);
    breadcrumbListElement.appendChild(script);
    this.config.getWindow().document.body.appendChild(breadcrumbListElement);
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
  
}