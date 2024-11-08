import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';
import { EstimationComponent } from '../estimation/estimation.component';
import { RecapEstimationComponent } from '../recap-estimation/recap-estimation.component';
import { RepriseVehiculeInfos } from '../../reprise';
import { ContactRepriseComponent } from '../contact-reprise/contact-reprise.component';
import { RepriseService } from '../../reprise.service';
import { Meta, Title, TransferState, makeStateKey } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estimation-steps',
  standalone: true,
  imports: [CommonModule, StepperComponent, RecapEstimationComponent, EstimationComponent, ContactRepriseComponent],
  templateUrl: './estimation-steps.component.html',
  styleUrls: ['./estimation-steps.component.css']
})
export class EstimationStepsComponent {
  selectedCar: any;
  stepperProgress: any;
  repriseEstimation: RepriseVehiculeInfos = new RepriseVehiculeInfos();
  @Output() selectedEvent = new EventEmitter();
  @Input() isMarkPage : boolean = false;
  titlePage: any;
  descriptionPage: any;
  TITLE_KEY = makeStateKey('titlePage');
  DESCRIPTION_KEY = makeStateKey('descriptionPage');
  typePage: string;
  
  constructor(
    private service: RepriseService,
    private state: TransferState,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.typePage = params['typePage'];
    })

    this.titlePage = this.state.get(this.TITLE_KEY, null);
    this.descriptionPage = this.state.get(this.DESCRIPTION_KEY, null);

    if (!this.titlePage && !this.descriptionPage && this.typePage) {
      this.getData();
    }
  }
  selectedCarEvent(ev) {
    this.selectedCar = ev;
    this.selectedEvent.emit(true);
  }

  getData() {
    this.service.getReferencement(this.typePage,null,null).subscribe(data => {
      this.title.setTitle(data.title);

      this.meta.addTag({
        name: 'description',
        content: data.description,
      });
      this.state.set(this.TITLE_KEY, <any>data.title);
      this.state.set(this.DESCRIPTION_KEY, <any>data.description);
    });
  }

  stepperEvent(ev) {
    if (ev)
      this.stepperProgress = ev;
    else
      this.stepperProgress = 1;
  }
  repriseSimulationSelected(ev) {
    this.repriseEstimation = ev;
  }
  suggestCalendlyReservation(ev) {
    this.suggestCalendlyReservation = ev;
  }
}
