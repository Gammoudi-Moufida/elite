import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { NgFor } from '@angular/common';
@Component({
    selector: 'app-filter-newness',
    templateUrl: './filter-newness.component.html',
    styleUrls: ['./filter-newness.component.css'],
    standalone: true,
    imports: [NgFor]
})
export class FilterNewnessComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
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
      attribute: 'isNouveaute',
      transformItems(items) {
        items = items.filter((item: any) => item.label == 'true')
        return items
      }
    });

    super.ngOnInit();
  }
}