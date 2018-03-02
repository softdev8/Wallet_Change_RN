import React from 'react';
import { connect } from 'react-redux';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { FormInput, Icon, Button, FormValidationMessage } from 'react-native-elements';
import { Assets } from '../components';
import appStyles, { mainTextColor, secondaryBgColor } from '../shared/app-styles';

import { AuthAction } from '../actions'
class LoginScreenContainer extends React.Component {
    static navigationOptions = {
        header: null,

    }
    constructor(props) {
        super(props);
        this.state = { cellphone: '541128750518', password: 'pwd11111' };
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
    onLogin() {
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
        dispatch(AuthAction.login(cellphone, password));
    }
    onRegister() {
        this.props.navigation.navigate("register");
        // const { dispatch } = this.props;
        // dispatch(AuthAction.register());
    }
    render() {
        const { auth } = this.props;
        const { error, status } = auth;
        console.log('Login Auth ====', auth);

        return (<View style={[appStyles.container, { flex: 1, backgroundColor: '#7e57c2' }]}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 20 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', width: 200, height: 100,marginBottom:30 }}>
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
                    <View style={[
                        { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 2 }]}>
                        <Icon size={20} name='lock'
                            color={mainTextColor} />
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.password}
                            returnKeyType='go'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            placeholder="Please enter your password..."></FormInput>

                    </View>
                </Animated.View>
                <View style={[styles.row, { height: 35 }]}>
                    {error && <FormValidationMessage>{error.text}</FormValidationMessage>}
                </View>
                <View>
                    <Button onPress={this.onLogin.bind(this)}
                        loadingRight={true}
                        loading={status == 'fetching'}
                        disabled={status === 'fetching'}
                        disabledStyle={{ backgroundColor: secondaryBgColor }}
                        title={status === 'fetching' ? ' ' : 'LOGIN'}
                        backgroundColor={secondaryBgColor} />
                </View>

                <View style={{marginTop: 20}}>
                    <Button onPress={this.onRegister.bind(this)}
                        disabledStyle={{ backgroundColor: secondaryBgColor }}
                        title='REGISTER'
                        backgroundColor={secondaryBgColor} />
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    row: { marginBottom: 25 }
});
export default connect((state) => ({ auth: state.auth }))(LoginScreenContainer);
