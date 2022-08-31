import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, TextInput, Pressable } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'
import HeaderComponent from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { GetAuthRegister } from '../../redux/actions/Auth'

const Register = ({ navigation }) => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false),
        [params, setParams] = useState({})

    const { GetAuth, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (GetAuth.message === 'Successfully Register,Please Login!') {
            navigation.navigate('Home', { screen: 'Profile' })
        }
    }, [loading])

    const handleSubmit = () => {
        dispatch(GetAuthRegister(params))
    }

    return (<>
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={[commonStyle.container]}>
                <Text style={[commonStyle.textBlack, { fontSize: 26, fontWeight: 'bold', marginBottom: 5, marginTop: 10 }]}>Sign Up</Text>
                <Text style={[commonStyle.textSecondary, { fontSize: 15, marginBottom: 20 }]}>Fill your additional details</Text>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[commonStyle.textBlack, {
                        fontSize: 16, marginBottom: 10, color: '#4E4B66',
                        fontWeight: 'light'
                    }]}>First Name :</Text>
                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 2 }}>
                        <TextInput onChangeText={(text) => setParams(prevData => ({ ...prevData, firstName: text }))} placeholder='Write your first name' style={{ fontSize: 15 }} autoCapitalize='none'
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[commonStyle.textBlack, {
                        fontSize: 16, marginBottom: 10, color: '#4E4B66',
                        fontWeight: 'light'
                    }]}>Last Name :</Text>
                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 2 }}>
                        <TextInput onChangeText={(text) => setParams(prevData => ({ ...prevData, lastName: text }))} placeholder='Write your last name' style={{ fontSize: 15 }} autoCapitalize='none'
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[commonStyle.textBlack, {
                        fontSize: 16, marginBottom: 10, color: '#4E4B66',
                        fontWeight: 'light'
                    }]}>Phone Number :</Text>
                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 2 }}>
                        <TextInput onChangeText={(text) => setParams(prevData => ({ ...prevData, phone: text }))} placeholder='Write your phone number' style={{ fontSize: 15 }} autoCapitalize='none'
                            keyboardType='numeric' />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[commonStyle.textBlack, {
                        fontSize: 16, marginBottom: 10, color: '#4E4B66',
                        fontWeight: 'light'
                    }]}>Email :</Text>
                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 2 }}>
                        <TextInput onChangeText={(text) => setParams(prevData => ({ ...prevData, email: text }))} placeholder='Write your email' style={{ fontSize: 15 }} autoCapitalize='none'
                            keyboardType='email-address' />
                    </View>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text style={[commonStyle.textBlack, {
                        fontSize: 16, marginBottom: 10, color: '#4E4B66',
                        fontWeight: 'light'
                    }]}>Password :</Text>
                    <View style={[commonStyle.flexRow, { borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 2 }]}>
                        <TextInput onChangeText={(text) => setParams(prevData => ({ ...prevData, password: text }))} placeholder='Write your password' style={{ fontSize: 15, flex: 1 }} autoCapitalize='none'
                            secureTextEntry={showPassword ? false : true} />
                        <Text onPress={() => setShowPassword(!showPassword)} style={{
                            alignSelf: 'center',
                            height: 30,
                            marginRight: 5
                        }}>
                            {showPassword ? (
                                <Image source={require('../../../assets/image/eye1.png')} style={{
                                    width: 20, height: 20
                                }} />
                            ) : (
                                <Image source={require('../../../assets/image/eye.png')} style={{
                                    width: 20, height: 20
                                }} />
                            )}
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Pressable onPress={handleSubmit} style={[commonStyle.button]} android_ripple={{ color: '#fff' }}>
                        <Text style={[commonStyle.textWhite, { fontSize: 16 }]}>Sign Up</Text>
                    </Pressable>
                </View>
                <Text style={[commonStyle.textSecondary, commonStyle.textCenter, { fontSize: 16, marginBottom: 30 }]}>Already have an account?
                    <Text style={{ color: '#5F2EEA' }} onPress={() => navigation.navigate('Home', { screen: 'Profile' })}> Sign In</Text>
                </Text>
            </View>
        </ScrollView>
    </>)
}

export default Register