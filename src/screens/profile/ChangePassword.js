import React, { useState } from 'react'
import { Image, Pressable, SectionList, Text, TextInput, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { commonStyle } from '../../../helpers/commonStyle';
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePasswordUsers } from '../../redux/actions/Users';


const ChangePasswordScreen = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({}),
        [showPassword, setShowPassword] = useState(false)

    const { GetAuth } = useSelector(state => state.auth)


    const handleSubmit = () => {
        dispatch(UpdatePasswordUsers(formData.password, GetAuth.data.token, GetAuth.data.id))
    }

    return (<>
        <SectionList
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={() => {
                return (<>
                    <Animatable.View animation={'pulse'} style={{
                        ...commonStyle.container,
                        paddingBottom: 100
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 15,
                            marginVertical: 20,
                            paddingBottom: 20,
                        }}>
                            <View style={{
                                paddingHorizontal: 30,
                                paddingTop: 20,
                                paddingBottom: 10,
                                borderBottomColor: '#DEDEDE',
                                borderBottomWidth: 2,
                                marginBottom: 10
                            }}>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={[commonStyle.textBlack, {
                                        fontSize: 16, marginBottom: 5, color: '#4E4B66',
                                        fontWeight: 'light'
                                    }]}>Password :</Text>
                                    <View style={{ ...commonStyle.flexRow, borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 1 }}>
                                        <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, password: text }))} placeholder='Write your new password' style={{ fontSize: 15, flex: 1 }} autoCapitalize='none'
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
                            </View>
                            <Pressable onPress={handleSubmit} style={{
                                ...commonStyle.button,
                                height: 40,
                                width: '60%',
                                alignSelf: 'center',
                            }} android_ripple={{ color: '#fff' }}>
                                <Text style={{
                                    ...commonStyle.textWhite
                                }}>Save</Text>
                            </Pressable>
                        </View>
                    </Animatable.View>
                </>)
            }}
        />
    </>)
}

export default ChangePasswordScreen