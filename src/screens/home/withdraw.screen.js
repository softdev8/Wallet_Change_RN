import React from 'react';
import { connect } from 'react-redux';
import {
    View, ScrollView, StyleSheet, 
    TouchableOpacity, RefreshControl, Dimensions
} from 'react-native';
import { Divider, Header, Icon, Text, Button, FormInput, FormValidationMessage } from 'react-native-elements';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import RadioButton from 'radio-button-react-native';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { JsHelper } from '../../utils/index';
import { UserAction, RouteActions } from '../../actions/index';

class WithdrawScreenContainer extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: mainBgColor },
        title: 'Withdraw'
    }
    constructor(props) {
        super(props);
        this.state = {
            showBalance: false, 
            address: '', 
            amount: '' ,
            rate_fee: 0,
            rate_fee_value: '50000',
            custom_fee_value: '',
            sms_code: ''
        };
    }
    componentDidMount() {
        // this.queryAccount();
    }
    queryAccount() {
        const { dispatch } = this.props;
        // dispatch(UserAction.account_query());
    }
    showHideBalance() {
        this.setState({ showBalance: !this.state.showBalance });
    }

    goToHistory() {
        const { dispatch } = this.props;
        dispatch({ type: RouteActions.history });
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

    onWithdraw() {
        const { amount, rate_fee_value, address } = this.state;
        const { dispatch, user } = this.props;
        const { dest_address, sel_account } = user;


        if (!amount || !rate_fee_value || !address) {
            alert("Please fill required values");
            return;
        }
        dispatch(UserAction.withdraw_request(parseInt(amount, 10), parseInt(rate_fee_value, 10), address, sel_account.account_id));
    }

    RadioOnPress(value){

        if( value === 0 ) { // Fee Rate is slow
            this.setState({rate_fee:value, rate_fee_value: "50000"});
        } else if ( value === 1 ) { // Fee Rate is normal
            this.setState({rate_fee:value, rate_fee_value: "50000"});
        } else if ( value === 2 ) { // Fee Rate is fast
            this.setState({rate_fee:value, rate_fee_value: "50000"});
        } else {    // Fee Rate is custom
            this.setState({rate_fee:value, rate_fee_value: "50000"});
        }
        
    }
    
    onSetNormal(){
        this.setState({rate_fee_value: 50000})
    }

    onSetFast(){
        this.setState({rate_fee_value: 50000})
    }

    onSetCustom(){
        this.setState({rate_fee_value: 50000})
    }
    render() {
        const { accounts } = this.props.user;
        const { user } = this.props;
        const { status, withdraw_error, dest_address, sel_account } = user;

        return (
            <ScrollView style={[{ flex: 1, backgroundColor: '#7e57c2' }]} refreshControl={
                <RefreshControl progressBackgroundColor='#fff' colors={[mainBgColor]}
                    refreshing={false}
                    onRefresh={this.queryAccount.bind(this)}
                />}>
                
                <View style={{ marginLeft: 15, marginRight: 15}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', opacity: 0.5}}>
                        <View style={{marginTop: 20, width: 200, alignItems: 'center', opacity: 0.5}}>
                            <Button
                                style={{width: 200}}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title='Scan QR'
                                backgroundColor={secondaryBgColor} />
                        </View>
                    </View>
                    {/* <View style={{marginTop: 20, width: 200, alignItems: 'center' }}>
                        <Button 
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title='OK'
                            backgroundColor={secondaryBgColor} />
                    </View> */}
                    <View style={[styles.row,
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 2}]}>
                        <Text style={{ textAlignVertical: 'center', justifyContent: 'center', fontSize: 18, width: 100, color: mainTextColor}}>ADDRESS :</Text>
                        {/* <Text style={{color: mainTextColor, fontSize: 18}}>{dest_address}</Text> */}
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ address: text }) }}
                            inputStyle={{ color: mainTextColor}}
                            value={this.state.address}
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="Destination Address"></FormInput>

                    </View>
                    <View style={[styles.row,
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 2, marginTop: 20 }]}>
                        <Text style={{ textAlignVertical: 'center', justifyContent: 'center', fontSize: 18, width: 100, color: mainTextColor}}>{sel_account.balance}</Text>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ amount: text }) }}
                            inputStyle={{ color: mainTextColor}}
                            value={this.state.amount}
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            keyboardType="phone-pad" placeholder="AMOUNT"></FormInput>

                    </View>
                    <Text style={{ fontSize: 18, marginTop: 20, color: mainTextColor}}>FEE RATE!</Text>
                    <View style={[ styles.row,
                        { marginTop: 20, marginLeft: 40 }]}>
                        <View style={{flexDirection: 'row', flex: 1 }}>
                            <View style={{marginLeft: 10}}>
                                <RadioButton 
                                currentValue={this.state.rate_fee} value={0} 
                                onPress={this.RadioOnPress.bind(this)}>   
                                </RadioButton>
                            </View>
                            <Text style={{fontSize: 16, textAlignVertical: 'center', marginLeft: 10, color: mainTextColor}}>Slow</Text>
                            
                        </View>
                        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>

                            <View style={{marginLeft: 10}}>
                                <RadioButton 
                                currentValue={this.state.rate_fee} value={1} 
                                onPress={this.RadioOnPress.bind(this)}>   
                                </RadioButton>
                            </View>
                            <Text style={{fontSize: 14, textAlignVertical: 'center', marginLeft: 10, color: mainTextColor}}>Normal</Text>
                            
                        </View>
                        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                            {/* <Button onPress={this.onSetFast.bind(this)}
                                buttonStyle={{width: 80}}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title={'Fast'}
                                backgroundColor={secondaryBgColor} /> */}

                            <View style={{marginLeft: 10}}>
                                <RadioButton 
                                currentValue={this.state.rate_fee} value={2} 
                                onPress={this.RadioOnPress.bind(this)}>   
                                </RadioButton>
                            </View>
                            <Text style={{fontSize: 14, textAlignVertical: 'center', marginLeft: 10, color: mainTextColor}}>Fast</Text>
                            
                        </View>
                        
                        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                            {/* <Button onPress={this.onSetCustom.bind(this)}
                                buttonStyle={{width: 80}}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title={'Custom'}
                                backgroundColor={secondaryBgColor} /> */}

                            <View style={{marginLeft: 10}}>
                                <RadioButton 
                                    currentValue={this.state.rate_fee} value={3} 
                                    onPress={this.RadioOnPress.bind(this)}>   
                                </RadioButton>
                            </View>
                            <Text style={{fontSize: 14, textAlignVertical: 'center', marginLeft: 10, color: mainTextColor}}>Custom</Text>
                            {
                                this.state.rate_fee === 3 &&
                                <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                                    onChangeText={(text) => { this.setState({ rate_fee_value: text }) }}
                                    inputStyle={{ color: mainTextColor}}
                                    value={this.state.rate_fee_value}
                                    returnKeyType='next'
                                    autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    keyboardType="phone-pad" placeholder="Custom Fee"></FormInput>
                            }
                        </View>

                        
                    </View>
                    
                    <View style={[styles.row, 
                        { flexDirection: 'row', marginTop: 20}]}>
                        <View style={{flex: 1}}>
                            <Button onPress={this.onWithdraw.bind(this)}
                                    loadingRight={true}
                                    loading={status === 'withdraw_fetching'}
                                    disabled={status === 'withdraw_fetching'}
                                    disabledStyle={{ backgroundColor: secondaryBgColor }}
                                    title={status === 'withdraw_fetching' ? ' ' : 'SEND SMS'}
                                    backgroundColor={secondaryBgColor} />
                        </View>
                    </View>
                     <View style={[styles.row, 
                        { flexDirection: 'row', marginTop: 20 }]}>
                        
                        <View style={{flex: 1}}>
                            <FormInput
                                placeholderTextColor='rgba(255,255,255,0.6)'
                                onChangeText={(text) => { this.setState({ sms_code: text }) }}
                                inputStyle={{ color: mainTextColor}}
                                value={this.state.sms_code}
                                returnKeyType='done'
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                keyboardType="phone-pad" placeholder="Sms Code" />
                        </View>
                        <View style={{flex: 1}}>
                            <Button onPress={this.onSubmit.bind(this)}
                                loadingRight={true}
                                loading={status === 'con_fetching'}
                                disabled={status === 'con_fetching'}
                                buttonStyle={{width: 150}}
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

export default connect((state) => ({ user: state.user }))(WithdrawScreenContainer);
