import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../core/services/breadcrumb.service';

@Component({
  selector: 'gc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
      },
    ]);
  }
}
