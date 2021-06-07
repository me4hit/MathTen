import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Alert, ToastAndroid } from 'react-native'
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../navigations/AuthProvider'
import Spinner from 'react-native-loading-spinner-overlay';

const ChangePasswordScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [errorOldPassword, setErrOldPassword] = React.useState("")
    const [errorNewPassword, setErrorNewPassword] = React.useState("")
    const [loading, setLoading] = useState(false);

    const clearErr = () => {
        setErrOldPassword("")
        setErrorNewPassword("")
    }

    const { user, } = useContext(AuthContext);

    const reauthenticate = (currentPassword) => {
        console.log("email" + user.email)
        console.log("pass" + currentPassword)

        var cred = auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        console.log("cred" + cred)
        // console.log(user.reauthenticateWithCredential(cred))
        return user.reauthenticateWithCredential(cred);
    }
    const check = () => {
        clearErr()
        console.log(oldPassword, newPassword);
        if (newPassword == "") {
            setErrOldPassword("Chưa nhập mật khẩu c")
            return false
        }
        if (newPassword.length < 8) {
            setErrorNewPassword("Mật khẩu phải có từ 8 kí tự trở lên")
            return false
        }
        if (newPassword !== confirmPassword) {
            setErrorNewPassword("Mật khẩu mới và mật khẩu xác nhận không khớp")
            return false
        }
        return true

    }

    const updatePassword = (oldPassword) => {
        // auth.currentUser.updatePassword(newPassword)
        if (check() == true) {
           
            reauthenticate(oldPassword).then(() => {
                setLoading(true)
                user.updatePassword(newPassword).then(() => {
                    console.log("Password updated!");
                    ToastAndroid.showWithGravity(
                        "Mật khẩu đã được cập nhật",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    setLoading(false)

                    navigation.goBack();
                }).catch((error) => {
                    console.log(error);
                    setLoading(false)

                    Alert.alert(
                        "Cập nhật mật khẩu không thành công",
                        error,

                    );
                });
            }).catch((error) => {
                setLoading(false)

                console.log(error);
                setErrOldPassword(error.toString());
            });

        }



    }


    return (
        <View style={styles.container}>
            <Spinner
                overlayColor={"rgba(0, 0, 0, 0.25)"}
                visible={loading}
                textContent={'Đang cập nhật...'}
            // textStyle={styles.spinnerTextStyle}
            />
            <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 5, color: '#B0B0B0', fontSize: 18 }}>Mật khẩu cũ</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setOldPassword}
                    value={oldPassword}
                />
                <Text style={{ color: 'red', fontSize: 13 }}>{errorOldPassword}</Text>

            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 10, color: '#B0B0B0', fontSize: 18 }}>Mật khẩu mới</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setNewPassword}
                    value={newPassword}
                />
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 10, color: '#B0B0B0', fontSize: 18 }}>Xác nhận mật khẩu mới</Text>
                <TextInput
                    secureTextEntry={true}

                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                <Text style={{ color: 'red', fontSize: 13 }}>{errorNewPassword}</Text>

            </View>
            <Button
                onPress={() => updatePassword(oldPassword)}
                containerStyle={{ marginTop: 20 }}
                title="HOÀN THÀNH"
                type="outline"
            />
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
