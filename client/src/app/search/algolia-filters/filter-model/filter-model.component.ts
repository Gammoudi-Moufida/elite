import { Component, Inject, forwardRef, Optional, Output, EventEmitter } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter-model',
    templateUrl: './filter-model.component.html',
    styleUrls: ['./filter-model.component.css'],
    standalone: true,
    imports: [NgFor, UpperCasePipe, FormsModule]
})
export class FilterModelComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  @Output()  modelChecked = new EventEmitter(); 
  public state: RefinementListWidgetDescription['renderState']; // Rendering options
  queryText: string;

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
      attribute: 'modelGroupeNiveau1',
      limit:50,
      sortBy: ['name:asc']
    });
    super.ngOnInit();
  }

  onChangeText($event) {

    if ($event?.length > 0)
      this.state.searchForItems($event)
    else
      this.state.searchForItems('')

  }

  getChecked(item) {
    this.modelChecked.emit(!item.isRefined)
  }
}