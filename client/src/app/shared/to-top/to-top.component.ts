import { Component, HostListener, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-to-top',
    templateUrl: './to-top.component.html',
    styleUrls: ['./to-top.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class ToTopComponent implements OnInit {
  show: boolean = false;
  scrollOffset: number = 200;

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event: any) {
    this.show = this.config.getWindow().scrollY > this.scrollOffset;
  }

  constructor( private config: ConfigService) { }

  ngOnInit(): void {
  }
  
  toTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
