import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { CurrentUser, Devis } from '../devis';
import { TunnelService } from '../tunnel.service';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass]
})
export class ReservationComponent implements OnInit {
  reservationForm: UntypedFormGroup;
  submitted: boolean;
  noNewsletter: boolean;
  @Input() devis: Devis;
  @Input() message: any;
  @Input() totalPrice: number;
  @Input() tvaPrice: number;
  @Input() isLoadedSave: boolean;
  @Output() submitFormReservationAction = new EventEmitter<any>(); 
  @Output() emptyRedirectEvent = new EventEmitter<string>(); 
  
  currentUser = new CurrentUser();
  imgUrl: any;
  constructor(
    private formBuilder: UntypedFormBuilder, 
    private service: TunnelService, 
    public activeModal: NgbActiveModal, 
    private config: ConfigService
  ) { 
    this.reservationForm = this.formBuilder.group({
      civility: ['Mr'],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      company: [null],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("[0-9]{5}$")]],
      tel: ['', [Validators.required, Validators.pattern("^0[0-9]{9}$")]],
      mail: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      promoCode: [null],
      clubCard: [null],
      newsletter: [false]
    });
  }
  

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.service.getUser().subscribe(data => {
      this.currentUser.userIsConnected = data.userIsConnected;
      if (this.currentUser.userIsConnected) {
        this.reservationForm.get('civility').setValue(data.civility);
        this.reservationForm.get('firstname').setValue(data.firstname);
        this.reservationForm.get('lastname').setValue(data.lastname);
        this.reservationForm.get('company').setValue(data.company);
        this.reservationForm.get('adress').setValue(data.adress);
        this.reservationForm.get('city').setValue(data.city);
        this.reservationForm.get('postalCode').setValue(this.zipCodeFormatter(data.postalCode) );
        this.reservationForm.get('mail').setValue(data.mail);
        this.reservationForm.get('tel').setValue(data.tel);
        this.reservationForm.get('newsletter').setValue(data.newsletter);
        this.reservationForm.get('promoCode').setValue(data.promoCode);
        this.reservationForm.get('clubCard').setValue(data.clubCard);
      }else if(this.devis?.reprise?.simulationReprise){
        this.currentUser = this.devis?.reprise?.simulationReprise?.client
        this.reservationForm.get('civility').setValue(this.currentUser.civility);
        this.reservationForm.get('firstname').setValue(this.currentUser.firstname);
        this.reservationForm.get('lastname').setValue(this.currentUser.lastname);
        this.reservationForm.get('postalCode').setValue(this.zipCodeFormatter(this.currentUser.postalCode));
        this.reservationForm.get('mail').setValue(this.currentUser.mail);
        this.reservationForm.get('tel').setValue(this.currentUser.tel);
        }
    });
  }
  zipCodeFormatter(zip: string) {
    let newZipCode = zip;
    if (newZipCode.length == 4 ){
      newZipCode = '0' + newZipCode
    }
    return newZipCode
  }

  get f() { return this.reservationForm.controls; }

  runScript(evName: string) {
    const script = this.config.getWindow().document.createElement('script');

    if(evName == "form_reservation_submit"){
      script.innerHTML  = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "event": "${evName}"
      });
      `;
    }
    let dispo = this.devis.generalInfo.dispo
    if(this.devis.generalInfo.dispo == "En stock") dispo = "Disponible"

    let financement : any
    financement = this.devis?.simulationFinancement?.financements.find(el => el.selected) ? this.devis.simulationFinancement.financements.find(el => el.selected) : "Sans"
    financement = financement?.result?.nomFinancement ? financement?.result?.nomFinancement : "Sans" 
    let frais = this.devis?.generalInfo?.prices?.fraisLivraison > 0 ? this.devis?.generalInfo?.prices?.fraisLivraison : 0

    let annee = this.devis.generalInfo.offreOccasion?.annee ? this.devis.generalInfo.offreOccasion?.annee : "" 

    if (evName == "form_reservation_succes") {
      script.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          "event": "${evName}",
          "user_mail": "${this.reservationForm?.value.mail}",
          "code_promo": "${this.reservationForm?.value.promoCode}",
          "marque_vehicule": "${this.devis?.generalInfo?.marque}",
          "modele_vehicule": "${this.devis?.generalInfo?.model}",
          "annee_vehicule": "${annee}",
          "fournisseur_vehicule": "${this.devis?.choiceOptions?.societe}",
          "category_vehicule": "${this.devis?.generalInfo?.offer?.categoryNormalized}",
          "motorisation_vehicule": "${this.devis?.generalInfo?.moteur}",
          "finition_vehicule": "${this.devis?.generalInfo?.finition.charAt(0).toUpperCase() + this.devis?.generalInfo?.finition.slice(1).toLocaleLowerCase()}",
          "disponibilite_vehicule": "${dispo}",
          "type_financement": "${financement}",
          "price_vehicule": ${this.totalPrice}
        });
    
        window.dataLayer.push({
          event: "purchase",
          ecommerce: {
            transaction_id: "${this.devis.initDevis.offerId}",
            value: ${this.totalPrice},
            tax: ${this.tvaPrice},
            shipping: ${frais},
            currency: "EUR",
            coupon: "${this.reservationForm.value.promoCode}",
            items: [{
              item_name: "${this.devis.generalInfo.marque} | ${this.devis.generalInfo.model}",
              item_brand: "${this.devis.choiceOptions?.societe}",
              item_category: "${this.devis.generalInfo.offer.categoryNormalized}",
              item_category2: "${this.devis.generalInfo.moteur}",
              item_category3: "${this.devis.generalInfo.finition.charAt(0).toUpperCase() + this.devis.generalInfo.finition.slice(1).toLocaleLowerCase()}",
              item_category4: "${dispo}",
              item_category5: "${annee}",
              item_variant: "${financement}",
              price: ${this.totalPrice},
              quantity: 1
            }]
          }
        });
      `;
    }
  
  if(script){
    this.config.getWindow().document.getElementById('taggoogle').append(script);
  }
  }

  generateTrackingEvent(id) {
    const eventData  = {
        event: 'add_to_cart',
        send_to: 'AW-1025404699',
        items: [{
          id: id,
          google_business_vertical: 'retail'
        }] 
    };
    const eventDataJSON  = JSON.stringify(eventData, null, 2);
    const trackingScript = this.config.getWindow().document.createElement('script');
    trackingScript.text = `gtag(${eventDataJSON});`;
    this.config.getWindow().document.body.appendChild(trackingScript);
  }

  onSubmit() {
    this.runScript("form_reservation_submit");
    this.submitted = true;
    if (this.noNewsletter) {
      this.reservationForm.value.newsletter = true
    } else {
      this.reservationForm.value.newsletter = false
    }
    if (this.reservationForm.valid) {
      this.runScript('form_reservation_succes');
      this.generateTrackingEvent(this.devis.initDevis.offerId)
      this.reservationForm.value.postalCode = +this.reservationForm.value.postalCode;
       this.devis.client = this.reservationForm.value
       this.submitFormReservationAction.emit(this.devis.client)
       this.isLoadedSave = true
    }
  }

  toggleNewsletter() {
    this.noNewsletter = !this.noNewsletter;
  }

  closeModal() {
    this.activeModal.close();
  }

  emptyRedirect(type:string){
    this.activeModal.close()
    this.emptyRedirectEvent.emit(type)
  }

}
