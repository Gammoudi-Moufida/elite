import { Component, Inject, forwardRef, Optional } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { AlgoliaFiltersService } from '../algolia-filters.service';
import { IMAGE_LOADER, ImageLoaderConfig, NgFor, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-filter-colors',
    templateUrl: './filter-colors.component.html',
    styleUrls: ['./filter-colors.component.css'],
    standalone: true,
    imports: [NgFor, NgIf, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        },
      },
    ],
})
export class FilterColorsComponent  extends TypedBaseWidget<RefinementListWidgetDescription, RefinementListConnectorParams> {
  public state: RefinementListWidgetDescription['renderState']; // Rendering options;
  colorImages: any = [];
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    public service : AlgoliaFiltersService
  ) {
    super('RefinementList');
  }
  ngOnInit() {
    this.service.getColorAccordion().subscribe(data => {
      data.forEach(el =>{
        this.colorImages[el.id] = [el.icon] 
      })
    })

    this.createWidget(connectRefinementList, {
      // instance options
      attribute: 'couleurExterieurNormalized',
      limit:50

    });
    super.ngOnInit();
  }
}