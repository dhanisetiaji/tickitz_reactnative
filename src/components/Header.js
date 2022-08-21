import React from 'react'
import { Image, View } from 'react-native'
import { commonStyle } from '../../helpers/commonStyle'

const HeaderComponent = () => {
    return (<>
        <View style={[commonStyle.header]}>
            <Image source={require('../../assets/image/logo.png')} style={{
                width: 80, height: 30, resizeMode: 'contain',
                alignSelf: 'center', elevation: 10, shadowColor: '#000',
            }} />
        </View>
    </>)
}

export default HeaderComponent