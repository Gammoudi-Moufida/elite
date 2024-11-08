import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasicObj } from 'src/app/tunnel/devis';
import { TunnelService } from 'src/app/tunnel/tunnel.service';
import { ConfigService } from 'src/app/shared/config/config.service';
import { RepriseService } from '../../reprise.service';
import { EstimationRepriseData, RepriseSelectedVehicule, RepriseVehiculeInfos } from '../../reprise';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estimation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent {
  selectedYear: number = 0;
  selectedMonth: string = "0";
  selectedVehicule: RepriseSelectedVehicule = null;
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
  marques: BasicObj[] = [];
  models: BasicObj[] = [];
  motorisations: BasicObj[] = [];
  finitions: BasicObj[] = [];
  vehicules: RepriseSelectedVehicule[] = [];
  selectedMarque: BasicObj = null;
  selectedModel: BasicObj = null;
  selectedMotorisation: BasicObj = null;
  selectedFinition: BasicObj = null;

  kilometrage: number = null;
  firstOptions: boolean[] = [null, null];
  screenWidth: number;
  submitted: boolean = false;
  registerForm: FormGroup;
  options: any[];
  step3: boolean = false;
  step2: boolean = false;

  @Output() selectedCarEvent = new EventEmitter();
  @Output() stepperEvent = new EventEmitter();
  @Output() repriseSimulationSelected = new EventEmitter<any>();
  reprise: EstimationRepriseData = new EstimationRepriseData();
  vehiculeInfos: RepriseVehiculeInfos = new RepriseVehiculeInfos();

  matriculeToFind: string = "";
  vehiculesByImmat: any[] = [];
  automaticEstimationSelected: boolean = false;
  hideStep1: boolean = false;
  loading: boolean = false;
  isManualEstimation: boolean = false;
  automaticSelectedModel: string = "";
  constructor(
    private service: TunnelService,
    private config: ConfigService,
    private formBuilder: FormBuilder,
    private serviceReprise: RepriseService,
    private location: Location
  ) {
    this.registerForm = this.formBuilder.group({
      civility: [''],
      firstname: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("[0-9]{5}$")]],
      tel: ['', [Validators.required, Validators.pattern("^0[0-9]{9}$")]],
      mail: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]]
    });
  }
  ngOnInit(): void {
    this.screenWidth = this.config.getWindow()?.innerWidth;
    let i = 0;
    let y = new Date().getFullYear();
    for (i = 0; i < 15; i++) {
      this.years.push(y - i);
    }

    if (this.location.getState()) {
      let state = this.location.getState()
      Object.keys(state).forEach(el => {
        if (el == 'selectedYear') {
          this.selectedYear = state[el]
        } else if (el == 'selectedMonth') {
          this.selectedMonth = state[el]
        } else if (el == 'selectedMark') {
          this.selectedMarque = state[el]
          this.marques.push(this.selectedMarque)
        } else if (el == 'selectedModel') {
          this.selectedModel = state[el]
          this.models.push(this.selectedModel)
        }
        if (el == 'validImmatriculation'){
          this.matriculeToFind = state[el];
          this.getVehiculesByImmat()
        }
      })
    }

    if (this.selectedModel) {
      this.selectModel()
      return;
    } else if (this.selectedMarque) {
      this.selectMarque()
      return;
    } else if (this.selectedMonth) {
      this.selectMonth(this.selectedMonth)
      return;
    } else if (this.selectedYear) {
      this.selectYear(this.selectedYear)
      return;
    }

  }
  get f() { return this.registerForm.controls; }
  getVehiculesByImmat() {
    if (!this.matriculeToFind) {
      alert("Merci de saisir votre immatriculation");
      return;
    }
    this.serviceReprise.getVehiculesByImmat(this.matriculeToFind).subscribe(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      this.vehiculesByImmat = data;
      this.vehiculesByImmat.forEach(data => {
        this.automaticSelectedModel = data['s_veh_modname'] ? data['s_veh_modname'] : data['s_veh_modname2'];
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
    this.automaticEstimationSelected = true;
    this.selectVehicule(sEnergie, vbi.d_veh_date_mec);
    this.config.getWindow().document.getElementById('step2').scrollIntoView({ behavior: "smooth", block: "start" });
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
    this.selectedFinition.id = (this.selectedFinition?.id?.length > 0) ? this.selectedFinition?.id : " ";
    this.serviceReprise.getVehicule(this.selectedYear, this.selectedMonth, this.selectedMarque, this.selectedModel, this.selectedMotorisation, this.selectedFinition).subscribe(data => {
      this.vehicules = data;
    });
  }

  selectVehicule(energie: BasicObj, mec: string) {
    if (this.selectedVehicule == null)
      return;
    else {
      this.step2 = true;
      // this.stepperEvent.emit(25);
    }
    this.selectedVehicule.sEnergie = energie;
    this.selectedVehicule.dDateMec = mec;
    this.next();
  }

  selectVehiculeByCmb() {
    this.isManualEstimation = true;
    this.selectVehicule(this.selectedMotorisation, this.selectedYear + '-' + this.selectedMonth + '-01');
  }

  next() {
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
    vehiculeInfos.sImage = this.selectedVehicule.sImage;
    if (this.firstOptions[0])
      vehiculeInfos.premiereMain = 1;
    if (this.firstOptions[1])
      vehiculeInfos.carnetEntretien = 1;
    this.vehiculeInfos = vehiculeInfos;

    this.serviceReprise.createEstimation( vehiculeInfos.sTransType,vehiculeInfos.sTypNatcode,vehiculeInfos.iNbPortes, vehiculeInfos.carnetEntretien, vehiculeInfos.courroie, vehiculeInfos.dDateMec,
        vehiculeInfos.fHP, vehiculeInfos.importation, vehiculeInfos.km,
        vehiculeInfos.premiereMain ,  vehiculeInfos.sTransType, vehiculeInfos.sTypNatcode , vehiculeInfos.sVersion , vehiculeInfos.sEnergie, null,null,"rapide-",null).subscribe(
      async data => {
        this.reprise =  JSON.parse(data);
        this.vehiculeInfos.estimationRepriseData = this.reprise
        if (this.vehiculeInfos.estimationRepriseData && this.automaticEstimationSelected) {
          this.hideStep1 = true;
        }
        await this.delay(200);
        if (this.config.getWindow().document.getElementById('step3') && this.step2)
          this.config.getWindow().document.getElementById('step3').scrollIntoView({ behavior: "smooth", block: "center" });

        this.repriseSimulationSelected.emit(this.vehiculeInfos);

      })


  }
  gotToStep4() {
    if (this.kilometrage == null || this.firstOptions[0] == null || this.firstOptions[1] == null) {
      alert("Merci de remplir les champs : km, première main et carnet d'entretien");
      return;
    } else if (this.kilometrage != null && this.kilometrage < 0) {
      alert("Kilométrage invalide");
      return;
    } else {
      this.serviceReprise.setInfoToPrepareEstimate(this.reprise.idReprise, this.kilometrage, this.firstOptions[0], this.firstOptions[1]).subscribe(
        async data => {
          if (data) {
            this.step3 = true
            this.stepperEvent.emit(50);

            await this.delay(200);
            if (this.config.getWindow().document.getElementById('step4') && this.step3)
              this.config.getWindow().document.getElementById('step4').scrollIntoView({ behavior: "smooth", block: "center" });

          }
        })
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  runScript(evName: string) {

    const script = this.config.getWindow().document.createElement('script');
    const model_lib = this.selectedModel?.name ? this.selectedModel?.name : this.automaticSelectedModel;
    if(evName == "form_estimation_submit"){
    script.innerHTML  = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          "event": "${evName}"
      });
    `;
  }

    if(evName == "form_estimation_succes"){
    script.innerHTML  = `
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        "event": "${evName}",
        "user_mail": "`+this.registerForm.value.mail+`",
        "marque_vehicule_estime": "`+this.selectedVehicule?.sMarque.charAt(0).toUpperCase() + this.selectedVehicule?.sMarque.toLowerCase().slice(1)+`",
        "modele_vehicule_estime": "`+model_lib+`",
        "annee_vehicule_estime": "`+this.selectedVehicule?.dDateMec.split("-")[0]+`"
    });
    `;
  }
    this.config.getWindow().document.getElementById('taggoogle').append(script);
  }

  onSubmit() {
    this.runScript('form_estimation_submit');
    this.submitted = true;
    if (this.registerForm.valid) {
      this.runScript('form_estimation_succes');
      this.loading = true;
      this.stepperEvent.emit(75);
      this.serviceReprise.setCoordonnees(
        this.reprise.idReprise, this.registerForm.value.civility, this.registerForm.value.firstname,
        this.registerForm.value.postalCode, this.registerForm.value.tel, this.registerForm.value.mail, 1, ''
      ).subscribe(
        data => {
          if(data.status == 1){
            this.loading = false;
            this.selectedCarEvent.emit(this.selectedVehicule);
          }
        })
    }
  }
}
