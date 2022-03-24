import { IRoute } from 'src/types';
import { ref, InjectionKey } from 'vue';
/**
 * STORAGE_KEY
 */
// const STORAGE_KEY = 'storage/app';
/**
 * AppStore
 */
export class AppStore {

    private _leftDrawer = ref(false);
    private _redirect: IRoute | null = null;
    /**
     * Left drawer setter & getter
     */
    get leftDrawer() { return this._leftDrawer.value }
    set leftDrawer(_open: boolean) { this._leftDrawer.value = _open }
    /**
     * Redirect getter & setter
     */
    get redirect() { return this._redirect }
    set redirect(_redirect: IRoute | null) { this._redirect = _redirect; }
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    /**
     * toggleLeftDrawer
     */
    toggleLeftDrawer() {
        this._leftDrawer.value = !this._leftDrawer.value
    }
}
/**
 * App instance
 */
export const appStore = new AppStore();
/**
 * App Inject Key
 */
export const appInjectionKey: InjectionKey<AppStore> = Symbol('App');