import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Text, } from 'react-native-elements';
import ImageTest from '../../../assets/test.png'
const PartComponents = ({ item, navigation }) => {
    const [isFocused, setIsFocused] = useState(false)

    const styles = StyleSheet.create({
        titleContainer: {
            flex: 9,
            marginLeft: 10,
            height: 110
        },
        imgContainer: {
            flex: 3,
            flexDirection: 'row',
            paddingRight: 5,
            paddingTop: 5
        },
        headerText: {
            color: '#fff',
            fontSize: 17,
            fontWeight: 'bold',
            paddingTop: 10

        },
        detailText: {
            color: '#fff',
            fontSize: 13,
            paddingTop: 10
        },
        container: {
            opacity: isFocused ? 0.7 : 1,
            padding: isFocused ? 5 : 10,
            backgroundColor: item.Color,
            // marginHorizontal: 10,
            marginBottom: isFocused ? 15 : 10,
            marginTop: isFocused ? 5 : 0,
            borderRadius: 15,
            flexDirection: 'row',
            borderColor: '#fff',
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 2,

        },

    })

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('DetailScreen', {idChapter:item.key, color: item.Color, title: item.Title})
        } onPressIn={() => setIsFocused(!isFocused)} onPressOut={() => {
            setIsFocused(!isFocused)
        }
        }>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>{item.Title}</Text>
                    <Text style={styles.detailText}>{item.Describe}</Text>
                </View>
                <View style={styles.imgContainer}>
                    <Image source={ImageTest} style={{ flex: 9, width: '100%', height: '100%' }} />
                    <View style={{ marginRight: 10, flex: 1, }} >
                        <View>
                            <View style={{ marginRight: 10, width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: '#fff', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 13 }}>{item.Mark}đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >

    )
}
export default PartComponents

