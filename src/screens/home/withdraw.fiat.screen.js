import React from 'react';
import { connect } from 'react-redux';
import {
    View, ScrollView, StyleSheet,
    TouchableOpacity, RefreshControl, Dimensions
} from 'react-native';
import { Divider, Header, Icon, Text, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { JsHelper } from '../../utils/index';
import { UserAction, RouteActions } from '../../actions/index';

// Withdraw for Fiat
class WithdrawFiatScreenContainer extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: mainBgColor },
        title: 'Withdraw',
    }
    constructor(props) {
        super(props);
        this.state = { 
            amount: '',
            sms_code: ''
        };
    }
    componentDidMount() {
        this.queryUser();
    }
    queryUser() {
        const { dispatch } = this.props;
        dispatch(UserAction.query());
    }

    onSendSms() {
        const { dispatch, user } = this.props;
        const { sel_account } = user;
        const { amount } = this.state;
        console.log('Send SMS', sel_account);
        if ( !amount ){
            alert("Please fill required values");
            return
        }
        dispatch(UserAction.withdraw_fiat_request(parseInt(amount, 10), sel_account.account_id));

    }

    onSubmit() {
        const { sms_code } = this.state;
        const { dispatch } = this.props;
        if ( !sms_code ){
            alert('Please input SMS CODE')
            return
        }
        dispatch(UserAction.withdraw_confirm(this.state.sms_code));
    }

    render() {
        // const { des_accounts } = this.props.user;
        const { profile } = this.props.user;
        const { user } = this.props;
        const { status, withdraw_error } = user;

        var data = [{value: profile.bank_branch}];//Array();
        console.log('Profile Account: ', profile.bank_branch);
        return (
            <ScrollView style={[{ flex: 1, backgroundColor: '#7e57c2' }]} refreshControl={
                <RefreshControl progressBackgroundColor='#fff' colors={[mainBgColor]}
                    refreshing={false}
                    onRefresh={this.queryUser.bind(this)}
                />}>
                <View>
                    <View style={{ height: 50 }} />
                    <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
                        <Dropdown
                            style={{width: 200}}
                            label={"Bank Account"}
                            data={data}
                            selectedItemColor={'#000'}
                            baseColor={'white'}
                            textColor={'white'}
                            onChangeText = { this.onSelectedItem.bind(this)}
                        />
                    </View>
                    <Text style={{ textAlignVertical: 'center', marginLeft: 20, textAlign: 'left', justifyContent: 'center', width: 100, color: mainTextColor}}>Withdraw All</Text>
                    <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                        onChangeText={(text) => { this.setState({ amount: text }) }}
                        inputStyle={{ color: mainTextColor }}
                        value={this.state.amount}
                        returnKeyType='next'
                        underlineColorAndroid="transparent"
                        keyboardType="phone-pad" placeholder="Please input withdrawal Amount"></FormInput>

                    <View style={[styles.actionRow,
                        { marginTop: 20, marginLeft: 20, marginRight: 20}]}>
                        <View style={{flex: 1}}>
                            <Button onPress={this.onSendSms.bind(this)}
                                    loadingRight={true}
                                    loading={status === 'withdraw_fetching'}
                                    disabled={status === 'withdraw_fetching'}
                                    disabledStyle={{ backgroundColor: secondaryBgColor }}
                                    title={status === 'withdraw_fetching' ? ' ' : 'SEND SMS'}
                                    backgroundColor={secondaryBgColor} />
                        </View>
                    </View>
                    
                     <View style={[ 
                        { flexDirection: 'row', marginLeft: 20, marginRight: 20 }]}>
                        
                        <View style={{flex: 1}}>
                            <FormInput
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                onChangeText={(text) => { this.setState({ sms_code: text }) }}
                                inputStyle={{ color: mainTextColor}}
                                value={this.state.sms_code}
                                returnKeyType='done'
                                underlineColorAndroid="transparent"
                                keyboardType="phone-pad" placeholder="Sms Code" />
                        </View>
                        <View style={{flex: 1}}>
                            <Button onPress={this.onSubmit.bind(this)}
                                loadingRight={true}
                                loading={status === 'con_fetching'}
                                disabled={status === 'con_fetching'}
                                buttonStyle={{width: 150,}}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title={status === 'con_fetching' ? ' ' : 'CONFIRM'}
                                backgroundColor={secondaryBgColor} />
                        </View>
                    </View>
                    <View style={{ height: 35 }}>
                        {withdraw_error && <FormValidationMessage>{withdraw_error.text}</FormValidationMessage>}
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


export default connect((state) => ({ user: state.user }))(WithdrawFiatScreenContainer);
