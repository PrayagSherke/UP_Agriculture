import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  selectedFile: File | null = null;
  error: string | null = null;

  constructor() { }

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
  if(this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    fetch('api', {
      method:'POST',
      body:formData
    }).then((response)=>{
      if(response.ok) {
        this.error = null;
        //inputElement.value = ''
      }
      else {
        response.json().then((data)=>{
          this.error = data.message
        })
      }
    }).catch((error)=>{
      this.error = 'An Error occured while uploading the file'
    })
  }
  else {
    this.error = 'Please select a file to upload'
  }
}

ngOnInit(): void {
}

}


