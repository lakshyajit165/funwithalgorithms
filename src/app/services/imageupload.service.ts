import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IAddAlgo } from '../model/IAddAlgo';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

  constructor(
    private http: HttpClient
  ) { }
  
  api: string = 'https://api.funwithalgorithms.tech/';

  fileUpload(imageForm: FormData) {
    return this.http.post(this.api + 'api/v1/upload', 
    imageForm);
  }

 

}
