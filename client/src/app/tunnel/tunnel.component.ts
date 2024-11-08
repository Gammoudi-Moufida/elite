import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Devis, financementObject, OptionObject, Selleries, SimulationFinancement } from './devis';
import { TunnelService } from '../tunnel/tunnel.service'
import { ConfigService } from '../shared/config/config.service';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { isPlatformBrowser, NgIf, NgFor, NgClass } from '@angular/common';
import algoliasearch from 'algoliasearch';
import { AvisListComponent } from '../cars/shared/avis-list/avis-list.component';
import { RepriseComponent } from './reprise/reprise.component';
import { VideoTestingComponent } from './video-testing/video-testing.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { TechniquesComponent } from './techniques/techniques.component';
import { EquipementsComponent } from './equipements/equipements.component';
import { FinancementComponent } from './financement/financement.component';
import { OptionsComponent } from './options/options.component';
import { ColorsComponent } from './colors/colors.component';
import { SuggestionOffersComponent } from './suggestion-offers/suggestion-offers.component';
import { InformationsComponent } from './informations/informations.component';
import { SummaryComponent } from './summary/summary.component';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'app-tunnel',
    templateUrl: './tunnel.component.html',
    styleUrls: ['./tunnel.component.css'],
    standalone: true,
    imports: [NgIf, CarouselComponent, SummaryComponent, InformationsComponent, NgFor, NgClass, SuggestionOffersComponent, ColorsComponent, OptionsComponent, FinancementComponent, EquipementsComponent, TechniquesComponent, DeliveryComponent, VideoTestingComponent, RepriseComponent, AvisListComponent]
})
export class TunnelComponent implements OnInit {
  devis: Devis;
  offerId: number;
  screenWidth: number = 992;
  data: OptionObject[];
  options: OptionObject[];
  colorId: number;
  selleries: Selleries;
  withReprise: boolean = true;
  repriseClient: any;
  colorEquip: number;
  sellerieCheck: any;
  sellerieEquip: number;
  colorAndSellerieFormCheck: any = '';
  tarif: number = 0;
  tarifOptions: number = 0;
  duration: number = 48;
  kilometrage: number = 5000;
  apport: number = -1;
  devisId: string = "-1" ;
  withTato: boolean = false;
  tatoPrice: number = 0;
  webUrl: string;
  loader: boolean = true;
  bestLoaPrice: number = -1;
  bestLoaInfo: financementObject;
  selectedLoaPrice: number = -1;
  selectedLoaInfo: financementObject;
  postalCode: number = null;
  loadDelivery: boolean = false;
  // message: string = '';
  message : {type:string, text:string}
  showMsg: boolean = false;
  res: Devis;
  siteUrl: string;
  primeDeduite: boolean = false;
  mode: number = 1;
  mensalite: any;
  loadDevis: boolean = false;
  isLoaPriceClicked: boolean;
  showFormClient: boolean = false;
  isLoadedSave: boolean = false;
  schemaTagData: any;
  GOOGLE_TAG_DATA_KEY = makeStateKey('googleTagData');
  SCHEMA_TAG_DATA_KEY= makeStateKey<string>('schemaTagData');
  financementSelected: boolean = false;
  isClosedColorCollapse:boolean = false;
  isClosedDeliveryCollapse:boolean = true;
  selectedNoFinancement: boolean = true;
  getFinancementSimulationSubscription: Subscription;
  remiseMessage: any;
  discretionRemise: boolean;
  textAvantageClient: boolean;
  typeForApi: string;
  isLease: boolean = false;
  searchClient: any;
  index: any;
  hits: any;
  offreUrl: string;
  category: any;
  results: any;
  totalOptions: number;
  nbreHites: any;
  show: boolean = false;
  kmTotal: number;
  breadcrumbList: any;
  mark: string;
  model: string;
  generation: string;
  constructor(
    private route: ActivatedRoute,
    private service: TunnelService,
    private config: ConfigService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private state: TransferState,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platform: Object
    ) { 
      this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
      this.index = this.searchClient.initIndex('prod_ELITE_OFFERS_category');
    }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platform)){
      this.screenWidth = this.config.getWindow()?.innerWidth;
   }
   this.siteUrl = this.config.getSiteUrl();
   this.typeForApi = this.config.getType();
    this.devis = new Devis();
    if(this.route.snapshot.paramMap.get("rentContributionValue")){
      this.apport = parseInt(this.route.snapshot.paramMap.get("rentContributionValue"));
    }
    if(this.route.snapshot.paramMap.get("rentMileageValue")){
      this.kilometrage = parseInt(this.route.snapshot.paramMap.get("rentMileageValue"));
    }
    if(this.route.snapshot.paramMap.get("rentDurationValue")){
      this.duration = parseInt(this.route.snapshot.paramMap.get("rentDurationValue"));
    }
    this.route.params.subscribe(params => {
      this.offerId = params['offerId']
      this.mark = params.mark?params.mark:null
      this.model = params.model?params.model:null
      this.generation = params.generation?params.generation:null
      this.service.getRedirectConfig(this.offerId, this.typeForApi, this.mark, this.model, this.generation).subscribe(
        res => {
          if (res.toRedirect == true) {
            let urlToRedirect = ''
          if (this.config.getLocation().hostname.includes('leasing')) {
             urlToRedirect = this.config.getProtocol() + "//" + this.config.getLocation().hostname.replace('leasing.', 'www.') + res.urlToRedirect
           } else if(params.typePage == "occasion_tunnel" && params.rentContributionValue && params.rentMileageValue && params.rentDurationValue){
            urlToRedirect = res.urlToRedirect + '/' + params.rentContributionValue + '/' + params.rentMileageValue + '/' + params.rentDurationValue
           }else{
             urlToRedirect = res.urlToRedirect
           }
           if (this.response){
             this.response.status(301);
             this.response.setHeader('Location',urlToRedirect);
             this.response.end();
           }
        }else if(res.toRedirect == false && params.typePage == 'old_devis' && res.type != 'utility'){
          this.chekRedirect(res.markEurotaxId, res.modelEurotaxId, res.marqueNom, res.modelNomComplet, res.modelGroupeNiveau1,res.isOccasion)
        }else{
          this.getDevis()
        }
       })
     })
   }

  getDevis(){
    this.service.getDiscount(this.offerId).subscribe(
      res => {
        this.isLease = res.isLease
        if(this.isLease == true){
          this.typeForApi = 'leasing'
        }
    this.service.getGoogleTags(this.offerId, this.typeForApi).subscribe(
      res => {
        this.config.getWindow().document.getElementById('taggoogle').innerHTML = res
        if( !this.state.hasKey(this.GOOGLE_TAG_DATA_KEY)) {
          this.state.set(this.GOOGLE_TAG_DATA_KEY, <void> res);
        } 
      }
    )
    this.service.getSchemaTag(this.offerId, this.typeForApi).subscribe(data => {
      this.config.getWindow().document.getElementById('schematag').innerHTML = data;
   
      if (!this.state.hasKey(this.SCHEMA_TAG_DATA_KEY)) {
        this.state.set(this.SCHEMA_TAG_DATA_KEY, data);
      }
    });    
    this.service.getCarouselInfo(this.offerId, this.typeForApi).subscribe(
      res => {
        this.devis.carousel = res
        if(res?.liens){
          this.generateAndAppendBreadcrumbScript(res.liens)
        }
      })

    this.service.getInitDevis(this.offerId, this.devisId, this.typeForApi).subscribe(
      res => {
        if(res.is404 == true){
          if(this.response)
            this.response.status(404);
            this.router.navigateByUrl('/not-found', { skipLocationChange: true });
        }
        this.devis.initDevis = res
        this.devis.initDevis.offerId = this.offerId
      })

      this.service.getColors(this.offerId, this.typeForApi).subscribe(
        res => {
          this.devis.colors = res
          if(this.devis.colors.images.length == 1){
            this.devis.colors.selectedColor = this.devis.colors.images[0]
            this.devis.colors.isCheckedColor = true
          }else{
            this.devis.colors.selectedColor = null
            this.devis.colors.isCheckedColor = false
          }
          if(this.devis.colors.selleries.length == 1){
            this.devis.colors.selectedSellerie = this.devis.colors.selleries[0]
            this.devis.colors.isCheckedSellerie = true
          }else{
            this.devis.colors.selectedSellerie = null
            this.devis.colors.isCheckedSellerie = false
          }
          this.devis.colors.textColor = ''
          this.devis.colors.textSellerie = ''
        })
      
        this.service.getChoiceOptions(this.offerId, this.typeForApi).subscribe(
          res => {
            this.devis.choiceOptions = res
            this.totalOptions = this.devis.choiceOptions.options.length
            if(this.totalOptions){
              this.devis.choiceOptions.options = this.devis?.choiceOptions.options.sort((a, b) => { 
                return a.libelle.localeCompare(b.libelle)
              });
            }
          
        })
        this.service.getSummaryInfo(this.offerId, this.typeForApi).subscribe(
          res => {
          this.devis.generalInfo = res
          this.devis.generalInfo.prices.fraisLivraison = -1
          this.devis.generalInfo.prices.reprise = -1
          this.devis.generalInfo.prices.aideReprise = 0
          this.devis.generalInfo.prices.repriseLabel = ""
          this.devis.generalInfo.prices.demandeReprisePrice = -1
          this.devis.generalInfo.prices.demandeReprise = 0
          this.title.setTitle(this.devis.generalInfo.documentTitle)
          if(this.devis.generalInfo.documentDescription){
            this.meta.addTag({
              name: 'description',
              content: this.devis.generalInfo.documentDescription,
            });
          }
          this.show = true
          // Remise
          if (!this.config.getWebUrl().includes('leasing')){
            if (this.showInvoiceLink(this.devis?.generalInfo?.avantageFinalElastic,this.devis?.generalInfo?.eurotaxId,this.devis?.generalInfo?.brandsWithLowDiscountAllowed)){
              this.remiseMessage = this.devis?.generalInfo?.avantageFinalElastic;
            }else{
              this.remiseMessage= 'Remise à discrétion'
              this.discretionRemise = true
            }
          }else{
            if (this.devis?.generalInfo?.offerAdvantageTILoa > 0 )
            {
              this.remiseMessage= +this.devis?.generalInfo?.offerAdvantageTILoa
              this.textAvantageClient  = true
            }
          }
          
          this.simulate()
          this.loadDevis = true
          
          if(this.devis.generalInfo.offer.category == '1'){
            this.category = ["category:3","category:4"]
          }
          // if(this.devis.generalInfo.offer.category == '2'){
          //   this.category = ["category:1","category:3"]
          // }
          if(this.devis.generalInfo.offer.category == '3'){
            this.category = ["category:1","category:4"]
          }
          if(this.devis.generalInfo.offer.category == '4'){
            this.category = ["category:1","category:3"]
          }
          this.index.search('', {
            facetFilters: [
              ["modelGroupeNiveau1:" + this.devis.generalInfo.modelGroupeNiveau1],
              this.category,
              ["isReserved:false"]
            ],
            distinct: true,
          }).then(( hits ) => {
            this.hits = hits.hits
            this.nbreHites = hits.nbHits
          });
      })
      this.service.getRepriseInfo(this.offerId, this.typeForApi).subscribe(
        res => {
          this.devis.reprise = res
          this.devis.reprise.simulationReprise = null
        })
      this.service.getSeriesEquipment(this.offerId, this.typeForApi).subscribe(
        res => {
          this.devis.seriesEquipment = res
        })
      this.service.getVideoTesing(this.offerId).subscribe(
        res => {
          this.devis.videoTesting = res
        })
      
      this.postalCodeChangeAction(this.postalCode)
    })
    this.route.queryParams.subscribe(params => {
      this.devis.utmMedium  = params['utm_medium']?params['utm_medium']:null
      this.devis.utmSource  = params['utm_source']?params['utm_source']:null
    })
    this.createCanonicalURL();
    this.generateTrackingEvent(this.offerId)
  }

  encodeParenthesesForUrl(str) {
    return str.replace(/\(/g, '%28').replace(/\)/g, '%29')
  }

  chekRedirect(markEurotaxId, modelEurotaxId, slugMark, nomComplet, groupeNiveau1,isOccasion) {
    let redirectRoute : any;
    let modelNomComplet = this.encodeParenthesesForUrl(nomComplet).replace(/\//g, '-').replace(/\+/g, '-').replace(/ /g, '-').toLowerCase()
    let modelGroupeNiveau1 = this.encodeParenthesesForUrl(groupeNiveau1).replace(/\//g, '-').replace(/\+/g, '-').replace(/ /g, '-').toLowerCase()  
    let newUrl = this.config.getProtocol() + "//" + this.config.getLocation().hostname
      if (this.config.getLocation().port != "")
        newUrl = newUrl + ":" + this.config.getLocation().port
      
      if(this.config.getWebUrl().includes('leasing'))
        newUrl = this.config.getProtocol() + "//" + this.config.getLocation().hostname.replace('leasing.', 'www.')
      
      if(isOccasion == true){
        redirectRoute = newUrl + "/occasion/"+ slugMark + "/" + modelGroupeNiveau1 + "/" + modelNomComplet + "/" + this.offerId
      }else{
        redirectRoute = newUrl + "/voiture-" + slugMark + "-" + markEurotaxId + "/" + modelNomComplet.replace(" ", "-") + "-" + modelEurotaxId + "/" + this.offerId +'.html'
      }
      redirectRoute = (redirectRoute.toLowerCase()).replace(" ", "-");
      if (this.response) {
        this.response.status(301);
        this.response.setHeader('Location', redirectRoute);
        this.response.end();
      }
    }

    createCanonicalURL() {
      (this.config.getWindow().document.querySelectorAll('[rel="canonical"]')).forEach(link => link.remove())
      let link;
      link = this.config.getWindow().document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href',this.config.getProtocol() + "//" +this.config.getLocation().host + this.config.getLocation().pathname);
      this.config.getWindow().document.head.appendChild(link);
    }
    
    showInvoiceLink(discountValue, EurotaxId, brandsWithLowDiscountAllowed) {
        return (discountValue > 3 || brandsWithLowDiscountAllowed.indexOf(EurotaxId)!= -1);
     }
     
    optionSelected(data) {
      this.devis.choiceOptions.options = data;
      this.calculPrice();
      this.simulate()
      this.financementSelected = false
    }
    guaranteeSelected(data) {
      this.devis.choiceOptions.guarantees = data
    }
  
    colorSelected(data) { 
      this.devis.colors.selectedColor =  data 
      this.calculPrice()
      this.simulate()
      this.financementSelected = false
    }
    
    sellerieSelected(data) { 
      this.devis.colors.selectedSellerie =  data 
      this.calculPrice()
      this.simulate()
      this.financementSelected = false
      this.devis.colors.textSellerie = ''
    }
    
    calculPrice() {
        this.devis.generalInfo.prices.remiseOptions = 0
        this.devis.generalInfo.prices.optionsCataloguePrice = 0
        this.devis.generalInfo.prices.fraisLivraison = -1
        this.devis.generalInfo.prices.reprise = -1
        this.devis.generalInfo.prices.repriseLabel = ""
        this.devis.generalInfo.prices.demandeReprisePrice = -1
        this.devis.generalInfo.prices.demandeReprise = 0
        
         // Equipement Color
      this.devis?.colors?.images.forEach(color => {
        if (color.equip) {
          this.devis?.choiceOptions?.options.forEach(option => {
            if (option.equipId == color.equip)
              option.selected  = false;
          });
        }
      });
  
    // Sellerie
      this.devis?.colors?.selleries.forEach(sell => {
        if (sell.equip) {
          this.devis?.choiceOptions?.options.forEach(option => {
            if (option.equipId == sell.equip)
            option.selected  = false;
          });
        }
      }); 
      this.devis?.choiceOptions?.options.forEach(option => {
  
        this.colorEquip = -1
         if(this.devis?.colors?.selectedColor){
           if(this.devis.colors.selectedColor.equip)
          this.colorEquip = this.devis.colors.selectedColor.equip
         }
          if (option.equipId == this.colorEquip){
            option.selected = true
          }
  
          this.sellerieEquip = -1
          if(this.devis.colors.selectedSellerie){
            if(this.devis.colors.selectedSellerie.equip)
            this.sellerieEquip = this.devis.colors.selectedSellerie.equip
          }
           if (option.equipId ==  this.sellerieEquip){
            option.selected = true
          }
  
         // Options
          if (option.selected) {     
            this.devis.generalInfo.prices.optionsCataloguePrice += option.referencePrixCatalogue
            this.devis.generalInfo.prices.remiseOptions += option.referencePrixCatalogue - option.referencePrixVente
          }
      })
  
      // livraison
     
      if( this.devis?.delivery?.partenaireType == 1){
        this.devis.generalInfo.prices.fraisLivraison = this.devis.delivery.domicilePrice;
        this.devis.generalInfo.livraisonLabel = "à votre domicile ou à votre lieu de travail (" + this.postalCode + ")";
      }
      else if (this.devis?.delivery?.partenaireType == 2) {
        this.devis.generalInfo.prices.fraisLivraison = parseFloat(this.devis.delivery.selectedPartner.tarif);
        this.devis.generalInfo.livraisonLabel = this.devis.delivery.selectedPartner.detailOffreDelivery;
      }
  
  
       // reprise
       if(this.withReprise){
        if(this.devis?.reprise){
          this.devis?.reprise?.reprises.forEach(
            reprise => {
              if(reprise.selected){
               
                if(reprise.primeDeduite == true){
                  this.setPrimeDeduite(true)
                }else{
                  this.setPrimeDeduite(false)
                }
                this.devis.generalInfo.prices.reprise = parseFloat(reprise.montant)
                this.devis.generalInfo.prices.repriseLabel = reprise.label
              }
            });
        }
        if(this.devis?.reprise?.simulationReprise?.estimationRepriseData && this.mode == 2){
            this.devis.generalInfo.prices.reprise = -1;
            this.devis.generalInfo.prices.demandeReprise = 1;
            this.devis.generalInfo.prices.identifiant = -1;
              if(this.devis?.reprise?.simulationReprise.estimationRepriseData.prix){
                this.devis.generalInfo.prices.demandeReprisePrice = this.devis.reprise.simulationReprise.estimationRepriseData.prix
              }else{
                this.devis.generalInfo.prices.demandeReprisePrice = -1;
              }
          this.devis.generalInfo.prices.repriseLabel = "Prix de reprise minimum (non déduite) incluant les frais de remise en état"
          if(this.devis?.reprise?.simulationReprise.estimationRepriseData.identifiant) {
              this.devis.generalInfo.prices.identifiant = this.devis.reprise.simulationReprise.estimationRepriseData.identifiant;
            }
        }
      }
  }

  aideRepriseSelected(data){
    this.devis.generalInfo.prices.aideReprise = data;
    this.calculPrice()
  }
  modeSelected(data){
    this.mode = data
  }
  setPrimeDeduite(deduite:boolean) {
      this.primeDeduite = deduite;
    }
  getTotalPrice(){
    var deliveryCost = this.devis?.generalInfo?.prices?.fraisLivraison;
    if (this.devis?.generalInfo?.prices?.fraisLivraison == -1){
      deliveryCost = 0;
    }
    
    var reprise = this.devis?.generalInfo?.prices?.reprise;
    if (this.devis?.generalInfo?.prices?.reprise == -1 || this.primeDeduite !== true){
      reprise = 0;
    }

    var repriseEstimation = this.devis?.generalInfo?.prices?.demandeReprise;
    if (repriseEstimation == -1 || this.primeDeduite !== true){
      repriseEstimation = 0;
    }

    return this.devis?.generalInfo?.prices?.offerPriceForFront + this.devis?.generalInfo?.prices?.optionsCataloguePrice - this.devis?.generalInfo?.prices?.remiseOptions + deliveryCost - reprise - repriseEstimation + this.devis?.generalInfo?.prices?.priceOptionsOuvertes;
  }
  getElitePrice(){
    return this.devis?.generalInfo?.prices?.elitePrice + this.devis?.generalInfo?.prices?.optionsCataloguePrice - this.devis?.generalInfo?.prices?.remiseOptions;
  }
  getTvaPrice() {
    var price = this.getElitePrice();
    return (price * this.devis?.generalInfo?.prices?.tva / 100) ;
  }
  getTtcPrice() {
    return this.getTotalPrice() + this.getTvaPrice() +  this.devis?.generalInfo?.prices?.administrativePrice
  }

  getPrice(){
    if(this.devis?.generalInfo?.type == 'utility')
      return this.getTtcPrice();
    else
      return this.getTotalPrice();
  }

  dureeChange(data: number) {
    this.duration = data
    this.simulate()
  }
  apportChange(data: number) {
    this.apport = data
    this.simulate()
  }
  kilometrageChange(data: number) {
    this.kilometrage = data
    this.simulate()
  }

  postalCodeChangeAction(data){
    
    if(data == null || data.length == 5){
      this.postalCode = data
      this.route.params.subscribe(params => {
        this.offerId = params['offerId']
        this.loadDelivery = true
      this.service.getDeliveryPartners(this.offerId, this.postalCode).subscribe(
        res =>{
          this.devis.delivery = res
          this.devis.delivery.partenaireType = 0
          this.devis.delivery.selectedPartner = null
          this.devis.delivery.postalCode = this.postalCode
          
        var i = 0;
        var feeDelivery = 0;
        this.devis.delivery.partners = []
        for (let key in this.devis?.delivery?.deliveryPartners) {
          if(this.devis?.delivery?.deliveryPartners[key].tarifNum == 0){
            feeDelivery = 1
          }
          if (this.devis?.delivery?.deliveryPartners[key].tarifNum != 0 && i == 0 && feeDelivery == 1) {
            this.devis?.delivery?.partners.push({ id: -1, libelle: '---------------------------------------------' });
            i++;
          }

          this.devis?.delivery?.partners.push(this.devis?.delivery?.deliveryPartners[key]);
        
        }
        if (this.devis?.delivery?.partners.length > 0) {
          this.devis.delivery.selectedPartner = this.devis?.delivery?.partners[0];
        }
        this.loadDelivery = false
          }
          
        )
      })
    }
  }

  simulate(){
    this.tarif = this.getPrice();
    this.tarifOptions = this.devis.generalInfo.prices.optionsCataloguePrice;
    this.loader = true;
      var apportMax = Math.ceil(this.tarif * 0.25);
      if(this.apport == -1){
        var priceLeasing = this.tarif -(this.devis?.initDevis?.prices.VN - this.devis?.initDevis?.prices.Lease);
       
        if(this.devis?.initDevis?.isStock){
          this.apport = (priceLeasing > 0 ? Math.ceil(priceLeasing * 0.25) : 0);
        }else{
          this.apport = (priceLeasing > 0 ? Math.ceil(priceLeasing * 0.25) : 0);
        }
      }else if(this.apport > apportMax){
        this.apport = apportMax;
      }
      this.devis?.choiceOptions?.options.forEach(element => {
            if(element.tatoOption == true){
              this.tatoPrice = element.referencePrixVente
            }
          })
          if (this.getFinancementSimulationSubscription) {
            this.getFinancementSimulationSubscription.unsubscribe();
          }
          this.kmTotal = this.kilometrage * (this.duration/12)
          this.getFinancementSimulationSubscription = this.service.getFinancementSimulation(this.offerId, this.tarifOptions, this.tarif, this.duration, this.apport, this.kmTotal,this.tatoPrice, 0, this.typeForApi).subscribe(
        res => {
          this.devis.simulationFinancement = res
          if(this.isLease){
            this.updateLeaseData(this.devis.simulationFinancement)
          }else{
            this.updateData(this.devis.simulationFinancement)
          }
          this.loader = false;
          this.selectFinancementAction(this.devis.simulationFinancement)
        }, error => {
          if (error) {
            if (this.getFinancementSimulationSubscription) {
              this.getFinancementSimulationSubscription.unsubscribe();
            }
            this.getFinancementSimulationSubscription = this.service.getFinancementSimulation(this.offerId, this.tarifOptions, this.tarif, this.duration, this.apport, this.kmTotal,this.tatoPrice, 1, this.typeForApi).subscribe(
                    res => {
                      this.devis.simulationFinancement = res
                      if(this.isLease){
                        this.updateLeaseData(this.devis.simulationFinancement)
                      }else{
                        this.updateData(this.devis.simulationFinancement)
                      }
                      this.loader = false;
                      this.selectFinancementAction(this.devis.simulationFinancement)      
                    }, error => {
                      this.loader = false;
                    });
          }
          else {
            this.loader = false;
          }
        }
      )
    }

  updateLeaseData(data: SimulationFinancement){
    data.financements.forEach(function (fn) {
        if(fn.result.identification == 'LoaFacile'){
          fn.selected = true;
        }else{
          fn.selected = false;
        }
        fn.garantie = false;
    });
  }

  updateData(data: SimulationFinancement){
    if(data.financements){
      data.financements.forEach(function (fn) {
          fn.selected = false;
          fn.garantie = false;
      });
    }
  }
  selectFinancementAction(data){
      this.bestLoaPrice = -1;
      this.selectedLoaPrice = -1;
    this.devis.simulationFinancement = data
    
    if(this.devis.simulationFinancement.financements){
      this.devis.simulationFinancement.financements.forEach(element => {
        if (!element.error) {
          if(this.bestLoaPrice == -1) {
            this.bestLoaPrice = this.service.getTotalMensualite(element);
            this.bestLoaInfo = element;
          } 
          else if(this.bestLoaPrice > this.service.getTotalMensualite(element)){
            this.bestLoaPrice = this.service.getTotalMensualite(element);
            this.bestLoaInfo = element;
          }
          if (element.selected) {
            this.selectedLoaPrice = this.service.getTotalMensualite(element);
            this.selectedLoaInfo = element;
          }   
        }
      });
      if(this.selectedLoaPrice != -1) {
        this.bestLoaPrice = this.selectedLoaPrice;
        this.bestLoaInfo = this.selectedLoaInfo;
      }
    }
    
  }

  selectedLivaison(data){
    this.devis.delivery = data
    this.calculPrice()
    this.simulate()
    this.financementSelected = false
  }

  inputTextColor(data){
    this.devis.colors.textColor = data
  }

  inputTextSellerie(data){
    this.devis.colors.textSellerie = data
  }

  isSelectedFinancement($event: any){
    this.financementSelected =  $event
  }

  isSelectedNoFinancement($event: any){
    this.selectedNoFinancement =  $event
  }

  verif(){
    this.message = {type:"",text:""};
    if( ((!this.devis?.colors?.selectedSellerie && this.devis?.colors?.textSellerie == '') || (!this.devis?.colors?.selectedColor && this.devis?.colors?.textColor == '' )) && ((this.devis?.generalInfo?.type != 'occasion') && !(this.devis?.generalInfo?.type == 'new' && this.devis?.generalInfo?.offer?.isStock == true)) ){
      this.setMessage("Merci de choisir une couleur et une sellerie","sellerie");
      return  false
    }
   
    // Reprise
       if(this.withReprise)
       {
        if(this.mode == 1){
          var exist = false;
          this.devis?.reprise?.reprises.forEach(element => {
              if (element.selected)
                exist = true;
            });
          if (!exist) {
              this.setMessage("Merci de sélectionner une reprise","reprise");
              return false;
            }
        }
         else if (this.mode == 2 && this.devis?.reprise?.simulationReprise == null) {
              this.setMessage("Merci de sélectionner une reprise","reprise");
              return false;
          }
        }

    //livraison
    if (this.devis?.delivery && this.devis.delivery.partenaireType == 0 && this.devis?.generalInfo?.offreOccasion?.livraison == null) {
      this.setMessage("Merci de renseigner le lieu de livraison","livraison");
      return false;
    }

    //financement
    var test = true;
    var selected = false;
    if(this.devis?.simulationFinancement?.financements){
      this.devis.simulationFinancement.financements.forEach(
        fn => {
          if(fn.selected == true) selected = true
          if(fn.selected && fn.error){
            this.setMessage("Merci de choisir un financement valide","financement");
            test = false;
          }
        }
      )
    }
    if(selected == false && !this.financementSelected && this.selectedNoFinancement) {
      this.setMessage("Merci de sélectionner un financement","financement");
      test = false
    }
   
    if(!test){
      return false;
    }

      return true;
  }
  setMessage(msg,type) {
    this.message.text = msg;
    this.message.type = type;
  }
  submitFormClient(data){
      this.devis.isDevis = true
      this.devis.client = data
      this.submit(this.devis)
  }
  submitFormReservation(data){
      this.devis.isDevis = false
      this.devis.client = data
      this.submit(this.devis)
  }
  submit(devisJson){
    this.isLoadedSave = true
      this.service.save(devisJson,this.typeForApi).subscribe(
        res => {
          if (res.result >= 1) {
            if(this.devis.generalInfo.type == 'new'){
              this.getTag(devisJson.client.mail, this.getTotalPrice(), res.devisId)
            }
            window.location.href = this.siteUrl + "vente-voiture/offer/created/" + res.hash + "/1";
            return;
          }
          if (res.result == -1) {
            if (devisJson.isDevis)
              this.setMessage("L'adresse email que vous avez rentré n'est pas valide","");
            else
              this.setMessage("L'adresse email que vous avez rentré n'est pas valide","");
          }
          if (res.result == -2) {
            if (devisJson.isDevis) {
              this.setMessage("Vous avez déjà un compte avec cette adresse e-mail! Merci de rentrer votre mot de passe","");
            }
            else {
              this.setMessage("Cet adresse mail existe déjà! Merci de se connecter si vous avez déjà un compte Elite-auto","");
            }
          }
          if (res.result == -3) {
            if (devisJson.isDevis) {
              this.setMessage("Mot de passe invalide","");
            }
            else {
              this.setMessage("Mot de passe invalide","");
            }
          }
          this.isLoadedSave = false
        }
      )
  }
  repriseChosed() {
    this.calculPrice();
  }

  repriseSimulationSelected(vehiculeInfos: any) {
    this.devis.reprise.simulationReprise = vehiculeInfos
    this.calculPrice();
    if (!vehiculeInfos)
      return;
    if (vehiculeInfos.client) {
      this.repriseClient = vehiculeInfos.client;
      if (!vehiculeInfos.client?.postalCode)
        this.repriseClient.postalCode = "";
      if (!vehiculeInfos.client.tel)
        this.repriseClient.tel = "";
      if (!vehiculeInfos.client.mail)
        this.repriseClient.mail = "";
      if (!vehiculeInfos.client.promoCode)
        this.repriseClient.promoCode = "";
    }
    this.simulate();
    this.financementSelected = false
  }

  repriseSelected(data) {
    this.devis.reprise = data
    this.calculPrice();
    this.simulate();
    this.financementSelected = false
  }

  noRepriseSelected($event: boolean) { 
    this.withReprise = $event;
    if (!this.withReprise) {
      this.calculPrice();
    }
  }


  loaPriceClicked($event: boolean){
    this.isLoaPriceClicked = $event
    this.scrollToElement('financement');
  }

  formClientClicked($event: boolean){
    this.showFormClient = $event
  }

  openFinancementDetails($event){
    this.isLoaPriceClicked = $event
  }

  scrollToElement(targetElement:string) {
    var element = this.config.getWindow().document.getElementById(targetElement);
    var bodyRect = this.config.getWindow().document.body.getBoundingClientRect().top;
    var elementRect = element.getBoundingClientRect().top;
    var elementPosition = elementRect - bodyRect;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
    }

    emptyRedirectEvent($event:string) {
      if ($event == "reprise") {
        this.scrollToElement('reprise');
      }

      if ($event == "sellerie") {
        this.scrollToElement('couleurs&selleries');
        this.isClosedColorCollapse = false;
      }

      if ($event == "livraison") {
        this.scrollToElement('livraison');
        this.isClosedDeliveryCollapse = false;
      }

      if ($event == "financement") {
        this.scrollToElement('financement');
        this.isLoaPriceClicked = false;
      }
     
    }

    colorCollapseEvent($event:boolean) {
      this.isClosedColorCollapse = $event
    }

    deliveryCollapseEvent($event:boolean) {
      this.isClosedDeliveryCollapse = $event
    }

    financeCollapseEvent($event:boolean) {
      this.isLoaPriceClicked = $event
    }

    getTag(mailClient, montantDevis, idDevis) {
      this.service.getConversionTag(mailClient, montantDevis, idDevis).subscribe(res => {
        this.config.getWindow().document.getElementById('conversiontag').innerHTML = res;
      })
    }

    generateAndAppendBreadcrumbScript(data) {
      const itemList = data.map((item, index) => {
    let fullURL = item.url.startsWith("https") ? item.url : `https://${this.config.getEliteAutoHost()}${item.url}`;   
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": { "@id": fullURL },
          "name": item.libelle.replace(/"/g, '')
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

    generateTrackingEvent(id) {
      const eventData  = {
          event: 'view_item',
          send_to: 'AW-1025404699',
          items: [{
            id: id,
            google_business_vertical: 'retail'
          }] 
      };
      const eventDataJSON  = JSON.stringify(eventData, null, 2);
      const trackingScript = this.config.getWindow().document.createElement('script');
      trackingScript.id = 'eventTracking';
      trackingScript.text = `gtag(${eventDataJSON});`;
      this.config.getWindow().document.body.appendChild(trackingScript);
    }

}
