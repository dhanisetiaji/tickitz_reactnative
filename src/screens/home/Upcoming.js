import React, { useState } from 'react'
import { Image, FlatList, Text, View, Pressable } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'
import { useSelector } from 'react-redux'
import Carousel from 'react-native-snap-carousel';

const UpComingSection = ({ navigation }) => {

    const { Movies } = useSelector(state => state.movies)

    const urlImage = 'https://test.dhanz.me/static'

    const [month, setMonth] = useState([
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ])

    const dateNow = 'January'

    return (<>
        <View style={{ backgroundColor: '#fff', paddingVertical: 35 }}>
            <View style={[commonStyle.container]}>
                <View style={[commonStyle.flexRow, commonStyle.flexBetween]}>
                    <Text style={{
                        color: '#14142B',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Upcoming Movies</Text>
                    <Text
                        style={{
                            color: '#5F2EEA',
                            fontSize: 14,
                        }}
                    >View All</Text>
                </View>
                <FlatList
                    style={{ marginTop: 20 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={month}
                    renderItem={({ item }) => (<>
                        {item === dateNow ? (
                            <Pressable style={{
                                ...commonStyle.button,
                                height: 40,
                                paddingHorizontal: 20,
                                marginRight: 15,
                            }} android_ripple={{ color: '#fff' }}>
                                <Text style={[commonStyle.textWhite, { fontSize: 16 }]}>{item}</Text>
                            </Pressable>
                        ) : (
                            <Pressable style={{
                                ...commonStyle.buttonSecondary,
                                height: 40,
                                paddingHorizontal: 20,
                                marginRight: 15,
                            }} android_ripple={{ color: '#fff' }}>
                                <Text style={[commonStyle.textPrimary, { fontSize: 16 }]}>{item}</Text>
                            </Pressable>
                        )}
                    </>)}
                />
                <Carousel
                    layout='default'
                    inactiveSlideOpacity={0.5}
                    loop={true}
                    data={Movies.results}
                    renderItem={({ item }) => (<>
                        <Pressable android_ripple={{ color: '#333' }} onPress={() => navigation.navigate('Detail Movie', {
                            id: item.id,
                            title: item.title,
                            genre: item.genre,
                            image: item.image,
                            synopsis: item.synopsis,
                            release_date: item.release_date,
                            cast: item.cast,
                            directed_by: item.directed_by,
                            duration: item.duration,
                        })} style={{ marginTop: 20 }}>
                            <View style={{
                                backgroundColor: '#dedede',
                                padding: 10,
                            }}>
                                <Image style={{
                                    width: '100%',
                                    height: 170,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }}
                                    source={{ uri: `${urlImage}/${item.image}` }}
                                />
                                <Text style={{
                                    marginTop: 10,
                                    textAlign: 'center',
                                    width: '70%',
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>{`${item.title.slice(0, 13)}`}</Text>
                                <Text style={{
                                    ...commonStyle.textSecondary,
                                    fontSize: 16,
                                    textAlign: 'center',
                                    width: 120,
                                    marginBottom: 10,
                                }}>{`${item.genre.slice(0, 30)}`}</Text>
                            </View>
                        </Pressable>

                    </>)}
                    sliderWidth={300}
                    itemWidth={140}
                />
                {/* <FlatList
                    style={{ marginTop: 20 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={Movies.results}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                borderColor: '#DEDEDE',
                                borderWidth: 2,
                                borderRadius: 5,
                                padding: 10,
                                marginRight: 15,
                                backgroundColor: '#ffffff33'
                            }}>
                                <Image style={{
                                    width: 120,
                                    height: 170,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }}
                                    source={{ uri: `${urlImage}/${item.image}` }}
                                />
                                <Text style={{
                                    ...commonStyle.textBlack,
                                    fontSize: 16,
                                    textAlign: 'center',
                                    marginTop: 10,
                                }}>{`${item.title.slice(0, 13)}`}</Text>
                                <View style={{
                                    height: 60,
                                }}>
                                    <Text style={{
                                        ...commonStyle.textSecondary,
                                        fontSize: 16,
                                        textAlign: 'center',
                                        width: 120,
                                        marginBottom: 10,
                                    }}>{`${item.genre.slice(0, 30)}`}</Text>
                                </View>
                                <Pressable onPress={() => navigation.navigate('Detail Movie', {
                                    id: item.id,
                                })} style={{
                                    ...commonStyle.buttonSecondary,
                                    height: 40,
                                    paddingHorizontal: 20,
                                    marginRight: 15,
                                    width: '100%',
                                }} android_ripple={{ color: '#fff' }}>
                                    <Text style={[commonStyle.textPrimary, { fontSize: 16 }]}>Detail</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                /> */}
            </View>
        </View>
    </>)
}

export default UpComingSection