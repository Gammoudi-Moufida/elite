import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ViewChild, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkService } from "../mark/mark.service";
import { ConfigService } from 'src/app/shared/config/config.service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';
import { AvisComponent } from '../../shared/avis/avis.component';
import { RewardComponent } from '../shared/reward/reward.component';
import { AvisListComponent } from '../shared/avis-list/avis-list.component';
import { ListComponent } from './list/list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TextSeoComponent } from '../shared/text-seo/text-seo.component';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';

@Component({
    selector: 'app-car-sale-mark',
    templateUrl: './mark.component.html',
    styleUrls: ['./mark.component.css'],
    standalone: true,
    imports: [NgIf, SubHeaderComponent, TextSeoComponent, SidenavComponent, ListComponent, AvisListComponent, RewardComponent, AvisComponent]
})

export class MarkComponent implements OnInit {
  gamme: any;
  showImg: boolean;
  type: string;
  screenWidth: number;
  showGammeCategory: boolean;
  screenMode: number;
  avis: any;
  mark: number;
  links: any;
  cars: any;
  subHeaderData: any;
  topTextData: any;
  rateData: any;
  textBas: any;
  nbPage: any;
  currentPage: number;
  page: number;
  isBrowser: boolean;
  event: Event;
  dataIsReady: boolean = false;
  subDomaine: string;
  @ViewChild(HeaderComponent) headerChild: HeaderComponent;

  canonicalUrl: string;
  existData: boolean = false;
  eurotaxModelId: any;
  slug: string;
  redirectRoute: string;
  marqueRedirect: boolean;
  breadcrumbList: any;
  siteUrl: string;
  

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.showImg = true
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if (!this.existData) {
      this.getSupplementDatas()
    }
  }

  @HostListener('window:click') clickInside() {
    this.showImg = true;
    this.event = new Event('PageIsReady');
    this.config.getWindow().dispatchEvent(this.event);
    if (!this.existData) {
      this.getSupplementDatas()
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  constructor(
    private service: MarkService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private title: Title,
    private meta: Meta,
    private router: Router,
    
    @Inject(PLATFORM_ID) private platform: Object,
    @Optional() @Inject(RESPONSE) private response: Response
  ) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platform);
    this.subDomaine = this.config.getType();
    this.screenWidth = this.config.getWindow().innerWidth ? this.config.getWindow().innerWidth : 1024;
    this.siteUrl = this.config.getSiteUrl();
    this.visibleItemsDetector();
    this.route.queryParams.subscribe(params => {
      this.mark = params['CODEMARQUE'];
    })

    this.route.params.subscribe(params => {
      this.marqueRedirect = params['marqueRedirect']?true:false;
      if (params['mark'] !== 'CODEMARQUE')
        this.mark = params['mark'];
        this.slug = params['slug'];
      this.type = params['type'];
      if (
        (this.config.getLocation().hostname.split('.')[0] == "www" && (this.marqueRedirect))
        || (this.config.getLocation().hostname.split('.')[0] == "leasing" && (!this.marqueRedirect))
        || (this.subDomaine == 'entreprise' && this.type != 'utility')
        || (this.subDomaine == 'www' && (['marqueVn', 'new_ref_marques', 'newTarif', 'marqueMoinsCherRewrite', 'marqueRemiseRewrite', 'refMarqueSeule', 'marque_redirect'].indexOf(this.type) == -1))
      ) {
        this.mark = 0
        if (this.response)
          this.response.status(404);
        this.router.navigateByUrl('/not-found', { skipLocationChange: true });
      }
      else {
        if (this.type == 'marqueRemiseRewrite' && !this.router.url.endsWith('.html')) {
          if (this.response) {
            this.response.status(301);
            this.response.setHeader('Location', this.router.url + '.html');
            this.response.end();
          }
        }
        if (this.marqueRedirect == true) {
          let newUrl = this.config.getProtocol() + "//" + this.config.getLocation().hostname.replace('leasing.', 'www.')+ ":" + this.config.getLocation().port
          if (this.response) {
            this.response.status(301);
            this.response.setHeader('Location', newUrl + '/leasing/'+this.slug+'-'+this.mark);
            this.response.end();
          }
        }
        if (this.type == 'marque_redirect') {
            this.redirectRoute ="/voiture-" +  this.slug + "-" +  this.mark + ".html"
            if (this.response){ 
              this.response.status(301);
              this.response.setHeader('Location',this.redirectRoute);
              this.response.end();
            }
        }else{
        this.service.getReferencement(this.mark, this.slug, this.type).subscribe(
          data => {
            this.title.setTitle(data.title);
            this.meta.addTag({
              name: 'description',
              content: data.description,
            });
            if(data.canonicalUrl)
              this.canonicalUrl = data.canonicalUrl
            else
              this.canonicalUrl = this.config.getCanonicalUrl()
              
            this.createCanonicalURL(this.canonicalUrl);


            this.service.getGammeList(this.mark, this.type).subscribe(data => {
              this.cars = data.dataTableOffre;
              this.gamme = data;
            })


            this.service.getSubHeader(this.mark, this.type).subscribe(
              data => {
                this.subHeaderData = data
                this.subHeaderData.type = this.type
                if(data?.menu){
                  this.generateAndAppendBreadcrumbScript(data.menu)
                }
                this.dataIsReady = true;
              }
            )

            this.service.getTopText(this.mark, this.type).subscribe(
              data => {
                this.topTextData = data.textHaut
              }
            )

            if (this.screenWidth > 700) {
              this.getSupplementDatas()
            }
            this.getTags();
          }
        );
        }
      }
    });
  }

  getSupplementDatas() {
    this.existData = true
    this.service.getFootText(this.mark, this.type).subscribe(
      data => {
        this.textBas = data.textBas
      }
    )

    this.service.getEkomi().subscribe(
      data => {
        this.avis = data.listeEkomi
      }
    )

    this.service.getGammeLinks(this.mark, this.type, this.eurotaxModelId).subscribe(
      data => {
        this.links = data
      }
    )


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

  closeModal() {
    this.showGammeCategory = false;
    this.config.getWindow().document.getElementById('new_footer').style.display = "block";
  }

  openModal() {
    this.showGammeCategory = true;
    this.config.getWindow().document.getElementById('new_footer').style.display = "none";
  }

  createCanonicalURL(url) {
    (this.config.getWindow().document.querySelectorAll('[rel="canonical"]')).forEach(link => link.remove())
    let link;
    link = this.config.getWindow().document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.config.getWindow().document.head.appendChild(link);
    link.setAttribute('href', url);
  }
  getTags() {
    this.service.getTagSchema(this.mark, this.type).subscribe(data => {
      this.config.getWindow().document.getElementById('schematag').innerHTML = data;
    })
    this.service.getTagGoogle(this.mark, this.type).subscribe(data => {
      this.config.getWindow().document.getElementById('taggoogle').innerHTML = data;
    })
  }

  generateAndAppendBreadcrumbScript(data) {
    const itemList = data.map((item, index) => {
      let fullURL = `${item.url.startsWith("https") ? item.url : `${this.siteUrl.replace(/\/$/, '')}${item.url}`}`;

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