import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex, NgAisHitsModule, NgAisInstantSearchModule } from 'angular-instantsearch';

import connectRange, {
  RangeWidgetDescription,
  RangeConnectorParams
} from 'instantsearch.js/es/connectors/range/connectRange';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, JsonPipe, NgIf } from '@angular/common';
import { IntervalSliderComponent } from 'src/app/shared/interval-slider/interval-slider.component';
import { SliderOutValues } from 'src/app/shared/shared';

@Component({
  selector: 'app-filter-price',
  standalone: true,
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css'],
  imports: [NgIf, NgAisInstantSearchModule, FormsModule, DecimalPipe, IntervalSliderComponent, JsonPipe, NgAisHitsModule]
})
export class FilterPriceComponent extends TypedBaseWidget<RangeWidgetDescription, RangeConnectorParams> {

  public state: RangeWidgetDescription['renderState'];  // Rendering options

  @Input() priceFilterTerminals;
  @Input() priceFilterRemovedEvent;

  testMin: number;
  testMax: number;
  testDeleteOne = false;
  testDeleteAll = false;

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('RangeSlider');
  }
  ngOnInit() {

    this.testMin = this.priceFilterTerminals?.min;
    this.testMax = this.priceFilterTerminals?.max;

    this.createWidget(connectRange, {
      attribute: 'priceForFront',
    });
    super.ngOnInit();

  }

  ngDoCheck(): void {

    if (this.priceFilterTerminals?.min)
      this.testMin = this.testMin ? this.testMin : this.priceFilterTerminals?.min;
    else
      this.testMin = this.testMin ? this.testMin : this.state?.range?.min;

    if (this.priceFilterTerminals?.max)
      this.testMax = this.testMax ? this.testMax : this.priceFilterTerminals?.max;
    else
      this.testMax = this.testMax ? this.testMax : this.state?.range?.max;


    if (this.priceFilterRemovedEvent && !this.testDeleteOne) {

      if (this.priceFilterRemovedEvent === 'initAllPriceRefinements') {

        this.testMin = this.state?.range?.min
        this.testMax = this.state?.range?.max
        this.priceFilterRemovedEvent = null

      } else if (this.priceFilterRemovedEvent?.operator === '>=') {

        this.testMin = this.state?.range?.min
        this.priceFilterRemovedEvent = null

      } else if (this.priceFilterRemovedEvent?.operator === '<=') {

        this.testMax = this.state?.range?.max
        this.priceFilterRemovedEvent = null

      }
      this.testDeleteOne = true
    }

    if(this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_OFFERS?.currentRefinements?.items?.length==0 && !this.testDeleteAll){
      this.testMin = this.state?.range?.min
      this.testMax = this.state?.range?.max
      this.testDeleteAll =true
    }
  }

  sliderValues($event: SliderOutValues) {

    this.testMin = Math.min($event.valueLeft, $event.valueRight);
    this.testMax = Math.max($event.valueLeft, $event.valueRight);
    this.testDeleteOne = false

  }

  refineState() {
    this.state.refine([this.testMin, this.testMax])
    this.testDeleteOne = false
    this.testDeleteAll = false

  }
}
