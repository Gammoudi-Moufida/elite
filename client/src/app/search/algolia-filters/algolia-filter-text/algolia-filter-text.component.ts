import { Component, Inject, forwardRef, Optional, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectSearchBox, {
  SearchBoxWidgetDescription,
  SearchBoxConnectorParams
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';

@Component({
    selector: 'app-algolia-filter-text',
    templateUrl: './algolia-filter-text.component.html',
    styleUrls: ['./algolia-filter-text.component.css'],
    standalone: true
})
export class AlgoliaFilterTextComponent extends TypedBaseWidget<SearchBoxWidgetDescription, SearchBoxConnectorParams> implements OnInit, OnChanges {
  public state: SearchBoxWidgetDescription['renderState']; // Rendering options

  @Input() clearQuery: boolean
  @Input() clearAll: boolean
  @Output() returnClear = new EventEmitter();
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('SearchBox');
  }
  ngOnInit() {
    let timerId
    this.createWidget(connectSearchBox, {
      // instance options
      queryHook(query, refine) {
        clearTimeout(timerId)
        timerId = setTimeout(() => refine(query), 1500)
      },
    });
    super.ngOnInit();
  }

  onEnter(input: HTMLInputElement) {
    // Cela fait disparaître le clavier virtuel
    input.blur(); 
  }

  ngOnChanges(){
    if (this.clearQuery == true || this.clearAll == true){
        this.state.clear()
        this.returnClear.emit(false)
    }
  }
}