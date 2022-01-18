import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';
import { Album } from 'src/app/types/Album';
import { Photo } from 'src/app/types/Photo';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  photos: Photo[] = [];
  loading: boolean = true;
  posts: Post[] = [];
  albums: Album[] = [];

  constructor(
    private photoService: PhotoService,
    private postService: PostService,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.photoService.getPhotos()
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
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
