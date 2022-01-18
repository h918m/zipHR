import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  event$;
  currentPath: string = '/';

  constructor(private location: Location) {
    this.event$ = this.location.onUrlChange((val) => {
      this.currentPath = val;
    })
  }

}
