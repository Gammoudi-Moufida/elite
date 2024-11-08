import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../../shared/config/config.service';
import { NgbDropdownModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-model-sub-header',
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, NgbDropdownModule, NgbRatingModule]
})
export class SubHeaderComponent implements OnInit {

  @Input() data: any;
  @Input() screenMode: number
  @Input() isOccasion: boolean = false;
  @Input() isMark:boolean=false;
  dropMenu: boolean = false;
  imgUrl: string;

  constructor(private config:ConfigService) {}

  ngOnInit(): void {
    this.imgUrl = this.config.getNewImgUrl();
  }

  scrollToAvis() {
    if(this.config.getWindow().document.getElementById('avisList'))
      this.config.getWindow().document.getElementById('avisList').scrollIntoView({ behavior: "smooth", block: "start" });
  }

}