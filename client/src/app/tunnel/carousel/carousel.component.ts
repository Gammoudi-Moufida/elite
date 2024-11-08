import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location, NgIf, NgFor, NgClass, DecimalPipe, NgOptimizedImage } from '@angular/common'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import { Devis } from '../devis';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import algoliasearch from 'algoliasearch';
@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, NgClass, DecimalPipe, NgOptimizedImage]
})
export class CarouselComponent implements OnInit {

  screenWidth: number = 992;
  carrouselImgs : string[] = [];
  carrouselItems = []

  imgIndex = 0 ;
  carrouselImgsLength: number;
  readyCarrousel:boolean = false;
  currentIndex: number = 0;
  carrouselMode:number = 0;
  widthCamera: number = 32;
  width3D: number = 24;

  searchClient: any;
  index: any;
  isFlashSale: any;

  @Input()  devis: Devis;
  @Input()  colorCheck: any;
  imgUrl: string;
  typePage: string;
  currentIni: number =0;
  swipeLeft:boolean= false;
  swipeRight:boolean= false;
  constructor(
    private config : ConfigService,
    private location: Location,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platform: Object,
    private modalService: NgbModal) {
      this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
      this.index = this.searchClient.initIndex(this.config.algolia.indexName)
     }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.typePage = params.typePage
    })
    if(isPlatformBrowser(this.platform)){
      this.screenWidth = this.config.getWindow()?.innerWidth;
   }
    this.imgUrl = this.config.getNewImgUrl();
    // carrousel images
    if(this.devis.carousel.starterreImg && this.devis?.carousel?.images.length > 0){
      this.carrouselImgsLength = this.devis.carousel.images.length
      this.devis.carousel.images.forEach((element, index) => {
        if (index == 0) {
          this.carrouselItems.push(
            {carrouselImg: element.url , active: true}
          )
        } else  {
          this.carrouselItems.push(
            {carrouselImg: element.url , active: false}
          )
        }
      });
    }else if(this.devis.carousel.imagesExtInt.length > 0 && this.devis.carousel.type != 'occasion'){
      this.carrouselImgsLength = this.devis.carousel.imagesExtInt.length

        if( this.devis?.carousel?.images.length == 1){
          this.devis.carousel.imagesExtInt.splice(0,1, this.devis?.carousel?.images[0].url)
        }

        this.devis.carousel.imagesExtInt.forEach((element, index) => {
          if (index == 0) {
            this.carrouselItems.push(
              {carrouselImg: element , active: true}
            )
          } else  {
            this.carrouselItems.push(
              {carrouselImg: element , active: false}
            )
          }
        });
     
    }else if (this.devis.carousel.images.length > 0 || this.devis.carousel.type == 'occasion'){
        this.carrouselImgsLength = this.devis.carousel.images.length
        this.devis.carousel.images.forEach((element, index) => {
          if (index == 0) {
            this.carrouselItems.push(
              {carrouselImg: element.url , active: true}
            )
          } else  {
            this.carrouselItems.push(
              {carrouselImg: element.url , active: false}
            )
          }
        });
     }
  }

openImg(content:any) {
  this.modalService.open(content, {size: 'xl',windowClass:'carrousel-modal'});
}

nextModal() {
  let currentIndex = this.carrouselItems.findIndex((elm) => elm.active == true)
  this.carrouselItems.forEach((value, index) => {
    if (index == currentIndex + 1) {
      value.active = true
    } else {
      value.active = false
    }
  });
}

prevModal() {
  let currentIndex = this.carrouselItems.findIndex((elm) => elm.active == true)
  this.carrouselItems.forEach((value, index) => {
    if (index == currentIndex - 1) {
      value.active = true
    } else {
      value.active = false
    }
  });
}

onCheck(currentIndex:number) {
  this.carrouselItems.forEach((value, index) => {
    if (index == currentIndex) {
      value.active = true
    } else {
      value.active = false
    }
  });
  this.currentIni= this.carrouselItems.findIndex((elm) => elm.active == true)
}

onScrollTop() {
  this.config.getDocument().getElementById('pic-range').scrollBy(0,-80)
}

onScrollBottom() {
  this.config.getDocument().getElementById('pic-range').scrollBy(0,80)
}

onSwipeSliderRight(evt,index) {
  this.swipeLeft=false;
  this.swipeRight =true;
  if (index < this.carrouselItems.length-1){
    this.carrouselItems[index].active=false;
    this.carrouselItems[index+1].active=true;
  }
  this.currentIni= this.carrouselItems.findIndex((elm) => elm.active == true)
}
onSwipeSliderLeft(evt,index) {
  this.swipeLeft =true;
  this.swipeRight =false;
  if (index!=0){
    this.carrouselItems[index].active=false;
    this.carrouselItems[index-1].active=true;
    }
    this.currentIni =  this.carrouselItems.findIndex((elm) => elm.active == true)
  }
}