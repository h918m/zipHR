import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/types/Photo';
import { chunk } from '../albums/albums.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  loading: boolean = true;
  photos: Photo[][] = [];
  currentPage: number = 0;
  pages: number[] = [];
  DEFAULT_PAGE_SIZE = 1;
  DEFAULT_CHUNK_SIZE = 50;
  photoRows = Array.from({ length: this.DEFAULT_CHUNK_SIZE }, (_, i) => i);

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getPhotos()
      .subscribe((photos: Photo[]) => {
        this.loading = false;
        this.photos = chunk(photos, this.DEFAULT_CHUNK_SIZE);
        this.pages = Array.from({ length: this.photos.length / this.DEFAULT_PAGE_SIZE }, (_, i) => i);
      })
  }

  goToPage(currentPage: number = this.currentPage + 1): void {
    this.currentPage = currentPage;
  }

  getPhotos(photoRow: number): Photo[] {
    return this.photos.slice(this.currentPage * this.DEFAULT_PAGE_SIZE, (this.currentPage * 
      this.DEFAULT_PAGE_SIZE) + this.DEFAULT_PAGE_SIZE)[photoRow];
  }

}
