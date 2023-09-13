import { Injectable } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable({
    providedIn: 'root'
})

export class PdfExportService {

    constructor() { }

    exportToPdf(data: any[], fileName: string, pdfTitle:string): void {
        if (data.length === 0) {
            console.log('No Data');
            return
        }
        const headers = Object.keys(data[0]);
        const headerRow = headers.map(header => {
            return {
                text: header
                    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between camelCase
                    .replace(/_/g, ' ') // Insert space between snake_case
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                bold: true,
            };
        });
        const dataRows = data.map(item => headers.map(header => item[header]));
        const pdfDefinition: TDocumentDefinitions = {
            content: [
                {
                    text: pdfTitle,
                    style: 'header',
                },
                {
                    table: {
                        headerRows: 1,
                        widths: headerRow.map(() => 'auto'), // Adjust column widths as needed
                        body: [headerRow, ...dataRows],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 14,
                    bold: false,
                    alignment: 'center',
                    margin: [0, 0, 0, 10], // Margin: [left, top, right, bottom]
                },
            },
        };
        const pdfmake = require('pdfmake/build/pdfmake');
        const pdfFonts = require('pdfmake/build/vfs_fonts');
        pdfmake.vfs = pdfFonts.pdfMake.vfs;
        pdfmake.createPdf(pdfDefinition).download(fileName + '.pdf');
    }
}
