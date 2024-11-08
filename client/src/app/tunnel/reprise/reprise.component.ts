import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { BasicObj, DefaulsRepriseData, Devis, EstimationRepriseData, RepriseSelectedVehicule, RepriseVehiculeInfos } from '../devis';
import { RepriseEstimationPopupComponent } from '../reprise-estimation-popup/reprise-estimation-popup.component';
import { RepriseRecapPopupComponent } from '../reprise-recap-popup/reprise-recap-popup.component';
import { TunnelService } from '../tunnel.service';
import { RepriseDefectComponent } from '../reprise-defect/reprise-defect.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgStyle, NgClass, DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-reprise',
    templateUrl: './reprise.component.html',
    styleUrls: ['./reprise.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, NgStyle, NgClass, RepriseDefectComponent, DecimalPipe, NgOptimizedImage]
})
export class RepriseComponent implements OnInit {
  
  @Input() devis: Devis;
  @Output() repriseChosed = new EventEmitter();
  @Output() repriseSelected = new EventEmitter();
  @Output() repriseSimulationSelected = new EventEmitter<any>();
  @Output() repriseChanged = new EventEmitter();
  @Output() noRepriseSelected = new EventEmitter();
  @Output() modeSelected = new EventEmitter();
  @Output() aideRepriseSelected = new EventEmitter();
  @Output() repriseCollapseEvent = new EventEmitter<boolean>();

  gender: any
  exitRepriseValue: string = "0";
  vehiculeInfos: RepriseVehiculeInfos = new RepriseVehiculeInfos();
  reprises: any[];
  loaded: boolean = false;
  mode: number = 1;
  step: number = 1;
  selectedYear: number = 0;
  selectedMonth: string = "0";
  selectedVehicule: RepriseSelectedVehicule = null;
  firstOptions: boolean[] = [null, null, null, null];
  kilometrage: number = null;
  options: any[];
  selectedTexture: string = "";
  selectedExteriorColor: string = null;
  selectedInteriorColor: string = null;
  states: boolean[] = [false, false, false, false];
  ok: boolean = false;
  matricule: string = "";
  existReprise: boolean = true;
  estimationId: string = "";
  estimationMail: string = "";
  EstimationRepriseData = new EstimationRepriseData();
  reprise: EstimationRepriseData = new EstimationRepriseData();
  matriculeToFind: string = "";
  offreId: string;
  aDefauts: DefaulsRepriseData[];
  loader = false;
  showPopupReprise = false;
  showPopupClient = false;
  showSimulationInput: boolean = false;
  repriseNonVisible: boolean = false;
  aideReprise: number = 0;
  aideRepriseLabel: string = "";
  primeDeduite: boolean = false;
  marques: BasicObj[] = [];
  models: BasicObj[] = [];
  motorisations: BasicObj[] = [];
  finitions: BasicObj[] = [];
  vehicules: RepriseSelectedVehicule[] = [];
  selectedMarque: BasicObj = null;
  selectedModel: BasicObj = null;
  selectedMotorisation: BasicObj = null;
  selectedFinition: BasicObj = null;
  vehiculesByImmat: any[] = [];
  years: number[] = [];
  months: BasicObj[] = [
    { id: "01", name: 'Janvier' },
    { id: "02", name: 'Février' },
    { id: "03", name: 'Mars' },
    { id: "04", name: 'Avril' },
    { id: "05", name: 'Mai' },
    { id: "06", name: 'Juin' },
    { id: "07", name: 'Juillet' },
    { id: "08", name: 'Août' },
    { id: "09", name: 'Septembre' },
    { id: "10", name: 'Octobre' },
    { id: "11", name: 'Novembre' },
    { id: "12", name: 'Décembre' },
  ];

  externalColors = [
    {color:"#999894",label:"Gris Moyen"},
    {color:"#494949",label:"Gris foncé"},
    {color:"#487fb8",label:"Bleu Clair"},
    {color:"#0d3b77",label:"Bleu Foncé"},
    {color:"#0a0a0a",label:"Noir"},
    {color:"#f5f7f6",label:"Blanc"},
    {color:"#c32826",label:"Rouge"},
    {color:"#760e15",label:"Bordeaux"},
    {color:"#fed928",label:"Jaune"},
    {color:"#da8532",label:"Orange"},
    {color:"#8ab600",label:"Vert Clair"},
    {color:"#426b0d",label:"Vert Foncé"},
    {color:"#897262",label:"Marron Clair"},
    {color:"#2b1e16",label:"Marron Foncé"},
    {color:"#a29987",label:"Beige"}
  ]

  internalColors = [
    {color:"#0a0a0a",label:"Noir"},
    {color:"#e2e2e2",label:"Gris Clair"},
    {color:"#494949",label:"Gris foncé"},
    {color:"#897262",label:"Marron"},
    {color:"#a29987",label:"Beige"},
    {color:"#c32826",label:"Rouge"},
    {color:"#f5f7f6",label:"Blanc"}
  ]
  screenWidth: number;
  isManualEstimation: boolean = false;
  constructor(
    private service: TunnelService,
    private modalService: NgbModal,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.screenWidth = this.config.getWindow()?.innerWidth;
    let i = 0;
    let y = new Date().getFullYear();
    for (i = 0; i < 15; i++) {
      this.years.push(y - i);
    }
  }

  getBgInternalColor(index:number) {
    return this.internalColors[index].color
  }

  toggleWithReprise() {
    if (this.gender == "noReprise") {
      this.reset();
      this.noRepriseSelected.emit(false);
    }
    if (this.gender == "basicReprise") {
      this.setAddMode()
      this.noRepriseSelected.emit(true);
    }
    if (this.gender != "noReprise" && this.gender != "basicReprise") {
      this.selectReprise(this.gender)
      this.noRepriseSelected.emit(true);
    }
    this.modeSelected.emit(this.mode)
  }

  getEstimation() {
    if (!this.estimationId) {
      alert("Merci de saisir l'identifiant de votre estimation ");
      return;
    }
    if (!this.estimationMail) {
      alert("Merci de saisir l'e-mail de votre estimation ");
      return;
    }
    this.service.getEstimation(this.estimationId, this.estimationMail).subscribe(data => {
      if (data.erreur) {
        alert(data.erreur);
        return;
      }
      this.reprise = data;
      this.repriseSimulationSelected.emit(this.reprise);
    });
  }

  getVehiculesByImmat() {
    if (!this.matriculeToFind) {
      alert("Merci de saisir votre immatriculation");
      return;
    }
    this.service.getVehiculesByImmat(this.matriculeToFind).subscribe(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      this.vehiculesByImmat = data;
      this.vehiculesByImmat.forEach(data => {
        data.libVehicule = data['s_veh_makname'] + ' ' + data['s_veh_typname'] + ' ' + data['s_veh_typname2'] + ' (' + data['i_veh_typdoor'] + ' p.) ' + data['f_veh_typtaxhp'] + ' CV ' + data['f_veh_typhp'] + 'ch';
       
        var dateDebut1 = data['s_veh_typimpbegin']?.substr(4, 2) ? data['s_veh_typimpbegin']?.substr(4, 2) : "";
        var dateDebut2 = data['s_veh_typimpbegin']?.substr(0, 4) ? data['s_veh_typimpbegin']?.substr(0, 4) : "";

        var dateDebut = "" ;
        if(dateDebut1 && dateDebut2)
          dateDebut = dateDebut1 + '/' + dateDebut2;
        
        var dateFin1 = data['s_veh_typimpend']?.substr(4, 2) ? data['s_veh_typimpend']?.substr(4, 2) : "";
        var dateFin2 = data['s_veh_typimpend']?.substr(0, 4) ? data['s_veh_typimpend']?.substr(0, 4) : "";
        
        var dateFin =  "" ;
        if(dateFin1 && dateFin2)
          dateFin =  dateFin1  + '/' + dateFin2 ;
        
        data.dateVehicule = '[' + dateDebut + ' - ' + dateFin + ']';
      });
    });
  }

  choseVehicule(vbi: { s_veh_makname: any; libVehicule: any; f_veh_typtaxhp: any; s_veh_typnatcode: any; i_veh_typdoor: any; s_veh_typtxttranstypecd2lbl: any; s_veh_typname: any; s_veh_typname2: any; f_veh_typhp: any; s_veh_typtxtfueltypecd2: any; s_veh_typtxtfueltypecd2lbl: any; d_veh_date_mec: any; }) {
    this.selectedVehicule = {
      "sMarque": vbi.s_veh_makname,
      "sVersion": vbi.libVehicule,
      "fHP": vbi.f_veh_typtaxhp,
      "dDateCatalogue": "",
      "iPrix": "",
      "sTypNatcode": vbi.s_veh_typnatcode,
      "iNbPortes": vbi.i_veh_typdoor,
      "sTransType": vbi.s_veh_typtxttranstypecd2lbl,
      "s_veh_typname": vbi.s_veh_typname,
      "s_veh_typname2": vbi.s_veh_typname2,
      "f_veh_typhp": vbi.f_veh_typhp,
    };
    var sEnergie = { "id": vbi.s_veh_typtxtfueltypecd2, "name": vbi.s_veh_typtxtfueltypecd2lbl }
    this.selectVehicule(sEnergie, vbi.d_veh_date_mec);
  }

  selectVehiculeByCmb() {
    this.isManualEstimation = true;
    this.selectVehicule(this.selectedMotorisation, this.selectedYear + '-' + this.selectedMonth + '-01');
  }

  setExistReprise() {
    var exist = true
    if (this.exitRepriseValue == "0") {
      exist = true
    }
    if (this.exitRepriseValue == "1") {
      exist = false
    }
    this.existReprise = exist;
  }


  setAddMode() {
    this.aideReprise = 0;
    this.reset();
    this.mode = 2;
    this.repriseChanged.emit();
  }

  setListMode() {
    this.mode = 1;
    this.repriseSimulationSelected.emit();
  }

  preview() {
    if (this.step > 1)
      this.step--;
    else
      this.mode = 1;
  }

  existedEstimationChosen() {
    this.repriseChosed.emit();
  }

  next() {
    let fin = false;
    if (this.step < 9) {
      if (this.step == 1) {
        if (!this.selectedVehicule) {
          alert("Merci de sélectionner un véhicule");
          return;
        }
      }
      if (this.step == 2) {
        if (!this.kilometrage) {
          alert("Merci de saisir le kilométrage");
          return;
        }
        var verif = true;
        this.firstOptions.forEach(element => {
          if (element == null)
            verif = false;
        });
        if (!verif) {
          alert("Merci de remplir les champs : km, importation, première main et carnet d'entretien");
          return;
        }
      }
      if (this.step == 4) {
        if (!this.selectedExteriorColor) {
          alert("Merci de saisir une couleur extérieure");
          return;
        }
        if (!this.selectedInteriorColor) {
          alert("Merci de saisir une couleur intérieure");
          return;
        }
        if (!this.selectedTexture) {
          alert("Merci de saisir une texture");
          return;
        }
      }


      if (this.step == 6) {
        if (!this.states[0] && !this.states[1]) {
          alert("Merci de préciser l'usure de vos pneus avant");
          return;
        }
        if (!this.states[2] && !this.states[3]) {
          alert("Merci de préciser l'usure de vos pneus arrière");
          return;
        }
        this.matricule = this.matriculeToFind;
      }

      if (this.step == 7) {
        if (!this.ok) {
          alert("Merci d'accèpter la déclaration");
          return;
        }
        if (!this.matricule) {
          alert("Merci de saisir la matricule de votre véhicule");
          return;
        }
        var vehiculeInfos = new RepriseVehiculeInfos();
        vehiculeInfos.dDateMec = this.selectedVehicule.dDateMec;
        vehiculeInfos.fHP = this.selectedVehicule.fHP;
        vehiculeInfos.iNbPortes = this.selectedVehicule.iNbPortes;
        vehiculeInfos.sVersion = this.isManualEstimation ? this.selectedVehicule.sMarque + ' ' + this.selectedVehicule.sVersion  : this.selectedVehicule.sVersion;
        vehiculeInfos.sEnergie = this.selectedVehicule.sEnergie;
        vehiculeInfos.sTypNatcode = this.selectedVehicule.sTypNatcode;
        vehiculeInfos.sTransType = this.selectedVehicule.sTransType;
        vehiculeInfos.km = this.kilometrage;
        vehiculeInfos.importation = 0;
        vehiculeInfos.premiereMain = 0;
        vehiculeInfos.carnetEntretien = 0;
        vehiculeInfos.courroie = "non";
        if (this.firstOptions[0])
          vehiculeInfos.importation = 1;
        if (this.firstOptions[1])
          vehiculeInfos.premiereMain = 1;
        if (this.firstOptions[2])
          vehiculeInfos.carnetEntretien = 1;
        if (this.firstOptions[3])
          vehiculeInfos.courroie = "oui";

        vehiculeInfos.aOptions = [];
        this.options.forEach(element => {
          if (element.selected) {
            vehiculeInfos.aOptions.push(element.iId);
          }
        });
        vehiculeInfos.couleur = this.selectedExteriorColor;
        vehiculeInfos.sellerie = this.selectedInteriorColor;
        vehiculeInfos.texture = this.selectedTexture;
        vehiculeInfos.defauts = [];
        this.devis?.reprise?.aDefauts.forEach(area => {
          area.a_rub_elements.forEach(defaut => {
            if (defaut.selected)
              vehiculeInfos.defauts.push(area.i_rub_id + "|" + defaut.i_ele_id);
          });
        });
        vehiculeInfos.frontTyre = 0;
        vehiculeInfos.backTyre = 0;
        if (this.states[1])
          vehiculeInfos.frontTyre = 2;
        if (this.states[3])
          vehiculeInfos.backTyre = 2;
        vehiculeInfos.immat = this.matricule;
        vehiculeInfos.natureOffre = this.devis.generalInfo.offer.nature;
        this.vehiculeInfos = vehiculeInfos;
        this.openPopupClient();
        fin = true;
      }

      if (this.step == 8) {
        fin = true;
        this.repriseChosed.emit();
      }
      if (!fin)
        this.step++;
    }
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.selectedMonth = "0";
    this.selectedMarque = null;
    this.selectedModel = null;
    this.selectedMotorisation = null;
    this.selectedFinition = null;
    this.selectedVehicule = null;
    this.marques = [];
    this.models = [];
    this.motorisations = [];
    this.finitions = [];
    this.vehicules = [];
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.selectedMarque = null;
    this.selectedModel = null;
    this.selectedMotorisation = null;
    this.selectedFinition = null;
    this.selectedVehicule = null;
    if (month == "0")
      return;
    this.marques = [];
    this.models = [];
    this.motorisations = [];
    this.finitions = [];
    this.vehicules = [];
    this.service.getBrandList(this.selectedYear, this.selectedMonth).subscribe(data => {
      for (let key in data) {
        this.marques.push({ id: data[key], name: key });
      }
    });
  }

  selectMarque() {
    this.selectedModel = null;
    this.selectedMotorisation = null;
    this.selectedFinition = null;
    this.selectedVehicule = null;
    this.models = [];
    this.motorisations = [];
    this.finitions = [];
    this.vehicules = [];
    if (this.selectedMarque == null)
      return;
    this.service.getModelList(this.selectedYear, this.selectedMonth, this.selectedMarque).subscribe(data => {
      for (let key in data) {
        this.models.push({ id: data[key], name: data[key] });
      }
    });
  }

  selectModel() {
    this.selectedMotorisation = null;
    this.selectedFinition = null;
    this.selectedVehicule = null;
    this.motorisations = [];
    this.finitions = [];
    this.vehicules = [];
    if (this.selectedModel == null)
      return;
    this.service.getEnergie(this.selectedYear, this.selectedMonth, this.selectedMarque, this.selectedModel).subscribe(data => {
      for (let key in data) {
        this.motorisations.push({ id: key, name: data[key] });
      }
    });
  }

  selectMotorisation() {
    this.selectedFinition = null;
    this.selectedVehicule = null;
    this.finitions = [];
    this.vehicules = [];
    if (this.selectedMotorisation == null)
      return;
    this.service.getFinition(this.selectedYear, this.selectedMonth, this.selectedMarque, this.selectedModel, this.selectedMotorisation).subscribe(data => {
      for (let key in data) {
        this.finitions.push({ id: data[key], name: data[key] });
      }
    });
  }

  selectFinition() {
    this.selectedVehicule = null;
    this.vehicules = [];
    if (this.selectedFinition == null)
      return;
    this.service.getVehicule(this.selectedYear, this.selectedMonth, this.selectedMarque, this.selectedModel, this.selectedMotorisation, this.selectedFinition).subscribe(data => {
      this.vehicules = data;
    });
  }

  selectVehicule(energie: BasicObj, mec: string) {
    if (this.selectedVehicule == null)
      return;
    this.selectedVehicule.sEnergie = energie;
    this.selectedVehicule.dDateMec = mec;
    this.service.getVehiculePicture(this.selectedVehicule).subscribe(data => {
      this.selectedVehicule.imgUrl = data.imgUrl;
    });
    this.service.repriseGetOptions(this.selectedVehicule).subscribe(data => {
      data.aOption.forEach((element: { selected: boolean; }) => {
        element.selected = false;
      });
      this.options = data.aOption;
      this.next();
    });
  }

  selectReprise(reprise: { createEstimationAction: any; montant: string; label: string; primeDeduite: boolean; selected: boolean; }) {
    this.reset();
    if (reprise.createEstimationAction) {
      this.aideReprise = parseFloat(reprise.montant);
      this.aideRepriseLabel = reprise.label;
      this.primeDeduite = reprise.primeDeduite;
      this.mode = 2;
      this.aideRepriseSelected.emit(this.aideReprise)
    }
    else {
      reprise.selected = true;
      this.repriseSelected.emit(this.devis.reprise);
    } 
  }

  reset() {
    if (this.devis?.reprise && this.devis?.reprise?.reprises.length > 0) {
      this.devis?.reprise?.reprises.forEach(element => {
        element.selected = false;
      });
    }
  }

  toggleOption(option: { selected: boolean; }) {
    option.selected = !option.selected;
  }

  setExteriorColor(color: string) {
    this.selectedExteriorColor = color;
  }

  setInteriorColor(color: string) {
    this.selectedInteriorColor = color;
  }

  selectState(i: number) {
    this.states[i] = true;
    if (i == 0)
      this.states[1] = false;
    if (i == 1)
      this.states[0] = false;
    if (i == 2)
      this.states[3] = false;
    if (i == 3)
      this.states[2] = false;
  }

  toggleOk() {
    this.ok = !this.ok;
  }

  openPopupReprise() {
    const modalRef2 = this.modalService.open(RepriseRecapPopupComponent, { size: 'xl', scrollable: true });
    modalRef2.componentInstance.reprise = this.reprise;
  }

  closePopupReprise() {
    this.showPopupReprise = false;
  }

  openPopupClient() {
    const modalRef = this.modalService.open(RepriseEstimationPopupComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result) {
        this.loader = true;
        this.step++;
        this.vehiculeInfos.client = {};
        this.vehiculeInfos.client.civility = result.civility;
        this.vehiculeInfos.client.firstname = result.firstname;
        this.vehiculeInfos.client.lastname = result.lastname;
        if (result.postalCode) {
          this.vehiculeInfos.client.postalCode = result.postalCode;
        }
        if (result.tel) {
          this.vehiculeInfos.client.tel = result.tel;
        }
        if (result.mail) {
          this.vehiculeInfos.client.mail = result.mail;
        }
        if (result.promoCode) {
          this.vehiculeInfos.client.promoCode = result.promoCode;
        }
        this.vehiculeInfos.client.newsletter = result.newsletter;
        this.service.createEstimation(this.vehiculeInfos).subscribe(data => {
          this.reprise = data;
          this.vehiculeInfos.estimationRepriseData =  this.reprise
          this.runScript('form_reprise_sur_vente_succes');
          this.loader = false;
          this.repriseSimulationSelected.emit(this.vehiculeInfos);
        });
      }
    });
  }

  runScript(evName: string) {
    const script = this.config.getWindow().document.createElement('script');
    script.innerHTML  = `
    window.dataLayer = window.dataLayer || [];   
    window.dataLayer.push({
        "event" : "${evName}",
        "user_mail" : "`+this.vehiculeInfos.client.mail+`",
        "marque_vehicule_estime" : "`+this.reprise.marque+`",
        "modele_vehicule_estime" : "`+this.reprise.modeleCourt+`",
        "annee_vehicule_estime" : "`+this.reprise.dateMiseCirculation.split('-')[0]+`"
    });
 
    `;
    this.config.getWindow().document.getElementById('taggoogle').append(script);
  }

}
