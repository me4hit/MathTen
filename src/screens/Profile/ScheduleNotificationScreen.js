import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, AsyncStorage, LogBox } from 'react-native'
import { Button, Input } from "react-native-elements"
import PushNotification from "react-native-push-notification";
import { Icon } from 'react-native-elements'
import ToggleSwitch from 'toggle-switch-react-native'
import { TimePickerModal } from 'react-native-paper-dates'
import 'intl'
import 'intl/locale-data/jsonp/en'
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigations/AuthProvider';

let mapDay = new Map();
mapDay.set("T2", 1)
mapDay.set("T3", 2)
mapDay.set("T4", 3)
mapDay.set("T5", 4)
mapDay.set("T6", 5)
mapDay.set("T7", 6)
mapDay.set("CN", 7)


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

const ScheduleNotificationScreen = ({ navigation, route }) => {
    LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);




    const { user, userProfile } = useContext(AuthContext);

    const windowWidth = Dimensions.get('window').width;
    const [hours, setHours] = useState("6")
    const [minutes, setMinutes] = useState("00")

    const [isOn, setIsOn] = useState(false)
    const [visible, setVisible] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [message, setMessage] = useState("")

    const [selectedDate, setSelectedDate] = useState(["T2", "T3", "T4", "T5", "T6"])
    const schedule = (message, date, day) => {
        let dateT = new Date(date);
        console.log(dateT.getTime())

        PushNotification.localNotificationSchedule({
            date: dateT,
            channelId: "default-channel-id",
            message: "Đến giờ học tập rồi 😍😍😍", // (optional) default: "message" prop,
            repeatType: 'week',
            title: userProfile.displayName + " ơi !!! "
        });
        console.log("xong")
    }

    const handleDay = (id) => {
        const index = selectedDate.indexOf(id);
        var temp = selectedDate
        if (selectedDate.includes(id)) {
            temp.splice(index, 1);
        } else {
            temp.push(id)
        }
        console.log(selectedDate)
        setSelectedDate(temp)
        setRefresh(!refresh)
        storeData("Date", temp)
        createNotification(hours, minutes)
    }
    const getAll = async () => {
        PushNotification.getScheduledLocalNotifications(notifications => {
            console.log(notifications)
        })
        const x = await getData("isOn")
        const y = await getData("Date")

        console.log("xx " + x.isOn)
        console.log("yy " + y)

    }

    const deleteAll = async () => {
        PushNotification.cancelAllLocalNotifications()
    }
    const logtime = async () => {
        console.log("hours " +hours)
        console.log("minutes " +minutes)

    }
    const createNotification = (hours, minutes) => {
        PushNotification.cancelAllLocalNotifications()
        for (let i = 0; i < selectedDate.length; i++) {
            const dayINeed = mapDay.get(selectedDate[i]); // for Thursday
            const today = moment().isoWeekday();
            var date
            // if we haven't yet passed the day of the week that I need:
            if (today <= dayINeed) {
                // then just give me this week's instance of that day
                date = moment().isoWeekday(dayINeed)
                date.hours(hours)
                date.minutes(minutes)
                if (date.isBefore(moment())) {
                    date = moment().add(1, 'weeks').isoWeekday(dayINeed)
                }
            } else {
                // otherwise, give me *next week's* instance of that same day
                date = moment().add(1, 'weeks').isoWeekday(dayINeed)
            }

            date.hours(hours)
            date.minutes(minutes)
            console.log(mapDay.get(selectedDate[i]) + date)
            schedule(message, date, mapDay.get(selectedDate[i]));
        }
        // storeData("Date", selectedDate)


    }


    const days = [
        {
            id: "T2",
            name: "Monday"
        },
        {
            id: "T3",
            name: "Tuesday"
        },
        {
            id: "T4",
            name: "Wednesday"
        },
        {
            id: "T5",
            name: "Thurday"
        },
        {
            id: "T6",
            name: "Friday"
        }, {
            id: "T7",
            name: "Saturday"
        }
        , {
            id: "CN",
            name: "Sunday"
        }
    ]

    const onDismiss = React.useCallback(() => {
        setVisible(false)

    }, [setVisible])
    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setHours(hours)

            setMinutes(minutes)
            setVisible(false);
            storeData("Time", {
                hours: hours,
                minutes: minutes
            })
            createNotification(hours, minutes)
        },
        [setVisible, hours, minutes]

    );

    useEffect(async () => {
        const snapshotIsOn = await getData("isOn")
        if (snapshotIsOn !== null) {
            setIsOn(snapshotIsOn.isOn)
        }
        const snapshotDate = await getData("Date")
        if (snapshotDate !== null) {
            // var ar = snapshotDate.split(',')
            // console.log("arr" + ar)
            setSelectedDate(snapshotDate)
        }
        const snapshotTime = await getData("Time")

        if (snapshotTime !== null) {
            // var ar = snapshotDate.split(',')
            // console.log("arr" + ar)
            setHours(snapshotTime.hours)
            setMinutes(snapshotTime.minutes)
        } else {
            storeData("Time", {
                hours: hours,
                minutes: minutes
            })
        }

        return () => {
            snapshotIsOn, snapshotDate
        }
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleDay(item.id)} style={{ flex: 1, width: (windowWidth - 20) / 7, alignItems: 'center', }}>
            <Icon
                name='checkcircleo'
                type='antdesign'
                color={
                    selectedDate.includes(item.id) ? '#18DA90' : '#8C8C8C'
                }
            />
            <Text>{item.id}</Text>
        </TouchableOpacity>

    );

    return (
        <View style={styles.container}>

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
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 17, flex: 1 }}>Nhận thông báo</Text>
                <ToggleSwitch
                    style={{}}
                    isOn={isOn}
                    onColor="#4CCA61"
                    offColor="#e0e0e0"
                    // label="Example label"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="medium"
                    onToggle={isOn => {
                        setIsOn(isOn)
                        console.log("thay đổi toggle " + isOn)
                        storeData("isOn", { "isOn": isOn })

                        if (isOn == false) {
                            deleteAll()
                        } else {
                            createNotification(hours, minutes)
                        }
                    }}
                />
            </View>
            {
                isOn ? <View>
                    <View style={{ marginHorizontal: 10 }} >
                        <TouchableOpacity onPress={() => setVisible(true)} style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 17, marginBottom: 5 }}>Giờ</Text>
                            <Text>{hours}:{minutes}</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 17, marginBottom: 5 }}>Ngày</Text>
                            <FlatList
                                // columnWrapperStyle={{
                                //     flex: 1,
                                //     justifyContent: "space-around"
                                // }}
                                extraData={refresh}
                                numColumns={1}
                                style={{ marginTop: 10 }}
                                horizontal={true}
                                data={days}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                    {/* <Input
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
                    /> */}
                    {/* <Button
                        onPress={() => createNotification(hours, minutes)}
                        containerStyle={{ marginHorizontal: 10 }}
                        title="Lưu lại"
                        type="outline"
                    />

                    <Button
                        onPress={() => deleteAll()}
                        containerStyle={{ marginHorizontal: 10 }}
                        title="delete alll"
                        type="outline"
                    /> */}
                </View>
                    : null
            }
            {/* <Button
                onPress={() => getAll()}
                containerStyle={{ marginHorizontal: 10 }}
                title="get alll"
                type="outline"
            />
            <Button
                onPress={() => logtime()}
                containerStyle={{ marginHorizontal: 10 }}
                title="get logtime"
                type="outline"
            /> */}
        </View>
    )
}

export default ScheduleNotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    inputcontainerStyle: {

        marginTop: 20,
        // paddingHorizontal: 20,

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
