import { Component, Input, OnInit } from '@angular/core';
import { Devis } from '../devis';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, UpperCasePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-informations',
    templateUrl: './informations.component.html',
    styleUrls: ['./informations.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, UpperCasePipe, DecimalPipe]
})
export class InformationsComponent implements OnInit {
  
  @Input()  devis: Devis; 
  isClosedCollapse = true;
  constructor() { }

  ngOnInit(): void {
  }

}
