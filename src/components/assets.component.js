import React from 'react';
import {
    StyleSheet, View, Image, Text, TouchableOpacity
} from 'react-native';
import appStyles from '../shared/app-styles';

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        flex: 1, height: null, width: null
    },
    titleIcon: { width: 65, height: 65 },
    iconButtonText:{ fontSize: 18, color: '#fff'}
});

export const LongLogo = (props) => (

    <Image source={require('../assets/images/Panacea_opt.png')}
        style={[styles.image, props.style]} />
);

export const TransactionHistoryIconButton = (props) => (

    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center' }]}>
            <Image source={require('../assets/images/transaction-history.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>History</Text>
        </View>
    </TouchableOpacity>
);

export const WithdrawIconButton = (props) => (

    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center' }]}>
            <Image source={require('../assets/images/withdraw.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Withdraw</Text>
        </View>
    </TouchableOpacity>
);

export const DepositIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center' }]}>
            <Image source={require('../assets/images/deposit.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Deposit</Text>
        </View>
    </TouchableOpacity>
);

export const TransferIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center' }]}>
            <Image source={require('../assets/images/deposit.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Bank Transfer</Text>
        </View>
    </TouchableOpacity>
);

export const RapipagoIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center', opacity: 0.5 }]}>
            <Image source={require('../assets/images/deposit.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Rapipago</Text>
        </View>
    </TouchableOpacity>
);

export const PagofacilIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center', opacity: 0.5 }]}>
            <Image source={require('../assets/images/deposit.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Pagofácil</Text>
        </View>
    </TouchableOpacity>
);

export const QiwiIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center', opacity: 0.5 }]}>
            <Image source={require('../assets/images/deposit.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Qiwi Deposit</Text>
        </View>
    </TouchableOpacity>
);

export const QuiteIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center', opacity: 0.5 }]}>
            <Image source={require('../assets/images/quite.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Quite Button</Text>
        </View>
    </TouchableOpacity>
);

export const ExitIconButton = (props) => (
    <TouchableOpacity onPress={props.onPress && props.onPress()}>
        <View style={[{ flexDirection: 'column', alignItems: 'center', opacity: 0.5 }]}>
            <Image source={require('../assets/images/exit.png')}
                style={[styles.titleIcon, props.style]} />
            <Text style={[appStyles.mainTextColor,styles.iconButtonText]}>Exit</Text>
        </View>
    </TouchableOpacity>
);
