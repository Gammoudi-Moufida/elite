import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnChanges {

  constructor(
    private config: ConfigService
  ) { }
  stepperStyle: { "width.%": number; } = { "width.%": 1 };
  screenWidth: number;
  screenMode: number;

  @Input() stepperProgress: number;

  ngOnInit() {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  ngOnChanges() {
    if (this.stepperProgress)
      this.stepperStyle = { "width.%": this.stepperProgress };
    this.visibleItemsDetector();
  }
  visibleItemsDetector() {
    if (this.screenWidth < 767) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 991) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
  }
}
