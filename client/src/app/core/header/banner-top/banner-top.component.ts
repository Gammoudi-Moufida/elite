import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';

@Component({
    selector: 'app-banner-top',
    templateUrl: './banner-top.component.html',
    styleUrls: ['./banner-top.component.css'],
    standalone: true,
    imports: [NgIf, NgStyle]
})
export class BannerTopComponent implements OnInit {
  @Input() bannerTop:any;
  @Input() type:any;
  showBanner: boolean;

  constructor() { }

  ngOnInit(): void {
    if(this.bannerTop.domaine){
        if(this.bannerTop.domaine.indexOf(this.type) != -1){
          this.showBanner = true
        }else{
          this.showBanner = false
        }
     }
}

}
