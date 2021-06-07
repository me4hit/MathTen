// Điều hướng cho user login nếu chưa login

import React, { useEffect, useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../screens/Home/HomeScreen';
import NavigationApp from './NavigationApp';
import DetailScreen from '../screens/Home/DetailScreen';
import LearnScreen from '../screens/Home/LearnScreen';
import PracticeScreen from '../screens/Home/PracticeScreen';
import CommentScreen from '../screens/Home/CommentScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import SplashScreen from '../help/SplashScreen';


import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';

import UpdateProfileScreen from '../screens/Profile/UpdateProfileScreen';
import ScheduleNotificationScreen from '../screens/Profile/ScheduleNotificationScreen';
import CreateScheduleScreen from '../screens/Profile/CreateScheduleScreen';
import LoveListScreen from '../screens/Profile/LoveListScreen';

import DoExamScreen from '../screens/Exam/DoExamScreen';

import PushNotification from "react-native-push-notification";
import ResultGameScreen from '../screens/Rank/ResultGameScreen';
import PlayGameScreen from '../screens/Rank/PlayGameScreen';
import { AuthContext } from '../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import Transition, { verticalAnimation, horizontalAnimation } from '../animation/Transition'

const Stack = createStackNavigator();
const AppStack = () => {
    const { user } = useContext(AuthContext);
    const [visibleSplash, setVisibleSplash] = useState(true);

    useEffect(async () => {
        const UserRef = firestore().collection('User')
        const snapshot = await
            UserRef.doc(user.uid)
                .get().then(async (doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        await UserRef.doc(user.uid).update({
                            Name: user.displayName,
                            UrlAvatar: user.photoURL
                        })
                    } else {
                        console.log("No such document!");
                        await UserRef.doc(user.uid).set({
                            Score: 0
                        })
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });


        return () => {
            cleanup
        }
    }, [])

    useEffect(() => {
        const timeout = setTimeout(function () {
            setVisibleSplash(false)

        }, 650);
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return (
        <SafeAreaProvider >
            {
                !visibleSplash ?
                    <Stack.Navigator
                        screenOptions={{
                            cardOverlayEnabled: true,
                            gestureEnabled: true,
                            ...Transition,
                        }}
                    >
                        {/* <NavigationApp /> */}
                        <Stack.Screen name="Home"

                            options={{
                                headerShown: false,// change this to `false`
                            }}
                            component={NavigationApp} />
                        <Stack.Screen

                            options={({ route }) => ({
                                headerTitleAlign: 'center',
                                headerTitle: route.params.title,
                                headerStyle: { backgroundColor: route.params.color },
                                headerTitleStyle: {
                                    fontSize: 18,
                                    color: '#fff',
                                },
                                headerBackImage: () => (<Icon
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#fff'
                                    size={26}
                                />)

                            })}

                            name="DetailScreen" component={DetailScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                title: route.params.title,
                                headerStyle: {
                                    backgroundColor: route.params.color,
                                    elevation: 0
                                },
                                headerTitleStyle: {
                                    fontSize: 16,
                                    color: '#fff',

                                },
                                headerBackImage: () => (<Icon style={{}}
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#fff'
                                    size={26}
                                />)

                            })}
                            name="LearnScreen" component={LearnScreen} />

                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: true,
                                title: "Hồ sơ của bạn",
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0
                                },
                                headerTitleAlign: 'center',
                                headerTitleStyle: {
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    opacity: 0.5
                                },
                                // headerRight: () => (
                                //     <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10, color: '#0096c7' }}>HOÀN TẤT</Text>
                                // ),
                                headerBackImage: () => (<Icon style={{}}
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#000'
                                    size={26}
                                />)

                            })}
                            name="UpdateProfileScreen" component={UpdateProfileScreen} />

                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: true,
                                title: route.params.title,
                                headerTitleAlign: "center",
                                headerStyle: {
                                    backgroundColor: route.params.color,
                                    elevation: 0
                                },
                                headerTitleStyle: {
                                    fontSize: 17,
                                    color: '#fff',

                                },
                                headerBackImage: () => (<Icon style={{}}
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#fff'
                                    size={26}
                                />)

                            })}
                            name="PracticeScreen" component={PracticeScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: true,
                                title: "Nhắc nhở",
                                // headerTitleAlign: "center",
                                headerStyle: {
                                    backgroundColor: "#fff",
                                    elevation: 0
                                },
                                headerTitleStyle: {
                                    fontSize: 17,
                                    color: '#000',

                                },
                                headerBackImage: () => (<Icon style={{}}
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#000'
                                    size={26}
                                />)

                            })}
                            name="ScheduleNotificationScreen" component={ScheduleNotificationScreen} />
                        <Stack.Screen
                            name="CreateScheduleScreen" component={CreateScheduleScreen} />
                        <Stack.Screen
                            name="LoveListScreen"
                            options={({ route }) => ({
                                headerShown: true,
                                title: "Danh sách yêu thích",
                                headerTitleAlign: "center",
                                headerStyle: {
                                    backgroundColor: "#ff4d6d",
                                    elevation: 0
                                },
                                headerTitleStyle: {
                                    fontSize: 17,
                                    color: '#fff',

                                },
                                headerBackImage: () => (<Icon style={{}}
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#fff'
                                    size={26}
                                />)

                            })}
                            component={LoveListScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: false,
                                title: "Quay lại",
                                headerTitleAlign: "left",
                                headerStyle: {
                                    backgroundColor: route.params.color,
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
                            name="DoExamScreen" component={DoExamScreen} />

                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: false,
                                // title: "Quay lại",
                                // headerTitleAlign: "left",
                                // headerStyle: {
                                //     backgroundColor: route.params.color,
                                //     elevation: 0
                                // },
                                // headerTitleStyle: {
                                //     fontSize: 16,
                                //     color: '#000',

                                // },
                                // headerBackImage: () => (<Icon style={{}}
                                //     name='arrow-back-ios'
                                //     type='materialicons'
                                //     color='#000'
                                //     size={26}
                                // />)

                            })}
                            name="PlayGameScreen" component={PlayGameScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: false,


                            })}
                            name="ResultGameScreen" component={ResultGameScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: true,
                                title: "Quay lại",
                                headerTitleAlign: "left",
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
                            name="CommentScreen" component={CommentScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: false,
                            })}
                            name="SearchScreen" component={SearchScreen} />
                        <Stack.Screen
                            options={({ route }) => ({
                                headerShown: true,
                                title: "Mật khẩu",
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0
                                },
                                headerTitleAlign: 'center',
                                headerTitleStyle: {
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    opacity: 0.5
                                },
                                // headerRight: () => (
                                //     <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10, color: '#0096c7' }}>HOÀN TẤT</Text>
                                // ),
                                headerBackImage: () => (<Icon style={{}}
                                    name='arrow-back-ios'
                                    type='materialicons'
                                    color='#000'
                                    size={26}
                                />)

                            })}
                            name="ChangePasswordScreen" component={ChangePasswordScreen} />
                    </Stack.Navigator>
                    :
                    <SplashScreen />

            }




        </SafeAreaProvider >

    )
}

export default AppStack

