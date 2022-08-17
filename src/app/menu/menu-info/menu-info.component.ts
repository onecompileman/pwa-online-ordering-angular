import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { CartService } from 'src/app/core/services/cart.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { Menu } from 'src/app/shared/models/menu.model';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';

@Component({
  selector: 'gc-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.scss'],
})
export class MenuInfoComponent implements OnInit {
  menu?: Menu | any;

  orderMenu: OrderMenu = {
    quantity: 1,
    menuId: 0,
    menuName: '',
    menuPrice: 0,
    menuPreparationTime: 0,
    menuCookingTime: 0,
  };

  constructor(
    private menuService: MenuService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private cartService: CartService
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
        text: 'Menu Info',
      },
    ]);
    this.getActiveMenu();
  }

  increaseQuantity() {
    this.orderMenu.quantity = this.orderMenu.quantity + 1;
  }

  decreaseQuantity() {
    this.orderMenu.quantity -= this.orderMenu.quantity - 1 <= 0 ? 0 : 1;
  }

  addToCart() {
    this.cartService.addToCart(this.orderMenu);

    this.toastrService.success(
      this.orderMenu.quantity + ' ' + this.menu.name + ' was added to cart!'
    );

    this.router.navigate(['/menu']);
  }

  private getActiveMenu() {
    const id = this.route.snapshot.params.id;

    this.menu = this.menuService.getById(+id);

    this.orderMenu = {
      menuId: this.menu.id,
      menuName: this.menu.name,
      menuPrice: this.menu.price,
      menuPreparationTime: this.menu.preparationTime,
      menuCookingTime: this.menu.cookingTime,
      quantity: 1,
    };
  }
}
