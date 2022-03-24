import { AxiosPromise } from 'axios';
import { api } from 'src/boot/axios';
import { IAuthResponse, IUserLogin, IUserProfile, IUpdatePassword } from './types';
/**
 * User service
 */
export class UserService {
    /**
     * Base path of user service
     */
    private readonly BASE_PATH = '/users';
    /**
     * Creates user service
     * @param _user 
     * @returns create 
     */
    create(_user: IUserProfile): AxiosPromise<IUserProfile> { return api.post(this.BASE_PATH, _user); }
    /**
     * Deletes user service
     * @param _id 
     * @returns delete 
     */
    delete(_id: number): AxiosPromise<IUserProfile> { return api.delete(`${this.BASE_PATH}/${_id}`); }
    /**
     * Lists user service
     * @returns list 
     */
    list(): AxiosPromise<IUserProfile[]> { return api.get(this.BASE_PATH) }
    /**
     * Logins user service
     * @param _p 
     * @returns login 
     */
    login(_p: IUserLogin): AxiosPromise<IAuthResponse> { return api.post(this.BASE_PATH + '/login', _p) }
    /**
     * Updates user service
     * @param _id 
     * @param _user 
     * @returns update 
     */
    update(_id: number, _user: IUserProfile): AxiosPromise<IUserProfile> {
        return api.put(`${this.BASE_PATH}/${_id}`, _user)
    }
    /**
     * Updates password
     * @param _p 
     * @returns password 
     */
    updatePassword(_p: IUpdatePassword): AxiosPromise<void> { return api.post(`${this.BASE_PATH}/update-password`, _p) }
}