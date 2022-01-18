import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Album } from 'src/app/types/Album';
import { Photo } from 'src/app/types/Photo';

export const chunk = <T>(arr: T[], size: number): T[][] =>
  [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(size * i, size + size * i)
  );
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[][] = [];
  photos: Photo[] = [];
  loading: boolean = true;
  pages: number[] = [];
  currentPage: number = 0;
  DEFAULT_PAGE_SIZE = 5;
  DEFAULT_CHUNK_SIZE = 4;
  albumRows = Array.from({ length: this.DEFAULT_CHUNK_SIZE }, (_, i) => i);

  constructor(private albumService: AlbumService, private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getPhotos()
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
        this.albumService.getAlbums()
          .subscribe((albums: Album[]) => {
            this.albums = chunk(albums.map(album => ({ ...album, photos: this.getAlbumPhotos(album.id) })), this.DEFAULT_CHUNK_SIZE);
            this.loading = false;
            this.pages = Array.from({ length: this.albums.length / this.DEFAULT_PAGE_SIZE }, (_, i) => i);
          });
      });
  }

  getAlbumPhotos(albumId: number): Photo[] {
    return this.photos.filter(photo => photo.albumId === albumId);
  }

  goToPage(currentPage: number = this.currentPage + 1): void {
    this.currentPage = currentPage;
  }

  getAlbums(albumRow: number): Album[] {
    return this.albums.slice(this.currentPage * this.DEFAULT_PAGE_SIZE, (this.currentPage *
      this.DEFAULT_PAGE_SIZE) + this.DEFAULT_PAGE_SIZE)[albumRow];
  }
}
