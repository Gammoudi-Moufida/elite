import { Component, OnInit, Input} from '@angular/core';
import { ConfigService } from '../../../shared/config/config.service';
import { MarkService } from '../../mark/mark.service';
import { ModelService } from '../../model/model.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-shared-avis-list',
    templateUrl: './avis-list.component.html',
    styleUrls: ['./avis-list.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, NgbRatingModule]
})
export class AvisListComponent implements OnInit {
  @Input() mark: number;
  @Input() markName: number;
  @Input() type: string;
  @Input() isModel: boolean;
  page: number = 1;
  avisList:any;
  pages:number;
  totalAvis:number;

  constructor(
    private conf: ConfigService,
    private serviceMark: MarkService,
    private serviceModel: ModelService,
    
  ) {
  }

  ngOnInit() {
    this.getAvisList();
  }

  setPageNext(){
    this.page++;
    this.getAvisList();
  }

  setPagePrev(){
    this.page--;
    this.getAvisList();
  }

  getAvisList(){
    if(this.isModel)
      this.serviceModel.getSalesRate(this.mark, this.type, this.page).subscribe(
        data =>{
            this.avisList = data.avisTab;
            this.pages = data.totalPages
            this.totalAvis = data.totalAvis
          } 
        )
      else
      this.serviceMark.getSalesRate(this.mark, this.type, this.page).subscribe(
        data =>{
            this.avisList = data.avisTab;
            this.pages = data.totalPages
            this.totalAvis = data.totalAvis
          } 
        )
  }

 
}
 