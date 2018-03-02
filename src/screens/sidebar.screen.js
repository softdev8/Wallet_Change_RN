import React from 'react';
import { AppRegistry, Image, StatusBar, View, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FormInput, Icon, Text, FormValidationMessage } from 'react-native-elements';
import appStyles, { mainTextColor, secondaryBgColor, mainBgColor } from '../shared/app-styles';
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal'

import { UserAction, RouteActions } from '../actions/index';
import { AuthAction } from '../actions'

const routes = ["Home", "History"];

class SideBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            canada: '',
            isModalVisible: false,
            currency: '',
            account: ''
        };
    }
    componentDidMount() {
        this.queryAccount();
    }

    queryAccount() {
        const { dispatch } = this.props;
        dispatch(UserAction.account_query());
    }

    gotoProfile() {
        const { dispatch } = this.props;
        dispatch({ type: RouteActions.profile });
    }

    onLogout() {
        const { dispatch } = this.props;
        dispatch(AuthAction.logout());
    }

    gotoMain= (i) => {
        const { dispatch, user } = this.props;
        const { des_accounts } = user;
        console.log( "Selected Accounts", des_accounts[i]);
        if ( des_accounts[i].account_name === "ARS" || des_accounts[i].account_name === "USD"){
            console.log('Select Fiat');
            dispatch(UserAction.set_fiat(des_accounts[i]));
        } else {
            console.log('Select Crypto');
            dispatch(UserAction.set_crypto(des_accounts[i]));
        }
            
        this.props.navigation.navigate("home");
        // dispatch({ type: RouteActions.home });
    }

    gotoFiatDeposit() {
        this.props.navigation.navigate("home");
    }

    gotoCryptoDeposit(type) {
        this.props.navigation.navigate("home");
    }

    showAddModal() {
        this.setState({isModalVisible: !this.state.isModalVisible})
    }

    addAcount() {

    }

    cancelAccount() {
        this.setState({isModalVisible: !this.state.isModalVisible})
    }

    render() {
        const { navigation, user } = this.props;
        const { des_accounts } = user;

        let data = [{value: 'USD/ARS'}, {value: 'EUR/ARS'}, {value: 'EUR/USD'}];
        let data1 = [{value:"BTC/ARS"}, {value:"BTC/USD"}];
        var data2 = [{value:"ETH/ARS"}, {value:"ETH/USD"}, {value:"ETH/BTC"}];
        var data3 = [{value:"LTC/ARS"}, {value:"LTC/USD"}, {value:"LTC/ETH"}, {value:"LTC/BTC"}];
        var data4 = [{value:"DOGE/ARS"}, {value:"DOGE/USD"}, {value:"DOGE/BTC"}, {value:"DOGE/ETH"}, {value:"DOGE/LTC"}];

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{  marginTop: 5, marginBottom: 5, height: 20 }}/>
                    <View style={{ paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            1) Accounts
                        </Text>
                    </View>                     
                    <View style={{ marginTop: 5, marginBottom: 5, height: 1, backgroundColor: '#fff' }}/>
                    {
                        des_accounts.map((data, i) =>{
                            return(
                                <View
                                    key = {i}>
                                    <TouchableOpacity onPress={this.gotoMain.bind(this, i)}>
                                        <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                                            <Text style={{ color : '#fff' }}>
                                                {data.account_name} Account
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                    
                    <TouchableOpacity onPress={this.showAddModal.bind(this)}>
                        <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                            <Text style={{ color : '#fff' }}>
                                Add Account
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            2) EXCHANGE
                        </Text>
                    </View>
                    <View style={{  marginTop: 5, height: 1, backgroundColor: '#fff' }}/>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 4}} onPress={this.gotoFiatDeposit.bind(this)}>
                            <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                                <Text style={{ color : '#fff'}}>
                                    FIAT
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{flex: 6}}>
                            <Dropdown
                                label={""}
                                data={data}
                                selectedItemColor={'#000'}
                                baseColor={'white'}
                                textColor={'white'}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 4}} onPress={this.gotoCryptoDeposit.bind(this, "BTC")}>
                            <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                                <Text style={{ color : '#fff' }}>
                                    BTC
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex: 6}}>
                            <Dropdown
                                label={""}
                                data={data1}
                                selectedItemColor={'#000'}
                                baseColor={'white'}
                                textColor={'white'}
                            />
                        </View>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 4}} onPress={this.gotoCryptoDeposit.bind(this, "ETH")}>
                            <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                                <Text style={{ color : '#fff' }}>
                                    ETH
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex: 6}}>
                            <Dropdown
                                label={""}
                                data={data2}
                                selectedItemColor={'#000'}
                                baseColor={'white'}
                                textColor={'white'}
                            />
                        </View>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 4}} onPress={this.gotoCryptoDeposit.bind(this, "LTC")}>
                            <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                                <Text style={{ color : '#fff' }}>
                                    LTC
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex: 6}}>
                            <Dropdown
                                label={""}
                                data={data3}
                                selectedItemColor={'#000'}
                                baseColor={'white'}
                                textColor={'white'}
                            />
                        </View>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 4}} onPress={this.gotoCryptoDeposit.bind(this, "DOGE")}>
                            <View style={{ marginLeft: 10, paddingTop: 16, paddingBottom: 8 }}>
                                <Text style={{ color : '#fff' }}>
                                    DOGE
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex: 6}}>
                            <Dropdown
                                label={""}
                                data={data4}
                                selectedItemColor={'#000'}
                                baseColor={'white'}
                                textColor={'white'}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.gotoProfile.bind(this)}>
                        <View style={{ paddingTop: 16, paddingBottom: 8 }}>
                            <Text style={{ color : '#fff' }}>
                                3) Profile
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 16, paddingBottom: 8 }}>
                        <Text style={{ color : '#fff' }}>
                            4) Settings
                        </Text>
                    </View>
                    <View style={{  marginTop: 5, marginBottom: 5, height: 1, backgroundColor: '#fff' }}/>
                    <TouchableOpacity onPress={this.onLogout.bind(this)}>
                        <View style={{ paddingTop: 16, paddingBottom: 8 }}>
                            <Text style={{ color : '#fff' }}>
                                5) Log out
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{  marginTop: 5, marginBottom: 5, height: 1, backgroundColor: '#fff' }}/>

                    <View style={{  marginTop: 5, marginBottom: 5, height: 20 }}/>

                    {/* <Text
                        onPress={this.logout}
                        style={styles.uglyDrawerItem}>
                        Log Out
                    </Text> */}
                </ScrollView>
                <View style={{ position: "absolute" }}>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={styles.modalview}>
                        <Text style={styles.dlgtitle}>Add Account</Text>
                        <View style={{ borderBottomColor: mainTextColor, borderBottomWidth: 1, marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                            <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                                onChangeText={(text) => { this.setState({ currency: text }) }}
                                inputStyle={{ color: mainTextColor }}
                                value={this.state.currency}
                                returnKeyType='next'
                                underlineColorAndroid="transparent"
                                placeholder="Please enter Currency"></FormInput>
                        </View>
                        <View style={{ borderBottomColor: mainTextColor, borderBottomWidth: 1, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                            <FormInput placeholderTextColor='rgba(255,255,255,0.6)'
                                onChangeText={(text) => { this.setState({ account: text }) }}
                                inputStyle={{ color: mainTextColor }}
                                value={this.state.account}
                                returnKeyType='next'
                                underlineColorAndroid="transparent"
                                placeholder="Please enter Account"></FormInput>
                        </View>
                        <View
                            style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={this.addAcount.bind(this)}>
                                <View style={styles.continuebtn}>
                                    <Text style={ styles.btntext }>Add</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.cancelAccount.bind(this)}>
                                <View style={styles.discardbtn}>
                                    <Text style={ styles.btntext }>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3240',
        paddingHorizontal: 10
    },
    uglyDrawerItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E73536',
        padding: 15,
        margin: 5,
        borderRadius: 2,
        borderColor: '#E73536',
        borderWidth: 1,
        textAlign: 'center'
    },
    modalview : {
        backgroundColor: mainBgColor,
        width: 300,
        height: 250,
        borderRadius: 5
    },
    dlgtitle : {
        height: 30, 
        borderRadius: 5, 
        marginTop: 10, 
        textAlign: 'center', 
        fontSize: 20,
        color: '#fff',
    },
    message : {
        height: 30, 
        borderRadius: 5, 
        marginTop: 20, 
        textAlign: 'center', 
        fontSize: 18
    },
    discardbtn : {
        width: 130,
        height: 40,
        justifyContent: 'center',
        marginLeft: 20,
        backgroundColor: secondaryBgColor,
        borderRadius:60,
        alignItems: 'center'
    },
    continuebtn : {
        width: 130,
        height: 40,
        justifyContent: 'center',
        backgroundColor: secondaryBgColor,
        borderRadius:60,
        alignItems: 'center'
    }, 
    restarttext : {
        color: '#fff', 
        fontSize: 18
    },
    btntext: { 
        color: '#fff', 
        fontSize: 16 
    }
})

SideBar.navigationOptions = ({ navigation }) => ({
    headerStyle: {backgroundColor: mainBgColor},
    headerLeft: drawerButton(navigation)
})

const drawerButton = (navigation) => (
    <TouchableOpacity
      style={{padding: 5}}
      onPress={() => {
        navigation.navigate('DrawerOpen')
      }}>
      <Image source={require('../assets/images/menu.png')}
        style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
)

export default connect((state) => ({ user: state.user }))(SideBar);