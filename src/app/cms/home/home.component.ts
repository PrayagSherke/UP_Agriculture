import {  Component, OnInit, ViewChild } from '@angular/core';
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
    { image: 'assets/img/banner1.jpg', title: 'Important Notice:', description: 'For Farmer Brothers', links: 'Draw tokens for Subsidy on Machinery/ Farm Ponds', active: true },
    { image: 'assets/img/banner2.jpg', title: 'Important Notice:', description: 'For Farmer Brothers', links: 'Draw tokens for Subsidy on Machinery/ Farm Ponds', active: false }
  ];

  slidesImg = [
    { image: 'indiaGov.gif', link: "https://www.india.gov.in/" },
    { image: 'rti-icon.gif', link: "https://rti.gov.in/" },
    { image: 'upgov-icon.gif', link: "https://up.gov.in/en" },
    { image: 'cm-office.gif', link: "https://upcmo.up.nic.in/" },
    { image: 'chief.gif', link: "https://ceouttarpradesh.nic.in/" },
    { image: 'election.gif', link: "https://eci.gov.in/" },
  ];

  @ViewChild("swiperRef", { static: false }) swiperRef?: SwiperComponent;

  // supportedLanguages: string[] = [];

  constructor( ) { }

  ngOnInit(): void {

  }

  exampleConfig = { slidesPerView: 1 };
  slidesPerView: number = 2;
  pagination: any = false;


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
