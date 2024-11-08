import { Component, Inject, forwardRef, Optional, Input, EventEmitter, Output } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRange, {
  RangeWidgetDescription,
  RangeConnectorParams
} from 'instantsearch.js/es/connectors/range/connectRange';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-loyer-apport',
    templateUrl: './loyer-apport.component.html',
    styleUrls: ['./loyer-apport.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule]
})
export class LoyerApportComponent extends TypedBaseWidget<RangeWidgetDescription, RangeConnectorParams> {
  public state: RangeWidgetDescription['renderState']; // Rendering options
  inputValue: number =0;
  @Input() attributeName;
  @Output() apportValue = new EventEmitter<any>(); 

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    public config:ConfigService
  ) {
    super('RangeSlider');
  }
  ngOnInit() {
    let uriSearch = decodeURI(this.config.getLocation().search)

     if (uriSearch && uriSearch.includes('apport')){
      this.inputValue = +uriSearch.split('[range][apport]=')[1]?.split(':')[0]
    }

    this.apportValue.emit(this.inputValue);

    this.createWidget(connectRange, {
      // instance options
      attribute: this.attributeName,
    });
    super.ngOnInit();
  }
  refineState(t2){
    this.state.refine([t2,t2])
  }

  ngDoCheck() {
    let uriSearch = decodeURI(this.config.getLocation().search)

    if (uriSearch && !uriSearch.includes('apport'))
      this.inputValue = 0

    if (this.state?.range) {
      this.state.range.max = 25000
    }

    this.apportValue.emit(this.inputValue);

  }
}