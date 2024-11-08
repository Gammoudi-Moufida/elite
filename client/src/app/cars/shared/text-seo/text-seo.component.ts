import { isPlatformBrowser, NgIf, NgFor, NgClass } from '@angular/common';
import { Component, HostListener, Inject, Input,OnChanges, PLATFORM_ID} from'@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-model-text-seo',
    templateUrl: './text-seo.component.html',
    styleUrls: ['./text-seo.component.css'],
    standalone: true,
    imports: [NgIf, NgbCarouselModule, NgFor, NgClass]
})
export class TextSeoComponent implements OnChanges {
  @Input() text: any;
  @Input() type: any;
  @Input() subtexttop: any = null;
  @Input() isTop: boolean;
  html: any;
  textLength: number;
  textHtml: string;
  mat: any;
  itemCarousel: any[] = [];
  isTextOpen: boolean = true;
  currentIndex = 0;

  constructor(private sanitizer: DomSanitizer,@Inject(PLATFORM_ID) private platform: Object, private config:ConfigService) {}
  ngOnChanges(): void {

  this.textLength = this.text?.split(' ').length
  this.mat=this.text?.match(/(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/g)
  let objecItem
  if(this.mat){
    this.mat.filter((x,index)=>
    (index==0?objecItem= {active:true,element:this.sanitizer.bypassSecurityTrustHtml(this.mat[0])}:objecItem={active:false, element:this.sanitizer.bypassSecurityTrustHtml(this.mat[index])},
    this.itemCarousel.push(objecItem))
    )
    this.text = this.text.replace(/(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/,"<div class='mt-3' id='carousel'></div>"); 
    this.text = this.text.replace(/(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/g,''); 
  }
  this.html = this.sanitizer.bypassSecurityTrustHtml(this.text);

  }

  toggleText() {
    this.isTextOpen = !this.isTextOpen;
  }

  ngAfterViewInit() {
    if(this.config.getWindow().document.getElementById('carousel'))
      this.config.getWindow().document.getElementById('carousel').appendChild(this.config.getWindow().document.getElementById("content"))
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.itemCarousel.length) % this.itemCarousel.length;
    this.updateSlideStatus();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.itemCarousel.length;
    this.updateSlideStatus();
  }

  updateSlideStatus() {
    this.itemCarousel.forEach((item, index) => {
      item.active = index === this.currentIndex;
    });
  }
}
