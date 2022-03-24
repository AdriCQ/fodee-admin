import { appStore, userStore } from 'src/modules';
import { RouteLocationNormalized as Route } from 'vue-router';
import { ROUTE_NAME } from './index';

export const authGuard = (_to: Route, _from: Route, _next: CallableFunction) => {
    if (!userStore.isAuth) {
        appStore.redirect = { name: _to.name as (ROUTE_NAME), path: _to.path, query: _to.query };

        _next({ name: ROUTE_NAME.LOGIN })
    }
    else {
        _next();
    }
}