import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Album } from 'src/app/types/Album';
import { Photo } from 'src/app/types/Photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  loading: boolean = true;
  photos: Photo[] = [];
  album: Album | undefined;

  constructor(private albumService: AlbumService, private photoService: PhotoService, private route: ActivatedRoute,) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.photoService.getPhotos()
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
        this.albumService.getAlbumById(Number(routeParams.get('id')))
          .subscribe((album: Album) => {
            this.album = album;
            this.loading = false;
            if (this.album)
              this.album.photos = this.getAlbumPhotos(album.id);

              console.log(this.album)
          });
      });
  }

  getAlbumPhotos(albumId: number): Photo[] {
    return this.photos.filter(photo => photo.albumId === albumId);
  }

}
