import React from 'react';
import { connect } from 'react-redux';
import {
    View, ScrollView, StyleSheet, 
    TouchableOpacity, RefreshControl, Dimensions
} from 'react-native';
import { Divider, Header, Icon, Text, Button, FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../../shared/app-styles';
import { JsHelper } from '../../utils/index';
import { UserAction, RouteActions } from '../../actions/index';

// Deposit Second Screen for Fiat
class FiatTwoScreenContainer extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: mainBgColor },
        title: 'Deposit',
    }
    constructor(props) {
        super(props);
        this.state = { 
            amount: ''
        };
    }
    componentDidMount() {
        this.queryUser();
    }
    queryUser() {
        const { dispatch } = this.props;
        dispatch(UserAction.query());
    }

    onSubmit() {
    }

    render() {
        const { profile } = this.props.user;

        console.log('fiat Accounts', profile);
        
        let data = [{value: profile.bank_branch}];

        return (
            <ScrollView style={[{ flex: 1, backgroundColor: '#7e57c2' }]} refreshControl={
                <RefreshControl progressBackgroundColor='#fff' colors={[mainBgColor]}
                    refreshing={false}
                    onRefresh={this.queryUser.bind(this)}
                />}>
                <View>
                    <View style={{ height: 100 }} />
                    <View style={{flex: 1, marginLeft: 20, marginRight: 20}}>
                        <Dropdown
                            style={{width: 200}}
                            label={"Bank Branch"}
                            data={data}
                            selectedItemColor={'#000'}
                            baseColor={'white'}
                            textColor={'white'}
                        />
                    </View>
                    <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                        onChangeText={(text) => { this.setState({ amount: text }) }}
                        inputStyle={{ color: mainTextColor }}
                        value={this.state.amount}
                        returnKeyType='next'
                        underlineColorAndroid="transparent"
                        keyboardType="phone-pad" placeholder="Please enter your Amount"></FormInput>

                    <View style={{marginTop: 20, marginLeft: 20, marginRight: 20, opacity: 0.5}}>
                        <Button onPress={this.onSubmit.bind(this)}
                            disabledStyle={{ backgroundColor: secondaryBgColor }}
                            title='Submit deposit request'
                            backgroundColor={secondaryBgColor} />
                    </View>
                    
                </View>
            </ ScrollView >
        );
    }
}

export default connect((state) => ({ user: state.user }))(FiatTwoScreenContainer);
