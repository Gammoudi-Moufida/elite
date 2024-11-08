import { Component, HostListener, OnInit, PLATFORM_ID, Inject, Renderer2 } from '@angular/core';
import { isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { ConfigService } from './shared/config/config.service';
import { FooterComponent } from './core/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { HomeNextService } from './home-next/home-next.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, NgIf, FooterComponent, NgClass]
})

export class AppComponent implements OnInit {
  title = 'client';
  isBrowser: boolean;
  showImg: boolean = false;
  isPrivatePage: boolean = false;
  googleTagUserData: any;
  GOOGLE_TAG_DATA_KEY= makeStateKey<string>('googleTagUserData');

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.isBrowser = false;
    this.showImg = true
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: any) {
    this.isBrowser = false;
    this.showImg = true
  }

  @HostListener('window:click') clickInside() {
    this.showImg = true;
  }

  constructor(@Inject(PLATFORM_ID) private platform: Object, private config: ConfigService, private homeService : HomeNextService, private state: TransferState) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platform);
    this.isPrivatePage = this.config.getLocation().pathname == "/vente-privee"
    this.checkAndAddMetaTag()
    this.googleTagUserData = this.state.get(this.GOOGLE_TAG_DATA_KEY, null);
    this.getUserInformationsForGT4()
  }

  addMetaTag(): any {
    const currentDomain = this.config.getWindow().location.hostname;
    const allowedDomains = ['www.preprod.leclubsolution.fr', 'www.leclubsolution.fr'];
  
    if (allowedDomains.includes(currentDomain)) {
      const metaTag = this.config.getDocument().createElement('meta');
      metaTag.setAttribute('name', 'robots');
      metaTag.setAttribute('content', 'noindex, nofollow');
      this.config.getDocument().head.appendChild(metaTag);
    }
  }

  checkAndAddMetaTag(): void {
    const existingMetaTag = this.config.getDocument().querySelector('meta[name="robots"]');
    if (!existingMetaTag) {
      this.addMetaTag();
    }
  }

  async getUserInformationsForGT4(): Promise<void>  {
    if (!this.googleTagUserData) {
      const data = await this.homeService.getScriptForConnectedUser().toPromise();

      this.googleTagUserData = `
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(${data});
      `;

      this.state.set(this.GOOGLE_TAG_DATA_KEY, <string>this.googleTagUserData);
    }
    const scriptForConnectedUser = this.config.getWindow().document.createElement('script');
    scriptForConnectedUser.textContent = this.googleTagUserData;
    this.config.getWindow().document.head.appendChild(scriptForConnectedUser);
  }  

}
