import { NgFor } from '@angular/common';
import { Component, Inject, forwardRef, Optional } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';

@Component({
  selector: 'app-vehicule-type',
  standalone: true,
  imports: [NgFor],
  templateUrl: './vehicule-type.component.html',
  styleUrls: ['./vehicule-type.component.css']
})
export class VehiculeTypeComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
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
      attribute: 'typeForRecherche',
      transformItems(items) {
        items.forEach(el =>{
          if(el.value == "Particulier"){
            el.label = "Véhicule Particulier"
          }else if(el.value == "Professionnel"){
            el.label = "Véhicule Utilitaire"
          }
        })
        return items;
      }
    });
    super.ngOnInit();
  }
}