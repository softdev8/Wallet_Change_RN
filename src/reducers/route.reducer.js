import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../routes';
import Actions from '../actions/route.action';

const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'login',
        }),
    ],
}));

function route(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case Actions.login:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'login', params: action.payload }),
                state
            );
            break;
        case Actions.register:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'register', params: action.payload }),
                state
            );
            break;
        case Actions.home:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'home', params: action.payload }),
                state
            );
            break;
        case Actions.drawerStack:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'drawerStack', params: action.payload }),
                state
            );
            break; 
        case Actions.homeStack:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'mainStack', params: action.payload }),
                state
            );
            break;            
        case Actions.history:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'history', params: action.payload }),
                state
            );
            break;
        case Actions.withdraw:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'withdraw', params: action.payload }),
                state
            );
            break;
        case Actions.deposit:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'deposit', params: action.payload }),
                state
            );
            break;    
        case Actions.profile:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'profile', params: action.payload }),
                state
            );
            break;            
        case Actions.rollback:
            {
                let routes = state.routes;
                let route = routes.find(item => item.routeName == action.payload.routeName);
                let routeIndex = routes.lastIndexOf(route);
                routes = routes.slice(0, routeIndex + 1);
                if (route) {
                    nextState = { ...state, routes: routes, index: routeIndex };
                }
            }
            break;
        default:

            nextState = AppNavigator.router.getStateForAction(action, state);
            break;

    }
    return nextState || state;
}

export default route;
