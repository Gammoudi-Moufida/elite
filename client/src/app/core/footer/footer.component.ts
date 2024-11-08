import { isPlatformBrowser, KeyValue, NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute,Event, NavigationEnd, Router } from '@angular/router';
import { ModelService } from 'src/app/cars/model/model.service';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FooterService } from "../footer/footer.service";
import { TwCommunityComponent } from 'src/app/shared/tw-community/tw-community.component';
​
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, KeyValuePipe, TwCommunityComponent]
})
export class FooterComponent implements OnInit{
​
 
  currentYear: any;
  type: string;
  screenWidth: number;
  screenMode: number;
  links: any;
  footerColumn: any;
  footerColumn1: any;
  footerColumn2: any;
  hostname: string;
  typePage: string;
  id: any;
  isLoaded: boolean= false ;
  currentRoute: string;
  modelId: any = null;
  slugMark: any = null;
  slugModel: any = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.screenWidth = this.config.getWindow().innerWidth;
      this.visibleItemsDetector();
  }

  constructor(private config: ConfigService,private service: FooterService,private router: Router,
    private route: ActivatedRoute,private modelservice: ModelService,@Inject(PLATFORM_ID) private platform: Object) {
      this.config.getWindow().addEventListener('PageIsReady', (evt) => {
        if(!this.isLoaded)
          this.createFooter()
      });
      this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
              this.createFooter()
          }
      });
     }
​
  ngOnInit() {
      this.createFooter()
​
    this.hostname = this.config.getType();
    this.currentYear = new Date().getFullYear();
    this.visibleItemsDetector();
  }
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
​
  async createFooter(){
    this.isLoaded= true 
    await this.route.queryParams.subscribe(params => {
      this.id = params['CODEMARQUE'];
      this.slugMark = null;
      this.slugModel = null;
    })
​
    await this.route?.children[0]?.params.subscribe(params => {
      
      if(params['mark']!=='CODEMARQUE')
          this.id = params['mark']?params['mark']:null;
          this.type = params['type'];
          this.typePage = params['typePage'];
          this.typePage = this.typePage=='occasion'?'search':this.typePage;

          this.slugMark = params['slug']?params['slug']:null;
          this.modelId = params['model']?params['model']:null
          if (this.typePage == 'modele'){
            this.slugModel = params['slugModel']
            this.slugMark = params['slugMark'];
          }
          if (this.typePage == 'search' || this.typePage == 'carburantMarque' || this.typePage == 'marqueCarburantUtility'){
            this.id = null
            this.slugMark = params['mark']?params['mark']:null;
          }
          if ((this.type == 'occasion' && this.typePage != 'devis')){
            this.id = null
            this.modelId = null
            this.slugMark = params['mark']?params['mark']:null;
            this.slugModel = params['model']?params['model']:null;
          }
          if(this.type == 'marqueVnMoteur')
            this.slugMark = params['slugMark']?params['slugMark']:null;
​
          if (this.typePage == 'devis'){
            this.id = params['offerId'];
            this.modelId = null
            this.slugMark = null;
            this.slugModel = null;
          }

          if(this.typePage == 'home_reprise' || this.typePage == 'estimation_reprise' || this.typePage == 'estimation_mark_reprise'){
            this.type = 'reprise'
            if(this.typePage == 'estimation_mark_reprise'){
              this.id = null;
              this.modelId = null
              this.slugMark = params['mark'];
              this.slugModel = null;
            }
          }
​
          if (this.typePage == 'modele'){
            this.modelId = params['model'];
          }
​
          if(params['fuel'] == 'neuve'){
            this.type = 'tarif'
          }
​
          else if(params['fuel'] == 'diesel' || params['fuel'] == 'autre' || params['fuel'] == 'electrique' || params['fuel'] == 'hybride'){
            this.type = 'tarifCarburant'
          }
          
          if ((this.typePage == 'home' || this.typePage == 'newHome' || this.typePage == 'devis') && this.hostname == 'leasing'){
            this.type = 'lease'
          }
​
          else if((this.typePage == 'home' || this.typePage == 'newHome' || this.typePage == 'devis') && this.hostname == 'entreprise'){
            this.type = 'utility'
          }
​
          if (this.modelId != '.asp' && this.typePage){
            this.service.getFooter(this.id, this.slugMark, this.modelId, this.slugModel, this.type, this.typePage).subscribe(
              data => {
                if (data.dataFooter){
                this.footerColumn = data.dataFooter[0]
                this.footerColumn1 = data.dataFooter[1]
                this.footerColumn2 = data.dataFooter[2]
              }
                this.links = data.linksBas
              }
            ) 
          }
            if (this.modelId == '.asp'){
              this.modelservice.getRedirectMoinsCherConfig(params['mark']).subscribe(
                res => {
                  if (res.toRedirect == false) {
                    this.modelservice.getMarqueModelId(params['mark']).subscribe(
                      res => {
                        this.slugModel = null
                        this.service.getFooter(res.eurotaxId, this.id, res.modelId, this.slugModel, this.type, this.typePage).subscribe(
                          data => {
                            this.footerColumn = data.dataFooter[0]
                            this.footerColumn1 = data.dataFooter[1]
                            this.footerColumn2 = data.dataFooter[2]
                            this.links = data.linksBas
                          }
                        )
                      })
                  }
                })
              }
            }
          )
        }

  
  visibleItemsDetector() {
   if (this.screenWidth < 576) {
        // tablet mode
        this.screenMode = 1;
    }
    else {
        // desktop mode
        this.screenMode = 2;
    }
  }
}