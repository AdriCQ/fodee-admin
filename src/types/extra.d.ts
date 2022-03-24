import { LocationQuery } from 'vue-router';
import { ROUTE_NAME } from 'src/router';
/**
 * Data Base Properties
 */
export interface DataBase<T = number> {
    id?: T,
    created_at?: string,
    upadated_at?: string
}
/**
 * DataBaseWithImage
 */

export interface DataBaseWithImage<T = number> extends DataBase<T> {
    image?: IOnlyId;
    imageId: number;
}

/**
 * Services Extra Types
 */

export interface ErrorData {
    error: string,
    message: string
    statusCode: number
}
/**
 * IDictionary
 */
export interface IDictionary<T = string> {
    [key: string]: T;
}
/**
 * Ionly id
 * @template T 
 */
export interface IOnlyId<T = number> {
    id: T;
}
/**
 * Iroute
 */
export interface IRoute<Q = LocationQuery | IDictionary<string | (string | null)[]>> {
    name?: ROUTE_NAME;
    path?: string;
    query?: Q;
}