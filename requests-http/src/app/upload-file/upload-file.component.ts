import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;

  constructor(private service: UploadFileService) {}

  ngOnInit() {}

  // Precisa caso seja o bootstrap 4 antigo
  onChange(event: any) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('formFile')?.innerHTML = selectedFiles[0].name;

    // (document.getElementById('formFile') as HTMLElement).innerHTML =
    //   selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    // (document.getElementById('formFile') as HTMLElement).innerHTML =
    //   fileNames.join(',');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, environment.BASE_URL + '/upload')
        .subscribe((response) => console.log('Uplaod Concluído'));
    }
  }
}
