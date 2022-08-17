import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { OrderService } from '../core/services/order.service';
import { Order } from '../shared/models/order.model';

@Component({
  selector: 'gc-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit {
  canBillOut: boolean;
  totalPrice: number = 0;
  totalAmount: number = 0;

  vat: number = 0.12;
  serviceCharge: number = 0.1;
  orders: Order[];

  constructor(
    private orderService: OrderService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.getOrdersPerHeartbeat();
    this.breadcrumbService.breadcrumbs$.next([
      {
        text: 'Home',
        path: ['/'],
      },
      {
        text: 'Order Status',
      },
    ]);
  }

  billOut() {}

  private getOrdersPerHeartbeat() {
    const heartbeatInterval = 1000;

    timer(0, heartbeatInterval)
      .pipe(
        switchMap(() => {
          return this.orderService.selectAllWithRemainingTime().pipe(
            tap((orders: Order[]) => {
              this.orders = orders;
              console.log(orders);
              this.computeTotalPrice(orders);
            })
          );
        }),
        switchMap(() =>
          this.orderService
            .selectCanBillout()
            .pipe(tap((canBillOut) => (this.canBillOut = canBillOut)))
        )
      )
      .subscribe();
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
