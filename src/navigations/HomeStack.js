import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen'
import DetailScreen from '../screens/Home/DetailScreen'
import LearnScreen from '../screens/Home/LearnScreen'
import { Button, Icon } from 'react-native-elements'

const Stack = createStackNavigator();



const HomeStack = () => {
    return (
        <Stack.Navigator  >
            <Stack.Screen options={{
               headerShown: false,// change this to `false`
            }}
                name="HomeScreen" component={HomeScreen} />
        
        </Stack.Navigator>
    )
}

export default HomeStack
