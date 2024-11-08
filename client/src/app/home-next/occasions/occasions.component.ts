import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-next-occasions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './occasions.component.html',
  styleUrls: ['./occasions.component.css']
})
export class OccasionsComponent {
  @Input() brands: any
  @Input() screenMode : number;
  
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
