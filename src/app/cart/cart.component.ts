import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { CartService } from '../core/services/cart.service';
import { OrderService } from '../core/services/order.service';
import { OrderMenu } from '../shared/models/order-menu.model';

@Component({
  selector: 'gc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  orderMenus: OrderMenu[] = [];
  totalPrice: number = 0;

  orderToDelete: OrderMenu;
  modalRef: BsModalRef;

  constructor(
    private cartService: CartService,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
        path: ['/'],
      },
      {
        text: 'Cart',
      },
    ]);
  }

  submitCart() {
    const order = this.cartService.submitCartAsOrderAndRefresh();

    this.orderService.add(order);

    this.toastrService.success('Order is now being processed');

    this.router.navigate(['/order-status']);
  }

  increaseQuantity(orderMenu: OrderMenu) {
    orderMenu.quantity = orderMenu.quantity + 1;
    this.cartService.updateCart(orderMenu);
  }

  decreaseQuantity(orderMenu: OrderMenu) {
    orderMenu.quantity = orderMenu.quantity - 1;
    this.cartService.updateCart(orderMenu);
  }

  showConfirmDelete(template: TemplateRef<any>, orderToDelete: OrderMenu) {
    this.orderToDelete = orderToDelete;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }

  private getCartItems() {
    this.cartService.selectAll().subscribe((orderMenus) => {
      this.orderMenus = orderMenus;
      this.totalPrice = orderMenus.reduce(
        (acc, orderMenu) => acc + orderMenu.quantity * orderMenu.menuPrice,
        0
      );
    });
  }
}
