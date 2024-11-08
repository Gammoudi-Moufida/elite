import { Component, Inject, forwardRef, Optional, Output, EventEmitter, Input } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectCurrentRefinements, {
  CurrentRefinementsWidgetDescription,
  CurrentRefinementsConnectorParams,
  CurrentRefinementsConnectorParamsRefinement
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-algolia-current-refinements',
    templateUrl: './algolia-current-refinements.component.html',
    styleUrls: ['./algolia-current-refinements.component.css'],
    standalone: true,
    imports: [NgIf, NgFor]
})
export class AlgoliaCurrentRefinementsComponent extends TypedBaseWidget<CurrentRefinementsWidgetDescription, CurrentRefinementsConnectorParams>{
  @Output()  clearQueryValue = new EventEmitter();
  @Output()  priceFilterRemoved = new EventEmitter();
  @Output()  rentFilterRemoved = new EventEmitter();

  @Input() query : string 
  @Input() promoName : string 

  public state: CurrentRefinementsWidgetDescription['renderState']; // Rendering options
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('CurrentRefinements');

  }
  ngOnInit() {
    this.createWidget(connectCurrentRefinements, {

    });

  super.ngOnInit();

}
  public handleChange(item: CurrentRefinementsConnectorParamsRefinement) {
    if(item.attribute == "modelNomCompl" || item.attribute =="modelGroupeNiveau1"){
      this.state.items.forEach(data => {
        if(data.attribute == "modelId"){
           this.state.refine(data.refinements[0])
        }
      })
    }

   this.state.refine(item);

    if (item.attribute === 'priceForFront') {
      let items = this.state?.items.filter(el => el.attribute === 'priceForFront')
      if (items[0].refinements?.length == 2)
        this.priceFilterRemoved.emit('initAllPriceRefinements')
      else
        this.priceFilterRemoved.emit(item)
    }

    if (item.attribute === 'loyerMensuel') {
      let items = this.state?.items.filter(el => el.attribute === 'loyerMensuel')
      if (items[0].refinements?.length == 2)
        this.rentFilterRemoved.emit('initAllRentRefinements')
      else
        this.rentFilterRemoved.emit(item)
    }

  }

  clearQuery(){
    this.clearQueryValue.emit(true)
  }
}


