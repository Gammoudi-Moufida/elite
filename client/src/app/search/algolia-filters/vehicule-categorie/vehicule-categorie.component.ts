import { NgFor, TitleCasePipe } from '@angular/common';
import { Component, Inject, forwardRef, Optional } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';
import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';

@Component({
  selector: 'app-vehicule-categorie',
  standalone: true,
  imports: [NgFor, TitleCasePipe],
  templateUrl: './vehicule-categorie.component.html',
  styleUrls: ['./vehicule-categorie.component.css']
})
export class VehiculeCategorieComponent extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  public state: RefinementListWidgetDescription['renderState']; // Rendering options
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
      attribute: 'segmentEliteGroup',
      limit:50,
      transformItems(items) {
        return items.filter(item => item.label != 'Utilitaire');
      }
    });
    super.ngOnInit();
  }
}