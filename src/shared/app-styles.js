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
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 12,
            paddingBottom: 12,
        },
    mainTextColor: { color: mainTextColor },
    mainButtonColor: { color: secondaryBgColor },
    fullWidth: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0
    },
}
);
