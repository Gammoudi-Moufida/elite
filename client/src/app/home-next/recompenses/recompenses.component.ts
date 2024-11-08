import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home-next-recompenses',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './recompenses.component.html',
  styleUrls: ['./recompenses.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class RecompensesComponent implements OnInit{
  @Input() title : string; 
  @Input() data : any;
  isTextOpen: boolean = true;
  items: any[];

  ngOnInit(): void {
  }
  
  toggleText(item: any) {
    item.isTextOpen = !item.isTextOpen;
  }
}
