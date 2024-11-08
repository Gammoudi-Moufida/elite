import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AlgoliaCardComponent } from 'src/app/search/algolia-card/algolia-card.component';

@Component({
  selector: 'app-home-next-new-offers',
  standalone: true,
  imports: [CommonModule, AlgoliaCardComponent],
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.css']
})
export class NewOffersComponent implements OnInit {
  @Input() newOffers : any; 
  @Input() screenMode : number; 
  slider: any;
  defaultTransform: number;
  type: string;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {

    this.type = this.config.getType();
    this.slider = this.config.getWindow().document.getElementById("offerSlider");
    this.defaultTransform=0
  }
  goNext() {
    // Obtenez la largeur visible du carrousel
    const sliderWidth = this.slider.clientWidth;
    // Calculez la distance de déplacement en fonction de la largeur des éléments
    const itemWidth = 350; // Ajustez ceci en fonction de la largeur de vos éléments
    this.defaultTransform -= itemWidth;
    // Vérifiez si la position actuelle dépasse la largeur totale du carrousel
    if (Math.abs(this.defaultTransform) > this.slider.scrollWidth - sliderWidth) {
        this.defaultTransform = -(this.slider.scrollWidth - sliderWidth);
    }
    // Appliquez la transformation
    this.slider.style.transform = `translateX(${this.defaultTransform}px)`;
  }
  
  goPrev() {
    const itemWidth = 350;
    this.defaultTransform += itemWidth;
    if (this.defaultTransform > 0) {
        this.defaultTransform = 0;
    }
    this.slider.style.transform = `translateX(${this.defaultTransform}px)`;
  }
  
}
