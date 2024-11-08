import { Component, HostListener, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/config/config.service';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TunnelService } from 'src/app/tunnel/tunnel.service';
import { NgFor, NgIf } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Router } from '@angular/router';
import { RepriseService } from '../../reprise.service';

@Component({
  selector: 'app-reprise-banner',
  templateUrl: './reprise-banner.component.html',
  styleUrls: ['./reprise-banner.component.css'],
  standalone: true,
  imports: [NgIf, LazyLoadImageModule, NgFor, FormsModule ]
})
export class RepriseBannerComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
  }
  
  screenMode: number;
  filterBgImage: string;
  immatriculation: string;
  imgUrl: string = this.config.getNewImgUrl() + '/reprise/images';
  manualEstimate: any;
  loading: boolean;
  years: number[] = [];
  selectedYear: number;
  yearAccordion: boolean = true;
  matriculeToFind: string = "";

  months: { id; name }[] = [
    { id: "01", name: 'Janvier' },
    { id: "02", name: 'Février' },
    { id: "03", name: 'Mars' },
    { id: "04", name: 'Avril' },
    { id: "05", name: 'Mai' },
    { id: "06", name: 'Juin' },
    { id: "07", name: 'Juillet' },
    { id: "08", name: 'Août' },
    { id: "09", name: 'Septembre' },
    { id: "10", name: 'Octobre' },
    { id: "11", name: 'Novembre' },
    { id: "12", name: 'Décembre' },
  ];

  selectedMonth: string;
  monthAccordion: boolean = true;

  selectedMark: any = null;
  markAccordion: boolean = false;

  selectedModel: any = null;
  modelAccordion: boolean = false;
  models: any[];
  marks: any[];
  selectedMarkObject : any;
  selectedModelObject : any;
  vehiculesByImmat: any[] = [];
  screenWidth: number;


  constructor(private config: ConfigService, private router: Router, private devisService: TunnelService, private serviceReprise: RepriseService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.screenWidth = this.config.getWindow().innerWidth;
    this.visibleItemsDetector();
    if (this.screenMode == 1) {
      this.monthAccordion = false
      this.filterBgImage = this.imgUrl + '/header-mob.webp';
    } else if (this.screenMode == 2) {
      this.monthAccordion = false
      this.filterBgImage = this.imgUrl + '/header-tab.webp';
    } else {
      this.filterBgImage = this.imgUrl + '/header-desk.webp';
    }

    let i = 0;
    let y = new Date().getFullYear();
    for (i = 0; i < 15; i++) {
      this.years.push(y - i);
    }
  }

  visibleItemsDetector() {
    if (this.screenWidth < 768) {
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
  getVehiculesByImmat() {
    if (!this.matriculeToFind) {
      alert("Merci de saisir votre immatriculation");
      return;
    }
    this.serviceReprise.getVehiculesByImmat(this.matriculeToFind).subscribe(data => {
      if (data.error) {
        alert(data.error);
      }else{
        this.router.navigate(
          ['reprise-voiture/mon-estimation'],
          {
            state: {
              validImmatriculation: this.matriculeToFind,
            }
          })
      }      
    });
  }

  onSubmit() {
    this.modalService.dismissAll();
    this.router.navigate(
      ['reprise-voiture/mon-estimation'],
      {
        state: {
          selectedYear: this.selectedYear,
          selectedMonth: this.selectedMonth,
          selectedMark: this.selectedMarkObject,
          selectedModel: this.selectedModelObject,
        }
      })

  }
  initialise() {
    this.selectedYear = null;
    this.selectedMonth = null;
    this.selectedMark = null;
    this.selectedModel = null;
    this.marks = [];
    this.models = [];
  }
  goToEstimation() {
    this.router.navigate(['reprise-voiture/mon-estimation'])
  }

  open(infoContent) {
    this.modalService.open(infoContent, { size: 'lg' });
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.selectedMonth = "0";
    this.selectedMark = null;
    this.selectedModel = null;
    this.marks = [];
    this.models = [];
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.selectedMark = null;
    this.selectedModel = null;

    if (month == "0")
      return;
    this.marks = [];
    this.models = [];

    this.devisService.getBrandList(this.selectedYear, this.selectedMonth).subscribe(data => {
      for (let key in data) {
        this.marks.push({ id: data[key], name: key });
      }
    });
  }

  selectMark(mark: any) {
    this.selectedMarkObject = mark;
    this.selectedMark = mark.id;
    this.selectedModel = null;

    this.models = [];

    if (this.selectedMark == null)
      return;

    this.devisService.getModelListReprise(this.selectedYear, this.selectedMonth, this.selectedMark).subscribe(data => {
      for (let key in data) {
        this.models.push({ id: data[key], name: data[key] });
      }
    });
  }


  selectModel(model: any) {
    this.selectedModelObject = model;
    this.selectedModel = model.id;
  }

}
