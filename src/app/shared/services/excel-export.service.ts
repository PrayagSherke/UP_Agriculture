import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  exportToExcel(data: any[], fileName: string): void {
    if (data.length === 0) {
      console.error('No data to export.');
      return;
    }

    const headers = Object.keys(data[0]); // Get the keys (property names) of the first object

    // Convert headers to PascalCase with spaces between words
    const formattedHeaders = headers.map(header =>
      header
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between camelCase
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    );

    // Create an array of arrays for the data rows
    const dataRows = data.map(item => headers.map(header => item[header]));

    // Insert the header row as the first row in the data
    dataRows.unshift(formattedHeaders);

    // Create the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataRows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
