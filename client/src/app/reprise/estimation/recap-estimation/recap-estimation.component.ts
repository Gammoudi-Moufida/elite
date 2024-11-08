import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationRepriseDetails, RepriseSelectedVehicule, RepriseVehiculeInfos } from '../../reprise';
import { RepriseService } from '../../reprise.service';

@Component({
  selector: 'app-recap-estimation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recap-estimation.component.html',
  styleUrls: ['./recap-estimation.component.css']
})
export class RecapEstimationComponent implements OnInit {
  repriseData: EstimationRepriseDetails = new EstimationRepriseDetails();
  urlToPageMark: string = "";

  constructor(
    private service: RepriseService,
  ) { }

  @Input() selectedVehicule: RepriseSelectedVehicule;
  @Input() repriseEstimation: RepriseVehiculeInfos = new RepriseVehiculeInfos();
  @Output() stepperEvent = new EventEmitter();
  @Output() suggestCalendlyReservation = new EventEmitter();

  ngOnInit(): void {
    this.stepperEvent.emit(100);
    let arrayOfDpClient = ['75','77','78','91','92','93','94','95','28'];
    if (this.repriseEstimation) {
      this.service.getRenderInformationVeh(this.repriseEstimation.estimationRepriseData.idReprise).subscribe(data => {
        this.repriseData = data
        if ((arrayOfDpClient.indexOf(this.repriseData.cpClient.slice(0, 2))) > -1)
          this.suggestCalendlyReservation.emit(true);
        else
          this.suggestCalendlyReservation.emit(false);
      })
    }
    this.geMarkUrl(this.selectedVehicule.sMarque);
  }

  geMarkUrl(slugMark){
    if(slugMark){
      this.service.getEurotaxId(slugMark).subscribe(
        data => {
          if (data) {
            let eurotaxId = data
            this.urlToPageMark = "/voiture-" + slugMark.toLowerCase() + "-" + eurotaxId + ".html";
          } 
      })
    }

  }

}
