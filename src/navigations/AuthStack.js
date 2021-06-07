// Điều hướng cho user login nếu chưa login

import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from '../screens/Start/StartScreen'
import LoginScreen from '../screens/Login/LoginScreen'
import ForgotPasswordScreen from '../screens/Login/ForgotPasswordScreen'
import SucessScreen from '../screens/Login/SucessScreen'

import RegisterScreen from '../screens/Register/RegisterScreen'

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Icon } from 'react-native-elements'

const Stack = createStackNavigator();
const AuthStack = () => {
    return (
        <SafeAreaProvider >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen
                    options={({ route }) => ({
                        headerShown: true,
                        title: "Quay lại",
                        headerStyle: {
                            backgroundColor: '#fff',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontSize: 16,
                            color: '#000',

                        },
                        headerBackImage: () => (<Icon style={{}}
                            name='arrow-back-ios'
                            type='materialicons'
                            color='#000'
                            size={26}
                        />)

                    })}
                    name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen
                    options={({ route }) => ({
                        headerShown: false,
                        title: "Quay lại",
                        headerStyle: {
                            backgroundColor: '#fff',
                            elevation: 0
                        },
                        headerTitleStyle: {
                            fontSize: 16,
                            color: '#000',

                        },
                        headerBackImage: () => (<Icon style={{}}
                            name='arrow-back-ios'
                            type='materialicons'
                            color='#000'
                            size={26}
                        />)

                    })}
                    name="SucessScreen" component={SucessScreen} />
            </Stack.Navigator>
        </SafeAreaProvider >

    )
}

export default AuthStack

