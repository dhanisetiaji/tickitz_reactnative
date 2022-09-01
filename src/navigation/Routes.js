import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import DetailScreen from '../screens/Detail';
import EditProfileScreen from '../screens/profile/EditProfile';
import ChangePasswordScreen from '../screens/profile/ChangePassword';
import OrderHistoryScreen from '../screens/profile/OrderHistory';
import ShowImageScreen from '../screens/profile/ShowImage';
import { Pressable, Text } from 'react-native';
import OrderScreen from '../screens/Orders/OrderScreen';
import PaymentScreen from '../screens/Orders/PaymentScreen';
import SuccessScreen from '../screens/Orders/SuccessScreen';

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: ['https://dhanz.me', 'tickitz://home'],
}

const Routes = () => {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_bottom',
                headerShadowVisible: true,
                headerStyle: { backgroundColor: '#fff' },
                headerTitleStyle: { color: '#5F2EEA' },
                headerTintColor: '#5F2EEA',
                headerTitleAlign: 'center',
            }}>
                <Stack.Screen name="Home"
                    component={Tabs}
                />
                <Stack.Screen name="Register" component={Register} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                    headerTitle: 'Sign Up',
                }} />
                <Stack.Screen name="Login" component={Login} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                    headerTitle: 'Sign In',
                }} />
                <Stack.Screen name="Detail Movie" component={DetailScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                }} />
                <Stack.Screen name="Edit Profile" component={EditProfileScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                }} />
                <Stack.Screen name="Change Password" component={ChangePasswordScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                }} />
                <Stack.Screen name="Order History" component={OrderHistoryScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                }} />
                <Stack.Screen name="Profile Picture" component={ShowImageScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                }} />
                <Stack.Screen name="Orders" component={OrderScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                }} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{
                    animation: 'slide_from_right',
                    headerShown: true,
                    headerShadowVisible: false,
                }} />
                <Stack.Screen name="success" component={SuccessScreen} options={{
                    animation: 'slide_from_right',
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes