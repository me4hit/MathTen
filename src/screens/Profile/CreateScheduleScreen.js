import React, { useState } from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { Icon, Input, Button as ButtonE } from 'react-native-elements'
import { Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates'
import 'intl'
import 'intl/locale-data/jsonp/en'
import PushNotification from "react-native-push-notification";
import ToggleSwitch from 'toggle-switch-react-native'


const CreateScheduleScreen = ({ route, navigation }) => {
    console.log(route)
    const [hours, setHours] = useState("12")
    const [minutes, setMinutes] = useState("00")
    const [visible, setVisible] = React.useState(false)
    const [isOn, setIsOn] = React.useState(false)
    const [message, setMessage] = React.useState("")


    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setHours(hours)
            setMinutes(minutes)
            setVisible(false);
        },
        [setVisible]
    );

    const pushNotification = () => {
        console.log("đặt lịch")
        if(message ==""){
            ToastAndroid.showWithGravity(
                "Bạn chưa đặt lời nhắc !!!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            return
        }
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate())
        tomorrow.setHours(hours)
        tomorrow.setMinutes(minutes)
        console.log(tomorrow.toLocaleString())
        console.log(route.params.setLoading)
        PushNotification.localNotificationSchedule({

            largeIcon: "",
            channelId: "default-channel-id",
            title: "MathTen nhắc bạn",
            message: message, // (required)
            date: tomorrow, // in 60 secs
            allowWhileIdle: false, // (optional)
            repeatType: isOn ? "day" : null
        });

        ToastAndroid.showWithGravity(
            "Đặt nhắc nhở thành công",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        navigation.navigate("ScheduleNotificationScreen" )
    }
    const cancelNotification = () => {
        PushNotification.cancelAllLocalNotifications()
    }




    return (
        <View style={styles.container}>
            <View style={styles.containerClock}>
                <Text style={styles.hourText}>{(hours < 9 && hours != 0) ? `0${hours}` : `${hours}`}</Text>
                <Text style={{ fontSize: 60 }}>:</Text>
                <Text style={styles.minuteText}>{(minutes < 9 && minutes != 0) ? `0${minutes}` : `${minutes}`}</Text>
            </View>
            <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                label="Select time" // optional, default 'Select time'
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'en'} // optional, default is automically detected by your system
            />
            <Button onPress={() => setVisible(true)}>
                Pick time
            </Button>
            <ButtonE onPress={cancelNotification} containerStyle={styles.buttonContainer} buttonStyle={styles.buttonStyle} title="cacle lịch " />

            <Input
                containerStyle={styles.inputcontainerStyle}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={styles.inputStyle}
                errorStyle={{}}
                errorProps={{}}
                inputStyle={{ fontSize: 15, fontWeight: "bold", }}
                label="Lời nhắc"
                labelStyle={{ fontSize: 15, color: "#000" }}
                labelProps={{}}
                // leftIcon={<Icon name='schedule'
                //     type='materialicons'
                //     color='#fff' />}
                leftIconContainerStyle={{}}
                // rightIcon={<Icon name="close" size={20} />}
                rightIconContainerStyle={{}}
                placeholder="Nhập vào lời nhắc của bạn"
                onChangeText={value => setMessage(value)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text style={{ flex: 1, fontWeight: 'bold' }}>Lặp lại hằng ngày</Text>
                <ToggleSwitch
                    style={{}}
                    isOn={isOn}
                    onColor="#4CCA61"
                    offColor="#e0e0e0"
                    // label="Example label"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="large"
                    onToggle={isOn => setIsOn(isOn)}
                />
            </View>
            <ButtonE onPress={pushNotification} containerStyle={styles.buttonContainer} buttonStyle={styles.buttonStyle} title="Đặt lịch " />
            {/* <ButtonE onPress={getall} containerStyle={styles.buttonContainer} buttonStyle={styles.buttonStyle} title="get all " /> */}

        </View>
    )
}

export default CreateScheduleScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerClock: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    hourText: {
        fontSize: 60
    },
    minuteText: {
        fontSize: 60
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    buttonStyle: {
        backgroundColor: '#1976d2',
        paddingVertical: 15
    },
    inputcontainerStyle: {

        marginTop: 20,
        paddingHorizontal: 20,

    },
    inputStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#AAA9A9",

        borderRadius: 8,
        paddingHorizontal: 5,

    }
})
