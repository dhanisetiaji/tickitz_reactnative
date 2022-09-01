import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home'
import Login from '../screens/auth/Login'
import MoviesScreen from '../screens/Movies';
import ProfileScreen from '../screens/profile';
import { useSelector, useDispatch } from 'react-redux';
import NotificationScreen from '../screens/Notification';
import AuthScreen from '../screens/auth';
import { GetNotification, GetNotifStatus } from '../redux/actions/Users';
import NologinScreen from '../screens/Notification/Nologin';



const Tab = createBottomTabNavigator();



const Tabs = () => {
    const dispatch = useDispatch()
    const { isLogin, GetAuth } = useSelector(state => state.auth)
    const { NotifStatus } = useSelector(state => state.users)
    useEffect(() => {
        if (isLogin) {
            dispatch(GetNotifStatus(GetAuth.data.token))
        }
    }, [dispatch, NotifStatus, isLogin])

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    height: 70,
                    ...styles.shadow
                },
            }}
        >
            <Tab.Screen name="Homepage" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (<>

                        <Image source={require('../../assets/image/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 28,
                                height: 28,
                                tintColor: focused ? '#5F2EEA' : '#4E4B66',
                            }} />
                    </>)
                }}
            />
            <Tab.Screen name="Search" component={MoviesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (<>
                        <Image source={require('../../assets/image/icons/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#5F2EEA' : '#4E4B66',
                            }} />
                    </>),
                }}
            />
            <Tab.Screen name="Notification" component={isLogin ? NotificationScreen : NologinScreen}
                options={{

                    tabBarIcon: ({ focused }) => (<>
                        <Image source={require('../../assets/image/icons/notif.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#5F2EEA' : '#4E4B66',
                            }} />
                        {isLogin ? (
                            <View style={{
                                position: 'absolute',
                                top: 15,
                                right: 20,
                                backgroundColor: NotifStatus >= 1 ? 'red' : 'transparent',
                                width: 15,
                                height: 15,
                                borderRadius: 5,
                                justifyContent: 'center',
                            }} ><Text style={{
                                color: NotifStatus >= 1 ? '#fff' : 'transparent',
                                fontSize: 10,
                                textAlign: 'center',
                            }}
                            >{NotifStatus}</Text></View>
                        ) : ''}
                    </>)
                }}
            />
            {isLogin ? (
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (<>
                            <Image source={require('../../assets/image/icons/profile.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#5F2EEA' : '#4E4B66'
                                }} />
                        </>)
                    }}
                />
            ) : (
                <Tab.Screen name="Auth" component={AuthScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (<>
                            <Image source={require('../../assets/image/icons/profile.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#5F2EEA' : '#4E4B66'
                                }} />
                        </>)
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default Tabs;