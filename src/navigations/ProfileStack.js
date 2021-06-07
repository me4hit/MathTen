import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile/Profile'
import { Button, Icon } from 'react-native-elements'
import DetailScreen from '../screens/Home/DetailScreen'

const Stack = createStackNavigator();




const ProfileStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }}
             name="Profilescreen" component={Profile} />
        </Stack.Navigator>
    )
}

export default ProfileStack
