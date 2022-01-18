import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../types/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url = 'http://jsonplaceholder.typicode.com/albums';

  constructor(private httpClient: HttpClient) { }

  getAlbums() {
    return this.httpClient.get<Album[]>(this.url);
  }

  getAlbumById(id: number) {
    return this.httpClient.get<Album>(`${this.url}/${id}`);
  }
}
