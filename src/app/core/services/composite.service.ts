import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { get } from 'lodash';

export class CompositeService<T> {
  protected items$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public getAll(): T[] {
    return this.items$.getValue();
  }

  public selectAll(): Observable<T[]> {
    return this.items$;
  }

  public add(item: T): void {
    const items: any[] = this.getAll();

    items.push(item);

    this.items$.next(items);
  }

  public delete(index: number): void {
    const items: any[] = this.getAll();

    items.splice(index, 1);

    this.items$.next(items);
  }

  public clearAll(): void {
    this.items$.next([]);
  }

  public update(item: T, index: number): void {
    const items: any[] = this.getAll();

    items[index] = item;

    this.items$.next(items);
  }

  public getLength(): number {
    return this.getAll().length;
  }

  public selectLength() {
    return this.selectAll().pipe(map((items) => items.length));
  }

  /**
   * Returns filtered array of object based on property and value
   * @param {string} property
   * @param {any} value
   * @returns {T[]}
   */
  protected getAllByPropertyValue(property: string, value: any): T[] {
    const items: any[] = this.getAll();

    return items.filter((item) => item[property] === value);
  }

  /**
   * Returns filtered array of object based on property and value
   * @param {string} property
   * @param {any} value
   * @returns {T}
   */
  protected getSingleByPropertyValue(
    property: string,
    value: any
  ): { value: T; index: number } {
    const items: any[] = this.getAll();

    const index = items.findIndex((item) => get(item, property) === value);

    return {
      value: items[index],
      index,
    };
  }
}
