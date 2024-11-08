import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-home-leasing-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css'],
    standalone: true,
    imports: [NgFor, NgOptimizedImage]
})
export class QuestionsComponent implements OnInit {

  @Input() screenMode: number;
  @Input() imgUrl: string;
  @Input() cardsQuestions:any

  constructor() { }

  ngOnInit(): void {
  }

}
