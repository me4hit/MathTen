import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { red900 } from 'react-native-paper/lib/typescript/styles/colors';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import MathView, { MathText } from 'react-native-math-view';
import { Button } from 'react-native';
import Loadingdata from '../../animation/Loadingdata';
import BackgroundTimer from 'react-native-background-timer';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigations/AuthProvider';

const PlayGameScreen = ({ navigation }) => {
    const [winCount, setWinCount] = useState(0)
    const [lostCount, setLostCount] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const { user } = useContext(AuthContext);

    const [data, setData] = useState([])
    const [serialQ, setSerialQ] = useState(0)

    const [loadData, setLoadData] = useState(false)

    const [stateA, setStateA] = useState(0)
    const [stateB, setStateB] = useState(0)
    const [stateC, setStateC] = useState(0)
    const [stateD, setStateD] = useState(0)
    const [counter, setCounter] = useState(16)

    const [isPlaying, setIsPlaying] = useState(true)

    const [timer, setTimer] = useState(0)



    const navigationToResult = () => {
        navigation.navigate("ResultGameScreen", { complete: 100, numberQuestions: serialQ + 1, trueAnswer: winCount, falseAnswer: lostCount, scores: winCount * 10 })
    }

    const uploadScore = async (scores) => {
        console.log(scores)
        const data = await firestore()
            .collection('User')
            .doc(user.uid)
            .get()
        var scoresnow
        console.log(data.data().Score)
        if (data.data().Score == undefined) {
            scoresnow = 0
        } else {
            scoresnow = data.data().Score
        }
        console.log(data.data())
        const upload = await firestore()
            .collection('User')
            .doc(user.uid)
            .update({
                "Score": scoresnow + scores
            })
    }

    const [pause, setPaused] = useState(false)

    const trueFalse = StyleSheet.create({
        stateA: {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: stateA == 1 ? '#26DA86' : stateA == 2 ? '#E61610' : '#fff'
        },
        stateB: {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: stateB == 1 ? '#26DA86' : stateB == 2 ? '#E61610' : '#fff'
        },
        stateC: {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: stateC == 1 ? '#26DA86' : stateC == 2 ? '#E61610' : '#fff'
        },
        stateD: {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: stateD == 1 ? '#26DA86' : stateD == 2 ? '#E61610' : '#fff'
        }

    })

    const setTrueAnnswer = () => {
        switch (data[serialQ].AnswerTrue) {
            case 'A': setStateA(1); break;
            case 'B': setStateB(1); break;
            case 'C': setStateC(1); break;
            case 'D': setStateD(1); break;

        }
    }


    const resetAnswer = () => {
        setStateA(0)
        setStateB(0)
        setStateC(0)
        setStateD(0)
    }

    const chooseAnswer = (answer) => {

        if (pause === false) {
            setTrueAnnswer()
            setTimer(0)

            if (answer === data[serialQ].AnswerTrue) {
                console.log("Chọn đúng rồi")
                setWinCount(winCount + 1)

            } else {
                console.log("chọn sai rồi", answer)
                setLostCount(lostCount + 1)
                switch (answer) {
                    case 'A': setStateA(2); break;
                    case 'B': setStateB(2); break;
                    case 'C': setStateC(2); break;
                    case 'D': setStateD(2); break;

                }
            }
            // setCounter(0)
            setIsPlaying(false)
            setPaused(true)

        }

    }

    const next = () => {
        if (serialQ == 9) {
            const x = winCount * 10
            uploadScore(x)
            navigationToResult()
            return
        }
        setSerialQ(serialQ + 1)
        setIsPlaying(true)
        setCounter(15)
        setPaused(false)
        setTimer(15)
        resetAnswer()
    }

    useEffect(async () => {
        let tempData = []
        const forLoop = async _ => {
            console.log('Start')
            for (let index = 0; index < 10; index++) {
                let x = Math.floor(Math.random() * 100) + 1
                console.log(x)
                const data = await firestore()
                    .collection('Game')
                    // .orderBy("CreatedAt")
                    .where("Random", "==", x)
                    .get()
                console.log(data.docs[0].data())
                tempData.push(data.docs[0].data())

            }
            console.log('End')
        }

        await forLoop()

        setData(tempData)
        setLoadData(true)
        // const timeoutId = BackgroundTimer.setTimeout(() => {
        //     var temp = fakedata
        //     setData(temp)
        //     setLoadData(true)

        //     console.log('tac');
        // }, 500);

        // Cancel the timeout if necessary

        return () => { forLoop }
    }, [])




    const children = ({ remainingTime }) => {
        // const hours = Math.floor(remainingTime / 3600)
        // const minutes = Math.floor((remainingTime % 3600) / 60)
        //{`${hours}:${minutes}:
        const seconds = remainingTime % 60
        // if (seconds == 0){
        //     setTrueAnnswer()
        //     setKothenhan()
        // }
        return (<>
            {
                pause == false ?
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "#FF7D8B" }}>{`${seconds}`}</Text>
                    :
                    <TouchableOpacity onPress={() => next()}>
                        <Text style={{ fontSize: 17 }}>Qua câu</Text>
                    </TouchableOpacity>
            }
        </>
        )
    }



    const Count = (props) => {
        useEffect(() => {
            setTimer(data[serialQ].Time)
            return () => {
                cleanup
            }
        }, [])
        return (
            <CountdownCircleTimer
                rotation="counterclockwise"
                onComplete={() => {
                    if (timer != 0) {
                        console.log("hết giờ")
                        setTrueAnnswer()
                        setLostCount(lostCount + 1)
                        setPaused(true)
                        setTimer(0)
                        setIsPlaying(false)
                    }

                }}
                strokeWidth={4}
                size={85}
                isPlaying={props.isPlaying}
                duration={props.timer}
                initialRemainingTime={props.timer}
                colors="#FF7D8B"
            >
                {children}
            </CountdownCircleTimer>
        )
    }
    return (
        <View style={styles.container}>
            {
                loadData == true
                    ?
                    <>
                        <LinearGradient colors={['#FF6C65', '#E7A7FF']} style={styles.linearGradient}>

                        </LinearGradient>
                        <View style={{
                            height: 300,
                            position: 'absolute',
                            // alignSelf: 'center',
                            top: '-20%',
                            // width: 100, height: 100,
                            backgroundColor: 'red',
                            marginHorizontal: 30,
                            borderRadius: 40,
                        }}>
                        </View>
                        <View style={{
                            // height: 'auto',
                            ...styles.boxShadow,
                            maxHeight: 500,
                            minHeight: 300,
                            // position: 'relative',
                            // alignSelf: 'center',
                            // top: '-40%',
                            // width: 100, height: 100,
                            backgroundColor: '#fff',
                            marginHorizontal: 20,
                            borderRadius: 40,
                            marginTop: Dimensions.get('window').height / 14,
                            paddingHorizontal: 10,
                            // justifyContent: 'center',
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'relative', }}>
                                <View style={{ ...styles.boxShadow, width: 40, height: 30, borderRadius: 30, backgroundColor: '#26DA86', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{winCount}</Text></View>
                                <View style={{ ...styles.boxShadow, width: 85, height: 85, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', top: '-10%' }}>
                                    <Count timer={timer} isPlaying={isPlaying} ></Count>
                                </View>

                                <View style={{ ...styles.boxShadow, width: 40, height: 30, borderRadius: 30, backgroundColor: '#E61610', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{lostCount}</Text></View>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Text>Câu hỏi {serialQ + 1}/10</Text>
                                <View>
                                    <MathText
                                        value={data[serialQ].Question}
                                        direction="ltr"
                                        CellRendererComponent={<TouchableOpacity />}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 20, }}>
                            <TouchableOpacity onPress={() => chooseAnswer('A')} style={{ ...styles.answer, ...trueFalse.stateA }}>
                                <View><Text>A</Text></View>
                                <Text>{data[serialQ].AnswerA}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => chooseAnswer('B')} style={{ ...styles.answer, ...trueFalse.stateB }}>
                                <View><Text>B</Text></View>
                                <Text>{data[serialQ].AnswerB}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => chooseAnswer('C')} style={{ ...styles.answer, ...trueFalse.stateC }}>
                                <View><Text>C</Text></View>
                                <Text>{data[serialQ].AnswerC}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => chooseAnswer('D')} style={{ ...styles.answer, ...trueFalse.stateD }}>
                                <View><Text>D</Text></View>
                                <Text>{data[serialQ].AnswerD}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <Loadingdata />
                // <View>false</View>
            }
        </View >
    )
}

export default PlayGameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    linearGradient: {
        width: '100%',
        height: Dimensions.get('window').height / 4,
        top: 0,
        left: 0,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        position: 'absolute'
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    answer: {

        flexDirection: 'row', backgroundColor: '#fff', flex: 1,
        marginVertical: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 20,
        maxHeight: 60,
        paddingLeft: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }

})
