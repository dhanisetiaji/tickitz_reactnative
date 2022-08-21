import React from 'react'
import { Image, Text, View, FlatList, Pressable } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'
import { useSelector } from 'react-redux'
import Carousel from 'react-native-snap-carousel';

const NowShowingSection = ({ navigation }) => {

    const { Movies } = useSelector(state => state.movies)

    const urlImage = 'https://test.dhanz.me/static'


    return (<>
        <View style={{ backgroundColor: '#D6D8E7', paddingVertical: 35 }}>
            <View style={[commonStyle.container]}>
                <View style={[commonStyle.flexRow, commonStyle.flexBetween]}>
                    <Text style={{
                        color: '#5F2EEA',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Now Showing</Text>
                    <Text
                        style={{
                            color: '#5F2EEA',
                            fontSize: 14,
                        }}
                    >View All</Text>
                </View>
                <Carousel
                    layout='default'
                    inactiveSlideOpacity={0.5}
                    data={Movies.results}
                    renderItem={({ item }) => (<>
                        <Pressable android_ripple={{ color: '#fff' }} onPress={() => navigation.navigate('Detail Movie', {
                            id: item.id,
                            title: item.title,
                            genre: item.genre,
                            image: item.image,
                            synopsis: item.synopsis,
                            release_date: item.release_date,
                            cast: item.cast,
                            directed_by: item.directed_by,
                            duration: item.duration,
                        })}>
                            <View style={{
                                borderColor: '#fff',
                                marginTop: 20,
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
                                }}>{item.title}</Text>
                                <Text style={{
                                    ...commonStyle.textSecondary,
                                    fontSize: 16,
                                    textAlign: 'center',
                                    alignSelf: 'center',
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
                        { !item && ToastAndroid.show('Server Down, try again later!', ToastAndroid.SHORT) }
                        return (
                            <Pressable onPress={() => navigation.navigate('Detail Movie', {
                                id: item.id,
                            })}>
                                <View style={{
                                    borderColor: '#fff',
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
                                </View>
                            </Pressable>
                        )
                    }}
                /> */}
            </View>
        </View>
    </>)
}

export default NowShowingSection