import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import ProfileScreen from './profile.screen';
import SettingScreen from './setting.screen';
import EditProfileScreen from './editprofile.screen';

export default (DrawNav = StackNavigator({
    profile: { screen: ProfileScreen },
    setting: { screen: SettingScreen },
    editprofile: { screen: EditProfileScreen },
}));
