import { Component, Inject, forwardRef, Optional, Input, EventEmitter, Output } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-loyer-kilometres',
    templateUrl: './loyer-kilometres.component.html',
    styleUrls: ['./loyer-kilometres.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule]
})
export class LoyerKilometresComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  @Input() attributeName :string
  @Input() val:number;
  @Output() kilometresValue = new EventEmitter<any>(); 

  public state: RefinementListWidgetDescription['renderState']; // Rendering options

  inputValue: number = 5000;

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    public config:ConfigService
  ) {
    super('RefinementList');
  }
  ngOnInit() {
    let uriSearch = decodeURI(this.config.getLocation().search)
    
    if (uriSearch && uriSearch.includes('kilometres'))
      this.inputValue = +uriSearch.split('[refinementList][kilometres][0]=')[1]?.split('&')[0]

    if (uriSearch && !uriSearch.includes('kilometres'))
      this.inputValue = 5000

    this.kilometresValue.emit(this.inputValue);

    this.createWidget(connectRefinementList, {
      attribute: this.attributeName,
    });
    super.ngOnInit();
  }
  stateRefine() {
    let state: any
    if (this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_LOYERS?.hits.results?.nbHits == 0) {
      state = this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_LOYERS.currentRefinements.items.filter(el => el.attribute === 'kilometres')
      state[0]?.refinements.forEach(el => {
        if (el.value != this.inputValue.toString()) {
          this.state.refine(el.value)
        }
      })
      this.state.refine(this.inputValue.toString())
    }
    else {
      this.state.items.forEach(el => {
        if (el.value == this.inputValue.toString() && el.isRefined == false) {
          this.state.refine(this.inputValue.toString())
        } else if (el.value != this.inputValue.toString() && el.isRefined == true) {
          this.state.refine(el.value)
        }
      })
      let elementNotFound = this.state.items.filter(el => el.value === this.inputValue.toString())
      if (elementNotFound.length == 0) {
        let element = {
          "count": 0,
          "isRefined": false,
          "value": this.inputValue.toString(),
          "label": this.inputValue.toString(),
          "highlighted": this.inputValue.toString()
        }
        this.state.items.push(element)
        this.state.refine(element.value)
      }
    }
  }

  ngDoCheck() {
    let uriSearch = decodeURI(this.config.getLocation().search)
    if (uriSearch && !uriSearch.includes('kilometres'))
      this.inputValue = 5000

    this.kilometresValue.emit(this.inputValue);

  }
}