import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number) {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }
}
