import { Component } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ConfianceHome } from '../shared';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-confiance',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: './confiance.component.html',
  styleUrls: ['./confiance.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class ConfianceComponent {
  confianceInfo = new ConfianceHome();

  constructor(
    private sharedService : SharedService
  ) { }
  ngOnInit(): void {
    this.sharedService.getConfianceInfo().subscribe(
      res => this.confianceInfo = res
    )
  }
}
