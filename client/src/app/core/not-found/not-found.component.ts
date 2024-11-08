import {Component, Inject, OnInit, Optional} from '@angular/core';
import { Router } from '@angular/router';
import {RESPONSE} from '@nguniversal/express-engine/tokens';
import {Response} from 'express';
import { FormsModule } from '@angular/forms';
import { ConfigService } from 'src/app/shared/config/config.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class NotFoundComponent implements OnInit {

  textSearch: string;
  
  constructor( private router: Router, @Optional() @Inject(RESPONSE) private response: Response, 
  private config: ConfigService) {
  }
  ngOnInit() {
    if(this.response)
      this.response.status(404);  
  }
  findAction(textSearch : string) {
    let url ='recherche'
    if(textSearch){
        url= url + "?prod_ELITE_OFFERS[query]=" + textSearch
    }
    this.router.navigateByUrl(this.router.url.replace('not-found', url));
  }
}
