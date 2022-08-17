import { fakeAsync, tick } from '@angular/core/testing';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let mockOrderCompletionTimeInMs = 15 * 60 * 1000; // 5mins prepTime + 10mins cookingTime * 60 seconds/min * 1000ms/sec
  let mockOrder: Order = {
    orderMenus: [
      {
        quantity: 10,
        menu: {
          id: 2,
          name: 'Sinigang na Baboy',
          price: 225,
          preparationTime: 5,
          cookingTime: 10,
          classification: 'Main',
          isChefRecommendation: 0,
          pictureUrl: 'sinigang.png',
        },
      },
    ],
  };

  beforeEach(() => {
    service = new OrderService();
  });

  it('#selectCanBillout should return false when no order item has been added', (done: DoneFn) => {
    service.selectCanBillout().subscribe((canBillout) => {
      expect(canBillout).toBeFalsy();
      done();
    });
  });

  it('#selectCanBillout should return false when added order is not completed yet', (done: DoneFn) => {
    const dateSubmitted = new Date();

    service.add({ ...mockOrder, dateSubmitted });

    service.selectCanBillout().subscribe((canBillout) => {
      expect(canBillout).toBeFalsy();
      done();
    });
  });

  it('#selectCanBillout should return true when added order are completed', fakeAsync((
    done: DoneFn
  ) => {
    const dateSubmitted = new Date();

    service.add({ ...mockOrder, dateSubmitted });

    // Simulate time lapses
    jasmine.clock().install();
    jasmine.clock().tick(mockOrderCompletionTimeInMs);

    service.selectCanBillout().subscribe((canBillout) => {
      expect(canBillout).toBeTruthy();
      done();
    });
  }));

  it('#selectAllOrdersDone should return orders completed when cookingTime ellapsed', fakeAsync((
    done: DoneFn
  ) => {
    const dateSubmitted = new Date();

    service.add({ ...mockOrder, dateSubmitted });

    // Simulate time lapses
    jasmine.clock().install();
    jasmine.clock().tick(mockOrderCompletionTimeInMs);

    service.selectAllOrdersDone().subscribe((completedOrders) => {
      expect(completedOrders.length).toBe(1);
      done();
    });
  }));

  it('#selectAllOrdersDone should not return orders completed when cookingTime is yet to be completed', (done: DoneFn) => {
    const dateSubmitted = new Date();

    service.add({ ...mockOrder, dateSubmitted });

    service.selectAllOrdersDone().subscribe((completedOrders) => {
      expect(completedOrders.length).toBe(0);
      done();
    });
  });

  it('#selectAllWithRemainingTime should return orders and their remaining time and completion accurately', fakeAsync((
    done: DoneFn
  ) => {
    const dateSubmitted = new Date();

    service.add({ ...mockOrder, dateSubmitted });

    const msPerSecond = 1000;
    const secondsPerMin = 60;
    const halfPrepTimeInMs = (5 / 2) * secondsPerMin * msPerSecond;
    const halfPrepTimeInSecs = (5 / 2) * secondsPerMin;

    // Simulate time lapses
    jasmine.clock().install();
    jasmine.clock().tick(halfPrepTimeInMs);

    service.selectAllWithRemainingTime().subscribe((orders: Order[]) => {
      expect(orders[0].orderMenus[0].remainingPrepTimeInSeconds).toBe(
        halfPrepTimeInSecs
      );
      done();
    });
  }));
});
