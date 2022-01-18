import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private service: PostService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.service.getPostById(Number(routeParams.get('id')))
    .subscribe((response: Post) => {
      this.post = response;
      this.loading = false;
    });
  }

}
