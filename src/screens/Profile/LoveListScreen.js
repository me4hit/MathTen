import React, { useEffect, useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements'
import { AuthContext } from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { set } from 'react-native-reanimated';

const LoveListScreen = ({ navigation }) => {

    const { user } = useContext(AuthContext);
    const [data, setData] = useState([])
    const [reload, setReload] = useState(false)

    const removeLove = async (id) => {
        console.log('xoá', id)
        const snapshot = await firestore()
            .collection('User')
            .doc(user.uid)
            .collection("LoveList")
            .doc(id)
            .delete()
        await loaddata()
    }
    const loaddata = async () => {
        let temp = []
        let temp2 = []
        const snapshot = await firestore()
            .collection('User')
            .doc(user.uid)
            .collection('LoveList')
            .get()
            .then(async (querySnapshot) => {
                querySnapshot.forEach(documentSnapshot => {
                    temp.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id
                    })
                });
            });
        const forLoop = async _ => {
            for await (const documentSnapshot of temp) {
                console.log(documentSnapshot.Chapter)
                console.log(documentSnapshot.Lesson)
                const doc = await firestore()
                    .collection('Chapter')
                    .doc(documentSnapshot.Chapter)
                    .collection("Lesson")
                    .doc(documentSnapshot.Lesson)
                    .get();
                console.log(doc.data())
                temp2.push({
                    ...doc.data(),
                    id: documentSnapshot.id,
                    Chapter: documentSnapshot.Chapter,
                    Lesson: documentSnapshot.Lesson
                });
            }

            setData(temp2)
        }
        forLoop()
    }
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            StatusBar.setBarStyle('light-content', true)
            StatusBar.setBackgroundColor("#ff4d6d")
            await loaddata()
        });

        return () => {
            unsubscribe
        }
    }, [reload])


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('LearnScreen', { idChapter: item.Chapter, idLesson: item.Lesson, title: item.Title, color: "#ff4d6d" })} style={styles.LoveList}>
            <Text style={{ flex: 1 }}>{item.Title}</Text>
            <Icon
                onPress={() => removeLove(item.id)}
                name='remove-circle-outline'
                type='MaterialIcons'
                color='#517fa4'
            />
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.Lesson}
            />
        </View>
    )
}

export default LoveListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    LoveList: {
        flex: 1,
        // backgroundColor: 'red',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: '#AAB2BD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
