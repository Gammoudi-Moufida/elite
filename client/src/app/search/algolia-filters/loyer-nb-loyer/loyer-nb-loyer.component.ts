import { Component, Inject, forwardRef, Optional, Input, Output, EventEmitter } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-loyer-nb-loyer',
    templateUrl: './loyer-nb-loyer.component.html',
    styleUrls: ['./loyer-nb-loyer.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule,NgClass]
})
export class LoyerNbLoyerComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  @Input() attributeName :string
  @Input() val:number;
  @Output() nbLoyerValue = new EventEmitter<any>(); 

  public state: RefinementListWidgetDescription['renderState']; // Rendering options
  tab:any[] =[];
  inputValue: number = 24;
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
    if (uriSearch && uriSearch.includes('nbLoyer'))
      this.inputValue = +uriSearch.split('[refinementList][nbLoyer][0]=')[1]?.split('&')[0]
    if (uriSearch && !uriSearch.includes('nbLoyer'))
      this.inputValue = 24

    this.nbLoyerValue.emit(this.inputValue);
    
    this.createWidget(connectRefinementList, {
      attribute: this.attributeName,
    });
    super.ngOnInit();
  }
  stateRefine() {
    let state: any
    if (this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_LOYERS?.hits.results?.nbHits == 0) {
      state = this.instantSearchInstance?.instantSearchInstance?.renderState?.prod_ELITE_LOYERS.currentRefinements.items.filter(el => el.attribute === 'nbLoyer')
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
    if (uriSearch && !uriSearch.includes('nbLoyer'))
      this.inputValue = 24;

    this.nbLoyerValue.emit(this.inputValue);

  }
 
}