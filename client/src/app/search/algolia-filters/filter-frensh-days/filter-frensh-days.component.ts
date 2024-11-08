import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filter-frensh-days',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filter-frensh-days.component.html',
  styleUrls: ['./filter-frensh-days.component.css']
})

export class FilterFrenshDaysComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
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
      attribute: 'isFrenchDaysPromo',
      transformItems(items) {
        items = items.filter((item: any) => item.label == 'true')
        return items
      }
    });

    super.ngOnInit();
  }
}
