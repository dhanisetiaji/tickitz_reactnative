import React from 'react'
import { ScrollView, Text } from 'react-native'
import HeaderComponent from '../../components/Header'

const NologinScreen = () => {
    return (<>
        <HeaderComponent />
        <ScrollView style={{ backgroundColor: '#D6D8E7' }}>
            <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 10 }}>Please Login!</Text>
        </ScrollView>
    </>)
}

export default NologinScreen