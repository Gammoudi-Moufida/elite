import { Component, OnInit, Input } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, NgStyle, SlicePipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-shared-avis',
    templateUrl: './avis.component.html',
    styleUrls: ['./avis.component.css'],
    standalone: true,
    imports: [NgIf, NgOptimizedImage, NgFor, NgbRatingModule, NgStyle, SlicePipe],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class AvisComponent implements OnInit {
  
  @Input() screenMode: number = 1;
  @Input() listAvis: any[] = [];
  @Input() isHomePage: boolean;

  LISTE_AVIS_KEY = makeStateKey('listAvis');
  imgUrl: string = "";
  carrouselItems: any[] = []
  carrouselImgsLength: number = 0;
  imgIndex: number = 0;
  currentIndex: number = 0;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl()
    this.carrouselImgsLength = this.listAvis?.length
    this.listAvis?.forEach((element, index) => {
      if (index == 0) {
        this.carrouselItems.push(
          { avis: element, active: true }
        )
      } else {
        this.carrouselItems.push(
          { avis: element, active: false }
        )
      }
    });
  }

  carrouselNextAction() {
    this.imgIndex++;
    this.currentIndex = ((this.imgIndex % this.carrouselImgsLength) + this.carrouselImgsLength) % this.carrouselImgsLength
    this.carrouselItems.forEach((element, index) => {
      if (index == this.currentIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });
  }

  carrouselPrevAction() {
    this.imgIndex--;
    this.currentIndex = ((this.imgIndex % this.carrouselImgsLength) + this.carrouselImgsLength) % this.carrouselImgsLength
    this.carrouselItems.forEach((element, index) => {
      if (index == this.currentIndex) {
        element.active = true
      } else {
        element.active = false
      }
    });
  }

}
