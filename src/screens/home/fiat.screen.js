import React from 'react';
import { connect } from 'react-redux';
import {
    View, ScrollView, StyleSheet, 
    TouchableOpacity, RefreshControl, Dimensions
} from 'react-native';
import { Divider, Header, Icon, Text, Button, FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Assets } from '../../components';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { JsHelper } from '../../utils/index';
import { UserAction, RouteActions } from '../../actions/index';


// Deposit Screen for Fiat
class FiatScreenContainer extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: mainBgColor },
        title: 'Deposit',
    }
    constructor(props) {
        super(props);
        this.state = { 
            showBalance: false,
            address: ''
        };

        this._showSideBar = this._showSideBar.bind(this);
    }
    componentDidMount() {
        this.queryUser();
    }
    queryUser() {
        const { dispatch } = this.props;
        dispatch(UserAction.query());
    }
    queryAddress() {
        const { dispatch } = this.props;
        dispatch(UserAction.query());
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
        this.props.navigation.navigate("deposit_fiattwo");
    }
    
    render() {
        const { showBalance } = this.state;
        const { accounts } = this.props.user;

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
                        
                        <View style={{width: Dimensions.get('window').width - 40, marginTop: 50}}>
                            <Button onPress={this.goToFiatTwo.bind(this)}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title='Bank Transfer'
                                backgroundColor={secondaryBgColor} />
                        </View>
                        <View style={{width: Dimensions.get('window').width - 40, marginTop: 20, opacity: 0.5}}>
                            <Button 
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title='Rapipago'
                                backgroundColor={secondaryBgColor} />
                        </View>
                        <View style={{width: Dimensions.get('window').width - 40, marginTop: 20, opacity: 0.5}}>
                            <Button 
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title='Pagofácil'
                                backgroundColor={secondaryBgColor} />
                        </View>
                        <View style={{width: Dimensions.get('window').width - 40, marginTop: 20, opacity: 0.5}}>
                            <Button 
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title='Qiwi deposit'
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

export default connect((state) => ({ user: state.user }))(FiatScreenContainer);
