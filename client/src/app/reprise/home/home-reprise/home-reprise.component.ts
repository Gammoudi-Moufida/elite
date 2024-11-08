import { Component, HostListener, OnInit } from '@angular/core';
import { Meta, Title, TransferState, makeStateKey } from '@angular/platform-browser';
import { ConfigService } from 'src/app/shared/config/config.service';
import { RepriseService } from '../../reprise.service'
import { RepriseBannerComponent } from '../reprise-banner/reprise-banner.component';
import { RepriseBrandsComponent } from '../reprise-brands/reprise-brands.component';
import { RepriseInformationsComponent } from '../reprise-informations/reprise-informations.component';
import { NgIf, TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-reprise',
  templateUrl: './home-reprise.component.html',
  styleUrls: ['./home-reprise.component.css'],
  standalone: true,
  imports: [RepriseBannerComponent, RepriseBrandsComponent, RepriseInformationsComponent, NgIf, TitleCasePipe],
})
export class HomeRepriseComponent implements OnInit {
  screenMode: number;
  screenWidth: number;
  brands: any;
  nbMarque: any;
  showPlaceholder: boolean = true;
  BRANDS_KEY = makeStateKey('brands');
  NB_MARQUE_KEY = makeStateKey('nbMarque');
  titlePage: any;
  descriptionPage: any;
  TITLE_KEY = makeStateKey('titlePage');
  DESCRIPTION_KEY = makeStateKey('descriptionPage');
  typePage: string;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }

  constructor(
    private config: ConfigService,
    private service: RepriseService,
    private state: TransferState,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
    this.route.params.subscribe(params => {
      this.typePage = params['typePage'];
    })
    this.brands = this.state.get(this.BRANDS_KEY, null);
    this.nbMarque = this.state.get(this.NB_MARQUE_KEY, null);
    this.titlePage = this.state.get(this.TITLE_KEY, null);
    this.descriptionPage = this.state.get(this.DESCRIPTION_KEY, null);

    if (!this.brands) {
      this.getBrands()
    } else {
      this.showPlaceholder = false;
    }
    if (!this.titlePage && !this.descriptionPage) {
      this.getData();
    }
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

  getBrands() {

    this.service.getBrandsDatas().subscribe(
      data => {
        this.brands = data
        this.nbMarque = data?.length
        this.showPlaceholder = false;
        this.state.set(this.BRANDS_KEY, <any>this.brands);
        this.state.set(this.NB_MARQUE_KEY, <any>this.nbMarque);
      })
  }

}