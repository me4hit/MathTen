import React, { useContext, useState, useEffect } from 'react'

import { StyleSheet, Text, View, FlatList, RefreshControl, StatusBar } from 'react-native'
import { AuthContext } from '../../navigations/AuthProvider'
import { Overlay } from 'react-native-elements';
import Loadingcat from '../../animation/Loadingcat';
import { SearchBar, Button } from 'react-native-elements';
import DismissKeyboard from '../../help/DismissKeyboard';
import PartComponents from './components/PartComponents';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Icon } from 'react-native-elements'

import LessonComponets from './components/LessonComponets'
import { Touchable } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
const HomeScreen = ({ navigation }) => {
    const { logout, user, userProfile } = useContext(AuthContext)

    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [reload, setReload] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content', true)
            StatusBar.setBackgroundColor("#fff")
        });
        return unsubscribe;
    }, [navigation])



    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        console.log('đang load')
        const subscriber = firestore()
            .collection('Chapter')
            .get()
            .then(querySnapshot => {
                let chapterdata = []
                querySnapshot.forEach(documentSnapshot => {
                    var chapter = {
                        key: documentSnapshot.id,
                        ...documentSnapshot.data()
                    }
                    chapterdata.push(chapter)
                });
                setData(chapterdata)

            });
        return () => subscriber;
    }, []);




    const datademo = [
        {
            key: '1',
            title: 'Officia enim do consequat 1',
            content: 'Adipisicing quis aliqua ex proident consectetur dolore dolore.',
            mark: 2,
            color: '#FF7D8B'
        },
        {
            key: '2',
            title: 'Officia enim do consequat tempor 2',
            content: 'Adipisicing quis aliqua ex proident consectetur dolore dolore.',
            mark: 2,
            color: '#8F9BFA'
        },
        {
            key: '3',
            title: 'Officia enim do consequat tempor3 ',
            content: 'Adipisicing quis aliqua ex proident consectetur dolore dolore.',
            mark: 2,
            color: '#EBBE4D'
        },
        {
            key: '4',
            title: 'Officia enim do consequat tempo. 4',
            content: 'Adipisicing quis aliqua ex proident consectetur dolore dolore.',
            mark: 2,
            color: '#292B46'
        },
        {
            key: '5',
            title: 'Officia enim do consequat tempo. 5',
            content: 'Adipisicing quis aliqua ex proident consectetur dolore dolore.',
            mark: 2,
            color: '#48B8D0'

        }


    ]
    const renderItem = ({ item }) => (
        <PartComponents item={item} navigation={navigation} />
    )

    return (
        < View style={styles.container} >

            <Text style={styles.headerText}>Xin chào <Text style={styles.name}>{userProfile.displayName}</Text> !</Text>
            {/* <DismissKeyboard>
                <SearchBar

                    placeholder="Tìm kiếm bài học"
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchInput}
                    onFocus={() => navigation.navigate("SearchScreen", {
                        withAnimation: true
                    })}
                // onChangeText={this.updateSearch}
                // value={search}
                />
            </DismissKeyboard> */}
            <TouchableNativeFeedback onPress={() => {
                navigation.navigate("SearchScreen", {
                    withAnimation: true
                })
            }}>
                <View style={{
                    marginTop:10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    height: 50, flexDirection: 'row', alignItems: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        marginLeft: 15

                    }}>
                        <Text style={{ fontSize: 17, fontWeight: '600', opacity: 0.5, }}>Tìm kiếm bài học</Text>
                    </View>
                    <Icon
                        style={{ marginHorizontal: 9 }}
                        name='search1'
                        type='antdesign'
                        color='#517fa4'
                        size={25}
                    />

                </View>
            </TouchableNativeFeedback>
            <FlatList showsVerticalScrollIndicator={false}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsHorizontalScrollIndicator={false} style={{
                    marginTop: 10, backgroundColor: '#fff'
                }} data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />



        </View >

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    headerText: {
        fontSize: 20,
        // marginLeft: 10,
        marginTop: 10

    }, name: {
        fontWeight: 'bold'
    },
    searchBarContainer: {
        backgroundColor: '#fff',
        // borderRadius: 10 ,
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        margin: 0,
        padding: 0,
        marginTop: 10
    }

})
