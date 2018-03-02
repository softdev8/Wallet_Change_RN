import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import ProfileScreen from './profile.screen';


export default (DrawNav = StackNavigator({
    profile: { screen: ProfileScreen },
}));