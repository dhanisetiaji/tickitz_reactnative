import React from 'react'
import { Image, View } from 'react-native'
import { commonStyle } from '../../../../helpers/commonStyle'

const HeaderComponent = () => {
    return (<>
        <View style={[commonStyle.header]}>
            <Image source={require('../../../../assets/image/logo.png')} style={{
                width: 80, height: 50, resizeMode: 'contain'
            }} />
        </View>
    </>)
}

export default HeaderComponent