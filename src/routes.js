import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, Image, Animated, Easing, } from 'react-native';
import { addNavigationHelpers, StackNavigator, NavigationActions, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  LoginScreen, RegiterScreen, ProfileScreen
} from './screens';
import SideBar from './screens/sidebar.screen';
import HomeScreens from './screens/home/index';
import ProfileScreens from './screens/profile/index';
import { AuthService } from './services/index';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from './shared/app-styles';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const DrawerStack = DrawerNavigator({
  home: { screen: HomeScreens },
  profile: { screen: ProfileScreens }
}
,{
  contentComponent: SideBar
})

const backButton = (navigation) => (
    <TouchableOpacity
        style={{padding: 5}}
        onPress={() => {
            navigation.goBack();
        }}>
        <Icon name={'md-arrow-back'} type='ionicon' size={30} color={mainTextColor} />
    </TouchableOpacity>
)

const drawerButton = (navigation) => (
    <TouchableOpacity
      style={{padding: 5}}
      onPress={() => {

          navigation.navigate('DrawerToggle');

      }}>
      <Image source={require('./assets/images/menu.png')}
      style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
)

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}
, {
  headerMode: 'none'
});

const LoginStack = StackNavigator({
  login: { screen: LoginScreen },
  register: { screen: RegiterScreen },
})

export const AppNavigator = StackNavigator({
  LoginStack: { screen: LoginStack},
  mainStack: { screen: DrawerNavigation },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginStack',
  transitionConfig: noTransitionConfig
});

const defaultGetStateForAction = AppNavigator.router.getStateForAction;

AppNavigator.router.getStateForAction = (action, state) => {
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName !== 'login'
  ) {
    let isAuthenticated = AuthService.isAuthenticated();
    if (!isAuthenticated) {
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'login', params: action.payload }),
        state);
    }
    if (isAuthenticated && state.index - 1 >= 0 && state.routes[state.index - 1].routeName == 'login') {
      return null;
    }
  }

  return defaultGetStateForAction(action, state);
};

const AppNavigatorWithState = ({ dispatch, route }) => {
  return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: route })} />;
};
export default connect(state => ({ route: state.route }))(AppNavigatorWithState);
