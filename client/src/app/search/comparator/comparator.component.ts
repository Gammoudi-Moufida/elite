import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ComparatorService } from './comparator.service'
import { isPlatformBrowser, Location, NgClass, NgIf, NgFor, DatePipe } from '@angular/common'
import { ConfigService } from 'src/app/shared/config/config.service';
import algoliasearch from 'algoliasearch';
import { AlgoliaCardService } from '../algolia-card/algolia-card.service';
import { AlgoliaCardComponent } from '../algolia-card/algolia-card.component';

@Component({
    selector: 'app-comparator',
    templateUrl: './comparator.component.html',
    styleUrls: ['./comparator.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, NgFor, AlgoliaCardComponent, DatePipe]
})
export class ComparatorComponent implements OnInit {

  totalCompare = 0
  comparedveh: number[] = []
  dataFind: any;
  results: any[] = [];
  math = Math;
  blockFixed: boolean;
  event: any;

  leftPosition: string;
  topPosition: string;
  showSticky: boolean = false;
  index: any;
  searchClient: any;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any): void {
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if (this.config.getWindow().document.scrollingElement.scrollTop > 70) {
      this.blockFixed = true;
    }
    else {
      this.blockFixed = false;
    }

    if (this.isVisible() == true) {
      this.showSticky = false
    } else {
      this.showSticky = true
    }
    this.onScroll();
  }



  constructor(
    private cardService: AlgoliaCardService,
    private comparatorService: ComparatorService,
    private location: Location,
    private config: ConfigService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex(this.config.algolia.indexName);
  }

  ngOnInit(): void {
    this.checkCompareEvent()
    
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.comparedveh.forEach(el =>{
      this.index.search('',{
        filters: 'id='+el
       }).then(({ hits }) => {
        this.results.push( hits[0] )        
      });
    })
    this.searchResult();
  }


  onScroll() {
    const element = document.getElementById("section");
    const element2 = document.getElementById("sticker");
    if (element && element2) {
      this.leftPosition = "-" + (element.scrollLeft) + "px"
      element2.style.left = this.leftPosition;
    }
  }

  backAction() {
    this.location.back();
  }

  checkCompareEvent() {
    this.comparedveh = this.cardService.getCompareSelectedVeh()
    this.totalCompare = this.comparedveh.length
  }

  searchResult() {
    if (this.comparedveh.length > 0) {
        this.comparatorService.getPromoData(this.comparedveh.join('-')).subscribe(
          res => {
            this.results.forEach(element => {
              element.technicalInfos = res[element.id]
            });
          }
        )
    }

  }

  deleteAction(id: string, index: number) {
    let result = this.cardService.getCompareCookie().replace("," + id + ",", "")
    this.cardService.setCompareCookie(result)
    this.checkCompareEvent()
    this.results.splice(index, 1)
  }

  isVisible() {
    var element = this.config.getWindow().document.getElementById('marqueModel');
    var screenWidth = this.config.getWindow().innerWidth;
    if (element) {
      const { top, bottom } = element.getBoundingClientRect();
      const vHeight = (this.config.getWindow().innerHeight || this.config.getWindow().document.documentElement.clientHeight);
      if (screenWidth >= 768) {
        this.topPosition = (top * -1) - 40 + "px"
      } else {
        this.topPosition = (top * -1) + 95 + "px"
      }
      return (top > -280);
    }
    return;
  }

}
