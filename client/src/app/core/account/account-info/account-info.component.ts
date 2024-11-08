import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { IMAGE_LOADER, ImageLoaderConfig, NgIf, NgOptimizedImage } from '@angular/common';


@Component({
    selector: 'app-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.css'],
    standalone: true,
    imports: [NgIf, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class AccountInfoComponent {

  @Input() accountInfo: any;
  @Output() disconnectAction = new EventEmitter<boolean>();
  siteUrl: string;

  constructor(private config: ConfigService) { }

  ngOnInit(){
    this.siteUrl =this.config.getSiteUrl()
  }

  disconnect() {
    this.accountInfo = null;
    this.disconnectAction.emit(true);
  }
}
