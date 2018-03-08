import React from 'react';
import { connect } from 'react-redux';
import {
    View, Text, ScrollView, StyleSheet, 
    TouchableOpacity, RefreshControl, Dimensions, ActivityIndicator
} from 'react-native';
import { Divider, Header, Icon, Button, FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { JsHelper } from '../../utils/index';
import { UserAction, RouteActions } from '../../actions/index';


// Deposit with Crypto
class DepositScreenContainer extends React.Component {
    static navigationOptions = {
        // header: null,
        // title: 'Deposit',
        // headerTintColor:'#fff',
        headerStyle: { backgroundColor: mainBgColor },
        title: 'Deposit',
    }
    constructor(props) {
        super(props);
        this.state = { 
            showBalance: false
        };

        this._showSideBar = this._showSideBar.bind(this);
    }
    componentDidMount() {
        this.queryAddress();
    }
    queryUser() {
        const { dispatch } = this.props;
        dispatch(UserAction.query());
    }
    queryAddress() {
        const { dispatch } = this.props;
        const { sel_account } = this.props.user;
        console.log("Crypto Type : ", sel_account.account_name);
        dispatch(UserAction.query_address(sel_account.account_id));
    }
    showHideBalance() {
        this.setState({ showBalance: !this.state.showBalance });
    }
    _showSideBar() {
        alert('Clicked Menu Icon')
    }
    goToHistory() {
        const { dispatch } = this.props;
        dispatch({ type: RouteActions.history });
    }

    onCopyClip() {
    }

    onShareAddress() {
    }

    onChangeAddress() {
    }

    goToFiatTwo() {
        this.props.navigation.navigate("fiattwo");
    }
    
    render() {
        const { showBalance } = this.state;
        const { accounts, address, status } = this.props.user;

        let balance = 0;
        let defaultAccount = accounts.find(item => item.is_default);
        if (defaultAccount) {
            balance = defaultAccount.balance;
        }
        balance = showBalance ? JsHelper.rightPad('' + balance, ' ', 7) : JsHelper.leftPad('*', '*', 7);
        return (
            <ScrollView style={[{ flex: 1, backgroundColor: '#7e57c2' }]} refreshControl={
                <RefreshControl progressBackgroundColor='#fff' colors={[mainBgColor]}
                    refreshing={false}
                    onRefresh={this.queryUser.bind(this)}
                />}>
            
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={[appStyles.container, { backgroundColor: '#000', justifyContent: 'center', marginTop: 40, width: Dimensions.get('window').width - 40, height: 200 }]} >
                        <Text style={{textAlign: 'center', alignItems: 'center', fontSize: 30, color: mainTextColor}}>QR Code</Text>
                    </View>
                    {/* <View style={{width: Dimensions.get('window').width - 40, marginTop: 20}}>
                        <Button onPress={this.onShareAddress.bind(this)}
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title='Scan QR'
                            backgroundColor={secondaryBgColor} />
                    </View> */}
                    {
                        status === "address_fetching" ?
                        <View style={{ paddingHorizontal: 12, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator color={mainTextColor} />
                        </View> 
                        :
                        <Text style={{ textAlign: 'center',marginTop: 20, height: 50, alignContent: 'center', width: Dimensions.get('window').width - 40, fontSize: 18, color: mainTextColor}}>{address}</Text>
                    }

                    <View style={{width: Dimensions.get('window').width - 40, marginTop: 20}}>
                        <Button onPress={this.onCopyClip.bind(this)}
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title='COPY TO CLIPBOARD'
                            backgroundColor={secondaryBgColor} />
                    </View>
                    <View style={{width: Dimensions.get('window').width - 40, marginTop: 20}}>
                        <Button onPress={this.onShareAddress.bind(this)}
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title='SHARE ADDRESS'
                            backgroundColor={secondaryBgColor} />
                    </View>
                    <View style={{width: Dimensions.get('window').width - 40, marginTop: 20}}>
                        <Button onPress={this.onChangeAddress.bind(this)}
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title='CHANGE ADDRESS'
                            backgroundColor={secondaryBgColor} />
                    </View>
                    
                </View>
                
                
            </ ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
    }
});

export default connect((state) => ({ user: state.user }))(DepositScreenContainer);
