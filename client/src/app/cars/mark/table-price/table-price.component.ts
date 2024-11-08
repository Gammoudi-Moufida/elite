import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgFor, UpperCasePipe, CurrencyPipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import algoliasearch from 'algoliasearch';

@Component({
    selector: 'app-table-price',
    templateUrl: './table-price.component.html',
    styleUrls: ['./table-price.component.css'],
    standalone: true,
    imports: [NgFor, UpperCasePipe, CurrencyPipe, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class TablePriceComponent implements OnInit {
  @Input() cars: any;
  siteUrl: string;
  imgUrl: string;
  searchClient: any;
  index: any;

  constructor(private config:ConfigService) { }

  ngOnInit(): void {
    this.siteUrl = this.config.getSiteUrl().slice(0, -1);
    this.imgUrl = this.config.getNewImgUrl();
    if (this.cars.find((el) => JSON.parse(el.eco.replace(' ', '')) < 0)) {
      this.searchClient = algoliasearch(
        this.config.algolia.appId,
        this.config.algolia.appKey
      );
      this.index = this.searchClient.initIndex(this.config.algolia.indexName);
    }
    this.cars.forEach((el) => {
      if (JSON.parse(el.eco.replace(' ', '')) < 0) {
        this.index.search('',
         {
            facetFilters: [
              ['marque:' + el.marque.toUpperCase()],
              ['modelNomCompl:' + el?.modeleNomCompl],
              ['modelId:' + el?.modeleId],
              ['category:1'],
            ],
            hitsPerPage: 1000,
          })
          .then((hits) => {
            el.eco = hits.nbHits > 0 ? hits.hits[0].kilometrage + ' Km, ' +  hits.hits[0].anneeMiseEnCirculation : '0 €';
          });
      } else {
        el.eco = el.eco + ' €';
      }
    }); 
  }
  clickLink(url){
  this.config.getWindow().document.location.href = url;
  }
}
