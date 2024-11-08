import { Component, Inject, forwardRef, Optional, Output, EventEmitter } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex, NgAisSearchBoxModule } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { NgFor, UpperCasePipe } from '@angular/common';
import algoliasearch from 'algoliasearch';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter-marque',
    templateUrl: './filter-marque.component.html',
    styleUrls: ['./filter-marque.component.css'],
    standalone: true,
    imports: [NgFor, UpperCasePipe, FormsModule]
})
export class FilterMarqueComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  @Output()  marqueChecked = new EventEmitter(); 
  public state: RefinementListWidgetDescription['renderState']; 

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
      attribute: 'marque',
      limit:50,
      sortBy: ['name:asc'],
    });
    super.ngOnInit();
  }

  onChangeText($event) {

    if($event?.length > 0)
      this.state.searchForItems($event)
    else
      this.state.searchForItems('')
  
  }

  getChecked(item) {
    this.marqueChecked.emit(!item.isRefined)
  }
}