import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, NgClass, UpperCasePipe, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-car-sale-mark-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, NgbCollapseModule, UpperCasePipe, SlicePipe]
})
export class SidenavComponent implements OnInit {

  @Input() links:any;
  @Input() type:string;
  @Output()  closeModal = new EventEmitter();

  isCollapsed : boolean;
  screenWidth: number;
  id: number;

  constructor(
    private config: ConfigService
    ) { }

  ngOnInit(): void {
    this.links.menuTab = this.links.menuTab.filter(item => (!item.title.toLowerCase().includes('entreprise') && !item.title.toLowerCase().includes('profession')));
    this.screenWidth = this.config.getWindow().innerWidth;
  }

  backAction() {
    this.closeModal.emit();
  }
}
