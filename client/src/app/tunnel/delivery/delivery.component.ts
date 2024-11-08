import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbCollapseModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis } from '../devis';
import { TunnelService } from '../tunnel.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass, NgFor, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, NgbTypeaheadModule, FormsModule, NgClass, NgFor, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class DeliveryComponent implements OnInit {
  
  res:any;
  postalCode: any
  @Input() devis: Devis;
  @Input() loadDelivery: boolean;
  @Input() isClosedDeliveryCollapse = true;
  @Output() postalCodeChangeAction = new EventEmitter<string>(); 
  @Output() selectedLivaison = new EventEmitter<any>(); 
  @Output() collapseEvent = new EventEmitter();
  WebUrl: string;
  imgUrl: string;
  searching: boolean;
  searchFailed: boolean;
  screenWidth: number;
  constructor(
    private service: TunnelService,
    private config:ConfigService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.WebUrl = this.config.getWebUrl();
    this.imgUrl= this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow()?.innerWidth;
  }

  postalCodeChange() {
    if(this.postalCode?.code)
      this.postalCodeChangeAction.emit(this.postalCode?.code)  
      else
      this.postalCodeChangeAction.emit('-1')  
  }

  selectPartenaire(data){
    this.devis.delivery.selectedPartner = data
    this.selectedLivaison.emit(this.devis.delivery)
  }

  selectPartenaireFirstType(event){
    if(event.target.checked){
      event.target.checked = true;
      this.devis.delivery.partenaireType = 1
    }else{
      this.devis.delivery.partenaireType = 0
    }
    this.selectedLivaison.emit(this.devis.delivery)
  }
keyup(event) {
 event.preventDefault();
 event.stopPropagation();
 return false;
  }
 onFocusOutEvent(event) {
  if( event.key=="Enter"){
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}
  selectPartenaireSecondType(event){
    if(event.target.checked){
      event.target.checked = true;
      this.devis.delivery.partenaireType = 2
    }else{
      this.devis.delivery.partenaireType = 0
    }
    this.selectedLivaison.emit(this.devis.delivery)
  }

  open(content: any, modalSize:string) {
    this.modalService.open(content, {size: modalSize})
  }

  toggleEvent() {
    this.collapseEvent.emit(this.isClosedDeliveryCollapse)
  }

search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(0),
  distinctUntilChanged(),
  tap(() => this.searching = true),
  switchMap(term =>    
    this.service.getcodePostaux(+term).pipe(
      tap(() => this.searchFailed = false),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }))
  ),
  tap(() => {
    this.searching = false
  })
)
formatter = (x: {code: string}) => x.code;

}
