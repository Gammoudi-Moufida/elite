import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
  selector: 'app-home-next-cards',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class CardsComponent implements OnInit{
  @Input() screenMode: number
  @Input() infosCards: any
  slider: any;
  defaultTransform: number;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.slider = this.config.getWindow().document.getElementById("slider");
    this.defaultTransform=0
  }

 
goNext() {
  const sliderWidth = this.slider.clientWidth;
  const itemWidth = 350;
  this.defaultTransform -= itemWidth;
  if (Math.abs(this.defaultTransform) > this.slider.scrollWidth - sliderWidth) {
      this.defaultTransform = -(this.slider.scrollWidth - sliderWidth);
  }
  this.slider.style.transform = `translateX(${this.defaultTransform}px)`;
}

goPrev() {
  const itemWidth = 350; 
  this.defaultTransform += itemWidth;
  if (this.defaultTransform > 0) {
      this.defaultTransform = 0;
  }
  this.slider.style.transform = `translateX(${this.defaultTransform}px)`;
}


}
