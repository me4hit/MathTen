import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Alert, Dimensions, Share } from 'react-native'
import { Avatar, Image } from 'react-native-elements'

import bellImg from '../../assets/bell.png'
import logoutImg from '../../assets/logout.png'
import passImg from '../../assets/resume.png'
import addListImg from '../../assets/add_list.png'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../../navigations/AuthProvider';
import { Icon, Overlay } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';

import { MenuProvider } from 'react-native-popup-menu';





const Profile = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const [visibleOptions, setVisibleOptions] = useState(false)
    const { logout, user, userProfile, } = useContext(AuthContext);

    const toggleOverlay = () => {
        setVisibleOptions(!visibleOptions);
    };


    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'hihi haha',

                message:
                    'https://www.youtube.com/',
            }, {
                dialogTitle: 'Chia sẻ MathTen với bạn bè !!!'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            setVisibleOptions(false);

        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content', true)
            StatusBar.setBackgroundColor("#fff")
        });
        return unsubscribe;
    }, [navigation])



    const changePasss = () => {
        navigation.navigate("UpdateProfileScreen")
    }

    const ScheduleNotification = () => {
        navigation.navigate("ScheduleNotificationScreen", { params: { newNotification: true } })
    }

    const LoveList = () => {
        navigation.navigate("LoveListScreen")
    }

    const logOutHandler = () => {
        Alert.alert(
            '',
            'Bạn có chắc chắn muốn đăng xuất ?',
            [
                { text: "Huỷ", style: 'cancel', onPress: () => { } },
                {
                    text: 'ĐĂNG XUẤT',
                    style: 'destructive',
                    onPress: () => logout(),
                },
            ]
        );
    }
    const triggerStyles = {
        triggerText: {
            color: 'white',
        },
        // triggerOuterWrapper: {
        //     backgroundColor: 'orange',
        //     padding: 5,
        //     flex: 1,
        // },
        triggerWrapper: {
            // backgroundColor: 'blue',
            alignItems: 'flex-end',
            // justifyContent: 'flex-end',
            // flex: 1,
        },
        // triggerTouchable: {
        //     underlayColor: 'darkblue',
        //     activeOpacity: 70,
        //     style: {
        //         flex: 1,
        //     },
        // },
    };
    // const optionsStyles = {
    //     optionsContainer: {
    //         backgroundColor: 'green',
    //         padding: 5,
    //     },
    //     optionsWrapper: {
    //         backgroundColor: 'purple',
    //     },
    //     optionWrapper: {
    //         backgroundColor: 'yellow',
    //         margin: 5,
    //     },
    //     optionTouchable: {
    //         underlayColor: 'gold',
    //         activeOpacity: 70,
    //     },
    //     optionText: {
    //         color: 'brown',
    //     },
    // };

    return (

        <View style={styles.container}>
            <Overlay style={{
                flex: 1,
                // width: '100%',
                // backgroundColor: 'red'
                // height: '100%'
            }} isVisible={visibleOptions} onBackdropPress={toggleOverlay}>
                <View style={{
                    width: Dimensions.get('window').width * 0.9,

                }}>
                    {/* <Text style={{ textAlign: 'center' }}>Chọn ảnh từ</Text> */}
                    <TouchableOpacity onPress={onShare} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                        <Icon
                            size={32}
                            name='sharealt'
                            type='antdesign'
                            color='#517fa4'
                        />
                        <Text style={{ marginLeft: 10 }}>Chia sẻ với bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={{}} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                        <Icon
                            size={32}
                            name='users'
                            type='feather'
                            color='#517fa4'
                        />
                        <Text style={{ marginLeft: 10 }}>Về chúng tôi</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <TouchableOpacity onPress={() => setVisibleOptions(true)}>
                <Icon
                    style={{ width: 20, marginLeft: windowWidth - 35, marginRight: 10 }}
                    name='dots-three-vertical'
                    type='entypo'
                    color='#000'
                />
            </TouchableOpacity>

            <View style={styles.avatar}>
                <Avatar
                    rounded
                    size={155}
                    source={{
                        uri: userProfile.photoURL

                    }}
                >
                </Avatar>
                <Text style={styles.name}>{userProfile.displayName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.options}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={{ ...styles.option, borderRightWidth: 1, borderBottomWidth: 1, }}>
                            <TouchableOpacity onPress={LoveList} style={{ alignItems: 'center' }}>
                                <View>
                                    <Image source={addListImg} style={styles.icon} />
                                </View>
                                <Text style={styles.text}>Danh sách yêu thích</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.option, borderBottomWidth: 1, }}>
                            <TouchableOpacity onPress={changePasss}
                                style={{ alignItems: 'center' }}>
                                <View>
                                    <Image source={passImg} style={styles.icon} />
                                </View>
                                <Text style={styles.text}>Cập nhật thông tin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={{ ...styles.option, borderRightWidth: 1, }}>
                            <TouchableOpacity onPress={ScheduleNotification} style={{ alignItems: 'center' }}>
                                <View>
                                    <Image source={bellImg} style={styles.icon} />
                                </View>
                                <Text style={styles.text}>Đặt lịch học</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.option, }}>
                            <TouchableOpacity onPress={logOutHandler} style={{ alignItems: 'center' }}>
                                <View>
                                    <Image source={logoutImg} style={styles.icon} />
                                </View>
                                <Text style={styles.text}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        </View>

    )
}

export default Profile

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    icon: {
        width: 32, height: 32
    },
    avatar: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        // fontWeight:'bold',
        fontSize: 20,
        marginTop: 20
    },
    options: {
        width: "90%", height: "50%",

    },
    option: {
        borderStyle: 'solid',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D1D1D1'
    },
    text: {
        marginTop: 10,
    },
    email: {
        opacity: 0.6
    }
})
