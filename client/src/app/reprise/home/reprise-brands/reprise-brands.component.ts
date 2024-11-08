import { CommonModule, NgClass, NgStyle, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
  selector: 'app-reprise-brands',
  templateUrl: './reprise-brands.component.html',
  styleUrls: ['./reprise-brands.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, NgStyle, CommonModule, NgClass]

})
export class RepriseBrandsComponent implements OnInit {
  @Input() brands: any;
  @Input() screenMode: any;
  @Input() showPlaceholder: any;

  screenWidth: number;
  showMore: boolean = false;
  n: number;
  placeloads: number;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  constructor(private config: ConfigService) {
  }

  ngOnInit(): void {
    this.screenWidth = this.config.getWindow().innerWidth;

  this.visibleItemsDetector()
  }

  ngOnChanges(): void {
    this.screenWidth = this.config.getWindow().innerWidth;

    this.visibleItemsDetector()
  }

  numSequence(n:number): Array<number> { 
    return Array(n); 
  } 

  visibleItemsDetector() {
    this.screenWidth = this.config.getWindow().innerWidth;

    if (this.screenMode == 1) {
      this.n = 9
      this.placeloads = 3
    } else if (this.screenMode == 2) {
      this.n = 14
      this.placeloads = 7
    } else {
      this.n = 20
      this.placeloads = 10
    }
    // if(this.screenWidth >= 700 && this.screenWidth <= 768){
    //   this.n = 9
    //   this.placeloads = 3
    // }
  }
}
