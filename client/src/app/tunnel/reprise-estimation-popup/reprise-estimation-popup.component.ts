import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrentUser } from '../devis';
import { TunnelService } from '../tunnel.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
    selector: 'app-reprise-estimation-popup',
    templateUrl: './reprise-estimation-popup.component.html',
    styleUrls: ['./reprise-estimation-popup.component.css'],
    standalone: true,
    imports: [NgIf, NgbAlertModule, FormsModule]
})
export class RepriseEstimationPopupComponent implements OnInit {
  
  offreId: string = "";
  message: string = "";
  currentUser: CurrentUser = new CurrentUser()

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TunnelService,
    public activeModal: NgbActiveModal,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.currentUser.civility = "Mr";
    this.currentUser.newsletter = false;
    this.offreId = this.activatedRoute.snapshot.paramMap.get("offreId");
    this.service.getUser().subscribe(data => {
      this.currentUser.userIsConnected = data.userIsConnected;
      if (this.currentUser.userIsConnected) {
        this.currentUser.id = data.id;
        this.currentUser.civility = data.civility;
        this.currentUser.firstname = data.firstname;
        this.currentUser.lastname = data.lastname;
        this.currentUser.company = data.company;
        this.currentUser.tel = data.tel;
        this.currentUser.adress = data.adress;
        this.currentUser.postalCode = data.postalCode;
        this.currentUser.city = data.city;
        this.currentUser.mail = data.mail;
        this.currentUser.promoCode = data.promoCode;
        this.currentUser.clubCard = data.clubCard;
        this.currentUser.newsletter = data.newsletter;
      }
    });
  }

  setMessage(msg: string) {
    this.message = msg;
  }

  verif() {
    this.message = "";
    if (this.currentUser.lastname == "") {
      this.message = "Veuillez rentrer votre nom";
      return false;
    }

    if (this.currentUser.firstname == "") {
      this.message = "Veuillez rentrer votre prénom";
      return false;
    }

    if (this.currentUser.postalCode == "") {
      this.setMessage("Veuillez rentrer le code postal");
      return false;
    }

    if (!/^[0-9]{5}$/.test(this.currentUser.postalCode)) {
      this.setMessage("Veuillez rentrer un code postal valide");
      return false;
    }

    if (this.currentUser.mail == "") {
      this.message = "Veuillez rentrer votre adresse email";
      return false;
    }

    if (!this.testMail(this.currentUser.mail)) {
      this.setMessage("Veuillez rentrer adresse email valide");
      return false;
    }

    if (this.currentUser.tel == "") {
      this.message = "Veuillez rentrer votre N° de tél !";
      return false;
    }

    if ((!/^[0-9]{9}$/.test(this.currentUser.tel)) && (!/^[0-9]{10}$/.test(this.currentUser.tel))) {
      this.setMessage("Veuillez rentrer un N° de tél valide");
      return false;
    }
    return true;
  }

  testMail(mail: string) {
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
    return (reg.test(mail));
  }

  runScript(evName: string) {
    const script = this.config.getWindow().document.createElement('script');

    script.innerHTML  = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          "event": "${evName}"
      });
    `;
    this.config.getWindow().document.getElementById('taggoogle').append(script);
  }

  passBack() {
    this.runScript('form_reprise_sur_vente_submit');
    if (!this.verif()) {
      return;
    } else {
      this.activeModal.close(this.currentUser);
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
