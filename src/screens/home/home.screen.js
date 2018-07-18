import React from 'react';
import { connect } from 'react-redux';
import {
    View, ScrollView, StyleSheet, Button,
    TouchableOpacity, RefreshControl, Image, View
} from 'react-native';
import { Divider, Header, Icon, Text } from 'react-native-elements';
import { Assets } from '../../components';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { JsHelper } from '../../utils/index';
import { AuthService } from '../../services/index';
import { UserAction, RouteActions } from '../../actions/index';

// load first screen
class HomeScreenContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showBalance: false };
    }
    componentDidMount() {
        this.queryUser();
    }
    queryUser() {
        console.log("query User");
        const { dispatch } = this.props;
        dispatch(UserAction.query());
    }
    showHideBalance() {
        this.setState({ showBalance: !this.state.showBalance });
    }
    
    goToWithdraw() {
        const { fiat_status, crypto_status, sel_account } = this.props.user;
        if (fiat_status === true) {
            this.props.navigation.navigate("withdraw_fiat");
        } else {
            if ( sel_account.is_default )
                this.props.navigation.navigate("withdraw_fiat");
            else 
                this.props.navigation.navigate("withdraw_crypto");
        }
    }

    goToDepoist() {
        const { fiat_status, crypto_status, sel_account } = this.props.user;
        if (fiat_status === true) {
            this.props.navigation.navigate("deposit_fiat");
        } else {
            if ( sel_account.is_default )
                this.props.navigation.navigate("deposit_fiat");
            else
                this.props.navigation.navigate("deposit_crypto");
        }
    }

    goToHistory() {
        const { dispatch } = this.props;
        dispatch({ type: RouteActions.history });
    }
    
    render() {
        const { showBalance } = this.state;
        const { accounts, fiat_status, crypto_status, sel_account } = this.props.user;

        console.log('Account Info: ========', accounts, crypto_status, fiat_status, sel_account);

        let balance = 0;
        if ( sel_account === null ) {
            let defaultAccount = accounts.find(item => item.is_default);
            if (defaultAccount) {
                balance = defaultAccount.balance;
            }    
        } else {
            balance = sel_account.balance;
        }
        balance = showBalance ? JsHelper.rightPad('' + balance, ' ', 7) : JsHelper.leftPad('*', '*', 7);
        
        return (
            <ScrollView style={[{ flex: 1, backgroundColor: '#7e57c2' }]} refreshControl={
                <RefreshControl progressBackgroundColor='#fff' colors={[mainBgColor]}
                    refreshing={false}
                    onRefresh={this.queryUser.bind(this)}
                />}>

                <View style={[appStyles.container, { marginTop: 20 }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Icon size={60} name='account-circle'
                            color={mainTextColor} />
                        <Text style={[appStyles.mainTextColor, { fontSize: 10 }]}>{AuthService.getCellphone()}</Text>
                    </View>
                    <Divider style={[{ marginTop: 25 }]} />
                    <View style={{ paddingBottom: 25, paddingTop: 25 }}>

                        <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={[appStyles.mainTextColor,]}>$</Text>
                            <Text style={[appStyles.mainTextColor, {
                                textAlign: 'center',
                                width: 120, marginLeft: 5, marginRight: 5
                            }]}>{balance}</Text>
                            <TouchableOpacity onPress={this.showHideBalance.bind(this)}>
                                <Icon name={!showBalance ? 'ios-eye' : 'ios-eye-off'} type='ionicon' size={40} color={mainTextColor} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={[appStyles.container, { backgroundColor: secondaryBgColor }]}>
                    <View style={[styles.actionRow]}>
                        <Assets.DepositIconButton onPress={() => this.goToDepoist.bind(this)} />
                        <Assets.WithdrawIconButton onPress={() => this.goToWithdraw.bind(this)} />
                    </View>
                    <View style={[styles.actionRow]}>
                        <Assets.TransactionHistoryIconButton onPress={() => this.goToHistory.bind(this)} />
                        <View style={{ width: 100 }} />
                    </View>

                </View>
            </ ScrollView >
        );
    }
}

HomeScreenContainer.navigationOptions = ({ navigation }) => ({
    headerStyle: {backgroundColor: mainBgColor},
    headerLeft: drawerButton(navigation)
})

const drawerButton = (navigation) => (
    <TouchableOpacity
      style={{padding: 5}}
      onPress={() => {
        navigation.navigate('DrawerToggle')
      }}>
      <Image 
        source={require('../../assets/images/menu.png')}
        style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
    },
    containView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
    },
});

export default connect((state) => ({ user: state.user }))(HomeScreenContainer);
