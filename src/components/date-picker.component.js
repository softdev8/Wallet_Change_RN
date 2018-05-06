import React from 'react';
import {
    DatePickerAndroid, Keyboard
} from 'react-native';
import { FormInput } from 'react-native-elements';
import { mainBgColor } from '../shared/app-styles';
import { JsHelper } from '../utils/index';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pickedDate: null };
    }
    reset() {
        this.setState({ pickedDate: null });
    }
    getDate() {
        const { pickedDate } = this.state;
        if (!pickedDate) return null;

        const { year, month, day } = pickedDate;
        return new Date(year, month, day);
    }
    async openDatePick() {
        const { onPickedDate, defaultDate, maxDate } = this.props;
        Keyboard.dismiss();
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: defaultDate || Date.now(),
                maxDate: maxDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ pickedDate: { year, month, day } });
                onPickedDate && onPickedDate({ year, month, day });
            }

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    render() {
        const { width, color, placeholder, fontSize, disabled } = this.props;
        const { pickedDate } = this.state;
        let strDate = null;
        if (pickedDate) {
            strDate = ('' + pickedDate.year).substr(2) + '/' +
                JsHelper.leftPad(pickedDate.month + 1, '0', 2) + '/' + JsHelper.leftPad(pickedDate.day, '0', 2);
        }
        const disabledColor = '#cccccc';
        const enableColor = color || mainBgColor;
        return (
            <FormInput
                placeholderTextColor={disabled ? disabledColor : enableColor}
                containerStyle={{ width: width || 55, marginLeft: 0 }}
                inputStyle={{ color: disabled ? disabledColor : enableColor, fontSize: fontSize || 10 }}
                returnKeyType='next'
                autoFocus={false}
                value={strDate}
                editable={!disabled}
                onFocus={this.openDatePick.bind(this)}
                underlineColorAndroid={disabled ? disabledColor : enableColor}
                keyboardType="default" placeholder={placeholder || 'DATE'}></FormInput>
        );
    }
}
