import { StyleSheet } from 'react-native'
export const mainTextColor = '#fff';

export const mainBgColor = '#7e57c2';
export const secondaryBgColor = '#7c4dff';
export default StyleSheet.create({
    layout: {
        backgroundColor: mainBgColor,
        flex: 1
    },
    container:
        {
            paddingLeft: 13,
            paddingRight: 13,
            paddingTop: 13,
            paddingBottom: 13,
        },
    mainTextColor: { color: mainTextColor },
    mainButtonColor: { color: secondaryBgColor },
    fullWidth: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0
    },
}
);
