import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from '../client/client.component';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis, financementObject } from '../devis';
import { ReservationComponent } from '../reservation/reservation.component';
import { OffreDetailsComponent } from '../offre-details/offre-details.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TunnelService } from '../tunnel.service';
import { NgClass, NgIf, NgFor, UpperCasePipe, DecimalPipe, TitleCasePipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

@Component({
    selector: 'app-tunnel-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, NgbRatingModule, NgFor, NgbTooltipModule, FormsModule, ReactiveFormsModule, UpperCasePipe, DecimalPipe, TitleCasePipe, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class SummaryComponent implements OnInit {
  isCollapsed = false;
  isCollapsed2 = true;
  isClosedCollapse1 = true;
  isClosedCollapse2 = true;
  screenWidth: number;
  @Input()  devis: Devis; 
  @Input()  totalPrice: number; 
  @Input()  bestLoaPrice: number; 
  @Input()  bestLoaInfo: financementObject; 
  @Input()  verif: boolean; 
  @Input()  message: string; 
  @Input()  loadDevis: boolean; 
  @Input()  isLoadedSave: boolean;  
  @Input()  loader: boolean;  
  @Input()  remiseMessage: any;  
  @Input()  discretionRemise: boolean;  
  @Input()  textAvantageClient: boolean;  
  @Input()  isLease: boolean;  
  @Input()  elitePrice: number; 
  @Input()  tvaPrice: number;
  @Input()  ttcPrice: number;
  @Output() submitFormClient = new EventEmitter<any>(); 
  @Output() submitFormReservation = new EventEmitter<any>(); 
  @Output() loaPriceClicked = new EventEmitter<boolean>(); 
  @Output() formClientClicked = new EventEmitter<boolean>(); 
  @Output() emptyRedirectEvent = new EventEmitter<string>(); 
  
  imgUrl: string;
  showReservationForm: boolean = false;
  showFormClient: boolean = false;
  typePage: string;
  callbackForm: UntypedFormGroup;
  submitted: boolean = false;
  msgAlert: string;
  constructor(
    private config: ConfigService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private service: TunnelService
  ) {
    this.callbackForm = this.formBuilder.group({
      tel: ['', [Validators.required, Validators.pattern("^0[0-9]{9}$")]],
    });
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.typePage = params.typePage
    })
    this.screenWidth = this.config.getWindow()?.innerWidth;
    this.imgUrl = this.config.getNewImgUrl()
    this.devis.lienOffre = this.config.getWindow().location.href
  }

  openFormClient(){
    const modalRef = this.modalService.open(ClientComponent, { size: 'lg'});
    modalRef.componentInstance.devis = this.devis
    modalRef.componentInstance.isLoadedSave = this.isLoadedSave
    modalRef.componentInstance.submitFormClientAction.subscribe((receivedEntry) => {
      this.submitFormClient.emit(receivedEntry)
      })
  }
  openReservationForm(){
    const modalRef = this.modalService.open(ReservationComponent, { size: 'lg'});
    modalRef.componentInstance.devis = this.devis
    modalRef.componentInstance.isLoadedSave = this.isLoadedSave
    modalRef.componentInstance.message = this.message
    modalRef.componentInstance.totalPrice = this.totalPrice
    modalRef.componentInstance.tvaPrice = this.tvaPrice
    modalRef.componentInstance.submitFormReservationAction.subscribe((receivedEntry) => {
      this.submitFormReservation.emit(receivedEntry)
      })

      modalRef.componentInstance.emptyRedirectEvent.subscribe((receivedEntry) => {
        this.emptyRedirectEvent.emit(receivedEntry)
        })

  }
  toggleLoaPrice(){
    this.isClosedCollapse2 = false;
    this.loaPriceClicked.emit(this.isClosedCollapse2)
  }

  open() {
    const modalRef = this.modalService.open(OffreDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.devis = this.devis
    modalRef.componentInstance.totalPrice = this.totalPrice
    modalRef.componentInstance.elitePrice = this.elitePrice
    modalRef.componentInstance.tvaPrice = this.tvaPrice
    modalRef.componentInstance.ttcPrice = this.ttcPrice
  }

  scrollToAvis() {
    if(this.config.getWindow().document.getElementById('avisList'))
      this.config.getWindow().document.getElementById('avisList').scrollIntoView({ behavior: "smooth", block: "start" });
  }

  get f() { return this.callbackForm.controls; }

  onSubmit(){
    this.runScript('form_rappel_produit_submit');
    this.submitted = true;
    if (this.callbackForm.valid) {
      this.devis.client = this.callbackForm.value
      this.service.saveCallback(this.devis).subscribe(
        res => {
          if(res.success){
            this.runScript('form_rappel_produit_succes');
            this.msgAlert = res.message
            this.callbackForm.controls.tel.disable()
          }else{
            this.msgAlert = res.message
          }
        },
        err => {
            console.error('There was an error!', err);
          }
        )
    }
  }

  runScript(evName: string) {
    const script = this.config.getWindow().document.createElement('script');
    script.innerHTML  = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          "event": "${evName}"
      });
    `;
    this.config.getWindow().document.getElementById('taggoogle').append(script);
  }

  toggleGarantie(){
    this.isCollapsed = !this.isCollapsed
  }
  toggleProvenance(){
    this.isCollapsed2 = !this.isCollapsed2
  }
}
