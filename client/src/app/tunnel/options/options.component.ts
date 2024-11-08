import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis } from '../devis';
import { TunnelService } from '../tunnel.service';
import { NgIf, NgFor, DecimalPipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, NgFor, DecimalPipe, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class OptionsComponent implements OnInit {

  isClosedCollapse = true
  showAllOptions: boolean = false;
  offerId: number;
  @Output() optionSelected = new EventEmitter();
  @Output() guaranteeSelected = new EventEmitter();
  @Input()  devis: Devis; 
  @Input()  totalOptions: number; 
  siteUrl: string;
  isDisable: boolean = true;
  noGuarantee: boolean = true;
  imgUrl: string;
  screenWidth: number;
  urlWarantie: any;
  constructor(
    private modalService: NgbModal, 
    private config: ConfigService, 
    private service: TunnelService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.siteUrl = this.config.getSiteUrl();
    this.imgUrl = this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow()?.innerWidth;
    this.isClosedCollapse = this.service.visibleItemsDetector(this.screenWidth, this.isClosedCollapse)
    this.urlWarantie = this.sanitizer.bypassSecurityTrustResourceUrl(this.devis?.choiceOptions?.urlWarantie);
  }
   
  toggleOption(option) {
    option.selected = !option.selected;
    this.optionSelected.emit(this.devis?.choiceOptions?.options);
    }

  toggleTatoOption(event) {

    var tatoObject = {categ: 'tatouage', libelle:"Tatouage antivol - Gravage de toutes les vitres ( N° de châssis ) et inscription fichier Argos ( assurance )", referencePrixCatalogue:this.devis?.choiceOptions?.fraisGravage, referencePrixVente:this.devis?.choiceOptions?.fraisGravage, selected:event.target.checked, tatoOption : true};
    
    if(event.target.checked == true){
      this.devis?.choiceOptions?.options.push(tatoObject)
    }
    if(event.target.checked == false){
      this.devis?.choiceOptions?.options.pop()
    }
    this.optionSelected.emit(this.devis?.choiceOptions?.options);
    }
   
    selectGuarantee(guarantee) {
      if (!guarantee.selected) {
        this.reset();
        guarantee.selected = true;
      }
      this.guaranteeSelected.emit(this.devis?.choiceOptions?.guarantees)
    }

    selectNoGuarantee(){
      if (!this.noGuarantee) {
        this.reset();
        this.noGuarantee = true;
      }
    }
    
    reset() {
      this.noGuarantee = false;
      this.devis?.choiceOptions?.guarantees.forEach(element => {
        element.selected = false;
      });
      
    }

  showAll() {
    this.showAllOptions = true;
  }

  open(content: any, modalSize:string) {
    this.modalService.open(content, {size: modalSize})
  }

}
