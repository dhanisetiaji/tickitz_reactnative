import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Pressable, RefreshControl, ScrollView, SectionList, StyleSheet, Text, View } from 'react-native'
import HeaderComponent from '../../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { ChangeNotifStatus, deleteNotif, GetNotification, GetNotifStatus } from '../../redux/actions/Users'
import { commonStyle } from '../../../helpers/commonStyle'

const NotificationScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [refetch, setRefetch] = useState(false)

    const { GetAuth } = useSelector(state => state.auth)
    const { Notification, loading } = useSelector(state => state.users)

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            dispatch(GetNotification(GetAuth.data.token))
            dispatch(ChangeNotifStatus(GetAuth.data.token))
            dispatch(GetNotifStatus(GetAuth.data.token))
        });

        return unsubscribe;
    }, [dispatch, refetch])

    const handleLongPress = (item) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this notification?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        dispatch(deleteNotif(item.id_notification, GetAuth.data.token))
                    }
                },
            ],
            { cancelable: true }
        )
    }

    return (<>
        <HeaderComponent />
        <SectionList
            // refreshControl={<RefreshControl refreshing={loading}
            //     onRefresh={() => { setRefetch(!refetch) }} />}
            style={{ ...commonStyle.container, backgroundColor: '#D6D8E7', paddingTop: 20, paddingBottom: 100 }}
            sections={[
                { title: 'Data', data: [] },
            ]}
            renderItem={() => null}
            renderSectionHeader={({ section }) => {
                return (
                    <FlatList
                        style={{ paddingBottom: 110 }}
                        data={Notification}
                        listKey={(index) => `${index}`}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }) => {
                            return (<>
                                <Pressable onLongPress={() => handleLongPress(item)}>
                                    <View style={styles.wrappers}>
                                        <Text style={styles.textHeader}>{item.title}</Text>
                                        <Text style={styles.textNotif}>{item.message}</Text>
                                    </View>
                                </Pressable>
                            </>)
                        }}
                        ListEmptyComponent={() => {
                            return (<>
                                <View style={styles.wrappers}>
                                    <Text style={styles.textHeader}>No Notification</Text>
                                </View>
                            </>)
                        }}
                    />
                )
            }
            }
        />

    </>)
}

const styles = StyleSheet.create({
    wrappers: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        paddingLeft: 20,
        marginBottom: 10,
    },
    textHeader: {
        fontSize: 16,
        color: '#333',
    },
    textNotif: {
        fontSize: 14,
        fontStyle: 'italic',
    }
})

export default NotificationScreen