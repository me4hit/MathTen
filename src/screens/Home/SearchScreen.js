import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput, FlatList, AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
}


const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log(e)

    }
}
const SearchScreen = ({ navigation }) => {
    const [text, onChangeText] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const [data, setData] = useState([]);
    const [history, setHistory] = useState([])
    useEffect(() => {
        let search
        let tempdata = []
        if (dataSearch.length != 0 && text.length != 0) {
            search = () => {
                dataSearch.forEach(search => {
                    if (search.Title.toUpperCase().includes(text.toUpperCase())) {
                        tempdata.push(search)
                    }
                })

            }
            search()
            setData(tempdata)
        } else {
            setData([])
        }
        return () => {
            search
        }

    }, [text])

    useEffect(async () => {
        let tempData = []
        let tempDataid = []

        const subscriber = await firestore()
            .collection('Chapter')
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data())
                    tempDataid.push({
                        ...documentSnapshot.data(),
                        idChapter: documentSnapshot.id
                    })
                });

            });

        const forLoop = async _ => {
            console.log('Start')

            for (let index = 0; index < tempDataid.length; index++) {
                // console.log(tempDataid[index])
                await firestore()
                    .collection('Chapter')
                    .doc(tempDataid[index].idChapter)
                    .collection("Lesson")
                    .get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            // console.log('push', doc.id)
                            tempData.push({
                                id: doc.id,
                                ...tempDataid[index],
                                idChapter: tempDataid[index].idChapter,
                                ...doc.data()
                            })

                        });
                    });
            }

            console.log('End')
        }
        await forLoop()
        // console.log(tempData)
        setDataSearch(tempData)


        return () => {
            subscriber, subscriber2
        }
    }, [])
    useEffect(async () => {
        const snapshotHistotry = await getData("history")
        if (snapshotHistotry !== null) {
            setHistory(snapshotHistotry)
            console.log("snapshotHistotry" + snapshotHistotry)
        }


        return () => {
            snapshotHistotry
        }
    }, [])


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                if (history.includes(text) == false) {
                    let temp = []
                    temp = history
                    temp.unshift(text)
                    storeData("history", temp)
                }

                navigation.navigate('LearnScreen',
                    { idChapter: item.idChapter, idLesson: item.id, title: item.Title, color: item.Color })
            }}
            style={styles.item} >
            <Icon
                size={30}
                iconStyle={{ marginHorizontal: 10 }}
                name='book'
                type='antdesign'
                color='#517fa4'
            />
            <Text style={styles.title}>{item.Title}</Text>
        </TouchableOpacity >);
    const renderItemHistory = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                onChangeText(item)
            }}
            style={{ ...styles.item, marginLeft: 10 }} >

            <Text style={{ flex: 1, fontWeight: 'bold' }}>{item}</Text>
            <Icon
                onPress={() => {
                    const index = history.indexOf(item);
                    var temp = history
                    if (history.includes(item)) {
                        temp.splice(index, 1);
                    }
                    console.log("temp" + temp)
                    storeData("history", temp)
                    setHistory(temp)
                    setRefresh(!refresh)
                }}

                size={25}
                iconStyle={{ marginHorizontal: 10 }}
                name='close-o'
                type='evilicon'
                color='#517fa4'
            />
        </TouchableOpacity >);


    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <Icon
                    size={30}
                    iconStyle={{ marginHorizontal: 10 }}
                    name='search'
                    type='evilicon'
                    color='#949494'
                />
                <TextInput
                    autoCapitalize='none'
                    autoFocus={true}
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Icon

                    onPress={() => onChangeText("")}
                    size={25}
                    iconStyle={{ marginHorizontal: 10 }}
                    name='close-o'
                    type='evilicon'
                    color='#517fa4'
                />
            </View>
            {
                text == "" ?
                    <FlatList
                        ListHeaderComponent={
                            <Text style={{ marginLeft: 10, marginBottom: 10 }}>Lịch sử</Text>
                        }
                        style={{ ...styles.listContainer }}
                        data={history}
                        extraData={refresh}

                        renderItem={renderItemHistory}
                        keyExtractor={item => item}
                    />
                    :
                    <FlatList
                        style={styles.listContainer}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
            }




        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    inputContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        fontSize: 20,
        margin: 12,

    },
    textInput: {
        flex: 1,
        // backgroundColor: 'red'
    },
    listContainer: {
        marginHorizontal: 12
        // backgroundColor: 'red'
    },
    item: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    title: {
        fontWeight: '500',
    }
})
