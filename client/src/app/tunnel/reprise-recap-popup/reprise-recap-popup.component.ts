import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-reprise-recap-popup',
    templateUrl: './reprise-recap-popup.component.html',
    styleUrls: ['./reprise-recap-popup.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, DecimalPipe, NgOptimizedImage]
})
export class RepriseRecapPopupComponent implements OnInit {
  
  @Input() reprise: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }

}
