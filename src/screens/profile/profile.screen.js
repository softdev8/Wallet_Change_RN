import React from 'react';
import { connect } from 'react-redux';
import {
    View, ScrollView, StyleSheet, Animated, Easing,
    TouchableOpacity, RefreshControl, Image, View
} from 'react-native';
import { FormInput, Divider, Header, Icon, Text, Button, FormValidationMessage } from 'react-native-elements';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { UserAction, RouteActions } from '../../actions/index';
import Modal from 'react-native-modal';

class ProfileScreenContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            client_name: "",
            cuit: "",
            national_id: "",
            address: "",
            cbu: "",
            bank_branch: "",
            verified: false,
            bChangedEmail: false,
            isModalVisible: false,
            sms_code: ""
        };
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

        const { profile, isUpdate } = this.props.user;

        console.log('Profile Info', profile);
        this.setState({
            email: profile.email,
            password: profile.password,
            client_name: profile.client_name,
            cuit: profile.CUIT,
            national_id: ""+profile.national_id,
            address: profile.residential_address,
            cbu: profile.CBU,
            bank_branch: profile.bank_branch,
            verified: profile.verified

        })
    
    }
    componentDidMount() {
        this.queryUser();
    }
    
    queryUser() {
        const { dispatch } = this.props;
        dispatch(UserAction.query());
    }
    showHideBalance() {
        this.setState({ showBalance: !this.state.showBalance });
    }

    onSubmit() {
        const { email, password } = this.state;
        const { dispatch } = this.props;
        const { profile } = this.props.user;

        if ( email !== profile.email ){
            console.log('Changed Email');
            this.setState({ bChangedEmail: true });
        }

        dispatch(UserAction.update(this.state.email, this.state.password, this.state.client_name, this.state.cuit, this.state.national_id, this.state.address, this.state.cbu, this.state.bank_branch));
    }
    onGetVerified() {
        
    }

    onVerifyEmail() {
        const { sms_code, email } = this.state;
        const { dispatch } = this.props;
        if ( !sms_code ){
            alert('Please input SMS CODE')
            return
        }
        this.setState({ bChangedEmail: false });
        dispatch(UserAction.email_confirm(email, sms_code));
    }
    render() {
        const { profile, message, isEmailVerify } = this.props.user;
        const { user } = this.props;
        const { status, error, verified_error } = user;

        console.log('Verified Error', verified_error);
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#7e57c2' }} refreshControl={
                <RefreshControl progressBackgroundColor='#fff' colors={[mainBgColor]}
                    refreshing={false}
                    onRefresh={this.queryUser.bind(this)}
                />}>

                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            EMAIL
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.email}
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="email"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            PASSWORD
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.password}
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            placeholder="password"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            CLIENT_NAME
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ client_name: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.client_name}
                            editable={ this.state.verified ? false : true }
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="client name"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            CUIT
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ cuit: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.cuit}
                            editable={ this.state.verified ? false : true }
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="cuit"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            NATIONAL_ID
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ national_id: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.national_id}
                            editable={ this.state.verified ? false : true }
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="national id"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            RESIDENTIAL_ADDRESS
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ address: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.address}
                            editable={ this.state.verified ? false : true }
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="residential address"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            CBU
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ cbu: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.cbu}
                            editable={ this.state.verified ? false : true }
                            returnKeyType='next'
                            underlineColorAndroid="transparent"
                            placeholder="cbu"></FormInput>
                    </View>
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', borderBottomColor: mainTextColor, borderBottomWidth: 1 }]}>
                    <View style={{ flex: 3, marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            BANK_BRANCH
                        </Text>
                    </View>
                    <View style={{ flex: 7}}>
                        <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                            onChangeText={(text) => { this.setState({ bank_branch: text }) }}
                            inputStyle={{ color: mainTextColor }}
                            value={this.state.bank_branch}
                            editable={ this.state.verified ? false : true }
                            returnKeyType='done'
                            underlineColorAndroid="transparent"
                            placeholder="bank branch"></FormInput>
                    </View>
                </View>
                <View style={{ height: 35 }}>
                    {message && <FormValidationMessage>{message}</FormValidationMessage>}
                </View>
                <View style={{ height: 35 }}>
                    {verified_error && <FormValidationMessage>{verified_error.text}</FormValidationMessage>}
                </View>
                <View style={[ styles.row, 
                    { flexDirection: 'row', marginTop: 30 }]}>
                    <View style={[ styles.row, { flex: 5}]}>
                        <Button onPress={this.onSubmit.bind(this)}
                                loadingRight={true}
                                loading={status === 'update_fetching'}
                                disabled={status === 'update_fetching'}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title={status === 'update_fetching' ? ' ' : 'Submit'}
                                backgroundColor={secondaryBgColor} />
                    </View>
                    <View style={[ styles.row, { flex: 5}]}>
                        <Button onPress={this.onGetVerified.bind(this)}
                                loadingRight={true}
                                loading={status === 'verified_fetching'}
                                disabled={status === 'verified_fetching'}
                                disabledStyle={{ backgroundColor: secondaryBgColor }}
                                title={status === 'verified_fetching' ? ' ' : 'Get Verified'}
                                backgroundColor={secondaryBgColor} />
                    </View>
                </View>
                <View style={{ height: 50 }} />
                <View style={{ position: "absolute" }}>
                    <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={this.state.bChangedEmail && isEmailVerify}>
                        <View style={styles.modalview}>
                            <Text style={styles.dlgtitle}>Email Verify</Text>
                            <View style={{ borderBottomColor: mainTextColor, borderBottomWidth: 1, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                                <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                                    onChangeText={(text) => { this.setState({ sms_code: text }) }}
                                    inputStyle={{ color: mainTextColor }}
                                    value={this.state.sms_code}
                                    returnKeyType='next'
                                    underlineColorAndroid="transparent"
                                    keyboardType="phone-pad" placeholder="SMS Code"></FormInput>
                            </View>                        
                            <View
                                style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableOpacity onPress={this.onVerifyEmail.bind(this)}>
                                    <View style={styles.continuebtn}>
                                        <Text style={ [styles.btntext, {color: mainTextColor, fontSize: 18}]}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ ScrollView >
        );
    }
}

ProfileScreenContainer.navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerStyle: {backgroundColor: mainBgColor},
    headerLeft: drawerButton(navigation)
})

const drawerButton = (navigation) => (
    <TouchableOpacity
      style={{padding: 5}}
      onPress={() => {
        navigation.navigate('DrawerOpen')
      }}>
      <Image source={require('../../assets/images/menu.png')}
        style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    row: { 
        marginLeft: 12, 
        marginRight: 12 
    },
    modalview : {
        backgroundColor: mainBgColor,
        width: 300,
        height: 200,
        borderRadius: 5
    },
    dlgtitle : {
        height: 30, 
        borderRadius: 5, 
        marginTop: 20, 
        textAlign: 'center', 
        fontSize: 20,
        color: '#fff',
    },
    continuebtn : {
        width: 130,
        height: 40,
        justifyContent: 'center',
        backgroundColor: secondaryBgColor,
        borderRadius:40,
        alignItems: 'center'
    }, 
});

export default connect((state) => ({ user: state.user }))(ProfileScreenContainer);
