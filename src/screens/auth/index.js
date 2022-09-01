import React from 'react'
import { Pressable, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { commonStyle } from '../../../helpers/commonStyle';
import HeaderComponent from '../../components/Header';

const AuthScreen = ({ navigation }) => {
    return (<>
        <HeaderComponent />
        <Animatable.View animation='bounce' style={commonStyle.container}>
            <View style={{
                ...commonStyle.container,
                backgroundColor: '#fff',
                borderRadius: 15,
                marginVertical: 80,
                paddingVertical: 50,
            }}>
                <View style={{
                    paddingHorizontal: 30,
                    paddingTop: 20,
                    paddingBottom: 10,
                    marginBottom: 10,
                }}>
                    <Pressable onPress={() => { navigation.navigate('Login') }}
                        style={{
                            ...commonStyle.button,
                            height: 40,
                            marginBottom: 10
                        }}>
                        <Text style={{
                            ...commonStyle.textWhite,
                        }}>Login</Text>
                    </Pressable>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <Pressable onPress={() => { navigation.navigate('Register') }}
                        style={{
                            ...commonStyle.button,
                            height: 40,
                            marginTop: 10
                        }}>
                        <Text style={{
                            ...commonStyle.textWhite,
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </Animatable.View>
    </>)
}

export default AuthScreen