import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, TitleCasePipe]
})
export class BrandsComponent implements OnInit {
  @Input() showImg: boolean = false;
  @Input() showPlaceholder: boolean;
  @Input() brands: any;
  @Input() type: string;
  @Input() nosmarques_url: string;

  screenMode: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.visibleItemsDetector();
  }
  constructor(private config: ConfigService) {
  }
  ngOnInit() {
    this.visibleItemsDetector();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  visibleItemsDetector() {
    let screenWidth = this.config.getWindow().innerWidth;

      if (screenWidth < 700) {
        // mobile mode
        this.screenMode = 1;
      } else if (screenWidth < 1140) {
        // tablet mode
        this.screenMode = 2;
      }
      else {
        // desktop mode
        this.screenMode = 3;
      
    }
  }

}
