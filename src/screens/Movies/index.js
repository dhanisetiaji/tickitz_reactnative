import React, { useEffect, useState } from 'react'
import { Image, SectionList, Text, TextInput, View, FlatList, Pressable, RefreshControl, ActivityIndicator, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { commonStyle } from '../../../helpers/commonStyle'
import HeaderComponent from '../../components/Header'
import { GetMoviesAll } from '../../redux/actions/Movies'
import { Dropdown } from 'react-native-element-dropdown';
import styles from './DropdownStyle';
import FooterComponent from '../../components/Footer'

const urlImage = 'https://test.dhanz.me/static'

const MoviesScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [month, setMonth] = useState([
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]),
        [refetch, setRefetch] = useState(false),
        [value, setValue] = useState(),
        [params, setParams] = useState({
            limit: 4,
            orderBy: 'desc',
            q: '',
            page: 1,
        })

    const { All, loading } = useSelector(state => state.movies)

    useEffect(() => {
        dispatch(GetMoviesAll(params))
    }, [dispatch, refetch, params])

    const handleSearch = (text) => {
        setParams({
            ...params,
            q: text,
        })
        dispatch(GetMoviesAll(params))
    }

    const handleSort = (value) => {
        setParams({
            ...params,
            orderBy: value,
        })
        dispatch(GetMoviesAll(params))
    }

    const renderFooter = () => {
        if (loading) {
            return (<View style={{
                alignItems: 'center',
                flex: 1,
            }}>
                <ActivityIndicator size={'large'} />
            </View>)
        }
        if (All.totalAllData === params.limit) {
            return (<View style={{
                alignItems: 'center',
                flex: 1,
            }}>
                <Text>No More Data</Text>
            </View>)
        }
    }

    const dateNow = 'January'
    return (<>
        <HeaderComponent />
        <SectionList
            // refreshControl={<RefreshControl refreshing={loading}
            //     onRefresh={() => { setRefetch(!refetch) }} />}
            sections={[
                { title: 'Data', data: [0] },
            ]}
            style={{ backgroundColor: '#fff' }}
            renderItem={() => null}
            renderSectionHeader={() => {
                return (<>
                    <SafeAreaView style={{
                        ...commonStyle.container,
                        padding: 15,
                        backgroundColor: '#D6D8E7',
                        paddingBottom: 130
                    }}>
                        <Text style={{
                            ...commonStyle.textBlack,
                            fontSize: 18,
                        }}>List Movie</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Dropdown
                                style={{
                                    ...styles.dropdown,
                                    flex: 1
                                }}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={[
                                    { label: 'Default', value: '' },
                                    { label: 'Title', value: 'asc' },
                                    { label: 'Date', value: 'desc' },
                                ]}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Sort"
                                value={params.orderBy}
                                onChange={item => {
                                    handleSort(item.value);
                                }}
                                renderItem={
                                    item => (
                                        <View style={styles.item}>
                                            <Text style={styles.textItem}>{item.label}</Text>
                                        </View>
                                    )
                                }
                            />
                            <View style={{
                                flex: 3,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                height: 40,
                                marginVertical: 5,
                            }}>
                                <TextInput onChangeText={(text) => handleSearch(text)} placeholder='Search Movie Name' />
                            </View>
                        </View>
                        <FlatList
                            style={{ marginTop: 20, marginBottom: 20 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={month}
                            listKey={(item, index) => `${index}`}
                            renderItem={({ item }) => (<>
                                {item === dateNow ? (
                                    <Pressable style={{
                                        ...commonStyle.button,
                                        borderRadius: 3,
                                        height: 40,
                                        paddingHorizontal: 20,
                                        marginRight: 15,
                                        elevation: 5,
                                        marginBottom: 5,
                                    }} android_ripple={{ color: '#fff' }}>
                                        <Text style={[commonStyle.textWhite, { fontSize: 16 }]}>{item}</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable style={{
                                        ...commonStyle.buttonSecondary,
                                        borderRadius: 3,
                                        height: 40,
                                        paddingHorizontal: 20,
                                        marginRight: 15,
                                    }} android_ripple={{ color: '#fff' }}>
                                        <Text style={[commonStyle.textPrimary, { fontSize: 16 }]}>{item}</Text>
                                    </Pressable>
                                )}
                            </>)}
                        />
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1 }}
                            data={All.results}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    flex: 1,
                                }}>
                                    <Pressable onPress={() => navigation.navigate('Detail Movie', {
                                        id: item.id,
                                        title: item.title,
                                        genre: item.genre,
                                        image: item.image,
                                        synopsis: item.synopsis,
                                        release_date: item.release_date,
                                        cast: item.cast,
                                        directed_by: item.directed_by,
                                        duration: item.duration,
                                    })} android_ripple={{ color: '#dedede' }} style={{
                                        padding: 10,
                                        backgroundColor: '#fff',
                                        borderRadius: 5,
                                        marginVertical: 10,
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
                                            fontWeight: 'bold',
                                        }}>{`${item.title.slice(0, 13)}`}</Text>
                                        <Text style={{
                                            ...commonStyle.textSecondary,
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: 120,
                                            marginBottom: 5,
                                            height: 50
                                        }}>{`${item.genre.slice(0, 30)}`}</Text>
                                    </Pressable>
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                <View style={{
                                    alignItems: 'center',
                                    flex: 1,
                                }}>
                                    <Image
                                        source={require('../../../assets/image/nodata.png')}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            resizeMode: 'contain',
                                            alignSelf: 'center',
                                        }}
                                    />
                                    <Text style={{
                                        ...commonStyle.textBlack,
                                        fontSize: 16,
                                        textAlign: 'center',
                                    }}>Data not found</Text>
                                </View>
                            )}
                            ListFooterComponent={renderFooter}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (!loading && All.totalAllData > params.limit) {
                                    setParams({ ...params, limit: params.limit + 4 })
                                    dispatch(GetMoviesAll(params))
                                }
                            }}
                        />

                    </SafeAreaView>
                </>)
            }}
        />
    </>)
}

export default MoviesScreen