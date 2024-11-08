import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis } from '../devis';
import { NgIf, UpperCasePipe, LowerCasePipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-norms',
    templateUrl: './norms.component.html',
    styleUrls: ['./norms.component.css'],
    standalone: true,
    imports: [NgIf, UpperCasePipe, LowerCasePipe, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class NormsComponent implements OnInit {
  @Input()  devis: Devis;
  imgUrl: string;
  
  constructor(public activeModal: NgbActiveModal, private config: ConfigService) { }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl()
  }

}
