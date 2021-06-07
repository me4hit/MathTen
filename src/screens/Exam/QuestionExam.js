import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native'
import MathView, { MathText } from 'react-native-math-view';
import Image from 'react-native-scalable-image';
import firestore from '@react-native-firebase/firestore';

const QuestionExam = ({ route }) => {
    console.log('route.params.idExam111' + route.params.idExam)
    const windowWidth = Dimensions.get('window').width;

    const [data, setData] = useState([])


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


    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', }} >
                        <TouchableOpacity><View style={{ ...styles.cardtitle, marginRight: 5 }}><Text style={{ fontWeight: 'bold', color: '#fff' }} >{item.Title}</Text></View></TouchableOpacity>
                        <TouchableOpacity><View style={styles.cardtitle}><Text style={{ fontWeight: 'bold', color: '#fff' }} >{item.Mark}đ</Text></View></TouchableOpacity>

                    </View>
                    {/* <MathText
                        value={item.DetailQuestion}
                        direction="ltr"
                        CellRendererComponent={<TouchableOpacity />}
                    /> */}
                    {
                        item.ImageQuestion != "" ?
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    width={windowWidth - 20} // height will be calculated automatically
                                    source={{ uri: item.ImageQuestion }}
                                />
                            </View> :
                            <Text></Text>
                    }

                </View>
            </TouchableWithoutFeedback >

        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                // style={{marginTop: 10}}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            // ListEmptyComponent={() => {
            //     return <Loadingdata />
            // }}
            />
        </View>
    )
}

export default QuestionExam
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,

        borderRadius: 20,
        backgroundColor: 'red'
    },
    exam: {
        marginHorizontal: 20,
        borderRadius: 15,
        // borderWidth: 1,
        backgroundColor: '#fff',
        borderStyle: 'solid',
        padding: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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
        textAlign: 'justify',
    }
})
