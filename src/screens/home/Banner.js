import React from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'
import Carousel from 'react-native-snap-carousel';


const BannerSection = () => {
    const image = [
        'https://cdn.cgv.id/uploads/promotions/2208/PR202208181501493411.jpg',
        'https://cdn.cgv.id/uploads/promotions/2208/PR202208191649464661.jpg',
        'https://cdn.cgv.id/uploads/promotions/2208/PR202208091246185217.jpg'
    ]

    return (<>
        <SafeAreaView style={{
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            zIndex: 1,
            top: 50,
        }}>
            <Carousel
                layout='tinder'
                layoutCardOffset={0}
                autoplay={true}
                loop={true}
                autoplayDelay={3000}
                activeAnimationType={'decay'}
                data={image}
                renderItem={({ item }) => (<>
                    <Image source={{ uri: item }} style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                    }} />
                </>)}
                sliderWidth={300}
                itemWidth={300}
            />
        </SafeAreaView>

    </>)
}

export default BannerSection