import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUpload} from "./file-upload.model";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LetterUploadService {

  basePath = '/APPLICANT_POOL';
  fileUpload: string = '';
  haveFetchedURL: boolean = false;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    let randomExtension = Math.floor(Math.random() * 1000000).toString();
    const filePath = `${this.basePath}/${randomExtension}_${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.fileUpload = downloadURL;
          if(this.fileUpload!=''){
            this.haveFetchedURL = true;
            return this.fileUpload;
          } else {
            this.haveFetchedURL = false;
            return this.fileUpload;
          }
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
}
