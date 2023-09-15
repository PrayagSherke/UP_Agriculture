import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.css']
})

export class PageHeadingComponent implements OnInit {

  @Input() pageHeading:string = "";
  constructor() { }

  ngOnInit(): void {
  }


}
