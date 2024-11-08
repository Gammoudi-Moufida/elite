import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
  selector: 'app-stock-nav-link',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, SlicePipe],
  templateUrl: './stock-nav-link.component.html',
  styleUrls: ['./stock-nav-link.component.css']
})
export class StockNavLinkComponent {
  @Input() list : any
  isCollapsed: boolean;
  constructor(private config: ConfigService) { }

  ngOnInit(): void {
    this.isCollapsed = true
  }
  scrollToTop(){
    this.config.getWindow().scroll(0,0)
  }
}
