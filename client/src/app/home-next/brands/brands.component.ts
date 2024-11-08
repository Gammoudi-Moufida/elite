import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-next-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent{
  @Input() brands : any;
  @Input() nosmarques_url : string; 
  @Input() screenMode : number;

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
