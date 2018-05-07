import { Actions } from '../actions/history.action';
import handleDataStatusAction from './common.reducer';
function auth(state = {
    records: [], status: 'fetched'
}, action) {
    let nextState;
    switch (action.type) {
        case Actions.query:
            if (action.payload) {
                nextState = { ...state, records: action.payload };
            }
            break;
        case Actions.payhistory:
            break;
        default:
            nextState = handleDataStatusAction(action, state, 'history');
            break;
    }
    return nextState || state;
}

export default auth;
