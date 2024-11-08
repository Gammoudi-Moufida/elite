import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SliderOutValues, SliderParams } from '../shared';
import { NgStyle, NgFor, NgClass, DecimalPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-interval-slider',
    templateUrl: './interval-slider.component.html',
    styleUrls: ['./interval-slider.component.css'],
    standalone: true,
    imports: [FormsModule, NgStyle, NgFor, NgClass, DecimalPipe, NgIf]
})
export class IntervalSliderComponent implements OnChanges, OnInit {

  @Input() sliderParams = new SliderParams(0, 0, 0, 0, 0, 0, 0);
  @Input() step: boolean;
  @Input() priceFilter: boolean;
  @Input() rentFilter: boolean;
  @Input() promoPage: boolean;

  @Input() minValue: number;
  @Input() maxValue: number;
  @Output() sliderValuesEmitter = new EventEmitter<SliderOutValues>();

  sliderValues = new SliderOutValues();
  thumbRight = {};
  range = {};
  thumbLeft = {};

  stepTab = [];
  numberSteps: number;

  minValueForStep: number;
  maxValueForstep: number;

  constructor() { }

  ngOnInit() {
    this.numberSteps = Math.round(((this.sliderParams.maxRight - this.sliderParams.minLeft) / this.sliderParams.step) + 1)

    if (this.step == true) {
      for (let i = 0; i < this.numberSteps; i++) {
        this.stepTab.push(i * this.sliderParams.step)
      }
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.sliderParams.maxValue = this.maxValue
    this.sliderParams.minValue = this.minValue

    this.sliderValues.valueRight = this.sliderParams.maxValue
    this.sliderValues.valueLeft = this.sliderParams.minValue

    this.minValueForStep = Math.min(this.sliderValues.valueRight, this.sliderValues.valueLeft)
    this.maxValueForstep = Math.max(this.sliderValues.valueRight, this.sliderValues.valueLeft)

    this.sliderBinding()
  }
  rangeInputChange() {
    this.sliderBinding()
    this.sliderValuesEmitter.emit(this.sliderValues);
  }

  sliderBinding() {

    if (this.sliderValues.valueLeft < this.sliderValues.valueRight) {

      var percent = ((this.sliderValues.valueRight - this.sliderParams.minRight) / (this.sliderParams.maxRight - this.sliderParams.minRight)) * 100;
      var percent2 = ((this.sliderValues.valueLeft - this.sliderParams.minLeft) / (this.sliderParams.maxLeft - this.sliderParams.minLeft)) * 100;

      this.thumbRight = { ['right.%']: 100 - percent };
      this.range = { ['right.%']: 100 - percent, ['left.%']: percent2 };
      this.thumbLeft = { ['left.%']: percent2 };

    }else if (this.sliderValues.valueLeft > this.sliderValues.valueRight) {

      percent = ((this.sliderValues.valueLeft - this.sliderParams.minRight) / (this.sliderParams.maxRight - this.sliderParams.minRight)) * 100;
      percent2 = ((this.sliderValues.valueRight - this.sliderParams.minLeft) / (this.sliderParams.maxLeft - this.sliderParams.minLeft)) * 100;

      this.thumbRight = { ['right.%']: 100 - percent };
      this.thumbLeft = { ['left.%']: percent2 };
      this.range = { ['right.%']: 100 - percent, ['left.%']: percent2 };

    }else if(this.sliderValues.valueLeft == this.sliderValues.valueRight){

      percent = ((this.sliderValues.valueLeft - this.sliderParams.minRight) / (this.sliderParams.maxRight - this.sliderParams.minRight)) * 100;
      percent2 = ((this.sliderValues.valueRight - this.sliderParams.minLeft) / (this.sliderParams.maxLeft - this.sliderParams.minLeft)) * 100;

      this.thumbRight = { ['right.%']: 100 - percent };
      this.thumbLeft = { ['left.%']: percent2 };
      this.range = { ['right.%']: 100 - percent, ['left.%']:   percent2 };
    }
  }

  onStepClick(event: any) {
    let d1 = Math.abs(this.sliderValues.valueLeft - event.target.attributes.value['value'])
    let d2 = Math.abs(this.sliderValues.valueRight - event.target.attributes.value['value'])

    if (d1 < d2) {
      this.sliderValues.valueLeft = event.target.attributes.value['value'];
    } else {
      this.sliderValues.valueRight = event.target.attributes.value['value'];
    }
    this.rangeInputChange()
  }

}