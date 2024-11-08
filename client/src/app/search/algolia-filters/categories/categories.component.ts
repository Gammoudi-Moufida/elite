import { Component, Inject, forwardRef, Optional, Input, EventEmitter, Output } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    standalone: true,
    imports: [NgFor, NgIf, NgClass, DecimalPipe]
})
export class CategoriesComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
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
      attribute: 'category',
      transformItems(items) { 
        items.forEach(el =>{
          if(el.value == "1"){
            el.label = "Occasion"
          }else if(el.value == "3"){
            el.label = "Neuf"
          }else{
            el.label = "0 km"
          }
        })
        const labelOrder = ["Neuf", "0 km", "Occasion"];
        return items.sort((a, b) => labelOrder.indexOf(a.label) - labelOrder.indexOf(b.label));
      }
    });
    super.ngOnInit();
  }
}