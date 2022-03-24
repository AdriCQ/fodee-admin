import { ref, InjectionKey } from 'vue';
import { ShopService } from './service';
import { IConfig, IDestination, IOrder, IProduct } from './types';
/**
 * ShopStore
 */
export class ShopStore {
  private readonly $service = new ShopService();
  private _config = ref<IConfig>({
    address: '',
    currency: 'CUP',
    email: '',
    name: '',
    open: false,
    phone: '',
    description: '',
    phone_extra: '',
    social_facebook: null,
    social_instagram: null,
    social_twitter: null,
    social_youtube: null,
    wallet: null,
    wallet_type:null
  })
  private _destinations = ref<IDestination[]>([]);
  private _orders = ref<IOrder[]>([]);
  private _products = ref<IProduct[]>([]);
  /**
   * Gets & Sets config
   */
  get config() { return this._config.value; }
  set config(_c: IConfig) { this._config.value = _c; }
  /**
   * Gets destinations
   */
  get destinations() { return this._destinations.value }
  /**
   * Sets destinations
   */
  set destinations(_d: IDestination[]) { this._destinations.value = _d }
  /**
   * Gets & Sets orders
   */
  get orders() { return this._orders.value; }
  set orders(_orders: IOrder[]) { this._orders.value = _orders; }
  /**
   * Gets & Sets products
   */
  get products() { return this._products.value; }
  set products(_p: IProduct[]) { this._products.value = _p; }
  /**
   * -----------------------------------------
   *	Config Actions
   * -----------------------------------------
   */
  /**
   * Gets config
   * @returns
   */
  async getConfig() {
    try {
      const resp = await this.$service.getConfig();
      this.config = resp.data.config;
      this.config.open = Boolean(this.config.open);
      return resp.data;
    } catch (error) { throw error }
  }
  /**
   * updateConfig
   * @param _c
   * @returns
   */
  async updateConfig(_c: IConfig) {
    try {
      const resp = await this.$service.updateConfig(_c);
      this.config = resp.data;
      return this.config;
    } catch (error) { throw error }

  }
  /**
   * -----------------------------------------
   *	Destination Actions
   * -----------------------------------------
   */
  /**
   * Creates action
   * @param _d
   * @returns action
   */
  async createDestination(_d: IDestination): Promise<IDestination> {
    try {
      const resp = await this.$service.createDestination(_d);
      this.destinations.push(resp.data);
      return resp.data;
    } catch (error) { throw error; }
  }
  /**
   * Lists shop store
   * @returns list
   */
  async listDestination(): Promise<IDestination[]> {
    try {
      const resp = await this.$service.listDestination();
      this.destinations = resp.data;
      return this.destinations;
    } catch (error) { throw error; }
  }
  /**
   * Removes action
   * @param _id
   * @returns action
   */
  async deleteDestination(_id: number): Promise<unknown> {
    try {
      await this.$service.deleteDestination(_id);
      const index = this.destinations.findIndex(_d => _d.id === _id)
      return this.destinations.splice(index, 1)
    } catch (error) { throw error; }
  }
  /**
   * Creates action
   * @param _d
   * @returns action
   */
  async updateDestination(_id: number, _d: IDestination): Promise<IDestination> {
    try {
      const resp = await this.$service.updateDestination(_id, _d);
      const index = this.destinations.findIndex(_d => _d.id === _id)
      this.destinations[index] = resp.data;
      return resp.data;
    } catch (error) { throw error; }
  }
  /**
   * -----------------------------------------
   *	Products Actions
   * -----------------------------------------
   */

  findProductById(_id: number): IProduct | undefined {
    return this.products.find(_p => _p.id === _id);
  }
  /**
   * Creates product
   * @param _p
   * @returns
   */
  async createProductAction(_p: IProduct) {
    try {
      const resp = await this.$service.createProduct(_p);
      this.products.unshift(resp.data);
      return resp.data;
    } catch (error) { throw error; }
  }
  /**
   * Deletes product
   * @param _id
   * @returns
   */
  async deleteProductAction(_id: number) {
    try {
      await this.$service.deleteProduct(_id);
      const index = this.products.findIndex(_d => _d.id === _id);
      this.products.splice(index, 1);
      this.products = JSON.parse(JSON.stringify(this.products)) as IProduct[];
    } catch (error) { throw error; }
  }
  /**
   * deleteProductGallery
   * @param _product_id
   */
  async deleteProductGallery(_product_id: number) {
    try {
      await this.$service.removeProductGallery(_product_id);
    } catch (error) { throw error; }

  }
  /**
   * Lists products
   * @returns
   */
  async listProductsAction() {
    try {
      const resp = await this.$service.listProduct();
      this.products = resp.data;
      return this.products;
    } catch (error) { throw error; }
  }
  /**
   * Updates product
   * @param _id
   * @param _d
   * @returns product
   */
  async updateProductAction(_d: IProduct): Promise<IProduct> {
    try {
      const _id = Number(_d.id);
      const resp = await this.$service.updateProduct(_id, _d);
      this.updateProduct(_id, _d);
      return resp.data;
    } catch (error) { throw error; }
  }
  /**
   * Updates product
   * @param _id
   * @param _d
   */
  updateProduct(_id: number, _d: IProduct) {
    const index = this.products.findIndex(_d => _d.id === _id)
    this.products[index] = _d;
  }
  /**
   * -----------------------------------------
   *	Orders
   * -----------------------------------------
   */
  /**
   * Lists order
   * @returns
   */
  async listOrderAction() {
    try {
      const resp = await this.$service.listOrders();
      this.orders = resp.data;
      return this.orders;
    } catch (error) { throw error; }
  }

  async removeOrder(_id: number) {
    try {
      await this.$service.removeOrder(_id);
      const index = this.orders.findIndex(_order => _order.id === _id);
      this.orders.splice(index, 1);
      this.orders = this.orders;
    } catch (error) { throw error; }
  }
  async removeAllOrders() {
    try {
      await this.$service.removeAllOrders();
      this.orders = [];
    } catch (error) { throw error; }
  }
}


/**
 * ShopStore instance
 */
export const shopStore = new ShopStore();
/**
 * ShopStore Inject Key
 */
export const shopInjectionKey: InjectionKey<ShopStore> = Symbol('ShopStore');
