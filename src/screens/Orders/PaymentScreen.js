import React, { useEffect, useState } from 'react'
import toRupiah from '@develoka/angka-rupiah-js'
import { SectionList, Text, View, Pressable, StyleSheet, Image, FlatList, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { commonStyle } from '../../../helpers/commonStyle'
// import Xendit from 'xendit-js-node'

const urlImage = 'https://test.dhanz.me/static'

const PaymentScreen = ({ navigation }) => {

    const route = useRoute()
    const { subtotal } = route.params
    const { isLogin, GetDetail } = useSelector(state => state.auth)

    const [data, setData] = useState(),
        [paymentData, setPaymentData] = useState([
            'google-pay.png', 'visa.png', 'GoPay.png',
            'paypal.png', 'ovo.png', 'dana.png',
        ]),
        [selectItem, setSelectItem] = useState(null),
        [formData, setFormData] = useState({
            fullName: `${GetDetail.data[0].firstName} ${GetDetail.data[0].lastName}` || '',
            email: GetDetail.data[0].email || '',
            phone: GetDetail.data[0].phone || '',
        })

    useEffect(() => {
        if (!isLogin) {
            navigation.replace('Login')
        }
    }, [isLogin])

    const onSelect = (item) => {
        selectItem === item ? setSelectItem(null) : setSelectItem(item)
        console.log(selectItem, 'selectItem');
    }

    return (<>
        <SectionList
            style={styles.wrappers}
            sections={[
                { title: 'Data', data: [0] },
            ]}
            renderItem={() => null}
            renderSectionHeader={({ section }) => {
                return (<>
                    <View style={styles.header}>
                        <Text style={commonStyle.textSecondary}>Total Payment</Text>
                        <Text style={{ ...commonStyle.textBlack, fontWeight: 'bold' }}>{toRupiah(subtotal, { dot: '.', floatingPoint: 0 })}</Text>
                    </View>
                    <View style={commonStyle.container}>
                        <Text style={styles.textHeader}>Payment Method</Text>
                        <View style={styles.wrapper}>
                            <FlatList
                                data={paymentData}
                                style={styles.wrapperImage}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Pressable onPress={() => onSelect(index)} style={selectItem !== index ? styles.itemImage : styles.itemImageSelect}>
                                            <Image source={{ uri: `${urlImage}/${item}` }} style={styles.image} />
                                        </Pressable>
                                    )
                                }}
                            />
                            <View style={[commonStyle.flexRow, commonStyle.flexCenter]}>
                                <View style={styles.border}></View>
                                <Text>OR</Text>
                                <View style={styles.border}></View>
                            </View>
                            <Text style={styles.textCash}>
                                Pay via cash ? <Text style={commonStyle.textPrimary}>See How its works</Text>
                            </Text>
                        </View>
                        <Text style={styles.textHeader}>Personal info</Text>
                        <View style={[styles.wrapper, commonStyle.container]}>
                            <View style={styles.form}>
                                <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, fullName: text }))} editable defaultValue={`${GetDetail.data[0].firstName} ${GetDetail.data[0].lastName}`} placeholder='Full Name' autoCapitalize='none' style={styles.textForm} />
                            </View>
                            <View style={styles.form}>
                                <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, email: text }))} editable defaultValue={GetDetail.data[0].email} placeholder='Email' keyboardType='email-address' autoCapitalize='none' style={styles.textForm} />
                            </View>
                            <View style={styles.form}>
                                <TextInput onChangeText={(text) => setFormData(prevData => ({ ...prevData, phone: text }))} placeholder='Phone Number' style={{ fontSize: 15, marginLeft: 10 }} autoCapitalize='none' defaultValue={GetDetail.data[0].phone} keyboardType='numeric' />
                            </View>
                        </View>
                        <Pressable onPress={() => navigation.navigate('success')} style={styles.btn}>
                            <Text style={{ ...commonStyle.textWhite, fontSize: 18 }}>Pay your order</Text>
                        </Pressable>
                    </View>
                </>)
            }}
        />
    </>)
}


const styles = StyleSheet.create({
    btn: {
        ...commonStyle.button,
        heigh: 40,
        elevation: 10,
        marginVertical: 20,
    },
    form: {
        borderColor: '#DEDEDE',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
    },
    textForm: {
        fontSize: 15,
        marginLeft: 10
    }
    ,
    header: {
        ...commonStyle.flexRow,
        ...commonStyle.flexBetween,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    textHeader: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        color: '#000'
    },
    textCash: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    wrappers: {
        backgroundColor: '#D6D8E7',
    },
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 10,
        paddingVertical: 20,
    },
    wrapperImage: {
        ...commonStyle.flexRow,
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: 300,
    },
    border: {
        width: 60,
        height: 1,
        backgroundColor: '#D6D8E7',
        marginHorizontal: 10,
    },
    itemImage: {
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: '#D6D8E7',
        borderWidth: 1,
        marginHorizontal: 10,
    },
    itemImageSelect: {
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 5,
        borderColor: '#D6D8E7',
        borderWidth: 1,
        marginHorizontal: 10,
        backgroundColor: '#D6D8E7',
    },
    image: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
    }
})

export default PaymentScreen