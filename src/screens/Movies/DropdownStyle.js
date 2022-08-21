import { StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
    dropdown: {
        marginRight: 10,
        marginVertical: 5,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default styles;