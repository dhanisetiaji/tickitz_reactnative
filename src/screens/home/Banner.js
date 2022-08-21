import React from 'react'
import { Image, Text, View } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'

const BannerSection = () => {
    return (
        <View style={[commonStyle.container, { marginTop: 30 }]}>
            <Text style={{ ...commonStyle.textSecondary, fontSize: 16 }}>Nearest Cinema, Newest Movie,</Text>
            <Text style={{
                color: '#5F2EEA',
                fontSize: 50,
                fontWeight: 'bold',
            }}>Find out now!</Text>
            <Image source={require('../../../assets/image/banners.png')}
                resizeMode='contain'
                style={{
                    width: '100%',
                    height: 450,
                    alignSelf: 'center',
                }}
            />
        </View>
    )
}

export default BannerSection