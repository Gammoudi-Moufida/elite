import { Component, HostListener, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AccountService } from "./account.service";
import { AccountInfoComponent } from './account-info/account-info.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    standalone: true,
    imports: [NgIf, AccountInfoComponent]
})
export class AccountComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any): void {
    if (this.config.getWindow().document.scrollingElement.scrollTop > 10) {
      this.config.getWindow().document.getElementById("account-infos").style.top = "0";
    }else{
      this.config.getWindow().document.getElementById("account-infos").style.top ="50px";
    }
  }
  password: string;
  email: string;
  validEmail: boolean;
  siteUrl: string;
  loadingLogin: boolean;
  loginError: boolean;
  imgUrl: string;
  infoLoading: boolean;
  data: any;
  dataError: any;
  loginUrl:string

  constructor(private config: ConfigService, private service: AccountService) { }

  ngOnInit() {
    this.siteUrl =this.config.getSiteUrl()
    this.imgUrl =this.config.getNewImgUrl()
    this.loginUrl = this.siteUrl+'account/connexion'
      this.infoLoading = true
      this.service.infos().subscribe(
        
        data => {
          if (data) {
            this.data = data
          }
          else
          {
            this.config.getWindow().location.href = this.loginUrl
          }
          this.infoLoading = false
        }
      );    
  }

  inputedEmailAction() {
    var emailPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
    if (String(this.email).search(emailPattern) != -1) {
      this.validEmail = true
    } else {
      this.validEmail = false
    }
  }

  connect() {
    this.loadingLogin = true;
    this.loginError = false;
    this.service.login(this.email, this.password).subscribe(
      res => {
        if (res.etat == true) {
           this.getInfo();
        } else {
          this.dataError = res;
          this.loadingLogin = false;
          this.loginError = true;
          this.password = null;
        }
      },
      err => this.loadingLogin = false
    );
  }

  getInfo() {
    this.service.infos().subscribe(
      data => {
        this.loadingLogin = false
        if (data) {
          this.data = data
        }
        else
        {
          this.config.getWindow().location.href = this.loginUrl
        }
        
      }
    );
  }

  disconnectAction($event){
    this.data = null;
    this.service.logout().subscribe();
  }

}
