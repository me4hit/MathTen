import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import MathView, { MathText } from 'react-native-math-view';
import firestore from '@react-native-firebase/firestore';

const ExerciseScreen = ({ route, navigation }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const subscriber = firestore()
            .collection('Chapter')
            .doc(route.params.idChapter)
            .collection("Lesson")
            .doc(route.params.idLesson)
            .collection("Exercise").orderBy("index")
            .get()
            .then(querySnapshot => {
                let tempdata = []
                querySnapshot.forEach(documentSnapshot => {
                    var chapter = {
                        key: documentSnapshot.id,
                        ...documentSnapshot.data()
                    }
                    tempdata.push(chapter)
                });
                setData(tempdata)
            });
        return () => subscriber;
    }, []);



    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listcomponent} onPress={() => { navigation.navigate('PracticeScreen', { data: item,  color: route.params.color, title: item.Title }) }}>
                <View>
                    <Text>
                        {item.Title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View >
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between', padding: 10 }}
                    horizontal={false}
                    numColumns={2}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default ExerciseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',

    },
    listcomponent: {
        width: '47%',
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#dee2e6',
        // borderWidth:1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 1,
    }
})
