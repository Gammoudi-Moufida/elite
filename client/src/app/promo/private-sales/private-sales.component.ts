import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from 'src/app/shared/config/config.service';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { PromoService } from '../promo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-private-sales',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NgClass, NgIf, AngularFullpageModule ],
  templateUrl: './private-sales.component.html',
  styleUrls: ['./private-sales.component.css']
})
export class PrivateSalesComponent {
  
  imgUrl: string = this.configService.getNewImgUrl();
  registerForm: FormGroup;
  submitted: boolean = false;


  @ViewChild('fullpageRef') fp_directive: ElementRef;
  config;
  fullpage_api;
  validInscription: boolean = false;
  msg: string;
  screenWidth: number;
  screenMode: number;

  public getScreenHeight: any;
  mailExists: boolean = false;
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenHeight = window.innerHeight;
    this.screenWidth = this.configService.getWindow().innerWidth;
    this.visibleItemsDetector();
  }
  constructor(
    private formBuilder: FormBuilder,
    private service : PromoService,
    private meta: Meta,
    private configService:ConfigService
    ) {
      this.config = {
        licenseKey: 'AF6E6FEF-0C764731-8289ADEB-285F2ADA',
      };
    this.registerForm = this.formBuilder.group({ 
      civility: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern("^0[0-9]{9}$")]],
      mail: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]]
    });

  }

  getRef(fullPageRef:any) {
    this.fullpage_api = fullPageRef;
  }
  ngOnInit(): void {
    this.screenWidth = this.configService.getWindow().innerWidth;
    this.visibleItemsDetector();
    this.meta.addTag({ name: 'robots', content: 'noindex' });

    this.getScreenHeight = window.innerHeight;
    // Set the date we're counting down to
    var countDownDate = new Date("June 10, 2023 00:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="timer"
      document.getElementById("timer").innerHTML = days + " jours " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.mailExists = false;
    if (this.registerForm.valid) {
      this.service.save(this.registerForm.value).subscribe(
        res => {
          this.submitted = false;
          this.validInscription = true;
          this.msg = "<strong>Votre inscription a bien été prise en compte</strong>, un conseiller va prendre contact avec vous pour confirmer votre inscription."
          this.registerForm.reset();
        },
        err => {
          this.submitted = false;
          if (err.error.text === "mailAlreadyExists") {
            this.mailExists = true;
          }
          console.error('There was an error!', err);

        }
      )
    }

}
visibleItemsDetector() {
  if (this.screenWidth < 700) {
      // mobile mode
      this.screenMode = 1;
  } else if (this.screenWidth < 991) {
      // tablet mode
      this.screenMode = 2;
  }
  else {
      // desktop mode
      this.screenMode = 3;
  }
}
scroll(el){
  this.configService.getWindow().document.getElementById(el).scrollIntoView({ behavior: "smooth" });
}

}
