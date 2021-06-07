import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from '@react-native-firebase/auth';
import AnimatedLoader from "react-native-animated-loader";

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const sendEmail = () => {
        if (!validateEmail(email)) {
            Alert.alert(
                "Thông báo",
                "Email không hợp lệ"
            );
            return
        } else {
            setLoading(true)
            auth().sendPasswordResetEmail(email)
                .then(function (user) {
                    setLoading(false)
                    navigation.navigate("SucessScreen", { email: email })
                }).catch(function (e) {
                    setLoading(false)
                    console.log(e)
                    Alert.alert(
                        "Thông báo",
                        "Email của bạn chưa được đăng ký !!!"
                    );
                })
        }
    }

    // const test = () => {
    //     // navigation.navigate("SucessScreen", { email: email })
    //     setLoading(true)

    // }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Quên mật khẩu
            </Text>
            <Text style={styles.subtitle}>
                Nhập vào địa chỉ email của bạn và chúng tôi sẽ gửi email phản hồi thay đổi password
            </Text>
            <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                containerStyle={styles.inputcontainerStyle}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={styles.inputStyle}
                // errorMessage="Oops! that's not correct."
                errorStyle={{}}
                errorProps={{}}
                inputStyle={{ fontSize: 15, fontWeight: "bold", }}
                label="Địa chỉ email"
                labelStyle={{ fontSize: 15, color: "#000", opacity: 0.5, }}
                labelProps={{}}
                leftIcon={<Icon name="email-outline" size={20} />}
                leftIconContainerStyle={{}}
                // rightIcon={<Icon name="close" size={20} />}
                rightIconContainerStyle={{}}
                placeholder="Nhập vào địa chỉ email"
            />
            <Button
                onPress={sendEmail}
                title="Gửi"
                type="solid"
                buttonStyle={{ backgroundColor: "#F65E69", paddingVertical: 10 }}
            />
            {/* <Button
                onPress={test}
                title="Test"
                type="solid"
                buttonStyle={{ backgroundColor: "#F65E69", paddingVertical: 10 }}
            /> */}
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../assets/loader3.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
                <Text>Đợi trong giây lát...</Text>
            </AnimatedLoader>
        </View>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 22,
        // paddingLeft: 15,
        paddingTop: 15,
        fontWeight: "bold"
    },
    subtitle: {
        paddingTop: 10,
        // paddingLeft: 15,
        opacity: 0.5,
        fontSize: 15,
        fontWeight: "bold"
    },
    inputcontainerStyle: {
        marginTop: 20,
        paddingHorizontal: 0,

    },
    inputStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#AAA9A9",

        borderRadius: 8,
        paddingHorizontal: 5,

    },
    lottie: {
        width: 100,
        height: 100
    }
})
