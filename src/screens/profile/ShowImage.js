import React, { useState } from 'react'
import { PermissionsAndroid, FlatList, Image, Modal, Pressable, SafeAreaView, SectionList, Text, View, ToastAndroid } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { commonStyle } from '../../../helpers/commonStyle';
import { useDispatch, useSelector } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer'
import { UpdateUsers } from '../../redux/actions/Users';
import * as Animatable from 'react-native-animatable';

const urlImage = 'https://test.dhanz.me/static'

const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("Camera permission given");
        } else {
            // console.log("Camera permission denied");
            ToastAndroid.showWithGravity('Camera permission denied', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    } catch (err) {
        // console.warn(err);
        ToastAndroid.showWithGravity('Camera permission denied', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
};

const ShowImageScreen = ({ route }) => {
    const dispatch = useDispatch()
    const { image } = route.params

    const [resourcePath, setResourcePath] = useState([]),
        [modalVisible, setModalVisible] = useState(false);

    const { GetAuth } = useSelector(state => state.auth)

    const launchCameraAction = async () => {
        await requestCameraPermission();
        const options = {
            cameraType: 'front',
            mediaType: 'photo',
            quality: 1,
            maxHeight: 200,
            maxWidth: 200,
            cropping: true,
        }
        launchCamera(options, (res) => {
            if (res.didCancel) {
                ToastAndroid.showWithGravity('Cancelled', ToastAndroid.SHORT, ToastAndroid.TOP)
            } else if (res.error) {
                ToastAndroid.showWithGravity('Error,please try again!', ToastAndroid.SHORT, ToastAndroid.TOP)
            }
            else {
                setResourcePath(res)
                const bodyFormData = new FormData();
                bodyFormData.append('image', {
                    uri: res.assets[0].uri,
                    name: res.assets[0].fileName,
                    type: 'image/jpg'
                });
                dispatch(UpdateUsers(bodyFormData, GetAuth.data.token, GetAuth.data.id))
            }
        });
    }

    const launchLibraryAction = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxHeight: 200,
            maxWidth: 200,
            cropping: true,
        }
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                ToastAndroid.showWithGravity('Cancelled', ToastAndroid.SHORT, ToastAndroid.TOP)
            } else if (res.error) {
                ToastAndroid.showWithGravity('Error,please try again!', ToastAndroid.SHORT, ToastAndroid.TOP)
            }
            else {
                setResourcePath(res)
                const bodyFormData = new FormData();
                bodyFormData.append('image', {
                    uri: res.assets[0].uri,
                    name: res.assets[0].fileName,
                    type: 'image/jpg'
                });
                dispatch(UpdateUsers(bodyFormData, GetAuth.data.token, GetAuth.data.id))
            }
        });
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
                                <FlatList
                                    data={resourcePath.assets}
                                    renderItem={({ item }) => {
                                        return (<>
                                            <Pressable onPress={() => setModalVisible(!modalVisible)} >
                                                <Image source={{ uri: item.uri }} style={{
                                                    width: '100%',
                                                    height: 200,
                                                    alignSelf: 'center',
                                                    resizeMode: 'contain',
                                                    marginVertical: 20,
                                                }} />
                                            </Pressable>
                                            <Modal visible={modalVisible} transparent={true}
                                                animationType="slide"
                                                onRequestClose={() => {
                                                    setModalVisible(!modalVisible);
                                                }}
                                            ><ImageViewer imageUrls={[{
                                                url: item.uri,
                                            }]} /></Modal>
                                        </>)
                                    }}
                                    ListEmptyComponent={() => {
                                        return (<>
                                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                                <Image source={image === "require('../../../assets/image/user.png')" ? require('../../../assets/image/user.png') : { uri: `${urlImage}/${image}` }} style={{
                                                    width: '100%',
                                                    height: 200,
                                                    alignSelf: 'center',
                                                    resizeMode: 'contain',
                                                    marginVertical: 20,
                                                }} />
                                            </Pressable>
                                            <Modal visible={modalVisible} transparent={true}
                                                animationType="slide"
                                                onRequestClose={() => {
                                                    setModalVisible(!modalVisible);
                                                }}
                                            ><ImageViewer imageUrls={[{
                                                url: image === "require('../../../assets/image/user.png')" ? '' : `${urlImage}/${image}`,
                                                props: {
                                                    source: image === "require('../../../assets/image/user.png')" ? require('../../../assets/image/user.png') : ''
                                                }
                                            }]} /></Modal>
                                        </>)
                                    }}
                                />

                            </View>
                            <Pressable onPress={launchCameraAction} style={{
                                ...commonStyle.button,
                                height: 40,
                                width: '60%',
                                alignSelf: 'center',
                            }} android_ripple={{ color: '#fff' }}>
                                <Text style={{
                                    ...commonStyle.textWhite
                                }}>Take a picture</Text>
                            </Pressable>
                            <Pressable onPress={launchLibraryAction} style={{
                                ...commonStyle.button,
                                marginTop: 10,
                                height: 40,
                                width: '60%',
                                alignSelf: 'center',
                            }} android_ripple={{ color: '#fff' }}>
                                <Text style={{
                                    ...commonStyle.textWhite
                                }}>Select from library</Text>
                            </Pressable>
                        </View>
                    </Animatable.View>
                </>)
            }}
        />
    </>)
}

export default ShowImageScreen