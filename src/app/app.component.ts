import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './core/services/breadcrumb.service';
import { CartService } from './core/services/cart.service';
import { OrderService } from './core/services/order.service';
import { Breadcrumb } from './shared/models/breadcrumb.model';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tableNo = 1;
  breadcrumbs: Breadcrumb[] = [];
  cartItemsLength: number = 0;
  ordersItemsLength: number = 0;

  showNavbar: boolean = true;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private changeDetect: ChangeDetectorRef,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAppSettings();
    this.getBreadcrumbs();
    this.getCartItemsCount();
    this.getOrderItemsCount();
    this.checkBilloutRoute();
    this.listenToRouteChanges();
  }

  private getBreadcrumbs() {
    this.breadcrumbService.breadcrumbs$
      .asObservable()
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
        this.changeDetect.detectChanges();
      });
  }

  private getCartItemsCount() {
    this.cartService.selectLength().subscribe((length) => {
      this.cartItemsLength = length;
    });
  }

  private getOrderItemsCount() {
    this.orderService.selectLength().subscribe((length) => {
      this.ordersItemsLength = length;
    });
  }

  private listenToRouteChanges() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.checkBilloutRoute();
      }
    });
  }

  private async loadAppSettings() {
    const res = await fetch('/assets/data/app-settings.json');
    const appSettings = await res.json();

    this.tableNo = appSettings.tableNo;
  }

  private checkBilloutRoute() {
    const billoutRoute = 'bill-out';
    this.showNavbar = !this.router.url.includes(billoutRoute);
  }
}
