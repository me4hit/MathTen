import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';

import GameStartScreen from './GameStartScreen'
import RankScreen from './RankScreen'

const Tab = createMaterialTopTabNavigator();


// for (let index = 1; index < 100; index++) {
//     firestore()
//         .collection('Game')
//         .add({
//             Question: index + ` This text includes math notations and should be wrapped correctly for \\( \\alpha \\) and $\\beta$ within the view. \nThe following formula shouldn't be inline:$$x_{1,2} = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$However the following formula should be inline with the text: \\( a^2 + b^2 = c^2 \\) `,
//             AnswerA: 20,
//             AnswerB: 20,
//             AnswerC: 20,
//             AnswerD: 20,
//             AnswerTrue: 'A',
//             Time: 10,
//             CreatedAt: firestore.FieldValue.serverTimestamp(),
//             Random: index,
//         })


// }


const GameScreen = () => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#000',
                    labelStyle: {
                        fontSize: 16,
                        textTransform: 'capitalize',
                    },
                    style: {
                        backgroundColor: '#fff', shadowColor: "#000", elevation: 0,

                    },
                    indicatorStyle: { backgroundColor: '#000', borderRadius: 1, opacity: 0.2 }
                }}
            >
                <Tab.Screen name="🎮 Game on" component={GameStartScreen} />
                <Tab.Screen name="🎖️ Bảng xếp hạng" component={RankScreen} />
            </Tab.Navigator>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
