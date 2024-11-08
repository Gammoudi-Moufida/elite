import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Devis } from '../devis';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-video-testing',
    templateUrl: './video-testing.component.html',
    styleUrls: ['./video-testing.component.css'],
    standalone: true,
    imports: [NgIf, NgbCollapseModule]
})
export class VideoTestingComponent implements OnInit {

  isClosedCollapse = true;
  @Input()  devis: Devis; 
  safeURL: any;
  loadedSafeUrl: boolean;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  collapseChange (){
    if (!this.loadedSafeUrl) {
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.devis?.videoTesting?.video + "?rel=0");
      this.loadedSafeUrl = true
    }
  }

}
