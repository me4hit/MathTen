import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, FlatList, ToastAndroid, Dimensions } from 'react-native'
import MathView, { MathText } from 'react-native-math-view';
import { DataContext } from '../../screens/Home/LearnScreen'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigations/AuthProvider';

import { Button, Icon } from 'react-native-elements';
import Loadingdata from '../../animation/Loadingdata';
import Image from 'react-native-scalable-image';

const TheoryScreen = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 10,
        },
        card: {
            flex: 1,
            marginBottom: 15,
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

            elevation: 1,
        },
        cardtitle: {
            // fontSize: 20,
            alignSelf: 'flex-start',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: route.params.color,
            backgroundColor: route.params.color,
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

            elevation: 1,
        },
        cardetail: {
            textAlign: 'justify'
        },
        btnContainer: {
            backgroundColor: '#ffff',
            textTransform: 'lowercase', // Notice this updates the default style
            borderRadius: 25,
            marginTop: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,

            position: 'absolute',

        }
    })
    const { user } = useContext(AuthContext);
    console.log(route.params.idLesson)
    const [data, setData] = useState([])
    const [love, setLove] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLoved = async () => {
        console.log("thử xoá")

        if (love == true) {
            const snapshot = await firestore()
                .collection('User')
                .doc(user.uid)
                .collection("LoveList")
                .where("Lesson", '==', route.params.idLesson)
                .limit(1)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(async documentSnapshot => {
                        console.log(documentSnapshot.id)
                        const snapshot = await firestore()
                            .collection('User')
                            .doc(user.uid)
                            .collection("LoveList")
                            .doc(documentSnapshot.id)
                            .delete()
                    });
                })

            setLove(false)
            ToastAndroid.showWithGravity(
                "Đã loại ra khỏi danh sách yêu thích",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            const snapshot = await firestore()
                .collection('User')
                .doc(user.uid)
                .collection("LoveList")
                .add({
                    Chapter: route.params.idChapter,
                    Lesson: route.params.idLesson
                })

            setLove(true)
            ToastAndroid.showWithGravity(
                "Đã thêm vào danh sách yêu thích",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }

    const handComment = () => {
        navigation.navigate("CommentScreen", {
            // color: route.params.color,
            idChapter: route.params.idChapter,
            idLesson: route.params.idLesson
        })
    }

    useEffect(async () => {
        setLoading(true)
        const subscriber = firestore()
            .collection('Chapter')
            .doc(route.params.idChapter)
            .collection("Lesson")
            .doc(route.params.idLesson)
            .collection("Theory").orderBy("index")
            .get()
            .then(querySnapshot => {
                let tempdata = []
                querySnapshot.forEach(documentSnapshot => {
                    var chapter = {
                        key: documentSnapshot.id,
                        Title: documentSnapshot.data().Title,
                        Detail: documentSnapshot.data().Detail,
                        Image: documentSnapshot.data().Image,
                        Content: documentSnapshot.data().Content,

                    }
                    tempdata.push(chapter)
                });
                setLoading(false)

                setData(tempdata)

            });
        const snapshot = await firestore()
            .collection('User')
            .doc(user.uid)
            .collection('LoveList')
            .get()
            .then(async (querySnapshot) => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().Lesson == route.params.idLesson) {
                        setLove(true)
                    }
                });
            });
        return () => subscriber, snapshot;
    }, []);

    const renderItemTheory = ({ item }) => {
        if (typeof item != "string") {
            console.log("saiiiiiii")
            return null
        }
        console.log('tem.Slice(1)' + item.slice(0))
        if (item.slice(0, 1) == 0) {
            return <Text style={{ marginTop: 5, lineHeight:19, textAlign:'justify' }}>{item.slice(2)}</Text>
        }
        if (item.slice(0, 1) == 1) {
            return <Image
                style={{ marginTop: 5 }}
                width={windowWidth - 20} // height will be calculated automatically
                source={{ uri: item.slice(2) }}
            />
        }
        // return (
        //     <Text>{item}</Text>
        // )
    }


    const renderItem = ({ item }) => {

        return (
            <TouchableWithoutFeedback>
                <View style={styles.card}>
                    <View >
                        <TouchableOpacity><View style={styles.cardtitle}><Text style={{ fontWeight: 'bold', color: '#fff' }} >{item.Title}</Text></View></TouchableOpacity>
                    </View>
                    {/* {console.log(item.Detail)}
                    {
                        item.Detail !== "" && item.Detail != undefined ?
                            <MathText
                                // value={`This text includes math notations and should be wrapped correctly for \\\\( \\\\alpha \\\\) and $\\\\beta$ within the view. \nThe following formula shouldn't be inline:$$x_{1,2} = {-b \\\\pm \\\\sqrt{b^2-4ac} \\\\over 2a}$$However the following formula should be inline with the text: \\\\( a^2 + b^2 = c^2 \\\\)`}
                                value={item.Detail}
                                direction="ltr"

                            /> :
                            null
                    }
                    {
                        item.Image != "" && item.Image != undefined ?
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    width={windowWidth - 20} // height will be calculated automatically
                                    source={{ uri: item.Image }}
                                />
                            </View> :
                            <Text></Text>
                    } */}
                    <FlatList
                        data={item.Content}
                        renderItem={renderItemTheory}
                        keyExtractor={item => item}
                    />

                </View>
            </TouchableWithoutFeedback >

        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                ListHeaderComponent={() =>
                    (loading == true ? <Loadingdata /> : null)
                }
            />
            { !loading ?
                <>
                    <Button
                        onPress={() => handComment()}
                        buttonStyle={{ backgroundColor: '#fff', width: 50, height: 50, borderRadius: 25, }}
                        containerStyle={{
                            ...styles.btnContainer, bottom: 40,
                            right: 80,
                        }}
                        icon={
                            <Icon
                                name={'comment'}
                                type='MaterialCommunityIcons'
                                color="#00aced"
                            />
                        }
                    />
                    <Button
                        onPress={() => handleLoved()}
                        buttonStyle={{ backgroundColor: '#fff', width: 50, height: 50, borderRadius: 25, }}
                        containerStyle={{
                            bottom: 40,
                            right: 20, ...styles.btnContainer
                        }}
                        icon={
                            <Icon
                                name={love ? 'favorite' : 'favorite-outline'}
                                type='materialicons'
                                color="#F93943"
                            />
                        }
                    />
                </>
                :
                null

            }

        </View>
    )
}

export default TheoryScreen


