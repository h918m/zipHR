import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Album } from 'src/app/types/Album';
import { Post } from 'src/app/types/Post';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User | undefined;
  loading: boolean = true;
  posts: Post[] = [];
  albums: Album[] = [];

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.userService.getUserById(Number(routeParams.get('id')))
      .subscribe((user: User) => {
        this.user = user;
        this.postService.getPosts()
          .subscribe((posts: Post[]) => {
            this.posts = posts;
            this.albumService.getAlbums()
              .subscribe((albums: Album[]) => {
                this.albums = albums;
                this.loading = false;
              });
          });
      });
  }

}
