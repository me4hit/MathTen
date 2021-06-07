import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import LessonComponets from './components/LessonComponets'

import firestore from '@react-native-firebase/firestore';


const DetailScreen = ({ route, navigation }) => {
    const [data, setData] = useState([])
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


    useEffect(() => {
        const subscriber = firestore()
            .collection('Chapter')
            .doc(route.params.idChapter)
            .collection('Lesson')
            .get()
            .then(querySnapshot => {
                let lessonData = []
                querySnapshot.forEach(documentSnapshot => {
                    var chapter = {
                        key: documentSnapshot.id,
                        ...documentSnapshot.data()
                    }
                    lessonData.push(chapter)
                });
                setData(lessonData)

            });
        return () => subscriber;
    }, []);
    const renderItem = ({ item }) => {
        return (
            <LessonComponets item={item} route={route} navigation={navigation} color={route.params.color} />
        )
    }
    return (
        <View style={styles.container}>
            <FlatList style={{ marginTop: 20 }} data={data} renderItem={renderItem} />
        </View>
    )
}
export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 9

    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#F65E69',
        paddingLeft: 10
    }
})
