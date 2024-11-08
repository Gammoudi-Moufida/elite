import { Component, HostListener } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';
import { ConfianceComponent } from 'src/app/shared/confiance/confiance.component';

@Component({
  selector: 'app-marchands',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage,ConfianceComponent],
  templateUrl: './marchands.component.html',
  styleUrls: ['./marchands.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class MarchandsComponent {
  screenWidth: any;
  screenMode: number;
  bgImgUrl: string;
  constructor(
    private config: ConfigService
  ) { }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.screenWidth = this.config.getWindow().innerWidth;
  }
  ngOnInit(): void {
    this.screenWidth = this.config.getWindow()?.innerWidth;
    if (this.screenWidth < 700) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 1140) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
    // this.setDynamicBackgroundImage()
  }
  ngOnChanges() {
    this.screenWidth = this.config.getWindow().innerWidth;
    if (this.screenWidth < 700) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 1140) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
  }

}
