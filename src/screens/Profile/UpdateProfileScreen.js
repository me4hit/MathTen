import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Image, Input } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../../navigations/AuthProvider'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import Spinner from 'react-native-loading-spinner-overlay';


const UpdateProfileScreen = ({ navigation }) => {

    const { user, userProfile, setUserProfile } = useContext(AuthContext);
    const [textName, onChangeTextName] = React.useState(userProfile.displayName);
    const [textEmail, onChangeTextEmail] = React.useState(user.email);
    const [filePath, setFilePath] = useState(null);
    const [urlPhoto, setUrlPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const currentProfile = {
        displayName: user.displayName,
    }

    useEffect(async () => {
        console.log("chạy up ảnh nè")
        if (filePath != null) {

            console.log("chạy up ảnh nè1")
            await uploadFile()

        }
        return () => {
        }
    }, [filePath])

    const ChangePassword = () => {
        navigation.navigate("ChangePasswordScreen")
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
        console.log("chọn ảnh")
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
        });
    }
    const UpdateProfile = async () => {


        if (textName != currentProfile.displayName) {
            const update = {
                displayName: textName,

            }
            setLoading(true);

            await auth().currentUser.updateProfile(update);
            await auth().currentUser.reload();
            const tempUser = auth().currentUser
            console.log("tempUser: " + tempUser)
            setUserProfile({
                displayName: tempUser.displayName,
                photoURL: tempUser.photoURL
            })
            await firestore()
            .collection('User')
            .doc(user.uid)
            .update({
                Name: tempUser.displayName,
            })
            setLoading(false);
            navigation.goBack();
        }
    }

    const uploadFile = async () => {
        try {
            setLoading(true);
            console.log(filePath.name);
            const reference = storage().ref(
                `/imgCommnet/${filePath.fileName}`
            );
            const task = reference.putFile(
                filePath.uri
            );
            // task.on("state_changed", (taskSnapshot) => {
            //     setProcess(
            //         `${taskSnapshot.bytesTransferred} transferred 
            //      out of ${taskSnapshot.totalBytes}`
            //     );
            //     console.log(
            //         `${taskSnapshot.bytesTransferred} transferred 
            //      out of ${taskSnapshot.totalBytes}`
            //     );
            // });
            task.then(async () => {
                // alert("Image uploaded to the bucket!");
                reference.getDownloadURL().then(async (downloadURL) => {

                    console.log('File available at', downloadURL);
                    const update = {
                        photoURL: downloadURL
                    }
                    await auth().currentUser.updateProfile(update);
                    await firestore()
                        .collection('User')
                        .doc(user.uid)
                        .update({
                            UrlAvatar: downloadURL
                        })
                    setUrlPhoto("")
                    await auth().currentUser.reload();
                    const tempUser = auth().currentUser
                    console.log("tempUser: " + tempUser)
                    setUserProfile({
                        displayName: tempUser.displayName,
                        photoURL: tempUser.photoURL
                    })
                    console.log("update thành công")
                    setFilePath(null);
                    setLoading(false);

                });

            });
        } catch (error) {
            console.log("Error->", error);
            alert(`Error-> ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <Spinner
                overlayColor={"rgba(0, 0, 0, 0.25)"}
                visible={loading}
                textContent={'Đang cập nhật...'}
            // textStyle={styles.spinnerTextStyle}
            />
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Avatar
                    rounded
                    size={120}
                    source={{
                        uri: userProfile.photoURL

                    }}
                ></Avatar>
                <TouchableNativeFeedback onPress={choosenImage}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, marginTop: 10, color: '#0096c7' }}>THAY ẢNH ĐẠI DIỆN</Text>
                </TouchableNativeFeedback>
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 10, color: '#B0B0B0', fontSize: 18 }}>Tên</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextName}
                    value={textName}
                />
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 10, color: '#B0B0B0', fontSize: 18 }}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextEmail}
                    value={textEmail}
                />
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 10, color: '#B0B0B0', fontSize: 18 }}>Password</Text>
                <View style={{ ...styles.input, justifyContent: 'center' }}>
                    <TouchableNativeFeedback
                        onPress={ChangePassword}
                    >
                        <Text style={{ letterSpacing: 3, }}>*********</Text>
                    </TouchableNativeFeedback>
                </View>

            </View>
            <Button
                onPress={UpdateProfile}
                containerStyle={{ marginTop: 20 }}
                title="HOÀN THÀNH"
                type="outline"
            />
        </View >
    )
}

export default UpdateProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFD',
        paddingHorizontal: 10
    },
    input: {
        height: 40,
        // margin: 12,
        paddingHorizontal: 10,
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#EBEBEB',
        color: '#585858',
        fontSize: 17,
        fontWeight: '200'
    },

})
