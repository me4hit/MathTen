import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import MathView, { MathText } from 'react-native-math-view';
import { Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';

const PracticeScreen = ({ route }) => {
    const windowWidth = Dimensions.get('window').width;

    const [hidenAnswers, setHidenAnswers] = useState(false)

    const data = route.params.data
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        card: {
            borderLeftWidth: 3,
            borderLeftColor: route.params.color,
            marginTop: 10,
            backgroundColor: '#fff',

            borderRadius: 10,
            padding: 10,
            marginHorizontal: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
        },
        cardTitle: {
            alignSelf: 'center',
            borderStyle: 'solid',
            backgroundColor: '#fff',
            paddingHorizontal: 30,
            paddingVertical: 7,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        },
        containerAnswer: {
            backgroundColor: '#fff',

        },
        button: {

        },
        answerTitle: {
            color: route.params.color,
            fontWeight: 'bold',
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
    )

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                {
                    data.Question != "" ?
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                width={windowWidth - 20} // height will be calculated automatically
                                source={{ uri: data.Question }}
                            />
                        </View> :
                        <Text></Text>
                }
                <TouchableOpacity onPress={() => setHidenAnswers(!hidenAnswers)} style={styles.cardTitle}><Text style={{ fontWeight: 'bold', color: route.params.color }} > {hidenAnswers ? "Ẩn đáp án" : "Đáp án"}</Text></TouchableOpacity>
                {hidenAnswers &&
                    <View style={{ borderTopWidth: 1, marginTop: 10, borderColor: route.params.color }}>
                        {
                            data.Answer != "" ?
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        width={windowWidth - 20} // height will be calculated automatically
                                        source={{ uri: data.Answer }}
                                    />
                                </View> :
                                <Text></Text>
                        }
                    </View>
                }
            </View>
        </View>
    )
}

export default PracticeScreen

{/* <TouchableOpacity style={styles.containerAnswer}>
<View >
    <Text style={styles.answerTitle}>Đáp án</Text>
</View>
<MathText
    value={`This text includes math notations and should be wrapped correctly for \( \alpha \) and $\beta$ within the view. nThe following formula shouldn't be inline:$$x_{1,2} = {-b \pm \sqrt{b^2-4ac} \over 2a}$$However the following formula should be inline with the text: \( a^2 + b^2 = c^2 \)`}
    direction="ltr"
    CellRendererComponent={<TouchableOpacity />}
/>
</TouchableOpacity> */}