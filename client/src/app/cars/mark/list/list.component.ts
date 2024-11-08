import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TablePriceComponent } from '../table-price/table-price.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, CurrencyPipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-car-sale-mark-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgbRatingModule, NgOptimizedImage, TablePriceComponent, CurrencyPipe],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class ListComponent implements OnInit {

  @Input() cars: any;
  @Input() showImg: boolean;
  @Input() isBrowser: boolean;
  @Input() type: string;
  screenWidth: number;
  screenMode: number = 1;
  imgUrl: string;
  stars = Array.from({ length: 5 }).map((_, index) => index + 1);
  constructor(
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  visibleItemsDetector() {
    if (this.screenWidth < 768) {
        // mobile mode
        this.screenMode = 1;
    } 
    else {
        // desktop and tablet mode
        this.screenMode = 3;
    }
}

}