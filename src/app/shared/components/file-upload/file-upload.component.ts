import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() label: string = ''
  selectedFile: File | null = null;
  error: string | null = null;

  constructor(
    private fileUploadService: FileUploadService
  ) { }

  onFileSelected(event: Event) {
    const inputElement = this.fileInput.nativeElement as HTMLInputElement;
    console.log(inputElement);
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
    else {
      this.selectedFile = null
    }
  }


  uploadFile() {
    debugger;
    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe((response) => {
        console.log(response)
      },(error)=>{
        console.error('Error:', error);
      })
    }
    else {
      this.error = 'Please select a file to upload'
    }
  }

  ngOnInit(): void {
  }

}


