import { api } from 'src/boot/axios';
import { DataBase } from 'src/types';
import { InjectionKey } from 'vue';

export interface IReserve extends DataBase {
  name: string;
  email: string;
  message?: string;
  date: string;
  occation: string;
}
/**
 *
 */
class ReserveInjectable {
  async list() {
    return api.get<IReserve[]>('reserves');
  }
  async remove(id: number) {
    return api.delete(`reserves/${id}`);
  }
}

export const $reserveInjectable = new ReserveInjectable();
export const _reserve: InjectionKey<ReserveInjectable> =
  Symbol('ReserveInjectable');
