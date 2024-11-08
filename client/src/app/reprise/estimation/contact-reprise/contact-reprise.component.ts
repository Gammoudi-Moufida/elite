import { Component, Input } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { RepriseSelectedVehicule, RepriseVehiculeInfos } from '../../reprise';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
  selector: 'app-contact-reprise',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './contact-reprise.component.html',
  styleUrls: ['./contact-reprise.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class ContactRepriseComponent {
  @Input() selectedVehicule: RepriseSelectedVehicule;
  @Input() repriseEstimation: RepriseVehiculeInfos = new RepriseVehiculeInfos();
  @Input() suggestCalendlyReservation: boolean;


}
