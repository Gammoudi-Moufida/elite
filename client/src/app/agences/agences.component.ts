import { Component, HostListener } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NosServicesComponent } from './nos-services/nos-services.component';
import { ConfigService } from '../shared/config/config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MetaService } from 'src/app/shared/meta/meta.service';

@Component({
  selector: 'app-agences',
  standalone: true,
  imports: [CommonModule, RouterLink, NosServicesComponent, NgOptimizedImage],
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class AgencesComponent {
  screenWidth: number;
  screenMode: number;
  agences: any;
  secureAgences: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  constructor(private config: ConfigService, private sanitizer: DomSanitizer, private metaService: MetaService) {}
  ngOnInit() {
    this.agences = [
      // Agences de Proxauto
        {
          name: "Elite Auto - Proxauto",
          location: "Fontenay-le-Vicomte",
          mapImg: "agences/agence_lecoudray.png",
          mapSource: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5282.377584876257!2d2.404939!3d48.548776!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5dd38da7bf7c1%3A0x6b097f06ce31bb87!2sProxauto - Elite Auto!5e0!3m2!1sfr!2stn!4v1714116545725!5m2!1sfr!2stn" class="map-agence map-agence-big" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          address: "11 Rue de l'Orme, 91540 Fontenay-le-Vicomte",
          phoneNumber: "01 64 57 20 00",
          isElite: false,
          openingHours: [
            {
              days: "Le lundi",
              hours: "9h à 13h et de 14h à 17h"
            },
            {
              days: "Du mardi au vendredi",
              hours: "9h à 12h30 et de 14h à 18h"
            },
            {
              days: "Le samedi",
              hours: "9h à 17h"
            }
          ],
          videoSource: "https://images.elite-auto.fr/proxauto/video/Video_proxauto.mov",
          navette: {
              description: "Une navette gratuite est mise à votre disposition dès votre arrivée en gare de MENNECY ( ligne RER D ) si vous empruntez les transports en commun.",
              phoneNumber: "07 83 08 19 70"
          }
      },
      {
        name: "Elite Auto - Proxauto",
        location: "Le Coudray-Montceaux",
        mapImg: "agences/agence_fontenay.png",
        mapSource: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10561.266130852791!2d2.476477!3d48.565486!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e7417eeed811%3A0xc6fed6699b1947d0!2sProxauto - Elite Auto!5e0!3m2!1sfr!2stn!4v1714116524721!5m2!1sfr!2stn" class="map-agence" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        address: "Rue du Bois de l'Écu, 91830 Le Coudray-Montceaux",
        phoneNumber: "01 64 57 20 00",
        isElite: false,
        openingHours: [
          {
            days: "Le lundi et le samedi",
            hours: "9h à 13h et de 14h à 17h"
          },
          {
            days: "Du mardi au vendredi",
            hours: "9h à 12h30 et de 14h à 18h"
          }
        ],
        videoSource: "https://images.elite-auto.fr/proxauto/video/Video_proxauto.mov",
        navette: {
            description: "Une navette gratuite est mise à votre disposition dès votre arrivée en gare de MENNECY ( ligne RER D ) si vous empruntez les transports en commun.",
            phoneNumber: "07 83 08 19 70"
        }
      },
    
  ];
  this.secureAgences = this.agences.map(agence => {
    return {
      ...agence,
      secureMapSource: this.sanitizer.bypassSecurityTrustHtml(agence.mapSource)
    };
  });
  this.metaService.updateTitle('Nos agences Elite-auto');
  this.screenWidth = this.config.getWindow().innerWidth;
  this.visibleItemsDetector()
  }

  scroll(el){
    this.config.getWindow().document.getElementById(el).scrollIntoView({ behavior: "smooth" });
  }

  visibleItemsDetector() {
    if (this.screenWidth < 700) {
      // mobile mode
      this.screenMode = 1;
    } else if (this.screenWidth < 1140) {
      // tablet mode
      this.screenMode = 2;
    }
    else {
      // desktop mode
      this.screenMode = 3;
    }
  }

}
