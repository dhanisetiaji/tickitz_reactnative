import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, SectionList, Pressable, RefreshControl, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { GetMovieById } from '../../redux/actions/Movies';
import { commonStyle } from '../../../helpers/commonStyle'
import { Dropdown } from 'react-native-element-dropdown';
import styles from './DropdownStyle';
import FooterComponent from '../../components/Footer';
import moment from 'moment';

const urlImage = 'https://test.dhanz.me/static'

const styless = StyleSheet.create({
    bgDark: {
        backgroundColor: '#D6D8E7',
    },
    bgWhite: {
        backgroundColor: '#fff',
    }
})

const DetailScreen = ({ route, navigation }) => {
    const {
        id,
        title,
        genre,
        image,
        synopsis,
        duration,
        release_date,
        cast,
        directed_by

    } = route.params;
    const dispatch = useDispatch();
    const [value, setValue] = useState(null),
        [refetch, setRefetch] = useState(false),
        [hours, setHours] = useState([
            '08.00', '10.00', '13.00', '15.00', '17.00', '19.00', '21.00', '23.00'
        ]),
        [selectHour, setSelectHour] = useState()

    const onSelect = (item) => {
        setSelectHour(item);
    }

    return (
        !id ? <View></View> : (

            <SectionList
                style={{
                    backgroundColor: '#fff'
                }}
                sections={[
                    { title: 'Data', data: [0] }
                ]}
                renderItem={() => null}
                renderSectionHeader={() => {
                    return (<>
                        <View style={{
                            ...commonStyle.container,
                            paddingVertical: 20
                        }}>
                            <View style={{
                                alignSelf: 'center',
                                borderRadius: 10,
                                borderColor: '#dedede',
                                borderWidth: 2,
                                padding: 10,
                                marginBottom: 20
                            }}>
                                <Image source={{ uri: `${urlImage}/${image}` }} style={{
                                    width: 150,
                                    height: 200,
                                    resizeMode: 'contain',
                                }} />
                            </View>
                            <Text style={{
                                ...commonStyle.textBlack,
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginBottom: 12
                            }}>{title}</Text>
                            <Text style={{
                                ...commonStyle.textSecondary,
                                fontSize: 16,
                                textAlign: 'center',
                                marginBottom: 15
                            }}>{genre}</Text>
                            <View style={{
                                ...commonStyle.flexRow,
                                // justifyContent: 'space-between',
                                justifyContent: 'space-evenly',
                                marginBottom: 15
                            }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        ...commonStyle.textSecondary,
                                        fontSize: 16,
                                        marginBottom: 5,
                                    }}>Release date</Text>
                                    <Text style={{
                                        ...commonStyle.textBlack,
                                        fontSize: 16,
                                    }}>{moment(release_date).format('MMMM DD, YYYY')}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        ...commonStyle.textSecondary,
                                        fontSize: 16,
                                        marginBottom: 5
                                    }}>Directed By</Text>
                                    <Text style={{
                                        ...commonStyle.textBlack,
                                        fontSize: 16,
                                    }}>{directed_by}</Text>
                                </View>
                            </View>
                            <View style={{
                                ...commonStyle.flexRow,
                                // justifyContent: 'space-between',
                                justifyContent: 'space-evenly',
                            }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        ...commonStyle.textSecondary,
                                        fontSize: 16,
                                        marginBottom: 5
                                    }}>Duration</Text>
                                    <Text style={{
                                        ...commonStyle.textBlack,
                                        fontSize: 16,
                                    }}>{duration}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        ...commonStyle.textSecondary,
                                        fontSize: 16,
                                        marginBottom: 5
                                    }}>Cast</Text>
                                    <Text style={{
                                        ...commonStyle.textBlack,
                                        fontSize: 16,
                                    }}>{cast}</Text>
                                </View>
                            </View>
                            <View style={{
                                marginTop: 30,
                                marginBottom: 10,
                                borderTopWidth: 2,
                                borderTopColor: '#dedede',
                                padding: 10,
                            }}>
                                <Text style={{
                                    ...commonStyle.textBlack,
                                    fontSize: 16,
                                    marginBottom: 10
                                }}>Synopsis</Text>
                                <Text style={{
                                    ...commonStyle.textSecondary,
                                    fontSize: 16,
                                    marginBottom: 10,
                                    textAlign: 'justify'
                                }}>{synopsis}</Text>
                            </View>
                        </View>
                        <View style={{
                            ...commonStyle.container,
                            backgroundColor: '#F5F6F8',
                            paddingVertical: 20,
                        }}>
                            <Text style={{
                                ...commonStyle.textBlack,
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: 10
                            }}>Showtimes and Tickets</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={[
                                    { label: '2 September 2022', value: '02-09-2022' },
                                    { label: '3 September 2022', value: '03-09-2022' },
                                    { label: '4 September 2022', value: '04-09-2022' },
                                ]}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Set a date"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                }}
                                renderLeftIcon={() => (
                                    <Image source={require('../../../assets/image/icons/calendar.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                                )}
                                renderItem={
                                    item => (
                                        <View style={styles.item}>
                                            <Text style={styles.textItem}>{item.label}</Text>
                                            {item.value === value && (
                                                <Image source={require('../../../assets/image/icons/calendar.png')} style={{ width: 20, height: 20 }} />

                                            )}
                                        </View>
                                    )
                                }
                            />
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={[
                                    { label: 'Cinema 1', value: 'Cinema 1' },
                                    { label: 'Cinema 2', value: 'Cinema 2' },
                                ]}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Set a city"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                }}
                                renderLeftIcon={() => (
                                    <Image source={require('../../../assets/image/icons/map.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                                )}
                                renderItem={
                                    item => (
                                        <View style={styles.item}>
                                            <Text style={styles.textItem}>{item.label}</Text>
                                            {item.value === value && (
                                                <Image source={require('../../../assets/image/icons/map.png')} style={{ width: 20, height: 20 }} />

                                            )}
                                        </View>
                                    )
                                }
                            />
                            {/* <View style={{
                                marginTop: 20,
                                backgroundColor: '#FFF',
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                            }}>
                                <Image source={require('../../../assets/image/ebv.png')} style={{
                                    width: 75,
                                    height: 60,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }} />
                                <Text style={{
                                    ...commonStyle.textSecondary,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    borderBottomColor: '#dedede',
                                    borderBottomWidth: 1,
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                }}>Whatever street No.12. South Purwokerto</Text>
                                <FlatList
                                    data={hours}
                                    numColumns={4}
                                    listKey={(index) => `${index}`}
                                    renderItem={({ item: hour }) => (
                                        <View style={{
                                            marginHorizontal: 10,
                                        }}>
                                            <Pressable onPress={() => onSelect(hour)} android_ripple={{
                                                color: '#333',
                                            }}
                                                style={
                                                    selectHour.includes(hour) ? styless.bgDark : styless.bgWhite
                                                }
                                            >
                                                <Text style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 10,
                                                }}>{hour}</Text>
                                            </Pressable>
                                        </View>
                                    )}
                                />
                                <View style={{
                                    ...commonStyle.flexRow,
                                    ...commonStyle.flexBetween,
                                    marginTop: 20,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{ ...commonStyle.textSecondary }}>Price</Text>
                                    <Text style={{ ...commonStyle.textBlack }}>Rp. 40.000/seat</Text>
                                </View>
                                <Pressable onPress={() => navigation.navigate('Orders', {
                                    hour: selectHour,
                                })} style={{
                                    ...commonStyle.button,
                                    borderRadius: 2,
                                    height: 40,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    elevation: 5,
                                }} android_ripple={{ color: '#fff' }}>
                                    <Text style={{ ...commonStyle.textWhite }}>Book Now</Text>
                                </Pressable>
                            </View> */}
                            <View style={{
                                marginTop: 20,
                                backgroundColor: '#FFF',
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                            }}>
                                <Image source={require('../../../assets/image/ebv.png')} style={{
                                    width: 75,
                                    height: 60,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }} />
                                <Text style={{
                                    ...commonStyle.textSecondary,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    borderBottomColor: '#dedede',
                                    borderBottomWidth: 1,
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                }}>Whatever street No.12. South Purwokerto</Text>
                                <FlatList
                                    data={hours}
                                    numColumns={4}
                                    listKey={(index) => `${index}`}
                                    renderItem={({ item: hour }) => (
                                        <View style={{
                                            marginHorizontal: 10,
                                        }}>
                                            <Pressable onPress={() => onSelect(hour)} android_ripple={{
                                                color: '#333',
                                            }}
                                                style={
                                                    selectHour === hour ? styless.bgDark : styless.bgWhite
                                                }
                                            >
                                                <Text style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 10,
                                                }}>{hour}</Text>
                                            </Pressable>
                                        </View>
                                    )}
                                />
                                <View style={{
                                    ...commonStyle.flexRow,
                                    ...commonStyle.flexBetween,
                                    marginTop: 20,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{ ...commonStyle.textSecondary }}>Price</Text>
                                    <Text style={{ ...commonStyle.textBlack }}>Rp. 40.000/seat</Text>
                                </View>
                                <Pressable onPress={() => navigation.navigate('Orders', {
                                    hour: selectHour,
                                    title: title,
                                    date: release_date,
                                    id_movie: id,
                                    id_cinema: 9,
                                })} style={{
                                    ...commonStyle.button,
                                    borderRadius: 2,
                                    height: 40,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    elevation: 5,
                                }} android_ripple={{ color: '#fff' }}>
                                    <Text style={{ ...commonStyle.textWhite }}>Book Now</Text>
                                </Pressable>
                            </View>
                            <View style={{
                                marginTop: 20,
                                backgroundColor: '#FFF',
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                            }}>
                                <Image source={require('../../../assets/image/hiflix.png')} style={{
                                    width: 75,
                                    height: 60,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }} />
                                <Text style={{
                                    ...commonStyle.textSecondary,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    borderBottomColor: '#dedede',
                                    borderBottomWidth: 1,
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                }}>Whatever street No.12. South Purwokerto</Text>
                                <FlatList
                                    data={hours}
                                    numColumns={4}
                                    listKey={(index) => `${index}`}
                                    renderItem={({ item: hour }) => (
                                        <View style={{
                                            marginHorizontal: 10,
                                        }}>
                                            <Pressable onPress={() => onSelect(hour)} android_ripple={{
                                                color: '#333',
                                            }}
                                                style={
                                                    selectHour === hour ? styless.bgDark : styless.bgWhite
                                                }
                                            >
                                                <Text style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 10,
                                                }}>{hour}</Text>
                                            </Pressable>
                                        </View>
                                    )}
                                />
                                <View style={{
                                    ...commonStyle.flexRow,
                                    ...commonStyle.flexBetween,
                                    marginTop: 20,
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{ ...commonStyle.textSecondary }}>Price</Text>
                                    <Text style={{ ...commonStyle.textBlack }}>Rp. 40.000/seat</Text>
                                </View>
                                <Pressable onPress={() => navigation.navigate('Orders', {
                                    hour: selectHour,
                                    title: title,
                                    date: release_date,
                                    id_movie: id,
                                    id_cinema: 10,
                                })} style={{
                                    ...commonStyle.button,
                                    borderRadius: 2,
                                    height: 40,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    elevation: 5,
                                }} android_ripple={{ color: '#fff' }}>
                                    <Text style={{ ...commonStyle.textWhite }}>Book Now</Text>
                                </Pressable>
                            </View>
                            <Text style={{
                                ...commonStyle.textPrimary,
                                marginVertical: 30,
                                textAlign: 'center',
                            }}>View More</Text>
                        </View>
                    </>)
                }}
            />
        )
    )
}


export default DetailScreen