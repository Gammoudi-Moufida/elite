import { Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RepriseService } from '../../reprise.service';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { SidenavComponent } from 'src/app/cars/mark/sidenav/sidenav.component';
import { EstimationStepsComponent } from '../estimation-steps/estimation-steps.component';
import { Meta, Title, TransferState, makeStateKey } from '@angular/platform-browser';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
  selector: 'app-mark-reprise-estimation',
  standalone: true,
  imports: [CommonModule, SidenavComponent, EstimationStepsComponent],
  templateUrl: './mark-reprise-estimation.component.html',
  styleUrls: ['./mark-reprise-estimation.component.css']
})
export class MarkRepriseEstimationComponent {
  mark: any;
  cars: any;
  gamme: any;
  type: string;
  links: any;
  eurotaxId: any;
  selectedVehicule: boolean = false;
  showMore: boolean = false;
  typePage: string;
  titlePage: any;
  descriptionPage: any;
  RES_KEY = makeStateKey('resultat');
  TITLE_KEY = makeStateKey('titlePage');
  DESCRIPTION_KEY = makeStateKey('descriptionPage');
  LINKS_KEY= makeStateKey('linksService');
  textHaut: any;
  textBas: any;
  isTextOpen: boolean = true;
  textBasArray: any[];
  isTextBasOpen: boolean[] = [true,true,true,true,true,true,true,true];
  model: any;
  breadcrumbList: any;
  siteUrl: string;
  res: any;

  constructor(
    private route: ActivatedRoute,
    private serviceReprise: RepriseService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private config: ConfigService,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platform: Object,
    private state: TransferState,

  ) { }

  ngOnInit() {
    this.siteUrl = this.config.getSiteUrl();
    this.route.params.subscribe(params => {
      this.mark = params['mark'];
      this.model = params['model'] ? params['model'] : null; 
      this.typePage = params['typePage'];
    })
    
    this.res = this.state.get(this.RES_KEY, null);
    this.titlePage = this.state.get(this.TITLE_KEY, null);
    this.descriptionPage = this.state.get(this.DESCRIPTION_KEY, null);
    this.links = this.state.get(this.LINKS_KEY, null);
    this.getData();

    this.serviceReprise.getEurotaxId(this.mark).subscribe(
      data => {
        if(data)
          this.eurotaxId = data
        if(!this.textHaut || !this.textBas)
          this.getTexts();
        if(this.eurotaxId)
          this.getLinks(this.mark, this.eurotaxId);
    })
  }

  getLinks(slugMark, eurotaxId){
    if(!this.links){
          this.serviceReprise.getServiceLinksForMark(slugMark, eurotaxId).subscribe(
      data =>{
        this.links = data
        this.state.set(this.LINKS_KEY, <any>this.links);
      }
    )
    }
  }

  getTexts() {
    if(this.model){
      this.serviceReprise.getTextsForBrandPage(this.mark,this.model).subscribe(
        data => {
          this.textHaut = data.textHaut ? data.textHaut : null
          this.textBas = data.textBas ? data.textBas : null
  
          if(this.textHaut){
            this.textHaut = this.textHaut.split('</p>')[1]
          }
          let test = this.textBas.split('<h2')
          this.textBasArray = []
          test.forEach(element => {
            if(element.length > 0)
            this.textBasArray.push(element.split('</h2>'))
          });
  
          this.textBasArray.forEach(element => {
            element[0] = '<h2' + element[0] + '</h2>'
          })
          this.textBasArray = this.textBasArray.slice(1,this.textBasArray.length)
        }
      )
    }else{
      this.serviceReprise.getTextsForBrandPage(this.mark,null).subscribe(
        data => {
          this.textHaut = data.textHaut ? data.textHaut : null
          this.textBas = data.textBas ? data.textBas : null
  
          if(this.textHaut){
            this.textHaut = this.textHaut.split('</p>')[1]
          }
          let test = this.textBas.split('<h2')
          this.textBasArray = []
          test.forEach(element => {
            if(element.length > 0)
            this.textBasArray.push(element.split('</h2>'))
          });
  
          this.textBasArray.forEach(element => {
            element[0] = '<h2' + element[0] + '</h2>'
          })
        }
      )
    }
  }

  selectedEv(ev) {
    this.selectedVehicule = true;
  }

  
  getData() {
    if (!this.res && !this.titlePage && !this.descriptionPage) {
      this.serviceReprise.getReferencement(this.typePage, this.mark, this.model).subscribe(data => {
        this.res = data
        this.title.setTitle(data.title);
        this.meta.addTag({
          name: 'description',
          content: data.description,
        });
        if(data?.menu){
          this.generateAndAppendBreadcrumbScript(data.menu)
        }
        this.state.set(this.RES_KEY, <any>this.res);
        this.state.set(this.TITLE_KEY, <any>data.title);
        this.state.set(this.DESCRIPTION_KEY, <any>data.description);
      });
    }else{
      this.state.set(this.RES_KEY, <any>this.res);
      this.state.set(this.TITLE_KEY, <any>this.titlePage);
      this.state.set(this.DESCRIPTION_KEY, <any>this.descriptionPage);
    }
  }

  generateAndAppendBreadcrumbScript(data) {
    const itemList = data.map((item, index) => {
      let fullURL = `${item?.url?.startsWith("http") ? item?.url : `${this.siteUrl.replace(/\/$/, '')}${item?.url}`}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": { "@id": fullURL },
        "name": item.text.replace(/"/g, '')
      };
    });
    
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
  
}
