import { api } from 'src/boot/axios';
import { InjectionKey } from 'vue';
import { IDish } from './types';
/**
 *@class DishInjectable
 */
class DishInjectable {
  /**
   * create
   * @param dish
   * @returns
   */
  async create(dish: IDish) {
    return api.post<IDish>('dishes', dish);
  }
  /**
   * list
   * @returns
   */
  async list() {
    return api.get<IDish[]>('dishes');
  }
  /**
   * remove
   * @param id
   * @returns
   */
  async remove(id: number) {
    return api.delete(`dishes/${id}`);
  }
  /**
   * update
   * @param id
   * @returns
   */
  async update(id: number, dish: IDish) {
    return api.patch(`dishes/${id}`, dish);
  }
}

export const $dishInjectable = new DishInjectable();
export const _dish: InjectionKey<DishInjectable> = Symbol('DishInjectable');
