import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis } from '../devis';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-equipements',
    templateUrl: './equipements.component.html',
    styleUrls: ['./equipements.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, NgFor, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class EquipementsComponent implements OnInit {
  
  isClosedCollapse = true
  @Input()  devis: Devis;
  imgUrl: string;
  showAllEquipements: boolean = false;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
  }

  showAll() {
    this.showAllEquipements = true;
  }

}
