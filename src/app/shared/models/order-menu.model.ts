import { Menu } from './menu.model';

export class OrderMenu {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuPreparationTime: number;
  menuCookingTime: number;

  quantity: number;

  remainingPrepTimeInSeconds?: number;
  prepTimeCompletion?: number;
  remainingCookingTimeInSeconds?: number;
  cookingTimeCompletion?: number;

  constructor(
    menuId: number = 0,
    menuName: string = '',
    menuPrice: number = 0,
    menuPreparationTime: number = 0,
    menuCookingTime: number = 0,
    quantity: number = 0,
    remainingPrepTimeInSeconds: number = 0,
    prepTimeCompletion: number = 0,
    remainingCookingTimeInSeconds: number = 0,
    cookingTimeCompletion: number = 0
  ) {
    this.menuId = menuId;
    this.menuName = menuName;
    this.menuPrice = menuPrice;
    this.menuPreparationTime = menuPreparationTime;
    this.menuCookingTime = menuCookingTime;

    this.quantity = quantity;

    this.remainingPrepTimeInSeconds = remainingPrepTimeInSeconds;
    this.prepTimeCompletion = prepTimeCompletion;
    this.remainingCookingTimeInSeconds = remainingCookingTimeInSeconds;
    this.cookingTimeCompletion = cookingTimeCompletion;
  }

  // Todo: Cherry pick important properties from Menu, like ID
}
