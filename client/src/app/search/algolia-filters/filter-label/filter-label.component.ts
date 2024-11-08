import { Component, Inject, forwardRef, Optional } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-label.component.html',
  styleUrls: ['./filter-label.component.css']
})
export class FilterLabelComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
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
      attribute: 'label'
    });

    super.ngOnInit();
  }

}
