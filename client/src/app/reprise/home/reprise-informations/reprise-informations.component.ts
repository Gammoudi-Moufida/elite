import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { RepriseService } from '../../reprise.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reprise-informations',
  templateUrl: './reprise-informations.component.html',
  styleUrls: ['./reprise-informations.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class RepriseInformationsComponent implements OnInit {

  @Input() screenMode: any;
  showMore1:boolean = false;
  showMore2:boolean = false;
  showMore3:boolean = false;
  showMore4:boolean = false;
  showMore5:boolean = false;
  showMore6:boolean = false;
  imgUrl: string = this.config.getNewImgUrl() + '/reprise/images';
  data: any;
  INFORMATIONS_DATA = makeStateKey('informationsData');
  public ready = false;

  constructor(private config:ConfigService, private service : RepriseService, private state: TransferState) { }

  ngOnInit(): void {
    this.data = this.state.get(this.INFORMATIONS_DATA, null);
    if (!this.data) {
      this.service.getInformations().subscribe(
        res => {
          this.data = res;
          this.ready = true;
          this.state.set(this.INFORMATIONS_DATA, <any> this.data);
        }
      )}else {
        this.ready = true;
    }
  }
}
