import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { commonStyle } from '../../../helpers/commonStyle';

const SuccessScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={{ ...commonStyle.flexCenter }}>
                <View style={styles.centerContainer}>
                    <Animatable.View style={styles.circle}>
                        <Animatable.Image animation="swing" iterationCount={'infinite'} iterationDelay={500} source={require('../../../assets/image/icons/done.png')} style={{ width: 60, heigh: 50, resizeMode: 'contain' }} />
                    </Animatable.View>
                    <Text style={styles.textPay}>Payment Success!</Text>
                    <Text style={styles.text}>
                        Congratulation! Your ticket has been booked.
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5F2EEA',
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 20,
        color: '#fff9',
        textAlign: 'center',
    }
    ,
    circle: {
        backgroundColor: '#fff',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    textPay: {
        fontSize: 24,
        marginTop: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    }

})

export default SuccessScreen