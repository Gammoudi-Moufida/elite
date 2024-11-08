import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgClass, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-offers-description',
    templateUrl: './offers-description.component.html',
    styleUrls: ['./offers-description.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, NgFor]
})
export class OffersDescriptionComponent implements OnInit {

  carrouselItems: any[] = []
  carrouselPart: number;
  @Input() offersDescriptions : any; 
  element: any;
  lastElement: any;
  screenWidth: number;
  screenMode: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.screenWidth = this.config.getWindow().innerWidth;
      this.visibleItemsDetector();
  }

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector()
    this.carrouselPartDetector();
    this.carrouselItems = []
    if (this.offersDescriptions) {
      this.offersDescriptions.forEach((element, index) => {
        if (this.carrouselPart > index) {
          this.carrouselItems.push(
            { card: element, active: true, hidden:false }
          )
        } else {
          this.carrouselItems.push(
            { card: element, active: false, hidden:false}
          )
        }
      });
    }
    this.element =this.carrouselItems.find(item => item.active === true);
    
  }

  visibleItemsDetector() {
    if (this.screenWidth < 768) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 992) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
  }

  carrouselPartDetector() {
    switch (this.screenMode) {
      case 1: {
        this.carrouselPart = 1;
        break;
      }
      case 2: {
        this.carrouselPart = 2;
        break;
      }
      default: {
        this.carrouselPart = 3;
        break;
      }
    }
  }
  carrouselColorPrevAction() {
    const index = this.carrouselItems.findIndex((element) => element.active == true)
    this.carrouselItems[index + this.carrouselPart - 1].active = false;
    this.carrouselItems.unshift({card:this.carrouselItems.pop().card, active:true, hidden:false})
    this.element =this.carrouselItems.find(item => item.active === true);
  }
  
  carrouselColorNextAction() {
    const index = this.carrouselItems.findIndex((element) => element.active == true )
    this.carrouselItems[index].active = false;
    this.carrouselItems[index + this.carrouselPart].active = true;
    this.carrouselItems.push({ card: this.carrouselItems.shift().card, active: false, hidden:false })
    this.element =this.carrouselItems.find(item => item.active === true);
    if (this.carrouselPart == 1 &&this.carrouselItems[0].card.id == 3){
      this.carrouselItems[1].hidden = true
      this.carrouselItems[2].hidden = true
    }
    if (this.carrouselPart == 2 && this.carrouselItems[0].card.id == 2){
      this.carrouselItems[2].hidden = true
    }
  }
}