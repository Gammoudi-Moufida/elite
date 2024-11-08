import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ConfigService } from 'src/app/shared/config/config.service';
import algoliasearch from 'algoliasearch';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CarsFilters } from './filters';

@Component({
  selector: 'app-home-next-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule, NgOptimizedImage],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://image.elite-auto.fr/${config.src}`;
      }
    },
  ]
})
export class FiltersComponent implements OnInit{
  @Input() bgImgUrl: string;
  @Input() screenMode: number;
  @Input() bestDiscount: number;
  autoCompleteList: any[];
  carsFilters: CarsFilters = new CarsFilters();
  searchClient: any;
  index: any;
  screenWidth: number;
  minHeight: string;
  eliteAutoUrl: string;
  protocol: string;
  isBlockOpen: boolean = false;
  type: string;
  @HostListener('window:resize', ['$event'])
  onResize() {
      this.screenWidth = this.config.getWindow().innerWidth;
      this.setDynamicBackgroundImage();
  }

  constructor(private config: ConfigService, private router: Router) { 
    this.searchClient = algoliasearch(this.config.algolia.appId, this.config.algolia.appKey);
    this.index = this.searchClient.initIndex(this.config.algolia.indexName);
  }
  ngOnInit(): void {

    
    this.screenWidth = this.config.getWindow().innerWidth;
    this.setDynamicBackgroundImage()

    this.eliteAutoUrl = this.config.getEliteAutoHostName()
    this.protocol = this.config.getProtocol()
    this.type = this.config.getType();
  }
   async onChangeText() {
    if (this.carsFilters.text && this.carsFilters.text.replace(/\s+/g, '').length > 0) {
      await this.delay(300);
      this.index.search(this.carsFilters.text, {
        attributesToRetrieve: ['marqueModelNormalizedAutoComplete', 'marqueModeleAutoComplete'],
        hitsPerPage: 50
      }
      ).then(({ hits}) => {
       
        let datasList = hits;
        this.autoCompleteList = [];
        this.autoCompleteList[0] = (this.carsFilters.text).toUpperCase();
        for (let i = 0; i < datasList.length; i++) {
          if (!this.autoCompleteList.includes(datasList[i].marqueModeleAutoComplete)) {
            this.autoCompleteList.push((datasList[i].marqueModeleAutoComplete));
          }
        }
      });
    }
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map(term => term.length < 1 ? []
      : this.autoCompleteList)
  )

  redirect(type:string) { 
    var url = "recherche"

    if (this.carsFilters.text){
      url= url + this.index?.indexName+"[query]=" + this.carsFilters.text
      var split =  url.split(this.index?.indexName); 
      var url = split[0] + '?'+this.index?.indexName + split.slice(1).join('&'+this.index?.indexName)
    }
    
    if(this.screenMode == 1){
      this.isBlockOpen = true
    }

    if(type == 'filter'){
      this.router.navigateByUrl(url, { state: { isBlockOpen: this.isBlockOpen } });
    }else{
      this.router.navigateByUrl(url);
    }
    
  }

  setDynamicBackgroundImage() {
    const baseUrl = 'https://image.elite-auto.fr/home/bg-img';
    let modeSuffix;
    if (this.screenWidth < 700) {
    modeSuffix = '-mob.webp'; // mobile mode
    } else if (this.screenWidth < 1140) {
    modeSuffix = '-tab.webp'; // tablet mode
    } else {
    modeSuffix = '-desk.webp'; // desktop mode
    }
    const imageType = (this.type == 'entreprise') ? 'vu' : '';
    this.bgImgUrl = `${baseUrl}-${imageType}${modeSuffix}`;
  }

 
}
