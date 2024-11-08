import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home-next-slider',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class SliderComponent implements OnInit {
  @Input() carrouselData:any
  @Input() screenMode:any
  imageUrl: string;
  domaine: string = "new"
  carrouselIntervalImgsLength: number;
  imgIntervalIndex = 0;
  currentIntervalIndex = 0;
  startInterval: boolean = false;
  carrouselIntervalItems = []

  @HostListener('window:scroll') onScrollEvent() {
    if (!this.startInterval) {
      this.startInterval = true
      const source = timer(1000, 10000);
      source.subscribe(val => this.carrouselIntervalNextAction());
    }
  }

  @HostListener('mouseenter') onMouseMove() {
    if (!this.startInterval) {
      this.startInterval = true
      const source = timer(1000, 10000);
      source.subscribe(val => this.carrouselIntervalNextAction());
    }
  }
  constructor() {}

  ngOnInit(): void {
    
    this.getCarrouselData()
  }
  
  getCarrouselData() {
    this.carrouselIntervalImgsLength = this.carrouselData?.length
    this.carrouselData?.forEach((element, index) => {
      if (index == 0) {
        element.active = true
        this.carrouselIntervalItems.push(element)
      } else {
        element.active = false
        this.carrouselIntervalItems.push(element)
      }
    });
  }

  carrouselIntervalNextAction() {
    this.imgIntervalIndex++;
    this.currentIntervalIndex = ((this.imgIntervalIndex % this.carrouselIntervalImgsLength) + this.carrouselIntervalImgsLength) % this.carrouselIntervalImgsLength
    this.carrouselIntervalItems.forEach((element, index) => {
      if (index == this.currentIntervalIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });
  }

  carrouselIntervalPrevAction() {
    this.imgIntervalIndex--;
    this.currentIntervalIndex = ((this.imgIntervalIndex % this.carrouselIntervalImgsLength) + this.carrouselIntervalImgsLength) % this.carrouselIntervalImgsLength
    this.carrouselIntervalItems.forEach((element, index) => {
      if (index == this.currentIntervalIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });
  }

  checkIndicatorAction(index: number) {
    this.imgIntervalIndex = index
    this.currentIntervalIndex = index
    this.carrouselIntervalItems.forEach((element, index) => {
      if (index == this.currentIntervalIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });
  }
}
