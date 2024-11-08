import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-leasing-lease-cards',
    templateUrl: './lease-cards.component.html',
    styleUrls: ['./lease-cards.component.css'],
    standalone: true
})
export class LeaseCardsComponent implements OnInit {
  @Input() cards:any

  constructor() { }

  ngOnInit(): void {
  }

}
