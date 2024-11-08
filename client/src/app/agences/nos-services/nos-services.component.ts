import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nos-services',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.css']
})
export class NosServicesComponent {
  @Input() isElite: boolean = false;
  @Input() address: boolean = false;

}
