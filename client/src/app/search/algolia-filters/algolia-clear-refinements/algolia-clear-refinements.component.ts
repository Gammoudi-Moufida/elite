import { Component, Inject, forwardRef, Optional, Output, EventEmitter } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectClearRefinements, {
  ClearRefinementsWidgetDescription,
  ClearRefinementsConnectorParams
} from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';

@Component({
    selector: 'app-algolia-clear-refinements',
    templateUrl: './algolia-clear-refinements.component.html',
    styleUrls: ['./algolia-clear-refinements.component.css'],
    standalone: true
})
export class AlgoliaClearRefinementsComponent  extends TypedBaseWidget<ClearRefinementsWidgetDescription, ClearRefinementsConnectorParams> {
  public state: ClearRefinementsWidgetDescription['renderState']; // Rendering options
  @Output() clearAllQuery = new EventEmitter();
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('ClearRefinements');
  }
  ngOnInit() {
    this.createWidget(connectClearRefinements, {
    
        });
    super.ngOnInit();
  }
  stateRefine(){
    this.state.refine();
    this.clearAllQuery.emit(true)
  }
}