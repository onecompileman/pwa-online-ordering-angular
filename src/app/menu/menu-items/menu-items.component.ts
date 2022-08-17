import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { Menu } from 'src/app/shared/models/menu.model';

@Component({
  selector: 'gc-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  menuItems: Menu[] = [];
  classification: string = '';

  constructor(
    private router: Router,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
        path: ['/'],
      },
      {
        text: 'Menu',
        path: ['/menu'],
      },
      {
        text: 'Menu Types',
      },
    ]);
    this.getMenuItemsByType();
  }

  private getMenuItemsByType() {
    const type = this.route.snapshot.params.type;

    if (type === 'recommendation') {
      this.classification = "Chef's Recommendations";
      this.menuItems = this.menuService.getAllChefRecommendation();
    } else {
      this.classification = type;
      this.menuItems = this.menuService.getAllByClassification(type);
    }
  }
}
