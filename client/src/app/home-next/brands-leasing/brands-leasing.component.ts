import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-next-brands-leasing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-leasing.component.html',
  styleUrls: ['./brands-leasing.component.css']
})
export class BrandsLeasingComponent {
  @Input() brands : any;
  @Input() screenMode : number;
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
