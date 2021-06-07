import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Exam from '../screens/Exam/Exam'
const Stack = createStackNavigator();




const ExamStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{
                headerShown: false,// change this to `false`
            }} name="ExamScreen" component={Exam} />
        </Stack.Navigator>
    )
}

export default ExamStack
