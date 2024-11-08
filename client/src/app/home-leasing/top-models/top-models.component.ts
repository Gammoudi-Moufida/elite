import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor, TitleCasePipe, NgOptimizedImage } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeNextService } from 'src/app/home-next/home-next.service';

@Component({
    selector: 'app-home-leasing-top-models',
    templateUrl: './top-models.component.html',
    styleUrls: ['./top-models.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgOptimizedImage, TitleCasePipe]
})
export class TopModelsComponent implements OnInit {
  @Input() screenMode: number;
  @Input() models: any;
  nbModels: number = 4;
  carrouselItems: any[] = []
  carrouselPart: number = 1;
  loading: boolean = true;
  text: any;
  constructor(private service: HomeNextService,
              private modalService: NgbModal) { }

  ngOnInit(): void {

    this.carrouselPartDetector();
    this.nbModels = this.models.length
    this.generateCarrouselItems()
  }
  generateCarrouselItems() {
    this.carrouselItems = []
    if (this.models) {
      this.models.forEach((element, index) => {
        if (this.carrouselPart > index) {
          this.carrouselItems.push(
            { model: element, active: true }
          )
        } else {
          this.carrouselItems.push(
            { model: element, active: false }
          )
        }
      });
    }
  }

  carrouselPartDetector() {
    switch (this.screenMode) {
      case 1: {
        this.carrouselPart = 2;
        break;
      }
      case 2: {
        this.carrouselPart = 3;
        break;
      }
      default: {
        this.carrouselPart = 1;
        break;
      }
    }
  }
  activeFilter() {
    return this.carrouselItems.filter(item => item.active === true);
  }
  carrouselColorPrevAction() {
    const index = this.carrouselItems.findIndex((element) => element.active == true)
    this.carrouselItems[index - 1].active = true;
    this.carrouselItems[index + this.carrouselPart - 1].active = false;
  }

  carrouselColorNextAction() {
    const index = this.carrouselItems.findIndex((element) => element.active == true)
    this.carrouselItems[index].active = false;
    this.carrouselItems[index + this.carrouselPart].active = true;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  open(infoContent, modeleId){
    this.loading = true;
    this.modalService.open(infoContent, { size: 'lg' });
      this.service.getInfoLoyer(null, modeleId).subscribe(
        res => {
          this.text = res
          this.loading = false;
        }
      )
    return false;
  }

}
