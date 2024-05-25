import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderService } from './jsonplaceholder.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pruebas-api';
  posts: any[] = [];
  post: any;
  comments: any[] = [];
  selectedPost: any;

  constructor(private jsonPlaceholderService: JsonPlaceholderService) { }

  ngOnInit() {
    this.fetchPosts();
    this.fetchSinglePost();
    this.fetchComments();
  }

  fetchPosts() {
    this.jsonPlaceholderService.getPosts().pipe(
      tap(data => {
        console.log('posts obtenidos:', data);
        this.posts = data;
      })
    ).subscribe();
  }

  fetchSinglePost() {
    this.jsonPlaceholderService.getPost(1).pipe(
      tap(data => {
        console.log('post obtenido:', data);
        this.post = data;
      })
    ).subscribe();
  }

  fetchComments() {
    this.jsonPlaceholderService.getComments().pipe(
      tap(data => {
        console.log('comentarios obtenidos:', data);
        this.comments = data;
      })
    ).subscribe();
  }

  selectPost(post: any) {
    this.selectedPost = post;
    this.fetchCommentsByPostId(post.id);
  }

  fetchCommentsByPostId(postId: number) {
    this.jsonPlaceholderService.getCommentsByPostId(postId).pipe(
      tap(data => {
        console.log('comentarios obtenidos por id', postId, ':', data);
        this.comments = data;
      })
    ).subscribe();
  }
}
