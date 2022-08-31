import React, { useEffect } from 'react'
import { Text, BackHandler, FlatList, SectionList, View, Pressable, StyleSheet, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { commonStyle } from '../../../helpers/commonStyle'
import { GetHistory } from '../../redux/actions/Users'
import QRCode from 'react-native-qrcode-svg';

const OrderHistoryScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const { GetAuth } = useSelector(state => state.auth)
    const { History, loading } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(GetHistory(GetAuth.data.id, GetAuth.data.token))
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                navigation.navigate('Profile')
                return true;
            }
        );
        return () => backHandler.remove();
    }, [dispatch])
    // console.log(History);
    return (<>
        <SectionList
            style={{ ...commonStyle.container, backgroundColor: '#D6D8E7', paddingTop: 20, paddingBottom: 100 }}
            sections={[
                { title: 'Data', data: [] },
            ]}
            renderItem={() => null}
            renderSectionHeader={() => {
                return (
                    <FlatList
                        data={History}
                        listKey={(index) => `${index}`}
                        renderItem={({ item }) => {
                            return (<>
                                {/* <Text>{}</Text> */}
                                <Pressable style={styles.wrappers}>
                                    <View style={styles.img}>
                                        <QRCode
                                            value={`${item.name_cinema}-${item.id_user}`}
                                            linearGradient={['rgb(95, 46, 234)', 'rgb(0,200,200)']}
                                            enableLinearGradient={true}
                                            backgroundColor='transparent'
                                            size={60}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.paymentText}>Payment Success</Text>
                                        <Text style={styles.nameText}>{item.title}</Text>
                                        <Text style={styles.cinemaText}>{item.name_cinema} - {item.time} - {item.seat.split('"')}</Text>
                                    </View>
                                </Pressable>
                            </>)
                        }}
                        ListEmptyComponent={() => {
                            return (<>
                                <Text>No ticket found!</Text>
                            </>)
                        }}
                    />
                )
            }}
        />
    </>)
}

const styles = StyleSheet.create({
    wrappers: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        height: 90,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingLeft: 15,
        marginBottom: 10,

    },
    img: {
        marginVertical: 10,
        marginRight: 10,
    },
    paymentText: {
        fontSize: 15,
        backgroundColor: '#58fc69',
        paddingHorizontal: 5,
        fontWeight: 'bold',
        width: 110,
    },
    nameText: {
        fontSize: 20,
        color: '#000',
    },
    cinemaText: {
        fontSize: 15,
        color: '#333',
    }
})

export default OrderHistoryScreen