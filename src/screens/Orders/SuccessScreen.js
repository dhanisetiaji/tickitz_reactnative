import React, { useEffect } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View, BackHandler, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { commonStyle } from '../../../helpers/commonStyle';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { GetNotifStatus } from '../../redux/actions/Users';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SuccessScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { GetAuth } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(GetNotifStatus(GetAuth.data.token))
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => navigation.replace('Order History') }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={() => navigation.replace('Order History')} style={{
                padding: 10,
            }}>
                <Image source={require('../../../assets/image/icons/delete.png')} style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    tintColor: '#333',
                }} />
            </Pressable>
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: windowHeight / 2 - 120,
    },
    textPay: {
        fontSize: 24,
        marginTop: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    }

})

export default SuccessScreen