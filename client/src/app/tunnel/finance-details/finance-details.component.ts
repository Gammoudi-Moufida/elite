import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { financementObject } from '../devis';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-finance-details',
    templateUrl: './finance-details.component.html',
    styleUrls: ['./finance-details.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, DecimalPipe]
})
export class FinanceDetailsComponent implements OnInit {
  @Input() financement: financementObject;
  @Output() assuranceSelected = new EventEmitter();
  isLOA: boolean;
  montantEmprunt: number;
  txtpremierLoyer: string;
  premierLoyer: number;
  txtMensualite: string;
  totalwithoutAssurance: number;
  totalWithAssurance: number;
  isLLD: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.updatePrices()
  }

  updatePrices(){
    this.financement.totalAssurancesCheked = 0;
    this.financement?.result?.assurances.forEach(assurance => {
      if(assurance.isChecked) {
       
        this.financement.totalAssurancesCheked = this.financement.totalAssurancesCheked + assurance.mensualite;
        this.assuranceSelected.emit(this.financement?.result?.assurances)
        
      }
    });

    if (this.financement.garantie){
      this.financement.totalAssurancesCheked = this.financement.totalAssurancesCheked + Number(this.financement.result.extensionGarantie);
      this.financement.result.isExtensionGarantie = true;
    }
    
    if (this.financement?.result?.typeFinancement == 'Leasing') {
      this.isLOA = true;
      this.txtMensualite = 'loyers';
      if(this.financement?.result?.type == 'lld')
        this.isLLD = true;
    }
    else {
      this.isLOA = false;
      this.txtMensualite = 'mensualités';
    }

    this.montantEmprunt = this.financement?.result?.montantAchat;

      if (this.financement?.result?.apport == 0) {
        this.premierLoyer = this.financement?.result?.mensualiteSansAssurance;
        this.txtpremierLoyer = "1er loyer (hors assurance) :";
      }
      else {
        this.premierLoyer = this.financement?.result?.apport;
        this.txtpremierLoyer = "1er mois (votre apport) :";
        this.montantEmprunt = this.financement?.result?.montantAchat - this.financement?.result?.apport;
      }

      this.totalwithoutAssurance = (this.financement?.result?.mensualite * this.financement?.result?.duree);
      if (this.isLOA) {
        this.totalwithoutAssurance = (this.financement?.result?.mensualiteSansAssurance * this.financement?.result?.duree) + this.financement?.result?.apport + this.financement?.result?.valeurRachat;
      }

      this.financement.LmesualiteAvecAssurance = this.financement?.result?.mensualiteSansAssurance + this.financement.totalAssurancesCheked;
  
      this.totalWithAssurance = ( this.financement.LmesualiteAvecAssurance * this.financement?.result?.duree);
      if (this.isLOA) {
        this.totalWithAssurance = ( this.financement.LmesualiteAvecAssurance * this.financement?.result?.duree) + this.financement?.result?.apport + this.financement?.result?.valeurRachat; 
      }
  }

}
