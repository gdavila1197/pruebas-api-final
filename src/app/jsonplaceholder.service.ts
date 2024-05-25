import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  private baseURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${this.baseURL}/posts`);
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/posts/${id}`);
  }

  getComments(): Observable<any> {
    return this.http.get(`${this.baseURL}/comments`);
  }
  
  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/posts/${postId}/comments`);
  }
}
