import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/shared/config/config.service';
import { ClientComponent } from '../client/client.component';
import { Devis, financementObject } from '../devis';
import { TunnelService } from '../tunnel.service';
import { FinanceDetailsComponent } from '../finance-details/finance-details.component';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DecimalPipe, JsonPipe, LowerCasePipe } from '@angular/common';

@Component({
    selector: 'app-financement',
    templateUrl: './financement.component.html',
    styleUrls: ['./financement.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule, FormsModule, NgFor, FinanceDetailsComponent, DecimalPipe, JsonPipe, LowerCasePipe]
})
export class FinancementComponent implements OnInit {
  
  @Input() duration: number;
  @Input() apport: number;
  @Input() kilometrage: number;
  @Input() devis: Devis;
  @Input() loader: boolean;
  @Input() isLoaPriceClicked: boolean = false;  
  @Input() isLease: boolean;  
  
  @Output() dureeChangeAction = new EventEmitter<number>(); 
  @Output() apportChangeAction = new EventEmitter<number>(); 
  @Output() kilometrageChangeAction = new EventEmitter<number>(); 
  @Output() selectFinancementAction = new EventEmitter<any>(); 
  @Output() openFinancementDetails = new EventEmitter<boolean>(); 
  @Output() isSelectedFinancement = new EventEmitter<boolean>(); 
  @Output() isSelectedNoFinancement = new EventEmitter<boolean>(); 
  @Output() collapseEvent = new EventEmitter<boolean>(); 
  @Output() submitFormClient = new EventEmitter<any>(); 
  imgUrl: string;
  infosLoa: financementObject;
  withFinancement: boolean = true;
  screenWidth: number;
  maxApportValue: number;
  financementSelected: boolean = true;
  isSelected: boolean = true;
  
  constructor(
    private config : ConfigService, 
    private modalService: NgbModal,
    private service:  TunnelService
  ) { }

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
    this.screenWidth = this.config.getWindow()?.innerWidth;
     if(this.screenWidth<600){
      this.isLoaPriceClicked=false
    }
    this.toggleEvent();
    this.maxApportValue = 15000
  }
  durationChange( ) {
    this.dureeChangeAction.emit(this.duration)
  }
  apportChange( ) {  
    this.apportChangeAction.emit(this.apport)
  }
  kilometrageChange( ) {
    this.kilometrageChangeAction.emit(this.kilometrage)
  }

  selectFinancement(financement) {
    if (!financement.selected) {
      this.reset();
      financement.selected = true;
      this.financementSelected = true
      this.isSelected = true
      this.isSelectedFinancement.emit(this.financementSelected)
      this.isSelectedNoFinancement.emit(this.isSelected)
    }
    this.selectFinancementAction.emit(this.devis.simulationFinancement)
  }

  infosFinancement(financement) {
    this.infosLoa = financement;
  }

  assuranceSelected(){
    this.selectFinancementAction.emit(this.devis.simulationFinancement)
  }
  
  open(content: any, modalSize:string) {
    this.modalService.open(content, {size: modalSize})
  }

  selectNoFinancement(){
    this.financementSelected = true
    this.isSelected = false
    if(!this.withFinancement){
      this.reset();
      this.withFinancement = true
    }
    this.isSelectedNoFinancement.emit(this.isSelected)
  }

  reset(){
    this.withFinancement = false
    this.devis?.simulationFinancement?.financements.forEach(
      fn => {
        fn.selected = false
      })
  }

  openCollapse(){
    this.isLoaPriceClicked =! this.isLoaPriceClicked
    this.openFinancementDetails.emit(this.isLoaPriceClicked)
  }

  toggleEvent() {
    this.collapseEvent.emit(this.isLoaPriceClicked)
  }
  openFormClient(financement){
    this.reset()
    financement.selected=true
    this.financementSelected = true
    this.selectFinancementAction.emit(this.devis.simulationFinancement)
    const modalRef = this.modalService.open(ClientComponent, { size: 'lg'});
    modalRef.componentInstance.devis = this.devis
    modalRef.componentInstance.isLoadedSave = false
    modalRef.componentInstance.submitFormClientAction.subscribe((receivedEntry) => {
      this.submitFormClient.emit(receivedEntry)
      })
  }

}
