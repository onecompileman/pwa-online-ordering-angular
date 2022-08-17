import { MenuClassification } from 'src/app/shared/enums/menu-classification.enum';
import { CartService } from './cart.service';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';
import { Order } from 'src/app/shared/models/order.model';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('#addToCart should add the cart to items$ list', () => {
    const orderMenu: OrderMenu = {
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
    };

    service.addToCart(orderMenu);

    const cartItems = service.getAll();

    expect(cartItems.length).toBe(1);
  });

  it('#addToCart should update the cart item quantity to items$ list when orderMenu is existing', () => {
    const orderMenu: OrderMenu = {
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
    };

    const expectedQuantity = 20;
    // 1st Add
    service.addToCart(orderMenu);
    // Should update quantity not add new record
    service.addToCart(orderMenu);

    const cartItems = service.getAll();

    // Should be still 1
    expect(cartItems.length).toBe(1);
    // Should be the expected quantity
    expect(cartItems[0].quantity).toBe(expectedQuantity);
  });

  it('#submitCartAsOrderAndRefresh should return Order with all cartItems and clears cart', () => {
    const mockCartItems: OrderMenu[] = [
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
      {
        quantity: 10,
        menu: {
          id: 4,
          name: 'Sisig',
          price: 215,
          preparationTime: 5,
          cookingTime: 10,
          classification: 'Main',
          isChefRecommendation: 0,
          pictureUrl: 'sisig.jpg',
        },
      },
    ];

    // Add all mockCartItems to cart
    mockCartItems.forEach((item) => service.addToCart(item));

    // Should be same
    expect(service.getAll().length).toBe(mockCartItems.length);

    const submittedOrder = service.submitCartAsOrderAndRefresh();

    expect(submittedOrder).toBeTruthy();
    // Should clear all values
    expect(service.getAll().length).toBe(0);
  });
});
