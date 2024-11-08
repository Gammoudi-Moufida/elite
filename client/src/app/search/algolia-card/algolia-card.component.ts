import { isPlatformBrowser, NgClass, NgIf, NgFor, NgStyle, UpperCasePipe, DecimalPipe, TitleCasePipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { NgbModal, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { environment } from 'src/environments/environment';
import { AlgoliaCardService } from './algolia-card.service';
import { NgAisHighlightModule } from 'angular-instantsearch';
import { FormsModule } from '@angular/forms';
import algoliasearch from 'algoliasearch';

@Component({
    selector: 'app-algolia-card',
    templateUrl: './algolia-card.component.html',
    styleUrls: ['./algolia-card.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, FormsModule, NgFor, NgStyle, NgOptimizedImage, NgAisHighlightModule, NgbPopoverModule, NgbTooltipModule, UpperCasePipe, DecimalPipe, TitleCasePipe],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class AlgoliaCardComponent implements OnInit {

  @Input() result: any;
  @Input() objectLoyers:any;
  @Input() filterLoyerChecked:any
  @Input() isComparator: boolean = false;
  @Input() showComparator
  @Input() cardComparator: boolean = false;
  @Input() hideSticky: boolean = true;
  @Input() TypeRoute: string = null;
  @Input() isFlashSale:any
  @Input() searchFilter:any
  @Input() isLcp = false;

  @Output() checkCompareEvent = new EventEmitter();

  screenWidth: number;
  screenMode: number;
  images: any[] = [];
  initDone: boolean;
  imgUrl: string;
  isBrowser = false;
  id: number;
  voitureUtilitaire: boolean = false;

  carrouselImgsLength: number = 0;
  carrouselItems: any[] = []

  checkedCompare: boolean = false;
  checkedCompareVeh = [];

  infoloyer: string[] = [];
  loading: boolean;
  informationText: string;

  showLoading: boolean = true;

  imgIndex: number = 0;
  currentIndex: number = 0;
  offreUrl: string;

  remise: number;
  marque: string;
  model: string;
  motorisation: string;
  finition: string;
  priceForFront: number;
  maxMontantReprise: number;
  prixCatalogueForLease: number;
  discretionRemise: boolean;
  anneeMiseEnCirculation: number;
  kilometrage: number;
  vignette: string;
  vo: boolean;
  rent: number;
  nbCouleurs: number;
  energie: string;
  transmissionNormalized: string;
  nbPorte: string;
  frontPicture: string;
  isReserved: boolean;
  isSpecial: boolean;
  isLoa: boolean = false;
  co2: number;
  equipments: string[];
  ColorsImages: string[];
  OffreImages: any[];
  isOccasion: boolean;
  offerAdvantageTILoa: any;
  avantageFinalWithADiscretion: any;
  brandsWithLowDiscountAllowed: any;
  disponibiliteForFO: string;
  reservedOffre: boolean = false;
  modelGroupeNiveau1: string;
  modelNomCompl: string;
  imgAlt: string;
  avantageFinalElastic: any;
  remiseMessage: any;
  textAvantageClient: boolean;
  hit:any
  marqueSlug: any;
  modelSlug: any;
  marqueEurotaxId: any;
  modelEurotaxId: any;
  duree: number;
  apport: number;
  kilometrageAnnuel: number;
  searchClient: any;
  index: any;
  res: any;
  text: string;
  isPopoverVisible: boolean = false;

  showImg: boolean = false;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.showImg = true
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.showImg = true
  }

  @HostListener('window:click') clickInside() {
    this.showImg = true;
  }

  
  constructor(
    private config: ConfigService,
    @Inject(PLATFORM_ID) private platform: Object,
    private service: AlgoliaCardService,
    private modalService: NgbModal

  ) {
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex("prod_ELITE_LOYERS");
    this.screenWidth = this.config.getWindow().innerWidth;
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

  ngOnInit(): void {
    this.hit  = this.result
    this.imgUrl = this.config.getNewImgUrl();
    this.isBrowser = isPlatformBrowser(this.platform);
    if(this.filterLoyerChecked){
        this.id = this.hit.offreId; 
    }else{
        this.id = this.hit.id;
    }

    if (this.isBrowser) {
      this.checkedCompareVeh = this.service.getCompareSelectedVeh()
      if (this.checkedCompareVeh.includes(this.id)) {
        this.checkedCompare = true
      }
    }

    this.remise = Number(this.hit.remise);
    this.marque = this.hit.marque;
    this.model = this.hit.modelNormalized;
    this.motorisation = this.hit.motorisation;
    this.finition = this.hit.finition;
    this.priceForFront = Number(this.hit.priceForFront);
    this.prixCatalogueForLease = Number(this.hit.prixCatalogueForLease);
    this.rent = Math.ceil(Number(this.hit.rent));
    if (isNaN(this.rent))
      this.rent = 0;
    this.equipments = this.hit.equipments;
    this.nbCouleurs = this.hit.nbCouleurs - 11;
    this.energie = this.hit.energie;
    this.transmissionNormalized = this.hit.transmissionNormalized;
    this.nbPorte = this.hit.nbPorte;
    this.frontPicture = this.hit.frontPicture;
    this.ColorsImages = this.hit.ColorsImages;
    this.isReserved = this.hit.isReserved;
    this.isSpecial = this.hit.isSpecial;
    this.co2 = this.hit.co2;
    this.isOccasion = this.hit.isOccasion;
    this.offerAdvantageTILoa = this.hit.offerAdvantageTiLoa;
    this.avantageFinalWithADiscretion = this.hit.avantageFinalWithADiscretion;
    this.brandsWithLowDiscountAllowed = JSON.parse(this.hit.brandsWithLowDiscountAllowed);
    this.avantageFinalElastic = this.hit?.avantageFinalElastic;
    this.maxMontantReprise = Number(this.hit.maxMontantReprise);
    this.disponibiliteForFO = this.hit.disponibiliteForFO;
    this.anneeMiseEnCirculation = this.hit.anneeMiseEnCirculation ? this.hit.anneeMiseEnCirculation : null;
    this.kilometrage = this.hit.kilometrage ? this.hit.kilometrage : 0;
    this.reservedOffre = (this.isReserved && this.disponibiliteForFO == 'en stock');
    this.vignette = this.hit.vignette;
    this.vo = this.hit.vo ? this.hit.vo : false;
    this.modelGroupeNiveau1 = this.hit.modelGroupeNiveau1 ?? null;
    this.modelNomCompl = this.hit.modelNomCompl ?? null;
    this.marqueSlug = this.hit.marqueSlug;
    this.modelSlug = this.hit.modeleSlug;
    this.marqueEurotaxId = this.hit.eurotaxId;
    this.modelEurotaxId = this.hit.eurotaxModeleId;

    this.modelNomCompl = this.encodeParenthesesForUrl(this.modelNomCompl).replace(/ /g, '-').replace(/\+/g, '-').toLowerCase()
    this.offreUrl = environment.eliteAutoHost + '/voiture-' + this.marque +'-'+this.marqueEurotaxId+'/'+this.modelNomCompl+'-'+this.modelEurotaxId +'/' + this.id + ".html";
    this.offreUrl = (this.offreUrl.toLowerCase()).replace(/ /g, "-");


    if (this.vo || this.isOccasion == true) {
      let modelGroupeNiveau1 = this.encodeParenthesesForUrl(this.modelGroupeNiveau1).replace(/\//g, '-').replace(/\+/g, '-').replace(/ /g, '-').toLowerCase()
      this.imgAlt = this.marque.toString().charAt(0).toUpperCase() + this.marque.toString().slice(1).toLowerCase() + ' ' + this.model.toString().charAt(0).toUpperCase() + this.model.toString().slice(1).toLowerCase() + ' ' + this.motorisation.toString().toLowerCase();

      this.offreUrl = environment.eliteAutoHost + '/occasion/' + this.marqueSlug +'/'+ modelGroupeNiveau1 +'/' + this.modelNomCompl +'/' + this.id;
      this.offreUrl = (this.offreUrl.toLowerCase()).replace(/ /g, "-");
      this.offreUrl = 'www.' + this.offreUrl.replace("www.", "");
    }
    else {
      if (this.TypeRoute && (this.TypeRoute == 'lease' || this.TypeRoute == 'marque_modele_offres_finition_lease')){
        this.offreUrl = this.offreUrl.replace("leasing.", "www.");
        this.imgAlt = 'Offre de location LOA / LDD ' + this.marque.toString().charAt(0).toUpperCase() + this.marque.toString().slice(1).toLowerCase() + ' ' + this.model.toString().charAt(0).toUpperCase() + this.model.toString().slice(1).toLowerCase()
      } else
        this.imgAlt = this.marque.toString().charAt(0).toUpperCase() + this.marque.toString().slice(1).toLowerCase() + ' ' + this.model.toString().charAt(0).toUpperCase() + this.model.toString().slice(1).toLowerCase() + ' ' + (this.motorisation.toString().toLowerCase()).replace(this.model.toString().toLowerCase(), '').toString().charAt(0).toUpperCase() + (this.motorisation.toString().toLowerCase()).replace(this.model.toString().toLowerCase(), '').toString().slice(1).toLowerCase()

      if (this.hit.normalizedType != "utilitaire" && this.avantageFinalWithADiscretion == undefined && this.hit.loa == true && this.hit.energieNormalized != 'Electrique') {
        this.isLoa = true;
        this.offreUrl = this.offreUrl.replace("leasing.", "www.");
        this.priceForFront = Number(this.hit.priceForFrontLoa);
      }

      if (this.hit.normalizedType == "utilitaire") {
        this.offreUrl = environment.eliteAutoHost + '/devis/' + this.id;
        this.offreUrl = 'entreprise.' + this.offreUrl.replace("www.", "");
        this.voitureUtilitaire = true;
      }

      if (this.TypeRoute && (this.TypeRoute == 'lease' || this.TypeRoute == 'marque_modele_offres_finition_lease' || this.TypeRoute == 'marque_modele_offres_motorisation_lease') && this.offreUrl.indexOf('leasing') == -1) {
        this.offreUrl = this.offreUrl.replace("leasing.", "www.");
        this.priceForFront = Number(this.hit.priceForFrontLoa);
      }
    }
    
    this.offreUrl = this.config.getProtocol() + '//' + this.offreUrl;

    // Remise
    if (!this.config.getLocation().pathname.includes('leasing')) {
      if (this.showInvoiceLink(this.avantageFinalElastic, this.marqueEurotaxId, this.brandsWithLowDiscountAllowed)) {
        this.remiseMessage = this.avantageFinalElastic;
      }
      else {
        this.remiseMessage = 'Remise à discrétion'
        this.discretionRemise = true
      }
    }
    else {
      if (this.offerAdvantageTILoa > 0) {
        this.remiseMessage = +this.offerAdvantageTILoa
        this.textAvantageClient = true

      }
      else
        this.remiseMessage = 'nous contacter'
    }
    if(this.filterLoyerChecked){
      this.getLoyerMensuel()
    }
  }
  encodeParenthesesForUrl(str) {
    return str.replace(/\(/g, '%28').replace(/\)/g, '%29')
  }

  showInvoiceLink(discountValue, EurotaxId, brandsWithLowDiscountAllowed) {
    return (discountValue > 3 || brandsWithLowDiscountAllowed.indexOf(EurotaxId) != -1);
  }
  ngOnChanges() {

    if (!isPlatformBrowser(this.platform)) {
      this.showLoading = true
    }
    this.images = this.result.OffreImages
    if (!this.initDone) {
      this.carrouselInitiator()
    }
  }

  carrouselInitiator() {
    this.initDone = true
    this.carrouselImgsLength = this.images.length
    this.images.forEach((element, index) => {
      if (index == 0) {
        this.carrouselItems.push(
          { image: element, active: true }
        )
      } else {
        this.carrouselItems.push(
          { image: element, active: false }
        )
      }
    });
  }

  carrouselNextAction() {
    this.imgIndex++;
    this.currentIndex = ((this.imgIndex % this.carrouselImgsLength) + this.carrouselImgsLength) % this.carrouselImgsLength
    this.carrouselItems.forEach((element, index) => {
      if (index == this.currentIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });
    return false;
  }
 togglePopover(event: Event) {
   this.isPopoverVisible = !this.isPopoverVisible;
   event.preventDefault();
  }
  carrouselPrevAction() {
    this.imgIndex--;
    this.currentIndex = ((this.imgIndex % this.carrouselImgsLength) + this.carrouselImgsLength) % this.carrouselImgsLength
    this.carrouselItems.forEach((element, index) => {
      if (index == this.currentIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });

    return false;
  }

  checkCompare(content) {
    let data = this.service.getCompareCookie()
    let totalChecked = this.service.getCompareSelectedVeh().length
    if (!this.checkedCompare && totalChecked > 3) {
      this.modalService.open(content).result.then(
        (result) => {
          this.checkedCompare = false
        },
        (reason) => {
          this.checkedCompare = false
        }
      );
    } else {
      this.service.setCompareCookie("")
      if (!this.checkedCompare) {
        if (!data || !data.includes("," + this.id.toString() + ",")) {
          if (!data) {
            this.service.setCompareCookie("," + this.id.toString() + ",")
          } else {
            this.service.setCompareCookie(data + "," + this.id.toString() + ",")
          }
        }
      }
      if (this.checkedCompare) {
        let result = data.replace("," + this.id + ",", "")
        this.service.setCompareCookie(result)
      }
      this.checkCompareEvent.emit(true)
    }

  }

  getLoyerMensuel(){
    this.duree = this.searchFilter?.disjunctiveFacetsRefinements?.nbLoyer[0]
    this.apport = Object.values(this.searchFilter?.numericRefinements?.apport)[0][0]
    if(this.apport == undefined)
      this.apport = 0
    this.kilometrageAnnuel = this.searchFilter?.disjunctiveFacetsRefinements?.kilometres[0]
    if(this.apport >= 0 && this.kilometrageAnnuel && this.duree){
      this.offreUrl = this.offreUrl.replace(".html","") +'/'+ this.apport +'/'+ this.kilometrageAnnuel +'/'+ this.duree
    }
}

  open(infoContent) {
    this.modalService.open(infoContent, { size: 'lg' });
    if(this.filterLoyerChecked && this.apport >= 0 && this.kilometrageAnnuel && this.duree){
      this.index.search('', {
        facetFilters: [
          ["offreId:" + this.id],
          ["nbLoyer:" + this.duree],
          ["apport:" + this.apport],
          ["kilometres:" + this.kilometrageAnnuel],
        ],
      }).then(( hits ) => {
        this.res = hits.hits[0]
        if(this.res.nbHits== 0 || this.res.loa == false){
          this.text = 'Nous contacter du Lundi au vendredi de 9h00 à 18h30 le samedi de 09h à 17h.';
        }else{
          let duration = this.res.nbLoyer;
          let typ_financement = "LLD"
          let lib_financement = "Location longue durée";
          let option_achat="";
          let vehicule = this.res.marqueSlug + " " + this.res.modeleSlug + " " + this.res.motorisation.toUpperCase().replace(this.res.modeleSlug, "") + " " +this.res.finition
          let prixAssurance = (this.res.perte_totale + this.res.adiit)*(duration+1)
          
          this.text = 
              'Exemple à titre indicatif et sans valeur contractuelle pour une ' + lib_financement + ' (' + typ_financement + ' de ' + (duration+1) + ' mois et ' + this.res.kilometres +' km annuel avec un apport de ' + this.res.apport +' €, ' + (duration)+ ' loyers mensuels de '+ this.res.loyer_mensuel + ' € hors assurances facultatives. ' +
              'Montant total des ' + (duration)+ ' loyers : ' + this.financial(this.res.loyer_mensuel*duration) + ' €. ' +
              option_achat + 'pour ' + vehicule.toUpperCase() + '. Coût des assurances facultatives ADDIT(1) s\'ajoutant au loyer mensuel : ' + this.res.adiit + ' €/mois (2) ' +
              'et Perte Totale s\'ajoutant au loyer mensuel : ' + this.res.perte_totale + ' €/mois. ' +
              'Montant total dû au titre de l\'assurance sur la durée total de location : ' + this.financial(prixAssurance) + ' €. ' +
              'Offre de ' + lib_financement + '  ('+ typ_financement + '), réservée aux particuliers ou aux professionnels (selon conditions) proposée par ';

          let textBailleurLld = "Écureuil Service (filiale de Capitole Finance – Tofinso), SAS, Société par actions simplifiée au capital de 629000 euros, RCS Toulouse 444 599 971, n°ORIAS 14006395, dont le siège social est situé 2839 La Lauragaise BP 28208 31682 LABÈGE cedex"
          this.text = this.text +  textBailleurLld

          this.text = this.text + ' Assurance automobile tous risques de votre choix obligatoire, hors frais d\'entretien, hors frais d\'immatriculation et de carte grise'+
                ' Offre valable en France Métropolitaine. Sous réserve d\'acception de votre dossier par '+ textBailleurLld +' et après expiration du délai légal de rétractation' +
                '(1) PTIA-IT (Perte Totale et Irréversible d\'Autonomie - Incapacité de Travail). (2) Pour la '+ typ_financement + ' citée ci-dessus et pour un client de 40 ans assuré en Décès et Perte Totale et Irréversible d\'Autonomie. Le coût mensuel de l\'assurance dépend des garanties offertes, de l\'âge et des conditions de santé de l\'emprunteur. Renseignez-vous auprès du bailleur';
        }
        this.loading = false;
      });
    }else{
      this.service.getInfoLoyer(this.id).subscribe(data => {
        this.infoloyer[this.id] = data
        this.loading = false;
        this.text = this.infoloyer[this.id];
      })
    }
    return false;
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

}
