import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ScrollToFragmentService  {
  fragment: string | null = null;

  constructor(private route: ActivatedRoute, private config: ConfigService) {
    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;
    });
  }

  scrollToFragment(): void {
    var element = this.config.getWindow()?.document?.getElementById(this.fragment);
    var bodyRect = this.config.getWindow()?.document?.body?.getBoundingClientRect()?.top;
    if(element !== null){
      var elementRect = element.getBoundingClientRect().top;
      var elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
  
}
