import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = true;
  pages: number[] = [];
  currentPage: number = 0;
  DEFAULT_PAGE_SIZE = 10;

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getPosts()
      .subscribe((response: Post[]) => {
        this.posts = response;
        this.loading = false;
        this.pages = Array.from({ length: response.length / this.DEFAULT_PAGE_SIZE }, (_, i) => i);
      });
  }

  goToPage(currentPage: number = this.currentPage + 1): void {
    this.currentPage = currentPage;
  }
}
