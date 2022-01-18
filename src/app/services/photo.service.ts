import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../types/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private url = 'http://jsonplaceholder.typicode.com/photos';

  constructor(private httpClient: HttpClient) { }

  getPhotos() {
    return this.httpClient.get<Photo[]>(this.url);
  }

  getPhotoById(id: number) {
    return this.httpClient.get<Photo>(`${this.url}/${id}`);
  }
}
