import React, { createContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TheoryScreen from './TheoryScreen';
import ExerciseScreen from './ExerciseScreen';


const Tab = createMaterialTopTabNavigator();

export const DataContext = createContext();
const LearnScreen = ({ navigation, route }) => {
    const [reload, setReload] = useState(false)

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            StatusBar.setBarStyle('light-content', true)
            StatusBar.setBackgroundColor(route.params.color)
        });

        return () => {
            unsubscribe
        }
    }, [reload])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: '#fff',
                        labelStyle: {
                            fontSize: 16,
                            textTransform: 'capitalize',
                        },
                        style: {
                            backgroundColor: route.params.color, shadowColor: "#000",
                        },
                        indicatorStyle: { backgroundColor: '#fff', borderRadius: 1, }
                    }}
                >
                    <Tab.Screen name="Lý thuyết" component={TheoryScreen} initialParams={{ color: route.params.color, idChapter: route.params.idChapter, idLesson: route.params.idLesson }} />
                    <Tab.Screen name="Bài tập" component={ExerciseScreen} initialParams={{ color: route.params.color, idChapter: route.params.idChapter, idLesson: route.params.idLesson }} />

                </Tab.Navigator>
            </View>
        </View >

    )
}

export default LearnScreen





const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    content: {
        flex: 1,

        borderRadius: 20,
        backgroundColor: 'red'
    }
})
