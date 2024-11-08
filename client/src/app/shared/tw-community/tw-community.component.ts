import { Component } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-tw-community',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './tw-community.component.html',
  styleUrls: ['./tw-community.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class TwCommunityComponent {

}
