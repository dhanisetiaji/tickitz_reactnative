import React, { useEffect, useState } from 'react'
import { Image, Pressable, RefreshControl, SafeAreaView, SectionList, Text, View } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'
import HeaderComponent from '../../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { AuthLogout, GetDetailUserAuth } from '../../redux/actions/Auth'

const urlImage = 'https://test.dhanz.me/static'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [refetch, setRefetch] = useState(false)

    const { GetAuth, GetDetail, loading } = useSelector(state => state.auth)
    console.log(GetDetail, 'GetDetail');

    useEffect(() => {
        dispatch(GetDetailUserAuth(GetAuth.data.token))
    }, [dispatch, refetch])
    console.log(GetDetail, 'GetDetail');
    const handleLogout = () => {
        dispatch(AuthLogout())
    }

    return (<>
        <HeaderComponent />
        <SectionList
            refreshControl={<RefreshControl refreshing={loading}
                onRefresh={() => { setRefetch(!refetch) }} />}
            style={{ backgroundColor: '#fff' }}
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={({ section }) => {
                return (<>
                    <SafeAreaView style={{
                        ...commonStyle.container,
                        backgroundColor: '#D6D8E7',
                        // marginBottom: 20,
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
                                <Text style={{ ...commonStyle.textSecondary, fontSize: 18 }}>INFO</Text>
                                <Pressable onPress={() => navigation.navigate('Profile Picture', {
                                    image: GetDetail.data[0].image === 'null' || GetDetail.data[0].image === null || GetDetail.data[0].image === '' ? "require('../../../assets/image/user.png')" : GetDetail.data[0].image
                                })}><Image source={GetDetail.data[0].image === 'null' || GetDetail.data[0].image === null || GetDetail.data[0].image === '' ? require('../../../assets/image/user.png') : { uri: `${urlImage}/${GetDetail.data[0].image}` }} style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    alignSelf: 'center',
                                    resizeMode: 'contain',
                                    marginTop: 20,
                                }} /></Pressable>
                                <Pressable onPress={() => navigation.navigate('Profile Picture', {
                                    image: GetDetail.data[0].image === 'null' || GetDetail.data[0].image === null || GetDetail.data[0].image === '' ? "require('../../../assets/image/user.png')" : GetDetail.data[0].image
                                })}><Text style={{
                                    ...commonStyle.textSecondary,
                                    textAlign: 'center',
                                    marginBottom: 20,
                                    marginTop: 5,
                                }}>Edit</Text></Pressable>
                                <Text style={{ ...commonStyle.textBlack, fontSize: 18, textAlign: 'center' }}>{`${GetDetail.data[0].firstName} ${GetDetail.data[0].lastName}`}</Text>
                                <Pressable onPress={() => { }} style={{
                                    borderRadius: 5,
                                    height: 20,
                                    width: 120,
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                    backgroundColor: 'red',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ ...commonStyle.textWhite, textAlign: 'center' }}>Email Not Verified</Text>
                                </Pressable>
                            </View>
                            <Pressable onPress={handleLogout} style={{
                                ...commonStyle.button,
                                height: 40,
                                width: '60%',
                                alignSelf: 'center',
                            }} android_ripple={{ color: '#fff' }}>
                                <Text style={{
                                    ...commonStyle.textWhite
                                }}>Logout</Text>
                            </Pressable>
                        </View>
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 15,
                            marginVertical: 20,
                            paddingBottom: 20,
                        }}>
                            <View style={{
                                paddingHorizontal: 30,
                                paddingTop: 15,
                                paddingBottom: 15,
                                borderBottomColor: '#DEDEDE',
                                backgroundColor: '#333',
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                                borderBottomWidth: 2,
                            }}>
                                <Text style={{ ...commonStyle.textWhite, fontSize: 18 }}>MENU</Text>
                            </View>
                            <Pressable onPress={() => { navigation.navigate('Edit Profile') }} android_ripple={{ color: '#dede' }} style={{
                                paddingHorizontal: 25,
                                PaddingTop: 10,
                                paddingBottom: 10,
                                borderBottomColor: '#DEDEDE',
                                borderBottomWidth: 2,
                            }}>
                                <View style={{ ...commonStyle.flexRow, alignItems: 'center', paddingVertical: 2 }}>
                                    <Image source={require('../../../assets/image/icons/setting.png')} style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} />
                                    <Text style={{ ...commonStyle.textSecondary, fontSize: 18 }}>Edit Profile</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => { navigation.navigate('Change Password') }} android_ripple={{ color: '#dede' }} style={{
                                paddingHorizontal: 25,
                                paddingBottom: 10,
                                borderBottomColor: '#DEDEDE',
                                borderBottomWidth: 2,
                            }}>
                                <View style={{ ...commonStyle.flexRow, alignItems: 'center', paddingVertical: 2 }}>
                                    <Image source={require('../../../assets/image/icons/samsung.png')} style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} />
                                    <Text style={{ ...commonStyle.textSecondary, fontSize: 18 }}>Change Password</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => { navigation.navigate('Order History') }} android_ripple={{ color: '#dede' }} style={{
                                paddingHorizontal: 25,
                                paddingBottom: 10,
                                borderBottomColor: '#DEDEDE',
                                borderBottomWidth: 2,
                            }}>
                                <View style={{ ...commonStyle.flexRow, alignItems: 'center', paddingVertical: 2 }}>
                                    <Image source={require('../../../assets/image/icons/qr.png')} style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} />
                                    <Text style={{ ...commonStyle.textSecondary, fontSize: 18 }}>Order History</Text>
                                </View>
                            </Pressable>
                            <Text style={{ ...commonStyle.textSecondary, textAlign: 'center', marginTop: 10 }}>© 2022 Tickitz. All Rights Reserved.</Text>
                        </View>
                    </SafeAreaView>
                </>)
            }}
        />
    </>)
}

export default ProfileScreen