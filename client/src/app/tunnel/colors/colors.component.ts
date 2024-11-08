import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis, Selleries } from '../devis';
import { TunnelService } from '../tunnel.service';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, NgClass, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, NgFor, NgClass, FormsModule, NgOptimizedImage]
})
export class ColorsComponent implements OnInit {
  
  @Input()  devis: Devis;
  @Input()  isClosedColorCollapse = false;
  @Output() colorSelected = new EventEmitter();
  @Output() sellerieSelected = new EventEmitter();
  @Output() inputTextColor = new EventEmitter();
  @Output() inputTextSellerie = new EventEmitter();
  @Output() collapseEvent = new EventEmitter();
  colorId: number;
  offerId: number;
  showTextSellerie: boolean = true;
  showSelleries: boolean = false;
  showColors: boolean = false;
  textColor: string = ''
  textSellerie: string = ''
  screenWidth: number;
  constructor(
    private route: ActivatedRoute, 
    private service: TunnelService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    if(this.devis?.colors?.images.length > 0) {
      this.showTextSellerie = false;
    }
    this.screenWidth = this.config.getWindow()?.innerWidth;
    this.isClosedColorCollapse = this.service.visibleItemsDetector(this.screenWidth, this.isClosedColorCollapse)
    this.toggleEvent();
  }

  checkColor(item) {
    this.devis.colors.selectedColor = item
    this.colorSelected.emit( this.devis?.colors?.selectedColor)
    this.sellerieSelected.emit(null)
    this.textSellerie = ''
    this.colorId = this.devis.colors.selectedColor.colorId
    this.route.params.subscribe(params => {
      this.offerId = params['offerId']
      this.service.getColorSelleries( this.offerId, this.colorId).subscribe(
        data => {
          this.showTextSellerie = true;
            this.devis.colors.selleries = data.selleries
        }
      )
    })
  }

  checkSellerie(item) {
    this.devis.colors.selectedSellerie = item
    this.textSellerie = ''
    this.sellerieSelected.emit(this.devis.colors.selectedSellerie)
  }

  textColorChange(){
    this.inputTextColor.emit(this.textColor);
  }

  textSellerieChange(){
    this.inputTextSellerie.emit(this.textSellerie);
  }

  showAllColors() {
    this.showColors = true;
  }

  showAllSelleries() {
    this.showSelleries = true;
  }

  toggleEvent() {
    this.collapseEvent.emit(this.isClosedColorCollapse)
  }
}
