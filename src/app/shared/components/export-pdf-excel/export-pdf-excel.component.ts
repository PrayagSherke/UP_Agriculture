import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-export-pdf-excel',
  templateUrl: './export-pdf-excel.component.html',
  styleUrls: ['./export-pdf-excel.component.css']
})
export class ExportPdfExcelComponent implements OnInit {

  @Output() callbackExcel = new EventEmitter<string>();
  @Output() callbackPdf = new EventEmitter<string>();
  @Input() isExcel:boolean = true;
  @Input() isPdf:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
