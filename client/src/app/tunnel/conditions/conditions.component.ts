import { Component, Input, OnInit } from '@angular/core';
import { Devis } from '../devis';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class ConditionsComponent implements OnInit {

  @Input()  devis: Devis; 
  textMiseEncirculation : string = '';
  textReserve : string = '';
  constructor() { }

  ngOnInit(): void {
  }

  getTextMiseEncirculation() {
    if (this.devis?.generalInfo?.offer?.typeVehicule == 2) {
      this.textMiseEncirculation = 'Véhicule fiscalement neuf';
      if (this.devis?.generalInfo?.offer?.dateMiseEnCirculation != null)
        this.textMiseEncirculation += ' immatriculé depuis ' + this.devis?.generalInfo?.offer?.dateMiseEnCirculation;
      else
        this.textMiseEncirculation += ' avec une première immatriculation';
    }
    else if (this.devis?.generalInfo?.offer?.typeVehicule == 3) {
      if(this.devis?.generalInfo?.type == 'occasion'){
        this.textMiseEncirculation = 'Véhicule d\'occasion immatriculé';
      }else{
        this.textMiseEncirculation = 'Véhicule de direction immatriculé';
      }
      if (this.devis?.generalInfo?.offer?.dateMiseEnCirculation)
        this.textMiseEncirculation += ' depuis le ' + this.devis?.generalInfo?.offer?.dateMiseEnCirculation;
      if (this.devis?.generalInfo?.offer?.kilometrage)
        this.textMiseEncirculation += ' livré avec ' + this.devis?.generalInfo?.offer?.kilometrage + ' km';
    }

    return this.textMiseEncirculation;
  }

  getTextReserve() {
    if (this.devis?.generalInfo?.type == 'new') {
      if (this.devis?.generalInfo?.offer?.isPro)
        this.textReserve = "<b>Offre réservée aux professionnels.</b> <br /> Pièces à fournir obligatoirement : KBIS français de - de 3 mois, Pièce d'identité du dirigeant.";
      else
        this.textReserve = "<b> Offre réservée aux particuliers. <b>";
    }
    else if (this.devis?.generalInfo?.type == 'utility') {
      this.textReserve = "<b>Offre réservée aux professionnels.</b> <br /> Sont exclus les loueurs, professionnels de l'automobile et les taxis.  Pièces à fournir obligatoirement : KBIS français de - de 3 mois, Pièce d'identité du dirigeant.";
    }

    return this.textReserve;
  }

}
