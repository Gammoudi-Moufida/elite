export class Devis {
    initDevis: InitDevis;
    generalInfo: GeneralInfo;
    carousel: Carousel;
    colors: Colors;
    choiceOptions: ChoiceOptions;
    seriesEquipment: SeriesEquipment;
    videoTesting: VideoTesting;
    reprise: RepriseData;
    simulationFinancement: SimulationFinancement;
    selleries : Selleries;
    delivery : Delivery;
    similarOffres : SimilarOffre;
    client : Client;
    isDevis: boolean;
    utmSource:string;
    utmMedium:string;
    lienOffre: string;
}
export class SimilarOffre {
  constructor(
    public id?: number,
    public category?: string,
    public photoUrl?: string,
  ){}
}
export class GeneralInfo {
    constructor(
      public type?: string,
      public typeLabel?: string,
      public dispo?: string,
      public eqIcones?: [],
      public finition?: string,
      public garantie?: string,
      public moteur?: string,
      public offer?: OfferObject,
      public prices?: PricesObject,
      public isExclusiveLOA?: boolean,
      public isOccasion?: boolean,
      public primeCasse?: boolean,
      public provenance?: string,
      public provenanceImg?: string,
      public reimbursement?: boolean,
      public marque?: string,
      public model?: string,
      public rent?: number,
      public title?: string,
      public textGuaranty?:string,
      public documentTitle?: string,
      public documentDescription?: string,
      public avantageFinalElastic?: string,
      public brandsWithLowDiscountAllowed?: string,
      public eurotaxId?: number,
      public offerAdvantageTILoa?: number,
      public livraisonLabel?: string,
      public offreOccasion?: offreOccasion,
      public text?: string,
      public titleH1?: string,
      public carouselDescription?: string,
      public eurotaxModelId?: number,
      public modelNomComplet?: string,
      public modelGroupeNiveau1?:string,
      public avisMoyenne?:number,
      public avisNote?:number,
      public nbrAvis?:number,
      public isNouveaute?:boolean,
      public label?:string,
      public proxautoLabel?:boolean,
      public occasionContent?:string,
    ) { }
  }
  export class InitDevis {
    constructor(
      public devis?: any,
      public is404?: boolean,
      public isStock?: boolean,
      public prices?: Price,
      public type?: string,
      public offerId?: number,
      public activeState?: boolean,
      public isVo?: boolean,
      public urlToModel?: string,
    ) { }
  }
  export class Client {
    constructor(
      public civility?: string,
      public firstname?: string,
      public lastname?: string,
      public mail?: string,
      public tel?: string,
      public postalCode?: string,
      public promoCode?: string,
      public newsletter?: boolean,
    ) { }
  }
  class Price {
    constructor(
      public Lease?: number,
      public VN?: number,
      public contributionProportion?: number,
      public fraisGravage?: number,
    ){}
  }
  class OfferObject {
    constructor(
      public nature?: number,
      public co2?: number,
      public dateArriveeStock?: string,
      public dateDebutGaranti?: string,
      public dateMiseEnCirculation?: string,
      public ecoTaxe?: number,
      public energieTextLong?: string,
      public energieTextShort?: string,
      public hasEmissionCo2?: boolean,
      public isPro?: number,
      public isStock?: boolean,
      public isUtilitaire?: boolean,
      public kilometrage?: number,
      public lettreCo2?: string,
      public libEco?: string,
      public libEcoBonus?: string,
      public maxDateCommande?: string,
      public maxDateLivraison?: string,
      public montantEcoBonusMalusWithoutCheck?: number,
      public prime?: boolean,
      public showPrice?: boolean,
      public typeEmissionCo2?: string,
      public valeurEmissionCo2?: string,
      public consoMixte?: string,
      public consoExtraUrbaine?: string,
      public consoUrbaine?: string,
      public couple?: string,
      public cylinderName?: string,
      public pollution?: string,
      public hauteur?: number,
      public largeur?: number,
      public longueur?: number,
      public nbCylindre?: number,
      public nbSiege?: number,
      public nbPorte?:number,
      public nbVitesseAvant?: number,
      public poidsVide?: number,
      public puissanceFiscale?: string,
      public puissanceHp?: string,
      public puissanceKw?: string,
      public referenceAutovista?: string,
      public typeVehicule?: number,
      public tyreFront?: string,
      public tyreRear?: string,
      public vitesseMax?: number,
      public volumeCoffreMax?: number,
      public volumeCoffreMin?: number,
      public volumeTechnique?: string,
      public zeroAcent?: string,
      public transmission?: string,
      public category?: string,
      public categoryNormalized?: string,
      public libTypeDocumentVente?: string,
      public energieNormalized?: string
    ) { }
  }

  export class offreOccasion {
    constructor(
      public annee?: string,
      public couleurExterieure?: string,
      public couleurInterieure?: string,
      public livraison?: string
    ) { }
  }
  export class PricesObject {
    constructor(
      public administrativePrice?: number,
      public avantageClient?: number,
      public catalog_price?: string,
      public elitePrice?: number,
      public offerPriceForFront?: number,
      public optionsCataloguePrice?: number,
      public price?: number,
      public priceLabel?: string,
      public tva?: number,
      public remiseOptions?: number,
      public fraisLivraison?: number,
      public totalPrice?: number,
      public reprise?: number,
      public repriseLabel?: string,
      public demandeReprise?: number,
      public identifiant?: number,
      public demandeReprisePrice?: number,
      public aideReprise?: number,
      public aideRepriseLabel?: string,
      public primeDeduite?: boolean,
      public priceOptionsOuvertes?: number,
      
    ) { }
  }

  export class Carousel {
    constructor(
      public tarif?: string,
      public images?: ImgObject[],
      public liens?: lienObject[],
      public imagesExtInt: string[] = [],
      public type?: string,
      public starterreImg?: boolean,
      public urlTo360Player?: string
      
    ) { }
  }

  export class Colors {
    constructor(
      public images?: ImgObject[],
      public selleries?: sellerieObject[],
      public selectedColor?: any,
      public selectedSellerie?: any,
      public textColor?: string,
      public textSellerie?: string,
      public type?: string,
      public isCheckedColor?: boolean,
      public isCheckedSellerie?: boolean,

    ) { }
  }

  export class ImgObject {
    constructor(
      public colorId?: number,
      public equip?: number,
      public imageColor?: string,
      public libelleColor?: string,
      public url?: string,
    ) { }
  }

  class lienObject {
    constructor(
      public libelle?: string,
      public url?: string,
    ) { }
  }

  export class ChoiceOptions {
    constructor(
      public contrats?: [],
      public fraisGravage?: number,
      public guarantees?: GuaranteeObject[],
      public guaranteeChoice?: GuaranteeObject,
      public options?: OptionObject[],
      public optionsSorted?: OptionSortedObject[],
      public requestType?: string,
      public societe?: string,
      public whitemark?: string,
      public urlWarantie?: any
    ) { }
  }

  export class GuaranteeObject {
    constructor(
      public id?: number,
      public prix?: string,
      public duree?: number,
      public selected?: boolean,
    ) { }
  }

  export class OptionObject {
    constructor(
      public id?: number,
      public equipId?: number,
      public categ?: string,
      public libelle?: string,
      public flagPack?: number,
      public packagedEquipements?: [],
      public referencePrixCatalogue?: number,
      public referencePrixVente?: number,
      public type?: number,
      public selected?: boolean,
      public tatoOption?: boolean,
    ) { }
  }
  class OptionSortedObject {
    constructor(
      public type?: string,
      public label?: string,
      public price?: number,
      public entity?: any,
    ) { }
  }

  export class SeriesEquipment {
    constructor(
      public equipementsSerie?: seriesEquipmentObject[],

    ) { }
  }

  class seriesEquipmentObject {
    constructor(
      public id?: number,
      public name?: string,
      public equipements?: equipementObject[],
    ) { }
  }
  class equipementObject {
    constructor(
      public idEquipement?: number,
      public idCategorie?: number,
      public descriptif?: string,
      public libCateg?: string,
    ) { }
  }

  export class VideoTesting {
    constructor(
      public marque?: string,
      public model?: string,
      public video?: string,
      
    ) { }
  }

  export class RepriseData {
    constructor(
      public repriseNonVisible?: boolean, 
      public showSimulationInput?: boolean, 
      public reprises?: repriseObject[], 
      public aDefauts?: DefaulsRepriseData[], 
      public simulationReprise?: any, 
      public aideRepriseSelected?: any, 
    ) { }
  }

  class repriseObject {
    constructor(
      public id?: number,
      public label?: string,
      public montant?: string,
      public createEstimationAction?: boolean,
      public primeDeduite?: boolean,
      public repriseNonVisible?: boolean,
      public selected?: boolean,
      public title?: string,
    ) { }
  }

  export class SimulationFinancement {
    constructor(
      public financements?: financementObject[],
      public isSelected?: boolean,
      
    ) { }
  }

  export class financementObject {
    constructor(
      public mensualite?: number,
      public totalAssurancesCheked?: number,
      public LmesualiteAvecAssurance?: number,
      public error?: string,
      public result?: resultFinancementObject,
      public selected?: boolean,
      public garantie?: boolean,
      
    ) { }
  }
  export class resultFinancementObject {
    constructor(
      public TAEG?: number,
      public apport?: number,
      public assurances?: assuranceObject[],
      public calculPack?: [],
      public coutInterets?: number,
      public coutTotal?: number,
      public duree?: number,
      public extensionGarantie?: number,
      public isExtensionGarantie?: boolean,
      public financementApiError?: number,
      public fraisDossier?: number,
      public fraisGravage?: number,
      public infos?: string,
      public kmPrevu?: number,
      public libelleApplicatif?: string,
      public mensualite?: number,
      public mensualiteAvecAssurance?: number,
      public mensualiteSansAssurance?: number,
      public mentionsLegales?: string,
      public message?: string,
      public montantAchat?: number,
      public montantAchatLOA?: number,
      public nbLoyers?: number,
      public nomFinancement?: string,
      public optionsPrices?: number,
      public pack?: boolean,
      public premierLoyer?: number,
      public prixCatalogue?: number,
      public prixOptions?: number,
      public tauxFraisDossier?: number,
      public tauxNominal?: number,
      public tauxValeurRachat?: number,
      public type?: string,
      public typeFinancement?: string,
      public valeurRachat?: number,
      public identification?: string,
    ) { }
  }

  class assuranceObject {
    constructor(
      public cap?: number,
      public creditPack?: number,
      public defaultChecked?: boolean,
      public infos?: string,
      public isChecked?: boolean,
      public lissee?: boolean,
      public mensualite?: number,
      public mentionsLegales?: string,
      public montant?: number,
      public name?: string,
      public obligatoire?: boolean,
      public taux?: number,
      public type?: typeObject,
      
    ) { }
  }

  class typeObject {
    constructor(
      public id?: number,
      public libelle?: string,
      
    ) { }
  }

  export class Selleries {
    constructor(
      public selleries?: sellerieObject[],
    ) { }
  }
  export class sellerieObject {
    constructor(
      public id?: number, 
      public colorId?: number, 
      public equip?: number, 
      public isOption?: boolean, 
      public label?: string, 
      public prices?: selleriePrice, 
      public thumbnail?: string, 
    ) { }
  }
  class selleriePrice {
    constructor(
      public oldprice?: number, 
      public oldsellprice?: number, 
      public price?: number, 
      public sellprice?: number, 
    ) { }
  }

  export class Delivery {
    constructor(
      public deliveryPartners?: deliveryPartners, 
      public partners?: any, 
      public selectedPartner?: any, 
      public partenaireType?: number, 
      public depName?: string, 
      public domicilePrice?: number, 
      public error?: number,
      public postalCode?: number,
    ) { }
  }
  export class deliveryPartners {
    constructor(
      public categorie?: string, 
      public codeDepartement?: string, 
      public codePostal?: string, 
      public departement?: string, 
      public detailOffreDelivery?: string, 
      public distance?: number, 
      public id?: number, 
      public libelle?: string, 
      public modeOp?: string, 
      public region?: string, 
      public tarif?: string, 
      public tarifNum?: number, 
    ) { }
  }

  export class resDevis {
    constructor(
      public devisId?: number,
      public prices?: Price,
      public hash?: string,
      public result?: number,
    ){}
  }

  export class CurrentUser {
    constructor(
      public id?: number, 
      public civility?: string, 
      public firstname?: string, 
      public lastname?: string, 
      public company?: string, 
      public tel?: string, 
      public adress?: string, 
      public postalCode?: string, 
      public city?: string, 
      public mail?: string, 
      public promoCode?: string, 
      public clubCard?: string, 
      public newsletter?: boolean, 
      public userIsConnected?: boolean, 
    ) { }
  }

  export class DefaulsRepriseData {
    constructor(
      public i_rub_id?: number, 
      public i_rub_zone_cliquable?: number, 
      public s_rub_libelle?: string, 
      public a_rub_elements?: RubsData[], 
    ) { }
  }

  export class RubsData {
    constructor(
      public i_ele_id?: number, 
      public f_ass_prix?: string, 
      public s_ele_libelle?: string, 
      public selected?: boolean, 
    ) { }
  }

  export class EstimationRepriseData {
    constructor(
      public accidente?: boolean, 
      public accord?: any, 
      public carburant?: string,  
      public carnetAJour?: boolean,  
      public casse?: boolean, 
      public chevauxDin?: number, 
      public couleurExterne?: string, 
      public couleurInterne?: string, 
      public dateMiseCirculation?: string, 
      public dateRentreePrevisionnelle?: string, 
      public finition?: string, 
      public idReprise?: number, 
      public identifiant?: number, 
      public image?: string, 
      public immatriculation?: string, 
      public importation?: boolean, 
      public kilometrage?: number, 
      public kilometrageGaranti?: boolean, 
      public kilometragePrev?: number, 
      public marque?: string, 
      public modeleCourt?: string, 
      public nbPorte?: number, 
      public peintureMetalisee?: boolean, 
      public premiereMain?: string, 
      public prix?: any, 
      public frais?: any[], 
      public infoSupplementaire?: InfoSupplementaireData[], 
      public erreur?: any, 
    ) { }
  }

  export class InfoSupplementaireData {
    constructor(
      public name?: string, 
      public value?: string, 
    ) { }
  }

  export class RepriseSelectedVehicule {
    constructor(
      public sMarque?: string,
      public iPrix?: string,
      public iNbPortes?: number,
      public sEnergie?: BasicObj,
      public imgUrl?: string,
      public dDateCatalogue?: string,
      public dDateMec?: string,
      public fHP?: string,
      public fKW?: string,
      public f_veh_typhp?: string,
      public i_veh_typseat?: number,
      public sTransType?: string,
      public sTypNatcode?: string,
      public sVersion?: string,
      public s_veh_typimpbegin?: string,
      public s_veh_typimpend?: string,
      public s_veh_typname?: string,
      public s_veh_typname2?: string,
    ) { }
  }

  export class RepriseVehiculeInfos {
    constructor(
      public backTyre?: number, 
      public carnetEntretien?: number, 
      public couleur?: string, 
      public courroie?: string, 
      public dDateMec?: string, 
      public fHP?: string, 
      public frontTyre?: number, 
      public iNbPortes?: number, 
      public immat?: string, 
      public importation?: number, 
      public km?: number, 
      public premiereMain?: number, 
      public sTransType?: string, 
      public sTypNatcode?: string, 
      public sVersion?: string, 
      public sellerie?: string, 
      public texture?: string, 
      public aOptions?: RepriseOptionObject[], 
      public client?: CurrentUser,
      public defauts?: string[], 
      public sEnergie?: BasicObj,
      public estimationRepriseData?: EstimationRepriseData,
      public natureOffre?: number,
    ) { }
  }


  export class BasicObj {
    constructor(
      public id?: string, 
      public name?: string, 
    ) { }
  }

  export class ImgObj {
    constructor(
      public imgUrl?: string, 
    ) { }
  }

  export class RepriseOptions {
    constructor(
      public aOption?: RepriseOptionObject[], 
      public aPack?: ReprisePackObject[], 
      public aPrestation?: any[], 
      public aSerie?: ReprisePackObject[], 
    ) { }
  }

  export class RepriseOptionObject {
    constructor(
      public iId?: number, 
      public ii_veq_addeqcoded?: number, 
      public i_veq_addflag?: number, 
      public i_veq_addflagpack?: number, 
      public i_veq_addid?: number, 
      public fPrix?: string, 
      public fPrixOld?: string, 
      public sCode?: string, 
      public sNom?: string, 
      public i_veq_categorie_option?: any, 
      public selected?: boolean, 
    ) { }
  }

  export class ReprisePackObject {
    constructor(
      public aContenu?: any[],
      public iId?: number, 
      public i_veq_addeqcode?: number, 
      public i_veq_addflag?: number, 
      public i_veq_addflagpack?: number, 
      public i_veq_addid?: number, 
      public fPrix?: string, 
      public fPrixOld?: string, 
      public sCode?: string, 
      public sNom?: string, 
      public i_veq_categorie_option?: any, 

    ) { }
  }