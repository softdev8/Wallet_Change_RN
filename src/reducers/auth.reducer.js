import { Actions } from '../actions/auth.action';
import handleDataStatusAction from './common.reducer';
function auth(state = {
    signupConfirmToken: null
}, action) {
    let nextState;
    switch (action.type) {
        case Actions.signup:
            if (action.payload) {
                nextState = { ...state, user: action.payload };
            }
            break;
        case Actions.confirmSignup:
            if (action.payload) {

                nextState = { ...state, user: action.payload };
            }
            break;
        case Actions.signin:
            break;
        default:
            nextState = handleDataStatusAction(action, state, 'auth');
            break;
    }
    return nextState || state;
}

export default auth;
