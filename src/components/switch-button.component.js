
import React from 'react';
import { Button } from 'react-native-elements';
import { mainBgColor } from '../shared/app-styles';

export default class SwitchButton extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        const { onSwitch, value } = this.props;
        onSwitch && onSwitch(value);
    }
    render() {
        const { title, on,
            onTextColor, offTextColor
             } = this.props;
        const textColor = on ? (onTextColor || mainBgColor) : (offTextColor || mainBgColor);
        return (
            <Button onPress={this.onClick.bind(this)}
                title={title} rounded={true} outline={on}
                backgroundColor={'transparent'} fontSize={10}
                textStyle={{ color: textColor }}
                buttonStyle={{ padding: 5}}
                containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            />
        );
    }
}
