import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'react-native-elements'

const LessonComponets = ({ route, navigation, item, color, count }) => {
    const [isFocused, setIsFocused] = useState(false)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginBottom: 15,
            opacity: isFocused ? 0.7 : 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginHorizontal: 1,
            padding: 20,
            borderRadius: 15,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#fff',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 2,

        }
    })
    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('LearnScreen', { idChapter: route.params.idChapter, idLesson: item.key, title: item.Title, color: color })}
            onPressIn={() => setIsFocused(!isFocused)} onPressOut={() => setIsFocused(!isFocused)}>
            <View style={styles.container}>
                {/* <View style={{
                    flex: 1,

                }}>
                    <View style={{
                        alignItems: 'center',
                        borderStyle: 'solid',
                        borderColor: '#707070',
                        borderWidth: 0.7,
                        width: 22, height: 22, borderRadius: 11,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>{count}</Text>
                    </View>

                </View> */}
                <View style={{ flex: 8 }}>
                    <Text style={{ marginHorizontal: 5, fontWeight: 'bold' }}>{item.Title} </Text>

                </View>
                {/* <Icon name='add-circle'
                    type='Ionicons'
                    color='#848484'
                    size={32} /> */}
            </View>
        </TouchableWithoutFeedback>


    )
}

export default LessonComponets


