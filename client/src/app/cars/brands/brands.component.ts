import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { ConfigService } from 'src/app/shared/config/config.service';
import { BrandsService } from "../brands/brands.service";
import { NgIf, NgFor, TitleCasePipe, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig, isPlatformBrowser } from '@angular/common';
import { HomeNextService } from 'src/app/home-next/home-next.service';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, TitleCasePipe, NgOptimizedImage],
    providers: [
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          return `https://image.elite-auto.fr/${config.src}`;
        }
      },
    ]
})
export class BrandsComponent implements OnInit {
    // variables disponible dans le fichier html
    marque: any;
    nbBrands: number;
    imgUrl: string;
    h1Page: string = "Toutes nos voitures neuves";
    googleTagData: string;
    homeTagData: string;
    MARQUES_KEY = makeStateKey<any>('marque');
    NB_BRANDS_KEY = makeStateKey<number>('nbBrands');
    HOME_TAG_DATA_KEY = makeStateKey<string>('homeTagData');
    Mark_HTML_kEY  = makeStateKey<string>('htmlContent');
    markHtml: string;
    type: string;
    breadcrumbList: any;
    siteUrl: string;
 
    constructor(
        private service: BrandsService,
        private config: ConfigService,
        private title: Title, 
        private meta: Meta, 
        private state: TransferState,
        private homeService: HomeNextService,
        @Inject(PLATFORM_ID) private platform: Object
    ) { }

    ngOnInit(): void {    
        this.homeTagData = this.state.get(this.HOME_TAG_DATA_KEY, null);
        this.type = this.config.getType()
        this.siteUrl = this.config.getSiteUrl()
        this.generateAndAppendBreadcrumbScript()
       
         
        if (this.type == "leasing") {
            this.h1Page = "Toutes nos voitures en leasing";
        }

        if (this.type == "entreprise") {
            this.h1Page = "Tous nos véhicules utilitaires"
        }
        this.imgUrl = this.config.getNewImgUrl();

        this.marque = this.state.get(this.MARQUES_KEY, null);
        this.nbBrands = this.state.get(this.NB_BRANDS_KEY, null);
        this.markHtml  = this.state.get(this.Mark_HTML_kEY, null);
        
        if(!this.marque || !this.nbBrands){
            this.service.getBrands().subscribe(data => {
                this.title.setTitle(data.titrePage);
                this.meta.addTag({
                    name: 'description',
                    content: data.descriptionPage,
                });
                this.marque = data.marque;
                this.nbBrands = data.nbMarque;
                this.markHtml=data.htmlContent
                this.state.set(this.MARQUES_KEY, <any> data.marque);
                this.state.set(this.NB_BRANDS_KEY, <any>  data.nbMarque);
                this.state.set(this.Mark_HTML_kEY, <any> data.htmlContent);
            })
        }

        if(!this.homeTagData){
            this.getTags();
        }
            
    }

    getTags() {
        this.homeService.getTagsHome().subscribe(data => {
            this.config.getWindow().document.getElementById('taghome').innerHTML = data.content;
            this.homeTagData = data
            this.state.set(this.HOME_TAG_DATA_KEY, <string>data.content);
        })
    }
    generateAndAppendBreadcrumbScript() {
        const itemList = [
            {
              "@type": "ListItem",
              "position": 1,
              "item": { "@id": `${this.siteUrl}${this.type === "leasing" ? "leasing" : ""}` },
              "name": "Elite Auto"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Nos marques"
            }
          ];
          
        this.breadcrumbList = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: itemList
        };

        const breadcrumbListElement = this.config.getWindow().document.createElement('div');
        breadcrumbListElement.id = 'breadcrumbList';
    
        const script = this.config.getWindow().document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(this.breadcrumbList, null, 2);
        breadcrumbListElement.appendChild(script);
        this.config.getWindow().document.body.appendChild(breadcrumbListElement);
        
    }

    numSequence(n: number): Array<number> {
      return Array(n);
    }
}
