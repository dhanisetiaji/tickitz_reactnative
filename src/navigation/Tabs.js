import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home'
import Login from '../screens/auth/Login'
import MoviesScreen from '../screens/Movies';
import ProfileScreen from '../screens/profile';
import { useSelector } from 'react-redux';
import NotificationScreen from '../screens/Notification';



const Tab = createBottomTabNavigator();



const Tabs = () => {
    const { isLogin, GetDetail } = useSelector(state => state.auth)
    // console.log(isLogin, 'isloginbang')
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
                                width: 25,
                                height: 25,
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
            <Tab.Screen name="Notification" component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused }) => (<>
                        <Image source={require('../../assets/image/icons/notif.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#5F2EEA' : '#4E4B66',
                            }} />
                    </>)
                }}
            />
            <Tab.Screen name="Profile" component={isLogin ? ProfileScreen : Login}
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