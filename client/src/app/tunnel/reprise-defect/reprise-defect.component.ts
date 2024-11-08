import { Component, Input, OnInit } from '@angular/core';
import { Devis } from '../devis';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-reprise-defect',
    templateUrl: './reprise-defect.component.html',
    styleUrls: ['./reprise-defect.component.css'],
    standalone: true,
    imports: [NgFor, NgClass, NgbPopoverModule]
})
export class RepriseDefectComponent implements OnInit {

  @Input() devis: Devis;  
  public selectedPane: any = null;
  public selectedPaneIndex: number = -1;


  public listDataZoneLeft = [
    { id: '8', name: 'gauche_porte_av' },
    { id: '6', name: 'gauche_porte_ar' },
    { id: '4', name: 'gauche_aile_av' },
    { id: '2', name: 'gauche_aile_ar' },
    { id: '15', name: 'gauche_bas_porte_av' },
    { id: '19', name: 'gauche_jante_av' },
    { id: '17', name: 'gauche_jante_ar' },
    { id: '22', name: 'gauche_retroviseur' }
  ]

  public listDataZoneRight = [
    { id: '7', name: 'droite_porte_av' },
    { id: '5', name: 'droite_porte_ar' },
    { id: '3', name: 'droite_aile_av' },
    { id: '1', name: 'droite_aile_ar' },
    { id: '14', name: 'droite_bas_porte_av' },
    { id: '18', name: 'droite_jante_av' },
    { id: '16', name: 'droite_jante_ar' },
    { id: '23', name: 'droite_retroviseur' },
  ]

  public listDataZoneAvAr = [
    { id: '21', name: 'face_parebrise' },
    { id: '20', name: 'arriere_parebrise' },
    { id: '11', name: 'face_capot' },
    { id: '13', name: 'arriere_coffre' },
    { id: '10', name: 'face_parechoc' },
    { id: '9', name: 'arriere_parechoc' },
    { id: '12', name: 'face_pavillon' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  openPopupPane(i: number) {
    this.selectedPane = this.devis.reprise.aDefauts[i];
    this.selectedPaneIndex = i;
  }


  selectPaneElement(element) {
    this.selectedPane.a_rub_elements.forEach(el => {
      el.selected = false;
    });
    element.selected = true;
  }

  selectPane(pane) {
    pane.selected = !pane.selected;
  }

}
