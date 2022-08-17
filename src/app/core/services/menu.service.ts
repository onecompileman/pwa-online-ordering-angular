import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuClassification } from 'src/app/shared/enums/menu-classification.enum';
import { Menu } from 'src/app/shared/models/menu.model';
import { CompositeService } from './composite.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends CompositeService<Menu> {
  public async loadMenuItem(): Promise<Menu[]> {
    const res = await fetch('/assets/data/menu.json');
    const menuItems = await res.json();

    if (menuItems) {
      this.items$.next(menuItems);

      return menuItems;
    } else {
      this.items$.next([]);

      return [];
    }
  }
  public getAllByClassification(
    classification: MenuClassification = MenuClassification.MAIN_COURSE
  ): Menu[] {
    const propertyName = 'classification';

    return this.getAllByPropertyValue(propertyName, classification);
  }

  public getAllChefRecommendation(): Menu[] {
    const propertyName = 'isChefRecommendation';

    return this.getAllByPropertyValue(propertyName, 1);
  }

  public getById(id: number): Menu {
    const propertyName = 'id';

    return this.getSingleByPropertyValue(propertyName, id).value;
  }
}
