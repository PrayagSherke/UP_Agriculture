import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  @Output() callbackDelete = new EventEmitter<string>();
  @Input() dialogContent:string='';
  @Input() actionButtonText:string = '';
  @Input() closeText:string='';
  @Input() dialogHeading:string='';
 
  constructor() { }

  ngOnInit(): void {
   
  }

}
