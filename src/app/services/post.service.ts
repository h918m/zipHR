import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Post } from '../types/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }

  getPosts() {
    return this.httpClient.get<Post[]>(this.url);
  }

  getPostById(id: number) {
    return this.httpClient.get<Post>(`${this.url}/${id}`);
  }
}
