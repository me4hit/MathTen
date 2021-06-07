import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import ExamStack from './ExamStack';
import ProfileStack from './ProfileStack';
import GameScreen from '../screens/Rank/GameScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import HomeStack from './HomeStack';

const Tab = createMaterialBottomTabNavigator();


const NavigationApp = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f65e69"
            inactiveColor="#000"
            barStyle={{ backgroundColor: '#ffff' }} >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ focused }) =>
                        <Icon
                            name='home'
                            type='AntDesign'
                            color={focused ? '#f65e69' : '#999999'}
                        />

                }}
            >

            </Tab.Screen>
            <Tab.Screen
                name='Exam'
                component={ExamStack}
                options={{
                    title: 'Thi thử',
                    tabBarIcon: ({ focused }) =>
                        <Icon
                            name='book'
                            type='entypo'
                            color={focused ? '#f65e69' : '#999999'}
                        />
                }}
            >


            </Tab.Screen>

            <Tab.Screen
                name='Game'
                component={GameScreen}
                options={{
                    title: 'Game',
                    tabBarIcon: ({ focused }) =>
                        <Icon
                            name='award'
                            type='feather'
                            color={focused ? '#f65e69' : '#999999'}
                        />
                }}
            ></Tab.Screen>
            <Tab.Screen
                name='Profile'
                component={ProfileStack}
                options={{
                    title: 'Cài đặt',
                    tabBarIcon: ({ focused }) =>
                        <Icon
                            name='user'
                            type='feather'
                            color={focused ? '#f65e69' : '#999999'}
                        />
                }}
            ></Tab.Screen>
        </Tab.Navigator>

    )
}

export default NavigationApp
