import React, { useEffect } from 'react'
import { SectionList } from 'react-native'
import { useSelector } from 'react-redux'
import { commonStyle } from '../../../helpers/commonStyle'
import SeatComponent from '../../components/Seat'

const OrderScreen = ({ navigation, route }) => {
    const { isLogin } = useSelector(state => state.auth)

    useEffect(() => {
        if (!isLogin) {
            navigation.replace('Login')
        }
    }, [isLogin])

    return (<>
        <SectionList
            // refreshControl={<RefreshControl refreshing={loading}
            // onRefresh={() => { setRefetch(!refetch) }} />}
            style={{ backgroundColor: '#D6D8E7', paddingVertical: 20 }}
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={({ section }) => {
                return (<>
                    <SeatComponent navigation={navigation} />
                </>)
            }}
        />
    </>)
}

export default OrderScreen