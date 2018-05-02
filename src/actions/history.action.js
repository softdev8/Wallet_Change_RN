import { ApiClient } from '../utils';
import CommonActions from './common.action';
import { AuthService } from '../services/index';
export const Actions = {
    ...CommonActions,
    query: 'trans.query'
};

export function query(type, dateFrom, dateTo) {
    return async (dispatch) => {
        try {
            dispatch({ type: Actions.fetching, payload: { domain: 'history' } });
            let authToken = AuthService.getToken();
            let queryStr = `trans/query?type=${type}&from=${dateFrom}`;
            if (dateTo)
                queryStr += `&to=${dateTo}`;

            const data = await ApiClient.get(queryStr, authToken);

            dispatch({ type: Actions.query, payload: data });

            dispatch({ type: Actions.fetched, payload: { domain: 'history' } });
        }
        catch (err) {
            console.log(err);
            dispatch({ type: Actions.error, payload: { domain: 'history', error: err } });
        }
    };

}
