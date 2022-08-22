import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { commonStyle } from '../../helpers/commonStyle'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import toRupiah from '@develoka/angka-rupiah-js'
import { useRoute } from '@react-navigation/native'

const SEAT_FIRST_INDEX = 'A';
const SEAT_LAST_INDEX = 'G';
const SEAT_COUNT_PER_ROW = 7;
const SEAT_MARGIN = 2;
const SEAT_SIZE = 15;

const SeatComponent = ({ navigation }) => {
    const route = useRoute();
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [seatSold, setSeatSold] = useState(["A7", "B13", "C9", "D1", "E3", "F5", "G5"]);
    const { hour, title, date } = route.params;
    // console.log(hour, 'dari hour', selectedSeat, 'dari selectedSeat');

    const GeneratorSeat = (first = 'A', last = 'G', count = 7, nextCount = false) => {
        const firstChar = first.charCodeAt(0);
        const lastChar = last.charCodeAt(0);
        let seat = [];
        for (let i = firstChar; i <= lastChar; i++) {
            for (let j = 1; j <= count; j++) {
                seat.push(`${String.fromCharCode(i)}${nextCount ? count + j : j}`);
            }
        }
        return seat;
    }

    const onSelect = (item) => {
        const index = selectedSeat.indexOf(item);
        if (index === -1) {
            setSelectedSeat([...selectedSeat, item]);
        } else {
            setSelectedSeat(selectedSeat.filter(seat => seat !== item));
        }
    }

    const seat = (next = false) =>
        GeneratorSeat(
            SEAT_FIRST_INDEX,
            SEAT_LAST_INDEX,
            SEAT_COUNT_PER_ROW,
            next
        );

    let subtotal = selectedSeat.length * 40000;

    return (<>
        <Text style={styles.textHeader}>Choose seats :</Text>
        <SafeAreaView style={styles.wrappers}>
            <Animatable.View style={styles.wrapper}>
                <View style={styles.itemWrapper}>
                    <View style={styles.Screen} />
                    <View style={{ ...commonStyle.flexRow, justifyContent: 'space-between' }}>
                        <View style={{ marginRight: 10 }}>
                            <View style={styles.parent}>
                                {seat().map((item, index) => {
                                    return (
                                        <Pressable onPress={() => onSelect(item)}
                                            disabled={seatSold.includes(item)}
                                            key={index}>
                                            <View
                                                style={
                                                    seatSold.includes(item) ? styles.seatSold :
                                                        selectedSeat.includes(item) ? styles.seatSelect : styles.seat

                                                }
                                            />
                                        </Pressable>
                                    )
                                })}
                            </View>
                            <View style={styles.ScreenBottom} />
                        </View>
                        <View>
                            <View style={styles.parent}>
                                {seat().map((item, index) => {
                                    let next = parseInt(item.split('')[1]) + 7;
                                    let itemNext = `${item.split('')[0]}${next}`;
                                    return (
                                        <Pressable onPress={() => onSelect(itemNext)} key={index}>
                                            <View
                                                style={
                                                    seatSold.includes(itemNext) ? styles.seatSold :
                                                        selectedSeat.includes(itemNext) ? styles.seatSelect : styles.seat

                                                }
                                            />
                                        </Pressable>
                                    )
                                })}
                            </View>
                            <View style={styles.ScreenBottom} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ marginTop: 5, fontWeight: 'bold' }}>Seating Key</Text>
                        <View style={{ ...commonStyle.flexRow, justifyContent: 'flex-start' }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.rowD}>
                                    <Image source={require('../../assets/image/icons/right-arrow.png')} style={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain',
                                        marginRight: 5
                                    }} />
                                    <Text>A - G</Text>
                                </View>
                                <View style={styles.rowD}>
                                    <View style={{ ...styles.seat, marginRight: 10 }}></View>
                                    <Text>Available</Text>
                                </View>
                                <View style={styles.rowD}>
                                    <View style={{ ...styles.seat, marginRight: 10, backgroundColor: '#9570fe' }}></View>
                                    <Text>Screen</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={styles.rowD}>
                                    <Image source={require('../../assets/image/icons/down-arrow.png')} style={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain',
                                        marginRight: 5
                                    }} />
                                    <Text>1 - 14</Text>
                                </View>
                                <View style={styles.rowD}>
                                    <View style={{ ...styles.seatSold, marginRight: 10 }}></View>
                                    <Text>Sold</Text>
                                </View>
                                <View style={styles.rowD}>
                                    <View style={{ ...styles.seatSelect, marginRight: 10 }}></View>
                                    <Text>Selected</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        </SafeAreaView>
        <Text style={{ ...styles.textHeader }}>Order Info :</Text>
        <SafeAreaView style={styles.wrappers}>
            <Animatable.View style={{ ...styles.wrapper, borderRadius: 2 }}>
                <View style={{ ...styles.itemWrapper }}>
                    <Image source={require('../../assets/image/ebv.png')} style={{
                        width: 75,
                        height: 40,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }} />
                    <Text style={styles.textTitle}>{title}</Text>
                    <View style={[commonStyle.flexRow, commonStyle.flexBetween, { marginTop: 10, paddingHorizontal: 10 }]}>
                        <Text style={{}}>{moment(date).format('dddd, DD MMMM YYYY')}</Text>
                        <Text style={commonStyle.textBlack}>{hour}</Text>
                    </View>
                    <View style={[commonStyle.flexRow, commonStyle.flexBetween, { marginTop: 10, paddingHorizontal: 10 }]}>
                        <Text style={{}}>Price</Text>
                        <Text style={commonStyle.textBlack}>{toRupiah(40000, { dot: '.', floatingPoint: 0 })}/seats</Text>
                    </View>
                    {selectedSeat.length > 0 && (<>
                        <View style={[commonStyle.flexRow, commonStyle.flexBetween, { marginTop: 10, paddingHorizontal: 10 }]}>
                            <Text style={{}}>Seats</Text>
                            <Text style={commonStyle.textBlack}>{selectedSeat.join(', ')}</Text>
                        </View>
                        <View style={[commonStyle.flexRow, commonStyle.flexBetween, { marginTop: 20, paddingHorizontal: 10 }]}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Subtotal</Text>
                            <Text style={commonStyle.textBlack}>{toRupiah(subtotal, { dot: '.', floatingPoint: 0 })}</Text>
                        </View>
                    </>)}
                </View>
            </Animatable.View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
                <Pressable style={selectedSeat.length === 0 ? styles.btnDisable : styles.btnCheckout}
                    onPress={() => navigation.navigate('Payment', {
                        subtotal: subtotal,
                    })}
                    disabled={selectedSeat.length === 0}
                >
                    <Text style={{ ...commonStyle.textWhite }}>{selectedSeat.length === 0 ? 'Select seats please!' : 'Checkout Now'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    </>)
}

const styles = StyleSheet.create({
    btnCheckout: {
        ...commonStyle.button,
        heigh: 40,
        elevation: 10,
    },
    btnDisable: {
        ...commonStyle.button,
        heigh: 40,
        elevation: 10,
        backgroundColor: '#333',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    parent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SEAT_COUNT_PER_ROW * (SEAT_SIZE + SEAT_MARGIN * 2)
    },
    seat: {
        margin: SEAT_MARGIN,
        width: SEAT_SIZE,
        height: SEAT_SIZE,
        backgroundColor: '#D6D8E7',
        borderRadius: 2
    },
    seatSelect: {
        margin: SEAT_MARGIN,
        width: SEAT_SIZE,
        height: SEAT_SIZE,
        backgroundColor: '#5f2eea',
        borderRadius: 2
    }
    ,
    seatSold: {
        margin: SEAT_MARGIN,
        width: SEAT_SIZE,
        height: SEAT_SIZE,
        backgroundColor: '#6e7171',
        borderRadius: 2
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
    },
    wrappers: {
        ...commonStyle.container,
        backgroundColor: '#D6D8E7',
        // marginBottom: 20,
        paddingBottom: 20
    },
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 20,
    },
    itemWrapper: {
        paddingHorizontal: 10,
        // marginHorizontal: 10,
        width: '100%',
        paddingTop: 20,
        paddingBottom: 10,
    },
    Screen: {
        height: 6,
        backgroundColor: '#9570fe',
        borderRadius: 3,
        marginBottom: 10,
        elevation: 10,
    },
    ScreenBottom: {
        height: 1,
        backgroundColor: 'red',
        margin: 5,
    },
    rowD: {
        flexDirection: 'row',
        marginTop: 5,
        flex: 1,
    }
})

export default SeatComponent