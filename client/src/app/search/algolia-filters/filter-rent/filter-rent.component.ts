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
  selector: 'app-filter-rent',
  standalone: true,
  imports: [NgIf, NgAisInstantSearchModule, FormsModule, DecimalPipe, IntervalSliderComponent, JsonPipe, NgAisHitsModule],
  templateUrl: './filter-rent.component.html',
  styleUrls: ['./filter-rent.component.css']
})
export class FilterRentComponent extends TypedBaseWidget<RangeWidgetDescription, RangeConnectorParams> {

  public state: RangeWidgetDescription['renderState'];  // Rendering options

  @Input() rentFilterTerminals;
  @Input() attribute: string;
  @Input() rentFilterRemovedEvent;

  testMin: number;
  testMax: number;
  testDeleteOne = false;
  testDeleteAll= false;
  noResult: boolean;

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

    this.testMin = this.rentFilterTerminals?.min;
    this.testMax = this.rentFilterTerminals?.max;

    this.createWidget(connectRange, {
      attribute: this.attribute,
    });
    super.ngOnInit();

  }

  ngDoCheck(): void {

    if (this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_LOYERS?.hits.results?.nbHits == 0)
      this.noResult = true
    else
      this.noResult = false

    if (this.rentFilterTerminals?.min)
      this.testMin = this.testMin ? this.testMin : this.rentFilterTerminals?.min;
    else
      this.testMin = this.testMin ? this.testMin : this.state?.range?.min;

    if (this.rentFilterTerminals?.max)
      this.testMax = this.testMax ? this.testMax : this.rentFilterTerminals?.max;
    else
      this.testMax = this.testMax ? this.testMax : this.state?.range?.max;

    if (this.rentFilterRemovedEvent && !this.testDeleteOne) {

      if (this.rentFilterRemovedEvent === 'initAllRentRefinements') {

        this.testMin = this.state?.range?.min
        this.testMax = this.state?.range?.max
        this.rentFilterRemovedEvent = null

      } else if (this.rentFilterRemovedEvent?.operator === '>=') {

        this.testMin = this.state?.range?.min
        this.rentFilterRemovedEvent = null

      } else if (this.rentFilterRemovedEvent?.operator === '<=') {

        this.testMax = this.state?.range?.max
        this.rentFilterRemovedEvent = null

      }
      this.testDeleteOne = true
    }


    if(this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_LOYERS?.currentRefinements?.items?.length==0 && !this.testDeleteAll){
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
