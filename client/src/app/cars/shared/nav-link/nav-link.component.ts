import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { MarkService } from '../../mark/mark.service';
import { NgIf, NgFor, NgClass, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-shared-nav-link',
    templateUrl: './nav-link.component.html',
    styleUrls: ['./nav-link.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, SlicePipe]
})
export class NavLinkComponent implements OnInit {

  type: any;
  links: any;
  marqueName: string;
  nbLinks: number;
  sousLinks: any;
  isCollapsed : boolean;

  @Input() mark: number; 
  @Input() eurotaxModelId: number; 
  @Input() typePage: string; 

  constructor(
    private service: MarkService,
    private config: ConfigService) { }

  ngOnInit(): void {
    this.isCollapsed = true

    if(this.config.getType() == "leasing"){
      this.type = "lease"
    }else if (this.config.getType() == "www"){
      this.type = "new"
    }else
      this.type = "utility"

      this.service.getGammeLinks(this.mark, this.type, this.eurotaxModelId).subscribe(
        data => {
          this.marqueName = data.marqueName
          this.links = data.menuTab
          this.nbLinks = data.menuTab.length
          for (let i = 0; i < this.nbLinks; i++) {
            if(this.links[i]['sousLink'])
            this.sousLinks = this.links[i]['sousLink']  
          }
        }
      )
  }

  verify(){
    let newLinks : any = []
    if(this.links){
      if(this.typePage =='modelVn' || this.typePage =='tarif' || this.typePage =='modelMoinsCherRewrite'|| this.typePage =='marque_modele_offres_finition_vn' || this.typePage =='marque_modele_offres_motorisation_vn'){
        newLinks = this.links.filter(item => (!item.title.toLowerCase().includes('neuve') && !item.title.toLowerCase().includes('entreprise') && !item.title.toLowerCase().includes('profession')));
      }else if(this.typePage == 'lease' || this.typePage == 'marque_modele_offres_finition_lease' || this.typePage == 'marque_modele_offres_motorisation_lease'){
        newLinks = this.links.filter(item => (!item.title.toLowerCase().includes('leasing')));
      }else if(this.typePage == 'marque_modele_offres_finition_utility' || this.typePage == 'marque_modele_offres_motorisation_utility'){
        newLinks = this.links.filter(item => (!item.title.toLowerCase().includes('utilitaire')));
      }else if(this.typePage == 'marqueVnMoteur'){
        newLinks = this.links.filter(item => (!item.title.toLowerCase().includes('entreprise') && !item.title.toLowerCase().includes('profession')));
      }else{
        newLinks = this.links
      }
      return newLinks
    }
  }

}
