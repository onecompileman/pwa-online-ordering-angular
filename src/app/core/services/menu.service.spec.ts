import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { MenuClassification } from 'src/app/shared/enums/menu-classification.enum';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    service = new MenuService();
  });

  beforeEach(async () => {
    await service.loadMenuItem();
  });

  it('#loadMenuItem should put values on items$ on length 20', async () => {
    const expectedMenuLength = 20;

    await service.loadMenuItem();

    expect(service.getLength()).toBe(expectedMenuLength);
  });

  it('#getAllChefRecommendation should return every objects with isChefRecommendation 1', () => {
    const chefsRecommendationMenu = service.getAllChefRecommendation();

    const isAllChefsRecommendation = chefsRecommendationMenu.every(
      (menu) => menu.isChefRecommendation
    );

    expect(isAllChefsRecommendation).toBeTruthy();
  });

  it('#getById should return a value when id is between 1 to 20', () => {
    const validMenuId = 5;
    const validMenu = service.getById(validMenuId);

    expect(validMenu).toBeTruthy();

    const invalidId = 25;
    const invalidMenu = service.getById(invalidId);

    expect(invalidMenu).toBeFalsy();
  });

  it('#getAllByClassification should return every objects with classification === MenuClassification provided', () => {
    const selectedClassification = MenuClassification.MAIN_COURSE;

    const menuByClassifications = service.getAllByClassification(
      selectedClassification
    );

    const isAllMenuBasedOnClassification = menuByClassifications.every(
      (menu) => menu.classification === selectedClassification
    );

    expect(isAllMenuBasedOnClassification).toBeTruthy();
  });
});
