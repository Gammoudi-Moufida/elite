import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { IMAGE_LOADER, ImageLoaderConfig, NgIf, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-shared-reward',
    templateUrl: './reward.component.html',
    styleUrls: ['./reward.component.css'],
    standalone: true,
    imports: [NgIf, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class RewardComponent implements OnInit {

  @Input() showImg:boolean;
  
  imgUrl: string;
  isHover: number = 0;

  constructor(private conf: ConfigService) { }

  ngOnInit(): void {
    this.imgUrl = this.conf.getNewImgUrl();
  }

}
