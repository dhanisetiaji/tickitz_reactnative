import React, { useEffect } from 'react'
import toRupiah from '@develoka/angka-rupiah-js'
import { SectionList, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { commonStyle } from '../../../helpers/commonStyle'

const PaymentScreen = () => {
    const route = useRoute()
    const { subtotal } = route.params
    const { isLogin } = useSelector(state => state.auth)

    useEffect(() => {
        if (!isLogin) {
            navigation.replace('Login')
        }
    }, [isLogin])

    return (<>
        <View style={{
            ...commonStyle.flexRow,
            ...commonStyle.flexBetween,
            paddingHorizontal: 30,
            backgroundColor: '#fff',
            height: 40,
            alignItems: 'center',
        }}>
            <Text style={commonStyle.textSecondary}>Subtotal</Text>
            <Text style={{ ...commonStyle.textBlack, fontWeight: 'bold' }}>{toRupiah(subtotal, { dot: '.', floatingPoint: 0 })}</Text>
        </View>
        <SectionList
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={({ section }) => {
                return (<>
                    <View style={{
                        ...commonStyle.container,
                        paddingVertical: 20,
                    }}>
                        <Text style={{
                            fontSize: 30,
                            textAlign: 'center',
                        }}>Baru sampe sini</Text>
                    </View>
                </>)
            }}
        />
    </>)
}

export default PaymentScreen