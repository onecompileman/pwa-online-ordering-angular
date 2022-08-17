import { Component, OnInit } from '@angular/core';
import { OrderService } from '../core/services/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'gc-billout',
  templateUrl: './billout.component.html',
  styleUrls: ['./billout.component.scss'],
})
export class BilloutComponent implements OnInit {
  totalPrice: number = 0;
  totalAmount: number = 0;

  vat: number = 0.12;
  serviceCharge: number = 0.1;
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders() {
    this.orders = this.orderService.getAll();

    this.computeTotalPrice(this.orders);
  }

  private computeTotalPrice(orders: Order[]): void {
    this.totalPrice = orders.reduce(
      (acc, order) =>
        acc +
        order.orderMenus.reduce(
          (acc2, orderMenu) => acc2 + orderMenu.quantity * orderMenu.menuPrice,
          0
        ),
      0
    );

    this.totalAmount =
      this.totalPrice +
      this.totalPrice * this.serviceCharge +
      this.totalPrice * this.vat;
  }
}
