import { Actions } from '../actions/user.action';
import handleDataStatusAction from './common.reducer';
function user(state = {
    profile: null, accounts: [], message: null, fiat_status: false, crypto_status: false, crypto_type: null, address: '', des_accounts: [], dest_address: '', sel_account: null, isEmailVerify: false,
}, action) {
    let nextState;
    switch (action.type) {
        case Actions.query:
            if (action.payload) {
                const { profile, accounts } = action.payload;
                nextState = { ...state, profile: profile, accounts: accounts, isEmailVerify: false };
            }
            break;
        case Actions.update:
            if (action.payload) {
                const { data } = action.payload;
                console.log("Updated Reduce :", data, data.email_verifying);
                nextState = { ...state, message: data.message, isEmailVerify: data.email_verifying };
            }
            break;
        case Actions.fiat_status:
            if (action.payload) {
                const {status, account} = action.payload;
                console.log("Updated fiat_status :", status, account);
                nextState = { ...state, fiat_status: status, sel_account: account };
            }
            break;          
        case Actions.crypto_status:
            if (action.payload) {
                const {status, account} = action.payload;
                console.log("Updated crypto_status :", status, account);
                nextState = { ...state, crypto_status: status, sel_account: account };
            }
            break;          
        case Actions.default_status:
                nextState = { ...state, crypto_status: false, fiat_status: false };
            
            break;
        case Actions.account_query:
            if (action.payload) {
                const {data, account} = action.payload;
                console.log('Response accounts', data, account);
                nextState = { ...state, des_accounts: data, sel_account: account };
            }
            break;            
        case Actions.query_address:
            if (action.payload) {
                const { address } = action.payload;
                console.log("Response Generated Address", address);
                nextState = { ...state, address: address };
            }
            break;
        case Actions.withdraw_request:
            if (action.payload) {
                const { data } = action.payload;
                nextState = { ...state };
            }
            break;
        case Actions.withdraw_confirm:
            if (action.payload) {
                const { data } = action.payload;
                nextState = { ...state };
            }
            break;
        case Actions.dest_address:
            if (action.payload) {
                const { address } = action.payload;
                nextState = { ...state, dest_address: address };
            }
            break;
        case Actions.email_confirm:
            if (action.payload) {
                const { data } = action.payload;
                nextState = { ...state, isEmailVerify: false };
            }
            break;            
        default:
            nextState = handleDataStatusAction(action, state, 'user');
            break;
    }
    return nextState || state;
}


export default user;
