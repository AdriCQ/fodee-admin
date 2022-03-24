import { api } from 'src/boot/axios';
import { InjectionKey } from 'vue';
import { IEvent } from './types';
/**
 * @class EventModule
 */
class EventModule {
  /**
   * API
   */
  private readonly API = '/events';
  /**
   * create
   * @param event
   * @returns
   */
  async create(event: Omit<IEvent, 'id'>) {
    return api.post<IEvent>(this.API, event);
  }
  /**
   * find
   * @param eventId
   * @returns
   */
  async find(eventId: number) {
    return api.get<IEvent>(`${this.API}/${eventId}`);
  }
  /**
   * list events
   * @returns
   */
  async list() {
    return api.get<IEvent[]>(this.API);
  }
  /**
   * remove
   * @param eventId
   * @returns
   */
  async remove(eventId: number) {
    return api.delete(`${this.API}/${eventId}`);
  }
  /**
   * update
   * @param eventId
   * @param update
   * @returns
   */
  async update(eventId: number, update: Partial<IEvent>) {
    return api.patch<IEvent>(`${this.API}/${eventId}`, update);
  }
}

export const $event = new EventModule();
export const _event: InjectionKey<EventModule> = Symbol('EventModule');
