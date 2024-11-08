import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { DecimalPipe, IMAGE_LOADER, ImageLoaderConfig, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { CategoriesComponent } from 'src/app/search/algolia-filters/categories/categories.component';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, NgOptimizedImage, CategoriesComponent, DecimalPipe],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      },
    },
  ],
})
export class SummaryComponent implements OnInit {
  @Input() data: any;
  @Input() totalResult: any;
  @Input() meilleur_loyer: number;
  @Input() remise: number;
  @Input() totalOccasion: number;
  @Input() lienPageOcasion: string;
  @Input() algoliaData: any;
  @Input() urlToCatalogue: string;
  @Input() fuel: any;
  @Input() items: any[] = [];
  @Output() filterCategorieEv = new EventEmitter<any>();

  imgUrl: string;
  carImage: string;
  minSmart: any;
  minNew: any;
  minPrime: any;
  minAccess: any;
  tabSmart: any[];
  tabNew: any[];
  tabPrime: any[];
  tabAccess: any[];
  cat: number;
  categoryChecked: number;

  MIN_SMART_KEY = makeStateKey<any[]>('minSmart');
  MIN_NEW_KEY = makeStateKey<any[]>('minNew');
  MIN_PRIME_KEY = makeStateKey<any[]>('minPrime');
  items1: any[] = [];
  items2: any[] = [];

  constructor(
    private modalService: NgbModal,
    private config: ConfigService,
    private state: TransferState
  ) {}

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.carImage = this.data.img.replace('https://image.elite-auto.fr', '').replace('https://images.elite-auto.fr', '');

    this.minSmart = this.state.get(this.MIN_SMART_KEY, null);
    this.minPrime = this.state.get(this.MIN_NEW_KEY, null);
    this.minPrime = this.state.get(this.MIN_PRIME_KEY, null);

    if (!this.minSmart) {
      this.tabSmart = [];
      this.tabSmart = this.algoliaData.filter((el) => el.category == 4);
      this.minSmart = this.tabSmart[0]?.priceForFront;
      this.tabSmart.forEach((el, index: number) => {
        if (el.priceForFront < this.minSmart) {
          this.minSmart = el.priceForFront;
        }
      });
      this.state.set(this.MIN_SMART_KEY, <any[]>this.minSmart);
    }

    if (!this.minNew) {
      this.tabNew = [];
      this.tabNew = this.algoliaData.filter((el) => el.category == 3);
      this.minNew = this.tabNew[0]?.priceForFront;
      this.tabNew.forEach((el, index: number) => {
        if (el.priceForFront < this.minNew) {
          this.minNew = el.priceForFront;
        }
      });
      this.state.set(this.MIN_NEW_KEY, <any[]>this.minNew);
    }

    if (!this.minPrime) {
      this.tabPrime = [];
      this.tabPrime = this.algoliaData.filter((el) => el.category == 1);
      this.minPrime = this.tabPrime[0]?.priceForFront;
      this.tabPrime.forEach((el, index: number) => {
        if (el.priceForFront < this.minPrime) {
          this.minPrime = el.priceForFront;
        }
      });
      this.state.set(this.MIN_PRIME_KEY, <any[]>this.minPrime);
    }

    if (this.items?.length > 2) {
      this.items1 = this.items.slice(0, 2);
      this.items2 = this.items.slice(2);
    } else if (this.items?.length <= 2 && this.items?.length > 0) {
      this.items1 = this.items.slice(0, 1);
      this.items2 = this.items.slice(1);
    }

  }

  openLg(content: any) {
    this.modalService.open(content);
  }

  changePhoto(url) {
    if (url) {
      this.carImage = url;
    }
  }
  goToCatalogue() {
    window.location.href = this.urlToCatalogue;
  }

  scrollToList() {
    this.config
      .getWindow()
      .document.getElementById('listOffreTable')
      .scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }
  
  categorieClicked(value) {
    this.items.forEach((el) => {
      if (el.value == value) {
        el.isRefined = !el.isRefined;
      }
    });
    this.filterCategorieEv.emit(this.items);
  }
}
