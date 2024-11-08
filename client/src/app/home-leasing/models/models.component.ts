import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-home-leasing-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgOptimizedImage]
})
export class ModelsComponent implements OnInit {

  @Input() leasingCategoriesUrls: any[] ;
  @Input() screenMode: number;
  constructor() { }

  ngOnInit(): void {
  }

}
