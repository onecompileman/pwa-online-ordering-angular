import { OrderMenu } from './order-menu.model';

export class Order {
  orderMenus?: OrderMenu[];
  dateSubmitted?: Date;

  constructor(orderMenus: OrderMenu[] = [], dateSubmitted: Date = new Date()) {
    this.orderMenus = orderMenus;
    this.dateSubmitted = dateSubmitted;
  }
}
