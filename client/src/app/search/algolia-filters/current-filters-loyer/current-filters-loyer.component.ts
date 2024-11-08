import { Component, Inject, forwardRef, Optional } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex, NgAisIndexModule, NgAisHitsModule } from 'angular-instantsearch';

import connectCurrentRefinements, {
  CurrentRefinementsWidgetDescription,
  CurrentRefinementsConnectorParams,
  CurrentRefinementsConnectorParamsRefinement
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { NgFor, JsonPipe } from '@angular/common';;

@Component({
    selector: 'app-current-filters-loyer',
    templateUrl: './current-filters-loyer.component.html',
    styleUrls: ['./current-filters-loyer.component.css'],
    standalone: true,
    imports: [NgAisIndexModule, NgAisHitsModule, NgFor, JsonPipe]
})
export class CurrentFiltersLoyerComponent extends TypedBaseWidget<CurrentRefinementsWidgetDescription, CurrentRefinementsConnectorParams> {
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
      // instance options
    });
    super.ngOnInit();
  }
  public handleChange(item : CurrentRefinementsConnectorParamsRefinement) {
    this.state.refine(item);
  }
}
