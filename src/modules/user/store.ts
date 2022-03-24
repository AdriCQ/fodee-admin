import { LocalStorage } from 'quasar';
import { InjectionKey, ref } from 'vue';
import { UserService } from './service';
import { IAuthResponse, IUserLogin, IUserProfile, IUpdatePassword } from './types';
/**
 * User store
 */
export class UserStore {
    private readonly $service = new UserService();
    private _apiToken = ref<null | string>(null);
    private _collaborators = ref<IUserProfile[]>([]);
    private _profile = ref<IUserProfile>({
        email: '',
        name: '',
        type: 'ADMIN'
    });
    /**
     * Gets & Sets api token
     */
    get apiToken() { return this._apiToken.value; }
    set apiToken(_token: null | string) { this._apiToken.value = _token; }
    /**
     * Gets & Sets collaborators
     */
    get collaborators() { return this._collaborators.value; }
    set collaborators(_col: IUserProfile[]) { this._collaborators.value = _col; }
    /**
     * Gets whether is auth
     */
    get isAuth() { return Boolean(this.apiToken); }
    /**
     * Gets & Sets profile
     */
    get profile() { return this._profile.value; }
    set profile(_p: IUserProfile) { this._profile.value = _p; }
    /**
     * -----------------------------------------
     *	Actions
     * -----------------------------------------
     */
    /**
     * Creates action
     * @param _profile 
     * @returns  
     */
    async createAction(_profile: IUserProfile) {
        try {
            const resp = await this.$service.create(_profile);
            this.collaborators.push(resp.data);
            return resp.data;
        } catch (error) { throw error }
    }
    /**
     * Deletes action
     * @param _id 
     * @returns  
     */
    async deleteAction(_id: number) {
        try {
            const resp = await this.$service.delete(_id);
            const index = this.collaborators.findIndex(_col => _col.id === _id);
            this.collaborators.splice(index, 1)
            return resp.data;
        } catch (error) { throw error }

    }
    /**
     * Lists action
     * @returns action 
     */
    async listAction(): Promise<IUserProfile[]> {
        try {
            const resp = await this.$service.list();
            this.collaborators = resp.data;
            return resp.data;
        } catch (error) { throw error; }
    }
    /**
     * Logins action
     * @param _p 
     * @returns action 
     */
    async loginAction(_p: IUserLogin): Promise<IAuthResponse> {
        try {
            const resp = await this.$service.login(_p);
            this.apiToken = resp.data.api_token;
            this.profile = resp.data.profile;
            this.save();
            return resp.data;
        } catch (error) { throw error }
    }
    /**
     * Updates action
     * @param _id 
     * @param _profile 
     * @returns  
     */
    async updateAction(_id: number, _profile: IUserProfile) {
        try {
            const resp = await this.$service.update(_id, _profile);
            const index = this.collaborators.findIndex(_col => _id === _col.id);
            this.collaborators[index] = resp.data;
            return resp.data;
        } catch (error) { throw error }
    }
    async updatePasswordAction(_p: IUpdatePassword) {
        try {
            await this.$service.updatePassword(_p);
            this.logout();
        } catch (error) { throw error }
    }
    /**
     * -----------------------------------------
     *	Methods
     * -----------------------------------------
     */
    load() {
        const _key = 'store/User';
        if (LocalStorage.has(_key)) {
            const resp = LocalStorage.getItem(_key)?.toString();
            if (resp) {
                const json = JSON.parse(resp) as unknown as IAuthResponse;
                this.profile = json.profile;
                this.apiToken = json.api_token;
            }
        }
    }
    logout() {
        this.apiToken = null;
        this.profile = {
            type: 'ADMIN',
            email: '',
            name: ''
        };
        this.save();
    }
    save() {
        LocalStorage.set('store/User', JSON.stringify({
            profile: this.profile,
            api_token: this.apiToken
        }))
    }

}

export const userStore = new UserStore();
export const userInjectionKey: InjectionKey<UserStore> = Symbol('UserStore');