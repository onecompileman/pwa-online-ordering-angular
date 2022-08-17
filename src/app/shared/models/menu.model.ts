import { MenuClassification } from '../enums/menu-classification.enum';

export class Menu {
  id: number;
  name: string;
  price: number;
  preparationTime: number;
  cookingTime: number;
  classification: MenuClassification;
  isChefRecommendation: boolean;
  pictureUrl: string;

  constructor(
    id: number = 0,
    name: string,
    price: number,
    preparationTime: number = 0,
    cookingTime: number,
    classification: MenuClassification,
    isChefRecommendation: boolean,
    pictureUrl: string
  ) {
    this.id = id || 0;
    this.name = name || '';
    this.price = price || 0;
    this.preparationTime = preparationTime || 0;
    this.cookingTime = cookingTime || 0;
    this.classification = classification || MenuClassification.MAIN_COURSE;
    this.isChefRecommendation = isChefRecommendation || false;
    this.pictureUrl = pictureUrl || '';
  }
}
