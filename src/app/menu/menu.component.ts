import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { CartService } from '../core/services/cart.service';
import { MenuService } from '../core/services/menu.service';
import { MenuClassification } from '../shared/enums/menu-classification.enum';
import { OrderMenu } from '../shared/models/order-menu.model';

@Component({
  selector: 'gc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuClassification = MenuClassification;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private menuService: MenuService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
        path: ['/'],
      },
      {
        text: 'Menu',
      },
    ]);
  }

  addAllChefsRecommendation() {
    const chefsRecommendationsMenu =
      this.menuService.getAllChefRecommendation();

    chefsRecommendationsMenu.forEach((menu) => {
      const orderMenu = new OrderMenu(
        menu.id,
        menu.name,
        menu.price,
        menu.preparationTime,
        menu.cookingTime,
        1
      );

      this.cartService.addToCart(orderMenu);
    });

    this.toastrService.success(
      "All Chef's Recommendation menu has been added to cart!"
    );

    this.router.navigate(['cart']);
  }
}
