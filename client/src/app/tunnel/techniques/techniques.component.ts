import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis } from '../devis';
import { NormsComponent } from '../norms/norms.component';
import { NgIf, UpperCasePipe, LowerCasePipe, DecimalPipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-techniques',
    templateUrl: './techniques.component.html',
    styleUrls: ['./techniques.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, UpperCasePipe, LowerCasePipe, DecimalPipe, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class TechniquesComponent implements OnInit {

  isClosedCollapse = true;
  @Input()  devis: Devis;
  isClosed: boolean;
  imgUrl: any;
  constructor(
    private config: ConfigService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isClosed = true
    this.imgUrl = this.config.getNewImgUrl();
  }

  open() {
    const modalRef = this.modalService.open(NormsComponent, { size: 'lg' });
    modalRef.componentInstance.devis = this.devis
  }
}
