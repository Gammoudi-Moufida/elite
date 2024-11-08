import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Devis } from '../devis';
import { ConditionsComponent } from '../conditions/conditions.component';
import { NgIf, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-offre-details',
    templateUrl: './offre-details.component.html',
    styleUrls: ['./offre-details.component.css'],
    standalone: true,
    imports: [NgIf, ConditionsComponent, DecimalPipe]
})
export class OffreDetailsComponent implements OnInit {

  @Input()  devis: Devis;
  @Input()  totalPrice: number;
  @Input()  elitePrice: number; 
  @Input()  tvaPrice: number;
  @Input()  ttcPrice: number;
  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
