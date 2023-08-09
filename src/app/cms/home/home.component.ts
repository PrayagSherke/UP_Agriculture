import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Appstate } from 'src/app/shared/store/appstate';
import { Store, select } from '@ngrx/store';
import { invokeHomeAPI } from './store/home.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { placehoder } from 'src/app/shared/constant/constant';

import { SwiperComponent } from "swiper/angular";

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
  Swiper
} from "swiper/core";

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bannerImages = [
    {image:'assets/img/banner1.jpg',title:'Important Notice:', description: 'For Farmer Brothers', links: 'Draw tokens for Subsidy on Machinery/ Farm Ponds', active:true},
    {image:'assets/img/banner2.jpg',title:'Important Notice:', description: 'For Farmer Brothers', links: 'Draw tokens for Subsidy on Machinery/ Farm Ponds', active:false}
  ];

  slidesImg = [
    {image:'indiaGov.gif', link:"https://www.india.gov.in/"},
    {image:'rti-icon.gif', link:"https://rti.gov.in/"},
    {image:'upgov-icon.gif', link:"https://up.gov.in/en"},
    {image:'cm-office.gif', link:"https://upcmo.up.nic.in/"},
    {image:'chief.gif', link:"https://ceouttarpradesh.nic.in/"},
    {image:'election.gif', link:"https://eci.gov.in/"},


    // Add more image paths here
  ];

  @ViewChild("swiperRef", { static: false }) swiperRef?: SwiperComponent;

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  // supportedLanguages: string[] = [];

  homeForm: any
  placeholderValue:any = placehoder.pleaseEnter
  constructor(
    private appStore: Store<Appstate>,
    private store: Store,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.formGroup.valueChanges.subscribe((val) => this.homeForm = val)

  }




  home() {
    if (this.formGroup.status == "INVALID") {
     this.formGroup.markAllAsTouched();
      // this.formGroup.markAsDirty();
      return
    }
    console.log(this.homeForm)
    this.store.dispatch(invokeHomeAPI({ home: this.homeForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.router.navigate(['/list-user'])
      }
    })
  }

  ngOnInit(): void {
    // this.bilingualService.init().then(() => {
    //   this.supportedLanguages = this.bilingualService.getSupportedLanguages();
    // });
  }

  // thumbsSwiper: any;
  // setThumbsSwiper(swiper:any) {
  //   this.thumbsSwiper = swiper;
  // }
  // controlledSwiper: any;
  // setControlledSwiper(swiper:any) {
  //   this.controlledSwiper = swiper;
  // }

  exampleConfig = { slidesPerView: 1 };
  slidesPerView: number = 2;
  pagination: any = false;

  // slides2 = ["abc 1", "slide 2", "slide 3"];
  // replaceSlides() {
  //   this.slides2 = ["foo", "bar"];
  // }

  // togglePagination() {
  //   if (!this.pagination) {
  //     this.pagination = { type: "fraction" };
  //   } else {
  //     this.pagination = false;
  //   }
  // }

  // navigation = false;
  // toggleNavigation() {
  //   this.navigation = !this.navigation;
  // }

  // scrollbar: any = false;
  // toggleScrollbar() {
  //   if (!this.scrollbar) {
  //     this.scrollbar = { draggable: true };
  //   } else {
  //     this.scrollbar = false;
  //   }
  // }
  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 }
  };

  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
  virtualSlides = Array.from({ length: 600 }).map(
    (el, index) => `Slide ${index + 1}`
  );



  breakPointsToggle: boolean;
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 }
    };
  }


}
