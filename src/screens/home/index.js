import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import HomeScreen from './home.screen';
import HistoryScreen from './history.screen';
import WithdrawCryptoScreen from './withdraw.screen';
import DepositScreen from './deposit.screen';
import FiatScreen from './fiat.screen';
import FiatTwoScreen from './fiattwo.screen';
import WithdrawFiatScreen from './withdraw.fiat.screen';


export default (DrawNav = StackNavigator({
  home: { screen: HomeScreen },
  history: { screen: HistoryScreen },
  deposit_crypto: { screen: DepositScreen },
  deposit_fiat: { screen: FiatScreen },
  deposit_fiattwo: { screen: FiatTwoScreen },
  withdraw_crypto: { screen: WithdrawCryptoScreen },
  withdraw_fiat: { screen: WithdrawFiatScreen },
}));

