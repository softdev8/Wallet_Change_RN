import React from 'react';
import { connect } from 'react-redux';
import { View, Animated, StyleSheet, Easing, Dimensions } from 'react-native';
import { FormInput, Icon, Button, FormValidationMessage } from 'react-native-elements';
import { Assets } from '../components';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../shared/app-styles';

import { AuthAction } from '../actions'
class RegisterScreenContainer extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: mainBgColor },
    }
    constructor(props) {
        super(props);
        this.state = { cellphone: '', password: '', confirmcode: '' };
        this.shakeAnim = new Animated.Value(0);
    }

    componentWillMount() {
        this.shakeStyle = {
            transform: [{
                translateX: this.shakeAnim.interpolate({
                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                    outputRange: [0, -15, 0, 15, 0, -15, 0],
                })
            }]
        };
    }
    onRegister() {
        const { cellphone, password } = this.state;
        const { dispatch } = this.props;
        if (!cellphone || !password) {
            this.shakeAnim.setValue(0);
            Animated.timing(this.shakeAnim, {
                duration: 375,
                toValue: 3,
                ease: Easing.bounce,
            }).start();
            return;
        }
        dispatch(AuthAction.signup(cellphone, password));
    }

    onSignup() {
        const { confirmcode } = this.state;
        const { dispatch, auth } = this.props;
        if (!confirmcode) {
            this.shakeAnim.setValue(0);
            Animated.timing(this.shakeAnim, {
                duration: 375,
                toValue: 3,
                ease: Easing.bounce,
            }).start();
            return;
        }
        dispatch(AuthAction.confirmSignup(confirmcode));
    }

    render() {
        const { auth } = this.props;
        const { con_error, status } = auth;
        
        return (<View style={[appStyles.container, { flex: 1, backgroundColor: '#7e57c2' }]}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 20 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', width: 200, height: 100,marginBottom:20 }}>
                    <Assets.LongLogo />
                </View>
                <Animated.View style={[this.shakeStyle, { marginLeft: 15, marginRight: 15 }]}>

                    <View style={[styles.row,
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 2 }]}>
                        <Icon size={20} name='contact-phone'
                            color={mainTextColor} />
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ cellphone: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.cellphone}
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            keyboardType="phone-pad" placeholder="Please enter your cellphone..."></FormInput>

                    </View>
                    <View style={[styles.row, 
                        { flexDirection: 'row', width: Dimensions.get('window').width, borderBottomColor: mainTextColor, borderBottomWidth: 2 }]}>
                        <Icon size={20} name='lock'
                            color={mainTextColor} />
                        <FormInput
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            inputStyle={{ color: mainTextColor, width:  Dimensions.get('window').width - 270}}
                            value={this.state.password}
                            returnKeyType='go'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            placeholder="Please enter your password..." />
                        
                        <Button onPress={this.onRegister.bind(this)}
                            loadingRight={true}
                            loading={status === 'con_fetching'}
                            disabled={status === 'con_fetching'}
                            buttonStyle={{width: 150,}}
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title={status === 'con_fetching' ? ' ' : 'CONFIRM'}
                            backgroundColor={secondaryBgColor} />
                        
                    </View>
                    <View style={[
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 2 }]}>
                        <Icon size={20} name='confirmation-number'
                            color={mainTextColor} />
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ confirmcode: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.confirmcode}
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            keyboardType="phone-pad" placeholder="Please enter your confirm code..."></FormInput>
                        

                    </View>

                </Animated.View>
                <View style={[styles.row, { height: 35 }]}>
                    {con_error && <FormValidationMessage>{con_error.text}</FormValidationMessage>}
                </View>
                <View>
                    <Button onPress={this.onSignup.bind(this)}
                        loadingRight={true}
                        loading={status === 'reg_fetching'}
                        disabled={status === 'reg_fetching'}
                        disabledStyle={{ backgroundColor: secondaryBgColor }}
                        title={status === 'reg_fetching' ? ' ' : 'REGISTER'}
                        backgroundColor={secondaryBgColor} />
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    row: { marginBottom: 20 }
});
export default connect((state) => ({ auth: state.auth }))(RegisterScreenContainer);
