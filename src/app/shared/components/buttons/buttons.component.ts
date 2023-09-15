import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Input () inputType:string = '';
  @Input() cssClass:string = 'btn-brown';
  @Input() maticon:string = '';
  @Input() btnType:string = 'submit';
  @Input() isIcon:boolean = false;
  @Input() lable:string = ''


  constructor() { }

  ngOnInit(): void {
  }

}
