import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { environment } from '../../environments/environment.development';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;

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

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        // .subscribe((event: HttpEvent<Object>) => {
        //   // console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Uplaod Concluído');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     if (event.total) {
        //       const percentDone = Math.round(
        //         (event.loaded / (event.total || 1)) * 100
        //       );
        //       console.log('Progrosso', percentDone);
        //       this.progress = percentDone;
        //     }
        //   }
        // });
        .subscribe((response) => console.log('Upload Concluído'));
    }
  }

  onDownloadExcel() {
    this.service
      .download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.xlsx');
      });
  }

  onDownloadPDF() {
    this.service
      .download(environment.BASE_URL + '/downloadPDF')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.pdf');
      });
  }
}
