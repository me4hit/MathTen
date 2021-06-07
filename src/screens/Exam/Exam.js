import React, { useState, useEffect, useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, FlatList, Modal } from 'react-native'
import { Button, Overlay, Image, Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigations/AuthProvider'

const Exam = ({ navigation }) => {
    const { user, userProfile, setUserProfile } = useContext(AuthContext);

    const [idExamNav, setIdExamNav] = useState()
    const [visible, setVisible] = useState(false)
    const [examDone, setExamDone] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const starExam = (id) => {
        setIdExamNav(id)
        setVisible(true)
    }
    const [data, setData] = useState([])
    const [reload, setReload] = useState(false)
    const loaddata = async () => {
        var subscriber
        var subscriberExamDone
        subscriberExamDone = await firestore()
            .collection('User')
            .doc(user.uid)
            .get()
            .then(doc => {
                if (doc.data().ExamDone != undefined) {
                    setExamDone(doc.data().ExamDone)

                }
            })

        subscriber = await firestore()
            .collection('Exam')
            .get()
            .then(querySnapshot => {
                let examList = []
                querySnapshot.forEach(documentSnapshot => {
                    var chapter = {
                        key: documentSnapshot.id,
                        ...documentSnapshot.data()
                    }
                    examList.push(chapter)
                });
                setData(examList)
            });
    }
    useEffect(async () => {

        const unsubscribe = navigation.addListener('focus', async () => {

            await loaddata()
        });

        return () => {
            unsubscribe, subscriberExamDone, subscriber
        }
    }, [navigation])



    // useEffect(async () => {
    //     setIsLoading(true)
    //     var subscriber
    //     const subscriberExamDone = await firestore()
    //         .collection('User')
    //         .doc(user.uid)
    //         .get()
    //         .then(doc => {
    //             if (doc.data().ExamDone != undefined) {
    //                 setExamDone(doc.data().ExamDone)

    //             }
    //         })

    //     await firestore()
    //         .collection('Exam')
    //         .get()
    //         .then(querySnapshot => {
    //             let examList = []
    //             querySnapshot.forEach(documentSnapshot => {
    //                 var chapter = {
    //                     key: documentSnapshot.id,
    //                     ...documentSnapshot.data()
    //                 }
    //                 examList.push(chapter)
    //             });
    //             setData(examList)
    //         });
    //     setIsLoading(false)

    //     return () => { subscriberExamDone, subscriber };
    // }, []);


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => starExam(item.key)} style={{
                ...styles.containerExam,
                borderLeftColor: item.Level != "Khó" ? "#26DA86" : "#FF9188"
            }}>
                <Text style={{ flex: 1 }}>
                    {item.Title}
                </Text>
                {
                    examDone.includes(item.key) ?
                        <Icon
                            style={{ marginRight: 10 }}
                            name='checkcircle'
                            type='antdesign'
                            color='#70e000'
                            size={25}
                        />
                        :
                        null
                }
            </TouchableOpacity >
        )
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách đề thi thử</Text>
            <View style={{ justifyContent: "flex-end" }} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{ ...styles.square, backgroundColor: '#26DA86' }}></View>
                    <Text style={{ color: '#26DA86' }}>Cơ bản</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ ...styles.square, backgroundColor: '#FF9188' }}></View>
                    <Text style={{ color: '#FF9188' }}>Khó</Text>
                </View>
            </View>


            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />


            <Overlay overlayStyle={{ backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 15 }} isVisible={visible} onBackdropPress={() => setVisible(false)}>
                <View style={styles.Overlay}>
                    <LottieView style={styles.lottie} source={require("../../assets/exam.json")} autoPlay loop />
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Lưu ý</Text>
                    <Text style={{ opacity: 0.7, textAlign: "center", marginVertical: 15 }}>Bài thi sẽ kéo dài 120 phút, trước khi xác nhận thi thử bạn cần đảm bảo không gian và thời gian để hoàn thành đề thi thử nhé !!!</Text>
                    <Button containerStyle={{ marginBottom: 10 }} buttonStyle={{ paddingHorizontal: 15 }} title="Xác nhận" onPress={() => {
                        setVisible(false)
                        navigation.navigate("DoExamScreen", { idExam: idExamNav })
                    }} />
                </View>
            </Overlay>

        </View>
    )
}

export default Exam

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        color: '#F65E69'
    },
    square: {
        width: 30,
        height: 30,
        borderRadius: 7,
        backgroundColor: 'red',
        margin: 5,
        marginLeft: 10
    },
    containerExam: {
        flexDirection: 'row',
        height: 80,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingVertical: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        borderRightWidth: 1,
        borderTopColor: '#dee2e6',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        borderRightColor: '#dee2e6',

        borderLeftWidth: 5,
        alignItems: 'center',

    },
    Overlay: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        width: 100,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }

})
