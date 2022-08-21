import React, { useState } from 'react'
import { Pressable, SafeAreaView, SectionList, Text, TextInput, View } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUsers } from '../../redux/actions/Users';
import * as Animatable from 'react-native-animatable';



const EditProfileScreen = () => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({})

    const { GetAuth, GetDetail } = useSelector(state => state.auth)


    const handleSubmit = () => {
        const bodyFormData = new FormData();
        bodyFormData.append('image', '');
        for (const key in formData) {
            bodyFormData.append(key, formData[key]);
        }
        console.log(bodyFormData, 'bodyFormData');
        dispatch(UpdateUsers(bodyFormData, GetAuth.data.token, GetAuth.data.id))
    }

    return (<>
        <SectionList
            style={{ backgroundColor: '#D6D8E7' }}
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={({ section }) => {
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
                                    }]}>FirstName :</Text>
                                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 1 }}>
                                        <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, firstName: text }))} editable defaultValue={GetDetail.data[0].firstName} style={{ fontSize: 15, marginLeft: 10 }} autoCapitalize='none' />
                                    </View>
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={[commonStyle.textBlack, {
                                        fontSize: 16, marginBottom: 5, color: '#4E4B66',
                                        fontWeight: 'light'
                                    }]}>LastName :</Text>
                                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 1 }}>
                                        <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, lastName: text }))} editable defaultValue={GetDetail.data[0].lastName} style={{ fontSize: 15, marginLeft: 10 }} autoCapitalize='none' />
                                    </View>
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={[commonStyle.textBlack, {
                                        fontSize: 16, marginBottom: 5, color: '#4E4B66',
                                        fontWeight: 'light'
                                    }]}>Email :</Text>
                                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 1 }}>
                                        <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, email: text }))} editable defaultValue={GetDetail.data[0].email} style={{ fontSize: 15, marginLeft: 10 }} autoCapitalize='none' keyboardType='email-address' />
                                    </View>
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={[commonStyle.textBlack, {
                                        fontSize: 16, marginBottom: 5, color: '#4E4B66',
                                        fontWeight: 'light'
                                    }]}>Phone :</Text>
                                    <View style={{ borderColor: '#DEDEDE', borderRadius: 5, borderWidth: 1 }}>
                                        <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, phone: text }))} editable defaultValue={GetDetail.data[0].phone} style={{ fontSize: 15, marginLeft: 10 }} autoCapitalize='none' keyboardType='numeric' />
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

export default EditProfileScreen