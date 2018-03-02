import Actions from '../actions/common.action';
export default function handleDataStatusAction(action, state, domain) {
    let nextState = state;
    switch (action.type) {
        case Actions.fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'fetching', error: null };
            break;
        case Actions.fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'fetched', error: null };
            break;
        case Actions.error:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'error', error: action.payload.error };
            break;
        case Actions.con_fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'con_fetching', error: null };
            break;
        case Actions.con_fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'con_fetched', error: null };
            break;
        case Actions.con_error:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'con_error', con_error: action.payload.error };
            break;
        case Actions.reg_fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'reg_fetching', error: null };
            break;
        case Actions.reg_fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'reg_fetched', error: null };
            break;
        case Actions.reg_error:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'reg_error', error: action.payload.error };
            break;
        case Actions.update_fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'update_fetching', error: null };
            break;
        case Actions.update_fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'update_fetched', error: null };
            break;
        case Actions.update_error:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'update_error', update_error: action.payload.error };
            break;
        case Actions.verified_fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'verified_fetching', error: null };
            break;
        case Actions.verified_fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'verified_fetched', error: null };
            break;
        case Actions.verified_error:
            if (action.payload.domain === domain)
            {
                console.log('Response Error', action.payload);
                nextState = { ...state, status: 'verified_error', verified_error: action.payload.error };
            }
            break;
        case Actions.withdraw_fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'withdraw_fetching', error: null };
            break;
        case Actions.withdraw_fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'withdraw_fetched', error: null };
            break;
        case Actions.withdraw_error:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'withdraw_error', withdraw_error: action.payload.error };
            break;
        case Actions.address_fetching:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'address_fetching', error: null };
            break;
        case Actions.address_fetched:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'address_fetched', error: null };
            break;
        case Actions.address_error:
            if (action.payload.domain === domain)
                nextState = { ...state, status: 'address_error', address_error: action.payload.error };            
            break;
        default:
            nextState = state;
            break;
    }
    return nextState;
}