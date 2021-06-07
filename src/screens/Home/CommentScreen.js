import React, { useState, useEffect, useContext } from 'react'

import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, ToastAndroid, TextInput, ScrollView, Keyboard, LogBox, YellowBox } from 'react-native'
import { Avatar, Input, Icon, Button, Overlay, Image } from 'react-native-elements';
import { useKeyboard } from '@react-native-community/hooks'
import { AuthContext } from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/vi';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import storage from '@react-native-firebase/storage';
import ImageView from 'react-native-image-view';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableNativeFeedback, StatusBar } from 'react-native';

const CommentScreen = ({ route, navigation }) => {
    moment.locale('vi');
    const keyboard = useKeyboard()
    const [comment, setComment] = useState("")
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const [textEditComment, onChangeTextEditComment] = React.useState("");

    const [filePath, setFilePath] = useState(null);
    const [commentChoosen, setCommentChoosen] = useState(null);
    const [editCommentVisible, setEditCommentVisible] = useState(false);

    const [process, setProcess] = useState("");
    const [loading, setLoading] = useState(false);
    const [urlCommented, setUrlCommented] = useState("")

    const [isImageViewVisible, setIsImageViewVisible] = useState(false);

    const [reload, setReload] = useState(false)
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            StatusBar.setBarStyle('dark-content', true)
            StatusBar.setBackgroundColor('#fff')
        });

        return () => {
            unsubscribe
        }
    }, [reload])



    const [imgUriView, setimgUriView] = useState("")
    const images = [
        {
            source: {
                uri: imgUriView,
            },
            title: 'Paris',
            width: 806,
            height: 720,
        },
    ];
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const toggleOverlayOptions = () => {
        setVisibleOptions(!visibleOptions);
    }; toggleOverlayEditComment

    const toggleOverlayEditComment = () => {
        setEditCommentVisible(!editCommentVisible);
    };
    const sendComment = async () => {
        // console.log(comment)
        Keyboard.dismiss()
        if (comment === "" && filePath === null) {
            return
        }
        if (filePath !== null) {
            await uploadFile()
            return
        }
        const snapshot = await firestore()
            .collection('Chapter')
            .doc(route.params.idChapter)
            .collection("Lesson")
            .doc(route.params.idLesson)
            .collection("Comment")
            .add({
                User: user.displayName,
                uid: user.uid,
                UrlAvatar: user.photoURL,
                Comment: comment,
                Image: urlCommented,
                date: firestore.FieldValue.serverTimestamp()
            })
        setComment("")
        const subscriber = await loadData()
        setData(subscriber)

    }

    const OptionComments = async (uid, key, comment) => {
        if (uid != user.uid) {
            return
        }
        setVisibleOptions(true)
        setCommentChoosen(key)
        onChangeTextEditComment(comment)
    }
    const loadData = async () => {
        let tempdata = []
        await firestore()
            .collection('Chapter')
            .doc(route.params.idChapter)
            .collection("Lesson")
            .doc(route.params.idLesson)
            .collection("Comment").orderBy('date')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    var comment = {
                        key: documentSnapshot.id,
                        uid: documentSnapshot.data().uid,
                        Comment: documentSnapshot.data().Comment,
                        User: documentSnapshot.data().User,
                        Image: documentSnapshot.data().Image,
                        UrlAvatar: documentSnapshot.data().UrlAvatar,
                        date: new Date(documentSnapshot.data().date.toDate()),
                    }
                    tempdata.push(comment)
                });
            });
        console.log(tempdata)
        return tempdata.reverse()
    }

    const uploadFile = async () => {
        // this.setState({ isLoading: true });
        console.log("uploafile")
        try {
            // Check if file selected
            // if (Object.keys(filePath).length == 0)
            //     return alert("Please Select any File");
            setLoading(true);

            // Create Reference
            console.log(filePath.name);
            const reference = storage().ref(
                `/imgCommnet/${filePath.fileName}`
            );

            // Put File
            const task = reference.putFile(
                filePath.uri
            );
            // You can do different operation with task
            // task.pause();
            // task.resume();
            // task.cancel();

            task.on("state_changed", (taskSnapshot) => {
                setProcess(
                    `${taskSnapshot.bytesTransferred} transferred 
                 out of ${taskSnapshot.totalBytes}`
                );
                console.log(
                    `${taskSnapshot.bytesTransferred} transferred 
                 out of ${taskSnapshot.totalBytes}`
                );
            });
            task.then(async () => {
                // alert("Image uploaded to the bucket!");
                reference.getDownloadURL().then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrlCommented(downloadURL)
                    const snapshot = await firestore()
                        .collection('Chapter')
                        .doc(route.params.idChapter)
                        .collection("Lesson")
                        .doc(route.params.idLesson)
                        .collection("Comment")
                        .add({
                            User: user.displayName,
                            UrlAvatar: user.photoURL,
                            Comment: comment,
                            Image: downloadURL,
                            date: firestore.FieldValue.serverTimestamp()
                        })
                    setComment("")
                    const subscriber = await loadData()
                    setData(subscriber)
                });
                setProcess("");
                setFilePath(null);

            });
        } catch (error) {
            console.log("Error->", error);
            alert(`Error-> ${error}`);
        }
        setLoading(false);
    };

    const deleteComment = async () => {
        console.log(commentChoosen)
        await firestore()
            .collection('Chapter')
            .doc(route.params.idChapter)
            .collection("Lesson")
            .doc(route.params.idLesson)
            .collection("Comment")
            .doc(commentChoosen)
            .delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        const subscriber = await loadData()
        setData(subscriber)
        setVisibleOptions(false)
    }

    useEffect(async () => {
        const subscriber = await loadData()
        setData(subscriber)
        return () => subscriber;
    }, []);

    const editComment = async () => {
        setVisibleOptions(false)
        setEditCommentVisible(true)

    }

    const updateComment = async () => {
        // commentChoosen
        // textEditComment
        if (textEditComment.trim() == "") {
            ToastAndroid.showWithGravity(
                "Bình luận không được để trống",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else {
            await firestore()
                .collection('Chapter')
                .doc(route.params.idChapter)
                .collection("Lesson")
                .doc(route.params.idLesson)
                .collection("Comment")
                .doc(commentChoosen).
                update({
                    Comment: textEditComment
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                })
            const subscriber = await loadData()
            setData(subscriber)
            setEditCommentVisible(false)
            ToastAndroid.showWithGravity(
                "Bình luận đã được cập nhật",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }


    var options = {
        title: 'Select Image',
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option'
            },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const choosenImage = () => {
        launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                console.log(response)
                setFilePath(response);
            }
            setVisible(false);

        });
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginVertical: 10, flex: 1, backgroundColor: '#fff' }} >
                <TouchableNativeFeedback onLongPress={() => OptionComments(item.uid, item.key, item.Comment)}>
                    <View style={{ flex: 1, marginLeft: 10, backgroundColor: '#F1F2F6', borderRadius: 20, padding: 10, }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Avatar
                                size={40}
                                rounded
                                source={{
                                    uri: item.UrlAvatar,
                                }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.User}</Text>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', opacity: 0.5 }}>{moment(item.date).startOf().fromNow()}</Text>

                            </View>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 4, marginTop: 10, marginLeft: 5 }}>{item.Comment}</Text>
                        {
                            item.Image !== "" ?
                                <TouchableOpacity onPress={() => {
                                    setIsImageViewVisible(true)
                                    setimgUriView(item.Image)
                                }}>
                                    <Image
                                        source={{
                                            uri: item.Image,
                                        }}
                                        style={{ width: '100%', height: 200, borderRadius: 20, marginTop: 5 }}
                                    />
                                </TouchableOpacity>
                                :
                                <></>
                        }
                    </View>
                </TouchableNativeFeedback>
            </View >
        )
    }



    return (
        <View style={styles.container}>
            <FlatList
                style={{ backgroundColor: "#fff", paddingHorizontal: 10, }}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
            {/* <KeyboardAvoidingView style={{}}> */}
            {/* <ScrollView> */}

            <View style={{
                marginHorizontal: 10,
                borderTopWidth: 1, borderColor: '#dbdbdb', paddingVertical: 10,
            }}>
                {
                    filePath !== null ?
                        <>
                            <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginBottom: 10 }}>
                                <Image
                                    source={{ uri: filePath.uri }}
                                    style={{ width: 60, height: 60, borderRadius: 20 }}
                                />
                                <Icon
                                    onPress={() => setFilePath(null)}
                                    size={40}
                                    name='close-o'
                                    type='evilicon'
                                    color='#517fa4'
                                />
                            </View>
                        </> :
                        null
                }

                <View style={{ flexDirection: 'row', }}>
                    <TextInput value={comment} onChangeText={(text) => setComment(text)} style={{ ...styles.input }} placeholder="Viết bình luận" />
                    <Button
                        onPress={toggleOverlay}
                        containerStyle={{ borderRadius: 100, width: 60 }}
                        type="clear"
                        icon={
                            <Icon
                                size={40}
                                name='image'
                                type='evilicon'
                                color='#517fa4'
                            />
                        }
                    />
                    <Button
                        onPress={() => sendComment()}
                        containerStyle={{ borderRadius: 100, width: 60 }}
                        type="clear"
                        icon={
                            <Icon
                                size={40}
                                name='sc-telegram'
                                type='evilicon'
                                color='#517fa4'
                            />
                        }
                    />
                </View>
            </View>
            <Overlay style={{
                flex: 1,
                // width: '100%',
                // backgroundColor: 'red'
                // height: '100%'
            }} isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{
                    width: Dimensions.get('window').width * 0.9,

                }}>
                    {/* <Text style={{ textAlign: 'center' }}>Chọn ảnh từ</Text> */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                        <Icon
                            size={32}
                            name='camera'
                            type='entypo'
                            color='#517fa4'
                        />
                        <Text style={{ marginLeft: 10 }}>Máy ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={choosenImage} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                        <Icon
                            size={32}
                            name='images'
                            type='entypo'
                            color='#517fa4'
                        />
                        <Text style={{ marginLeft: 10 }}>Bộ sưu tập</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <Overlay style={{
                flex: 1,
                // width: '100%',
                // backgroundColor: 'red'
                // height: '100%'
            }} isVisible={visibleOptions} onBackdropPress={toggleOverlayOptions}>
                <View style={{
                    width: Dimensions.get('window').width * 0.9,

                }}>
                    {/* <Text style={{ textAlign: 'center' }}>Chọn ảnh từ</Text> */}
                    <TouchableOpacity onPress={editComment} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                        <Icon
                            size={32}
                            name='edit'
                            type='antdesign'
                            color='#517fa4'
                        />
                        <Text style={{ marginLeft: 10 }}>Chỉnh sửa bình luận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteComment} style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                        <Icon
                            size={32}
                            name='delete'
                            type='antdesign'
                            color='#f93943'
                        />
                        <Text style={{ marginLeft: 10 }}>Xoá bình luận</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
            <Overlay style={{
                flex: 1,
                // width: '100%',
                // backgroundColor: 'red'
                // height: '100%'
            }} isVisible={editCommentVisible} onBackdropPress={toggleOverlayEditComment}>
                <View style={{
                    width: Dimensions.get('window').width * 0.9,

                }}>
                    <TextInput
                        style={{
                            height: 40,
                            margin: 12,
                            // borderWidth: 1,
                            backgroundColor: '#F1F2F6', borderRadius: 20, paddingLeft: 10
                        }}
                        onChangeText={onChangeTextEditComment}
                        value={textEditComment}
                    />
                    <Button
                        onPress={updateComment}
                        title="Lưu lại"
                        type="clear"
                    />
                </View>
            </Overlay>
            <ImageView
                images={images}
                imageIndex={0}
                animationType="fade"
                isVisible={isImageViewVisible}
                onClose={() => setIsImageViewVisible(false)}
                renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
            />

        </View >
    )
}

export default CommentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    input: {
        // marginBottom: 20,
        backgroundColor: '#F1F2F6', borderRadius: 20,
        // marginBottom: 10,
        padding: 10,
        flex: 1,
    }
})
