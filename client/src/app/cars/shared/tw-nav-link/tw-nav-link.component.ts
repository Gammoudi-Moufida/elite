import { Component, Input } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tw-nav-link',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './tw-nav-link.component.html',
  styleUrls: ['./tw-nav-link.component.css']
})
export class TwNavLinkComponent {
  @Input() links: any; 
  isCollapsed: boolean;


  ngOnInit(): void {
    this.isCollapsed = true
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
