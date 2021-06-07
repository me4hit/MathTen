import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import MathView, { MathText } from 'react-native-math-view';
import Image from 'react-native-scalable-image';
import firestore from '@react-native-firebase/firestore';

const AnswerExamScreen = ({ route }) => {
    const [counter, setCounter] = useState(15)
    const [data, setData] = useState([])
    const windowWidth = Dimensions.get('window').width;

    React.useEffect(() => {
        let timeout
        if (counter > 0) {
            timeout = setTimeout(() => setCounter(counter - 1), 1000);

        }

        return () => {
            clearTimeout(timeout);
        }


    }, [counter]);




    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.card}>
                    <View >
                        <TouchableOpacity><View style={styles.cardtitle}><Text style={{ fontWeight: 'bold', color: '#fff' }} >{item.Title}</Text></View></TouchableOpacity>
                    </View>
                    {/* <MathText
                        value={item.DetailQuestion}
                        direction="ltr"
                        CellRendererComponent={<TouchableOpacity />}
                    /> */}
                    {
                        item.Image != "" ?
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    width={windowWidth - 10} // height will be calculated automatically
                                    source={{ uri: item.ImageAnswer }}
                                />
                               
                            </View> :
                            <Text></Text>
                    }

                </View>
            </TouchableWithoutFeedback >

        )
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('Exam')
            .doc(route.params.idExam)
            .collection('Question')
            .orderBy("Title", 'asc')
            .get()
            .then(querySnapshot => {
                let questionList = []
                querySnapshot.forEach(documentSnapshot => {
                    var chapter = {
                        key: documentSnapshot.id,
                        ...documentSnapshot.data()
                    }
                    questionList.push(chapter)
                });
                // console.log(examList)
                setData(questionList)
            });
        return () => subscriber;
    }, []);


    return (
        <View style={styles.container}>
            {
                (counter == 0)
                    ?
                    <FlatList
                        // style={{marginTop: 10}}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.key}
                      
                    />
                    :
                    <View style={styles.fail}>
                        <LottieView style={styles.lottie} source={require("../../assets/notime.json")} autoPlay loop />
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>Bạn chưa thể xem đáp án khi chưa hết thời gian làm bài !!!</Text>
                    </View>
            }
        </View>
    )
}

export default AnswerExamScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,

        borderRadius: 20,
        backgroundColor: 'red'
    },
    fail: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 300,
        // backgroundColor: 'red',

    },
    lottie: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200
    },
    card: {
        flex: 1,

        marginVertical: 5,
        // opacity: isFocused ? 0.7 : 1,
        backgroundColor: '#fff',
        marginHorizontal: 1,
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 10,

        borderColor: '#fff',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    cardtitle: {
        // fontSize: 20,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#545D7A",
        backgroundColor: "#545D7A",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    cardetail: {
        textAlign: 'justify'
    }
})
