import { ApiClient } from '../utils';
import CommonActions from './common.action';
import RouteActions from './route.action';
import { AuthService } from '../services/index';
export const Actions = {
    ...CommonActions,
    signup: 'auth.signup',
    confirmSignup: 'auth.confirmSignup'
};
export function login(cellphone, password) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.fetching, payload: { domain: 'auth' } });

            const data = await ApiClient.post('users/auth', { cellphone: cellphone, password: password });

            const { token, expired_at } = data;
            AuthService.authenticate({ cellphone, token, expired_at });
            dispatch({ type: RouteActions.homeStack });
            dispatch({ type: Actions.fetched, payload: { domain: 'auth' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.error, payload: { domain: 'auth', error: err } });
        }
    };

}
export function fblogin(cellphone, password) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.fetching, payload: { domain: 'auth' } });

            const data = await ApiClient.post('users/auth', { cellphone: cellphone, password: password });

            const { token, expired_at } = data;
            AuthService.authenticate({ cellphone, token, expired_at });
            dispatch({ type: RouteActions.homeStack });
            dispatch({ type: Actions.fetched, payload: { domain: 'auth' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.error, payload: { domain: 'auth', error: err } });
        }
    };

}
export function logout() {
    return (dispatch) => {
        AuthService.authenticate(null);
        dispatch({ type: RouteActions.login });
    };

}
export function register() {
    return (dispatch) => {
        dispatch({ type: RouteActions.register });
    };

}

export function signup(cellphone, password) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.con_fetching, payload: { domain: 'auth' } });

            const data = await ApiClient.post('users/register', { cellphone: cellphone, password: password });

            const { token, expired_at } = data;
            
            console.log('Token, Expired_Date', token, expired_at);
            AuthService.authenticate({ cellphone, token, expired_at });
            dispatch({ type: Actions.signup, payload: { token, expired_at } });
            dispatch({ type: Actions.con_fetched, payload: { domain: 'auth' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.con_error, payload: { domain: 'auth', error: err } });
        }
    };
}

export function confirmSignup(code) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.reg_fetching, payload: { domain: 'auth' } });

            console.log('Token ======= ', AuthService.getToken(), code);
            const data = await ApiClient.post('users/register/confirmcode', { code: code }, AuthService.getToken());

            const { token, expired_at } = data;
            console.log('SignUp Token ======= ', token, expired_at);
            dispatch({ type: Actions.confirmSignup, payload: { token, expired_at } });
            dispatch({ type: Actions.reg_fetched, payload: { domain: 'auth' } });
            dispatch({ type: RouteActions.login });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.reg_error, payload: { domain: 'auth', error: err } });
        }
    };
}

