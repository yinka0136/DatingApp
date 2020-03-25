import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;
  baseUrl = environment.apiUrl
  @Input() photos: Photo[]

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
    // console.log(this.photos)
  }
    fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + '/upload/' + this.auth.decodedToken.id,
      // authToken: 'Bearer '+ localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
        });


        this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};

      }





}
