import React from 'react'
import { Image, Text, View } from 'react-native'
import { commonStyle } from '../../helpers/commonStyle'

const FooterComponent = () => {
    return (<>
        <View style={{
            marginTop: 15,
            paddingBottom: 100,
            ...commonStyle.container,
        }}>
            <Image source={require('../../assets/image/logo.png')}
                style={{
                    resizeMode: 'contain',
                    width: 100, height: 50,

                }}
            />
            <Text style={{
                ...commonStyle.textSecondary,
                fontSize: 15,
                width: '100%',
                marginBottom: 10,
            }}>Stop waiting in line. Buy tickets conveniently, watch movies quietly.</Text>
            {/* <Text style={{
                ...commonStyle.textBlack,
                fontSize: 18,
                marginTop: 15,
                marginBottom: 10
            }}>
                Explore
            </Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}>
                <Text style={{
                    ...commonStyle.textSecondary,
                    fontSize: 16,
                    marginRight: 20,
                }}>Home</Text>
                <Text style={{
                    ...commonStyle.textSecondary,
                    fontSize: 16,
                }}>List Movie</Text>
            </View>
            <Text style={{
                ...commonStyle.textBlack,
                fontSize: 18,
                marginTop: 15,
                marginBottom: 10
            }}>
                Our Sponsors
            </Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <Image source={(require('../../assets/image/ebv.png'))}
                    style={{
                        width: 100, height: 50,
                        resizeMode: 'contain',
                        marginRight: 20,
                    }}
                />
                <Image source={(require('../../assets/image/CineOne21.png'))}
                    style={{
                        width: 100, height: 50,
                        resizeMode: 'contain',
                        marginRight: 20,
                    }}
                />
                <Image source={(require('../../assets/image/hiflix.png'))}
                    style={{
                        width: 100, height: 40,
                        resizeMode: 'contain',
                        marginRight: 20,
                    }}
                />
            </View>
            <Text style={{
                ...commonStyle.textBlack,
                fontSize: 18,
                marginTop: 15,
                marginBottom: 10
            }}>
                Follow Us
            </Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 20,
            }}>
                <Image source={(require('../../assets/image/icons/fb.png'))}
                    style={{
                        width: 30, height: 30,
                        resizeMode: 'contain',
                        marginRight: 30,
                    }} />
                <Image source={(require('../../assets/image/icons/instagram.png'))}
                    style={{
                        width: 30, height: 30,
                        resizeMode: 'contain',
                        marginRight: 30,
                    }} />
                <Image source={(require('../../assets/image/icons/twitter.png'))}
                    style={{
                        width: 30, height: 30,
                        resizeMode: 'contain',
                        marginRight: 30,
                    }} />
                <Image source={(require('../../assets/image/icons/youtube.png'))}
                    style={{
                        width: 30, height: 30,
                        resizeMode: 'contain',
                        marginRight: 30,
                    }} />
            </View> */}
            <Text style={{
                ...commonStyle.textSecondary,
                fontSize: 15,
            }}>© 2022 Tickitz. All Rights Reserved.</Text>
        </View>
    </>)
}

export default FooterComponent