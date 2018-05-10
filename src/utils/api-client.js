import AppEnv from '../env';
import AppError from './app-error';
export async function get(endpoint, authorizeToken) {
    try {
        let headers = initRequestHeader();

        if (authorizeToken)
            headers['Authorization'] = 'JWT ' + authorizeToken;

        let resp = await fetch(AppEnv.api_url + '/' + endpoint, {
            method: 'GET',
            headers: headers,
        });
        if (resp.ok) {
            let data = await resp.json();
            return data;
        }
        else {
            const { error_text, error_code } = await resp.json();
            throw new AppError(error_code, error_text);
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(1, error.message);
    }

}
export async function post(endpoint, payload, authorizeToken) {
    try {

        let headers = initRequestHeader();
        if (authorizeToken)
            headers['Authorization'] = 'JWT ' + authorizeToken;

        let resp = await fetch(AppEnv.api_url + '/' + endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
        if (resp.ok) {
            let data = await resp.json();
            return data;
        }
        else {
            const { error_text, error_code } = await resp.json();
            throw new AppError(error_code, error_text);
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(1, error.message);
    }
}
export async function patch(endpoint, payload, authorizeToken) {
    try {
        let headers = initRequestHeader();
        if (authorizeToken)
            headers['Authorization'] = 'JWT ' + authorizeToken;
        
        let resp = await fetch(AppEnv.api_url + '/' + endpoint, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(payload)
        });

        console.log('Patch Response: ' + JSON.stringify(resp));
        if (resp.ok) {
            let data = await resp.json();
            return data;
        }
        else {
            const { error_text, error_code } = await resp.json();
            throw new AppError(error_code, error_text);
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(1, error.message);
    }
}
function initRequestHeader() {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    return headers;
}
function initPatchRequestHeader() {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    return headers;
}
