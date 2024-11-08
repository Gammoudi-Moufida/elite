import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-next-models',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  @Input() categoriesModels : any; 

  constructor(
    ) {}

    ngOnInit() {
    }
  
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
