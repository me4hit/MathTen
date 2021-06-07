import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import QuestionExam from './QuestionExam'
import AnswerExam from './AnswerExamScreen'
import { AuthContext } from '../../navigations/AuthProvider'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';


const Tab = createMaterialTopTabNavigator();

const DoExamScreen = ({ route, navigation }) => {
    const { user, userProfile, setUserProfile } = useContext(AuthContext);

    const [isCompleted, setIsCompleted] = useState(false)
    const children = ({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60
        return (
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "#FF7D8B" }}>{`${hours}:${minutes}:${seconds}`}</Text>
        )
    }

    useEffect(async () => {
        let sub
        if (isCompleted == true) {
            sub = await firestore()
                .collection('User')
                .doc(user.uid)
                .update({
                    ExamDone: firestore.FieldValue.arrayUnion(route.params.idExam)
                })
        }
        return () => {
            sub
        }
    }, [isCompleted])

  

    const done =  ({ remainingTime }) => {
        return (
            <Text style={{ fontSize: 17, color: "#FF7D8B", textAlign: "center" }}>Hoàn thành</Text>
        )
    }
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (isCompleted == true) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }
                // // Prevent default behavior of leaving the screen
                // e.preventDefault();

                // Prompt the user before leaving the screen
                e.preventDefault();
                Alert.alert(
                    'Chưa hoàn thành bài thi ?',
                    'Bạn nên hoàn thành bài thi trước khi rời đi để có kết quả thi tốt nhất !',
                    [
                        { text: "Tiếp tục", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Vẫn rời đi',
                            style: 'destructive',
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation, isCompleted]
    );
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", }}>

                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 20 }}>
                    <Icon onPress={() => navigation.goBack()}
                        iconStyle={{ marginLeft: 20 }}
                        name='arrow-back-ios'
                        type='materialicons'
                        color='#517fa4'
                    />
                    <View>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>Quay lại</Text>
                        <Text style={{ paddingLeft: 20, paddingTop: 20, fontSize: 23, color: '#FF7D8B', fontWeight: 'bold' }}>Đề thi thử số 1</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 10, paddingRight: 45 }}>
                    <CountdownCircleTimer
                        onComplete={() => {
                            setIsCompleted(true)
                        }}
                        strokeWidth={4}
                        size={80}
                        isPlaying
                        duration={15}
                        initialRemainingTime={15}
                        colors="#FF7D8B"
                    //7200
                    >
                        {!isCompleted ? children : done}
                    </CountdownCircleTimer>
                </View>
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#FF7D8B',
                    labelStyle: {
                        fontSize: 16,
                        textTransform: 'capitalize',
                        fontWeight: 'bold'
                    },
                    style: {
                        // backgroundColor: route.params.color, shadowColor: "#000",
                    },
                    indicatorStyle: { backgroundColor: '#fff', borderRadius: 1, },
                }}
            >
                <Tab.Screen name="Đề thi" component={QuestionExam} initialParams={{ idExam: route.params.idExam }} />
                {isCompleted ?
                    <Tab.Screen name="Đáp án" component={AnswerExam} initialParams={{ isCompleted: true, idExam: route.params.idExam }} />
                    :
                    <Tab.Screen name="Đáp án" component={AnswerExam} initialParams={{ isCompleted: false, idExam: route.params.idExam }} />
                }
            </Tab.Navigator>
        </View>
    )
}

//initialParams={{ color: route.params.color, idChapter: route.params.idChapter, idLesson: route.params.idLesson }}
export default DoExamScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    content: {
        flex: 1,

        borderRadius: 20,
        backgroundColor: 'red'
    }
})

