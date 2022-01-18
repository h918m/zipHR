import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/types/Photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  loading: boolean = true;
  photo: Photo | undefined;


  constructor(private photoService: PhotoService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.photoService.getPhotoById(Number(routeParams.get('id')))
      .subscribe((photo: Photo) => {
        this.loading = false;
        this.photo = photo;
      })
  }

}
