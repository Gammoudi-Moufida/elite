import { Component, Inject, forwardRef, Optional, OnChanges } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-vehicule-disponibilities',
    templateUrl: './vehicule-disponibilities.component.html',
    styleUrls: ['./vehicule-disponibilities.component.css'],
    standalone: true,
    imports: [NgFor]
})
export class VehiculeDisponibilitiesComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  public state: RefinementListWidgetDescription['renderState']; // Rendering options
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('RefinementList');
  }
  ngOnInit() {
    this.createWidget(connectRefinementList, {
      // instance options
      attribute: 'disponibiliteForFO',
      transformItems(items) {
        items.forEach(el =>{
          if(el.value == "en stock"){
            el.label = "Disponible"
          }
          if(el.value == "sur commande"){
            el.label = "Sur commande"
          }
          if(el.value == "en arrivage"){
            el.label = "En arrivage"
          }
        })
        return items;
      }
    });
    super.ngOnInit();
  }
}