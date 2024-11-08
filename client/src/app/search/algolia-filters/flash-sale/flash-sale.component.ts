import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { NgFor } from '@angular/common';
@Component({
    selector: 'app-flash-sale',
    templateUrl: './flash-sale.component.html',
    styleUrls: ['./flash-sale.component.css'],
    standalone: true,
    imports: [NgFor]
})
export class FlashSaleComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  public state: RefinementListWidgetDescription['renderState']; // Rendering options
  @Input() promoName : string;
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
      attribute: 'flashSale',
      transformItems(items) {
        items = items.filter((item: any) => item.label == 'true')
        return items
      }
    });

    super.ngOnInit();
  }
}