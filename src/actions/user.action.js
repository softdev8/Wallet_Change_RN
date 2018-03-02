import { ApiClient } from '../utils';
import CommonActions from './common.action';
import { AuthService } from '../services/index';
export const Actions = {
    ...CommonActions,
    query: 'user.query',
    update: 'user.update',
    fiat_status: 'user.fiat_status',
    crypto_status: 'user.crypto_status',
    default_status: 'user.default',
    crypto_type: 'user.crypto_type',
    query_address: 'user.query_address',
    account_query: 'user.account_query',
    withdraw_request: 'user.withdraw_request',
    withdraw_confirm: 'user.withdraw_fonfirm',
    dest_address: 'user.dest_address',
    email_confirm: 'user.email_confirm',
};
export function query() {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            const data = await ApiClient.get('users/query',authToken);

            dispatch({ type: Actions.query, payload: data });

            dispatch({ type: Actions.fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.error, payload: { domain: 'user', error: err } });
        }
    };

}

export function update(email, passwd, client, cuit, nation_id, address, cbu, bank) {
    return async (dispatch) => {
        try{
            dispatch({ type: Actions.update_fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            console.log("Updated Fields", email, passwd, client, cuit, nation_id, address, cbu, bank);
            const data = await ApiClient.patch('users/update', { email: email === null ? "": email, password: passwd === null ? "": passwd, client_name: client === null ?"": client, CUIT: cuit === null ? "": cuit, national_id: nation_id === null?"":nation_id, residential_address: address ===null?"":address, CBU: cbu===null?"":cbu, bank_branch: bank===null?"":bank }, authToken);
            
            console.log('Updated Data:', data);
            
            dispatch({ type: Actions.update, payload: data });
            dispatch({ type: Actions.update_fetched, payload: { domain: 'user' } });

        } 
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.update_error, payload: { domain: 'user', error: err } });

        }
    }
}

export function set_fiat(account) {
    return async (dispatch) => {
        console.log('Set FIAT Account', account)
        dispatch({ type: Actions.default_status});
        dispatch({ type: Actions.fiat_status, payload: {status:true, account: account}});
    }
}

export function set_crypto(account) {
    return async (dispatch) => {
        console.log('Set Crypto Account', account)
        dispatch({ type: Actions.default_status});
        dispatch({ type: Actions.crypto_status, payload: {status: true, account: account}});
    }
}

export function set_default() {
    return async (dispatch) => {
        dispatch({ type: Actions.default_status});
    }
}

export function set_destAddress(address) {
    return async (dispatch) => {

        dispatch({ type: Actions.dest_address, payload: {address: address}});
    }
}

export function query_address(account_id) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.address_fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();

            const data = await ApiClient.post('btc/address/generate',{account_id: account_id},authToken);
            console.log('Generate Address', data);
            dispatch({ type: Actions.query_address, payload: data });
            dispatch({ type: Actions.address_fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.address_error, payload: { domain: 'user', error: err } });
        }
    };
}

export function account_query() {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            const data = await ApiClient.get('account/query',authToken);

            let defaultAccount = data.find(item => item.is_default);
            console.log('Account Data', defaultAccount);

            dispatch({ type: Actions.account_query, payload: {data: data, account: defaultAccount} });

            dispatch({ type: Actions.fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.error, payload: { domain: 'user', error: err } });
        }
    };

}

export function withdraw_request(amount, feerate, address, accountId) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.withdraw_fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            console.log('withdraw request param', authToken, amount, feerate, address, accountId);
            const data = await ApiClient.post('trans/withdrawal', { amount: amount, feerate: feerate, address: address, account_id: accountId }, authToken);
            
            console.log('withdraw request response', data);
            
            dispatch({ type: Actions.withdraw_request, payload: data });
            dispatch({ type: Actions.withdraw_fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log('Withdraw Error Catch', err);
            dispatch({ type: Actions.withdraw_error, payload: { domain: 'user', error: err } });
        }
    };
}

export function withdraw_fiat_request(amount, accountId) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.withdraw_fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            console.log('withdraw request param', authToken, amount, accountId);
            const data = await ApiClient.post('trans/withdrawal', { amount: amount, account_id: accountId }, authToken);
            
            console.log('withdraw request response', data);
            
            dispatch({ type: Actions.withdraw_request, payload: data });
            dispatch({ type: Actions.withdraw_fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log('Withdraw Error Catch', err);
            dispatch({ type: Actions.withdraw_error, payload: { domain: 'user', error: err } });
        }
    };
}

export function withdraw_confirm(code) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.con_fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            const data = await ApiClient.post('trans/withdrawal/confirmcode', { code: code }, authToken);
            
            console.log('withdraw confirm response', data);
            
            dispatch({ type: Actions.withdraw_confirm, payload: data });
            dispatch({ type: Actions.con_fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.withdraw_error, payload: { domain: 'user', error: err } });
        }
    };
}

export function email_confirm(email, code) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.verified_fetching, payload: { domain: 'user' } });
            let authToken=AuthService.getToken();
            const data = await ApiClient.post('users/email/verify', { email: email, code: code }, authToken);
            
            console.log('Email confirm response', data);
            
            dispatch({ type: Actions.email_confirm, payload: data });
            dispatch({ type: Actions.verified_fetched, payload: { domain: 'user' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.verified_error, payload: { domain: 'user', error: err } });
        }
    };
}