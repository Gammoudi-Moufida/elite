import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { CurrentUser, Devis } from '../devis';
import { TunnelService } from '../tunnel.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf]
})
export class ClientComponent implements OnInit {
  registerForm: UntypedFormGroup;
  submitted: boolean = false;
  noNewsletter: boolean;
  @Input() devis: Devis;
  @Input() isLoadedSave: boolean;
  @Output() submitFormClientAction = new EventEmitter<any>(); 
  currentUser = new CurrentUser();
  imgUrl: string;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private service: TunnelService, 
    public activeModal: NgbActiveModal, 
    private config: ConfigService
  ) {
    
    this.registerForm = this.formBuilder.group({
      civility: ['Mr'],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("[0-9]{5}$")]],
      tel: ['', [Validators.required, Validators.pattern("^0[0-9]{9}$")]],
      mail: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      promoCode: [null],
      newsletter: [false]
    });
   }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.service.getUser().subscribe(data => {
      this.currentUser.userIsConnected = data.userIsConnected;
      if (this.currentUser.userIsConnected) {
        this.registerForm.get('civility').setValue(data.civility);
        this.registerForm.get('firstname').setValue(data.firstname);
        this.registerForm.get('lastname').setValue( data.lastname);
        this.registerForm.get('postalCode').setValue(this.zipCodeFormatter(data.postalCode));
        this.registerForm.get('mail').setValue(data.mail);
        this.registerForm.get('tel').setValue(data.tel);
        this.registerForm.get('newsletter').setValue(data.newsletter);
        this.registerForm.get('promoCode').setValue(data.promoCode);
      }else if(this.devis?.reprise?.simulationReprise){
        this.currentUser = this.devis?.reprise?.simulationReprise?.client
        this.registerForm.get('civility').setValue(this.currentUser.civility);
        this.registerForm.get('firstname').setValue(this.currentUser.firstname);
        this.registerForm.get('lastname').setValue(this.currentUser.lastname);
        this.registerForm.get('postalCode').setValue(this.zipCodeFormatter(this.currentUser.postalCode));
        this.registerForm.get('mail').setValue(this.currentUser.mail);
        this.registerForm.get('tel').setValue(this.currentUser.tel);
        }
    });
  }
  get f() { return this.registerForm.controls; }

  runScript(evName: string) {
    const script = this.config.getWindow().document.createElement('script');

    if (evName == "form_offre_gratuite_submit") {
        script.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                "event": "${evName}"
            });
        `;
    }

    if (evName == "form_offre_gratuite_succes") {
        script.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                "event": "${evName}",
                "user_mail": "${this.registerForm.value.mail}",
                "code_promo": "${this.registerForm.value.promoCode}"
            });
        `;
    }
    
    this.config.getWindow().document.getElementById('taggoogle').append(script);
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
    this.runScript('form_offre_gratuite_submit');
    this.submitted = true;
    if (this.noNewsletter) {
      this.registerForm.value.newsletter = true
    } else {
      this.registerForm.value.newsletter = false
    }
    if (this.registerForm.valid) {
      this.runScript('form_offre_gratuite_succes');
      this.generateTrackingEvent(this.devis.initDevis.offerId)
      this.registerForm.value.postalCode = +this.registerForm.value.postalCode;
      this.devis.client = this.registerForm.value
      this.submitFormClientAction.emit(this.devis.client)
      this.isLoadedSave = true
    }
  }
  toggleNewsletter() {
    this.noNewsletter = !this.noNewsletter;
  }

  zipCodeFormatter(zip: string) {
    let newZipCode = zip;
    if (newZipCode.length == 4 ){
      newZipCode = '0' + newZipCode
    }
    return newZipCode
  }

  closeModal() {
    this.activeModal.close();
  }

}
