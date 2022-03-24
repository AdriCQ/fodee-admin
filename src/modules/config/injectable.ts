import { api } from 'src/boot/axios';
import { ref, InjectionKey } from 'vue';
import { IConfig, IImage } from './types';
/**
 * @class ConfigInjectable
 */
class ConfigInjectable {
  private _config = ref<IConfig>({
    about_us: '',
    address: '',
    email: '',
    events_subtitle: '',
    home_subtitle: '',
    menu_subtitle: '',
    open: false,
    phone: '',
    reserv_subtitle: '',
    social_fb: null,
    social_in: null,
    social_tw: null,
    social_yt: null,
    title: '',
  });
  /**
   * -----------------------------------------
   *	Setters & Getters
   * -----------------------------------------
   */
  get config() {
    return this._config.value;
  }
  set config(conf: IConfig) {
    this._config.value = conf;
  }
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */
  /**
   * load
   */
  async load() {
    const resp = await api.get<IConfig>('/config');
    this.config = resp.data;
    console.log('Config', this.config);
  }
  /**
   * update
   * @param c
   * @returns
   */
  async update(c: Partial<IConfig>) {
    const resp = await api.patch<IConfig>('/config', c);
    this.config = resp.data;
  }
  /**
   * -----------------------------------------
   *	Images
   * -----------------------------------------
   */
  /**
   * listImages
   * @returns
   */
  async listImages() {
    return api.get<IImage[]>('images');
  }
}

export const $configInjectable = new ConfigInjectable();
export const _config: InjectionKey<ConfigInjectable> =
  Symbol('ConfigInjectable');
