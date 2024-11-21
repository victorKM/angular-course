import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  // Precisa caso seja o bootstrap 4 antigo
  onChange(event: any) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('formFile')?.innerHTML = selectedFiles[0].name;

    (document.getElementById('formFile') as HTMLElement).innerHTML =
      selectedFiles[0].name;

    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
    }
    (document.getElementById('formFile') as HTMLElement).innerHTML =
      fileNames.join(',');
  }
}
