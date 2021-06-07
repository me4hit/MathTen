import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, FlatList, Image, ImageBackground } from 'react-native'
import { Avatar, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import Loadingdata from '../../animation/Loadingdata';
import { AuthContext } from '../../navigations/AuthProvider'

const RankScreen = ({ navigation }) => {
    let count = 3;

    const { userProfile, user } = useContext(AuthContext);

    const [data, setData] = useState([])
    const [myScore, setMyScore] = useState(0)

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)

    const loadingData = async () => {
        let tempData = []
        let snapshot2
        let snapshot
        snapshot = await firestore()
            .collection('User')
            .orderBy("Score", 'desc')
            .limit(20)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    tempData.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
            })
        snapshot2 = await firestore()
            .collection('User')
            .doc(user.uid)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.data().Score !== undefined) {
                    setMyScore(querySnapshot.data().Score)
                } else {
                    setMyScore(0)

                }

            })
        setData(tempData)
        setLoading(true)
    }
    useEffect(async () => {

        const unsubscribe = navigation.addListener('focus', async () => {
            await loadingData()
        });

        return () => {
            unsubscribe
        }
    }, [navigation])

    const renderItem = ({ item }) => {
        count++;
        return (
            <View style={{ paddingVertical: 10, flex: 1, flexDirection: "row", alignItems: "center", borderBottomWidth: 0.5, borderStyle: 'solid', borderColor: '#E2E2E2' }} >
                <View style={{ flex: 5, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1, textAlign: 'center', color: '#0096c7', fontSize: 17, fontWeight: '800' }}  >{count}</Text>
                    <Avatar
                        size={45}
                        rounded
                        source={
                            item.UrlAvatar == "" || item.UrlAvatar == undefined ? require('../../assets/user.png') : { uri: item.UrlAvatar }
                        }
                    />
                    <Text style={{ flex: 6, paddingLeft: 10, }}>{item.Name}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ marginRight: 10, color: '#4C86A8', textAlign: 'right' }}>{item.Score} ⭐</Text>
                </View>
            </View >
        )
    }
    return (
        <>
            {
                loading == true ?
                    <View style={styles.container}>
                        <View style={styles.headerRank}>
                            <View style={{ flex: 1, alignItems: 'center', marginTop: 50, paddingLeft: 20 }}>
                                <ImageBackground
                                    style={{
                                        width: 90, height: 90, borderRadius: 45
                                    }}
                                    source={require('../../assets/google.png')}
                                >
                                    <Image
                                        style={{
                                            width: 90, height: 90, borderRadius: 45

                                        }}
                                        source={data[1].UrlAvatar || data[1].UrlAvatar == undefined ? { uri: data[1].UrlAvatar } : require('../../assets/user.png')}
                                    />
                                </ImageBackground>
                                <View style={{ top: -20, width: 30, height: 30, borderRadius: 20, backgroundColor: '#26DA86', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff' }}>2</Text></View>
                                <Text style={{ fontWeight: 'bold', color: '#0096c7' }}>{data[1].Name}</Text>
                                <Text >{data[1].Score} ⭐</Text>

                            </View>
                            <View style={styles.top1}>
                                <Avatar
                                    size={100}
                                    rounded
                                    source={data[0].UrlAvatar || data[0].UrlAvatar == undefined ? { uri: data[0].UrlAvatar } : require('../../assets/user.png')}
                                >
                                </Avatar>
                                <View style={{ top: -20, width: 30, height: 30, borderRadius: 20, backgroundColor: '#F65E69', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff' }}>1</Text></View>
                                <Text style={{ fontWeight: 'bold', color: '#0096c7' }}>{data[0].Name}</Text>
                                <Text>{data[0].Score} ⭐</Text>

                            </View>
                            <View style={{ flex: 1, alignItems: 'center', marginTop: 50, paddingRight: 20 }}>
                                <Avatar
                                    size={90}
                                    rounded
                                    source={data[2].UrlAvatar || data[2].UrlAvatar == undefined ? { uri: data[2].UrlAvatar } : require('../../assets/user.png')}
                                >
                                </Avatar>
                                <View style={{ top: -20, width: 30, height: 30, borderRadius: 20, backgroundColor: '#477890', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#fff' }}>3</Text></View>
                                <Text style={{ fontWeight: 'bold', color: '#0096c7' }}>{data[2].Name}</Text>
                                <Text >{data[2].Score} ⭐</Text>

                            </View>
                        </View>


                        <View style={styles.bodyRank}>
                            <FlatList
                                style={{ backgroundColor: "#fff", paddingHorizontal: 10 }}
                                data={data.slice(3)}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                            <View style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", borderWidth: 0.5, borderStyle: 'solid', borderColor: '#0077b6' }} >
                                <View style={{ flex: 5, flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ flex: 1, textAlign: 'center', color: '#e63946', fontSize: 17, fontWeight: '800' }}></Text>
                                    <Avatar
                                        size={45}
                                        rounded
                                        source={
                                            userProfile.photoURL == "" || userProfile.photoURL == undefined ? require('../../assets/user.png') : { uri: userProfile.photoURL }
                                        }
                                    />
                                    <Text style={{ flex: 6, paddingLeft: 10, fontWeight: 'bold', color: '#e63946', }}>{userProfile.displayName}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                    <Text style={{ marginRight: 10, color: '#4C86A8', textAlign: 'right' }}>{myScore} ⭐</Text>
                                </View>
                                {/* <Text style={{ flex: 1, marginRight: 20 }}>{myScore} ⭐</Text> */}
                            </View  >
                        </View>
                    </View >
                    : <Loadingdata />
            }
        </>

    )
}

export default RankScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top1: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
    },
    headerRank: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    bodyRank: {
        flex: 2
    }
})
