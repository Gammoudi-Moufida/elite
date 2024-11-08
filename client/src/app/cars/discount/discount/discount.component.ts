import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from  '@angular/platform-browser';

@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.css'],
    standalone: true,
    imports: [ NgOptimizedImage ],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class DiscountComponent implements OnInit {

  subHeader: string;
  clubLogo: string;

  constructor(
    private title: Title,
    private meta: Meta,

  ) { }

  ngOnInit(): void {

    this.subHeader = "AUTOMOBILE NEUVE A PRIX DISCOUNT : VOITURE DISCOUNT"
    this.clubLogo = "https://www.elite-auto.fr/images/auto-plus-logo-new.png"

    this.title.setTitle("Auto Discount : voiture neuve à prix discount par mandataire automobile");
    this.meta.addTags([
      {
        name: 'description',
        content: "Voiture neuve à prix discount : remise jusqu'à 36% sur 7.000 autos et 32 grandes marques automobile pour acheter une auto discount neuve chez le mandataire Elite Auto créé il y a 17 ans.",
      },
      {
        name: 'format-detection',
        content: "telephone=no",
      },
      {
        name: 'viewport',
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
      },
      {
        name: 'format-detection',
        content: "telephone=no",
      },
      {
        'http-equiv': 'Content-Type',
        content: "text/html; charset=utf-8",
      },
      {
        'http-equiv': 'Content-Language',
        content: "fr",
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: "IE=edge,chrome=1",
      }
    ]);
  }

}
