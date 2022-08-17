import { Injectable } from '@angular/core';
import {
  addMinutes,
  addSeconds,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';
import { Order } from 'src/app/shared/models/order.model';
import { CompositeService } from './composite.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends CompositeService<Order> {
  public selectCanBillout(): Observable<boolean> {
    return this.selectAllOrdersDone().pipe(
      map(
        (ordersDone) =>
          ordersDone.length >= 1 && ordersDone.length === this.getLength()
      )
    );
  }

  public selectAllWithRemainingTime(): Observable<Order[]> {
    return this.selectAll().pipe(
      map((orders) => {
        return orders.map((order) => {
          const dateSubmitted = order.dateSubmitted;
          const minuteInSeconds = 60;
          const dateNow = new Date();

          order.orderMenus = (<OrderMenu[]>order.orderMenus).map(
            (orderMenu) => {
              const expectedPrepDoneDate = addSeconds(
                <Date>dateSubmitted,
                orderMenu.menuPreparationTime * minuteInSeconds
              );
              const expectedCookingDoneDate = addSeconds(
                <Date>dateSubmitted,
                orderMenu.menuCookingTime * minuteInSeconds
              );

              orderMenu.remainingPrepTimeInSeconds = differenceInSeconds(
                expectedPrepDoneDate,
                dateNow
              );
              orderMenu.prepTimeCompletion = this.computeCompletionTime(
                orderMenu.menuPreparationTime * minuteInSeconds,
                orderMenu.remainingPrepTimeInSeconds
              );

              if (orderMenu.prepTimeCompletion >= 100) {
                orderMenu.remainingCookingTimeInSeconds = differenceInSeconds(
                  expectedCookingDoneDate,
                  dateNow
                );

                orderMenu.cookingTimeCompletion = this.computeCompletionTime(
                  orderMenu.menuCookingTime * minuteInSeconds,
                  orderMenu.remainingCookingTimeInSeconds
                );
              }
              return orderMenu;
            }
          );

          return order;
        });
      })
    );
  }

  public selectAllOrdersDone(): Observable<Order[]> {
    return this.selectAllWithRemainingTime().pipe(
      map((orders) =>
        orders.filter((order: Order) =>
          order.orderMenus.every(
            (orderMenu: OrderMenu) =>
              orderMenu.remainingPrepTimeInSeconds <= 0 &&
              orderMenu.remainingCookingTimeInSeconds <= 0
          )
        )
      )
    );
  }

  private computeCompletionTime(timeToComplete: number, remainingTime: number) {
    let completionTime =
      ((timeToComplete - remainingTime) / timeToComplete) * 100;

    return completionTime >= 100 ? 100 : completionTime;
  }
}
