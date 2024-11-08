import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgIf, NgFor, CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-similar-model',
    templateUrl: './similar-model.component.html',
    styleUrls: ['./similar-model.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe, NgOptimizedImage]
})
export class SimilarModelComponent implements OnInit {

  @Input() cars: any;
  @Input() showImg: boolean;
  @Input() isBrowser: boolean;
  @Input() type: string;
  screenWidth: number;
  screenMode: number = 1;
  imgUrl: string;

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
  encode(url){
    return encodeURI(url)
  }
}
