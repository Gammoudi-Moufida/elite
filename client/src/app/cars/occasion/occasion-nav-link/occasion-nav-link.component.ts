import { Component, Input, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Router, Event as EventRouter, NavigationStart } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import { MarkService } from '../../mark/mark.service';
import { OccasionService } from '../occasion.service';
import { NgIf, NgFor, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-occasion-nav-link',
    templateUrl: './occasion-nav-link.component.html',
    styleUrls: ['./occasion-nav-link.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, SlicePipe]
})
export class OccasionNavLinkComponent implements OnInit {

  @Input() mark: string;
  @Input() model: string;
  @Input() transmission: string;
  @Input() typePage: string;
  @Input() fuel: string;
  @Input() typeCar: string;
  @Input() typeVeh: string;

  list: any;
  isCollapsed : boolean;
  markEurotaxId: number;
  links: any;
  LIST = makeStateKey<any>('occasionResultList');
  LINKS = makeStateKey<any>('occasionResultLinks');
  TITLE = makeStateKey<any>('occasionResultTitle');
  res: any;
  markTitleCase: string;
  title: string;
  



  constructor( private service: OccasionService,private markService: MarkService,private router: Router,private state: TransferState,private config: ConfigService) {
    this.router.events.subscribe((event: EventRouter) => {
      if (event instanceof NavigationStart) {
        //**** reset transferState data when navigate new route ****//
        this.state.set(this.LIST,  null);
        this.state.set(this.LINKS,  null);
      }
    });
  }

  ngOnInit(): void {
    this.isCollapsed = true
    this.markTitleCase = this.titleCaseText(this.mark?.replace(/-/g, ' '))
    this.getList();
  }

  getList(){
    let links = this.state.get(this.LINKS, null);
    let list = this.state.get(this.LIST, null);  
    let title = this.state.get(this.TITLE, null);  
    if (list && links ) {
      this.list = list;
      this.links = links;
      this.title = title;
    }
    else{
      this.service.getGammeAndServices(this.mark,this.model,this.transmission,this.fuel, this.typeCar,this.typeVeh).subscribe(
      data => {
        this.title = data?.title
        this.list = data.list.sort((a, b) => { 
          return a.nom.localeCompare(b.nom)
        });
        this.state.set(this.LIST, <any> this.list );
        this.state.set(this.TITLE, <any> this.title );
        this.markEurotaxId= data?.markEurotaxId

        if(this.markEurotaxId){
          this.markService.getGammeLinks(this.markEurotaxId, this.typePage,null).subscribe(
            data => {
              this.links = data.menuTab
              this.state.set(this.LINKS, <any> this.links );
            }
          )
        } 
      })
    }
  }

  titleCaseText(text){
    return text?.toString().charAt(0).toUpperCase() + text?.toString().slice(1).toLowerCase()
  }
  
  scrollToTop(){
    this.config.getWindow().scroll(0,0)
  }
  verify(){
    let newLinks : any = []
    if(this.links){
      if(this.typePage =='occasion_model' || this.typePage =='occasion_generation'){
        newLinks = this.links.filter(item => (!item.title.toLowerCase().includes('entreprise') && !item.title.toLowerCase().includes('profession') && !item.title.toLowerCase().includes('occasion')));
      }else{
        newLinks = this.links
      }
      return newLinks
    }
  }

}
