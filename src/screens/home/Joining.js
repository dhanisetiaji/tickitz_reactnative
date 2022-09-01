import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { commonStyle } from '../../../helpers/commonStyle'

const JoiningSection = () => {
    return (<>
        <View style={{
            ...commonStyle.container,
            backgroundColor: '#fff',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#dedede',
            shadowOffset: { width: 0, height: 2 },
            marginBottom: 80,
            padding: 20
        }}>
            <Text style={{
                ...commonStyle.textSecondary,
                fontSize: 14,
            }}>Be the vanguard of the</Text>
            <Text style={{
                ...commonStyle.textPrimary,
                fontSize: 40,
                fontWeight: 'bold',
                marginBottom: 20,
            }}>Moviegoers</Text>
            <View style={{
                ...commonStyle.inputArea,
                width: '100%',
                marginBottom: 20,
            }}>
                <TextInput placeholder='Type your email' autoCapitalize='none' keyboardType='email-address' />
            </View>
            <Pressable style={{
                ...commonStyle.button,
                borderRadius: 3,
                width: '100%',
                marginBottom: 20,
            }} android_ripple={{ color: '#fff' }}>
                <Text style={[commonStyle.textWhite, { fontSize: 16 }]}>Join Now</Text>
            </Pressable>
            <Text style={{
                ...commonStyle.textSecondary,
                fontSize: 14,
                width: '100%',
                textAlign: 'center',
                marginBottom: 20,
            }}>By joining you as a Tickitz member,
                we will always send you the
                latest updates via email .</Text>
        </View>
    </>)
}

export default JoiningSection