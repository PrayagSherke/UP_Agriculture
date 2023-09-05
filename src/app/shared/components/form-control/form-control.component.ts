import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  @Input() control = new FormControl();
  @Input() inputId:string = '';
  @Input() placeholder:string = ''
  @Input() lable:string = '';
  @Input () inputType:string = '';
  @Input() isRequired:boolean = false;
  @Input() dropdownData:any;
  @Input() maxlength:number=100;
  @Input() minlength:number = 0;
  @Input() isLabel:boolean = true;
  @Input() cssClass:string = 'btn-brown';
  @Input() btnType:string = 'submit';
  @Input() maticon:string = '';
  @Input() isIcon:boolean = false;

  datepickerConfig: Partial<BsDatepickerConfig>;
 
  errorMessage:Record<string, string> = {
    required:'The field is required',
    email:'Email is invalid',
    minlength:`The field must be at least `
  }

  constructor() {
     this.datepickerConfig = {
      containerClass: 'theme-dark-blue', // Add custom CSS classes
      dateInputFormat: 'YYYY-MM-DD', // Customize date format
      showWeekNumbers: false, // Show week numbers
    };
   }

  ngOnInit(): void {
  }

}
