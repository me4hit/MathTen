import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const ResultGameScreen = ({ route, navigation }) => {
    const [complete, setComplete] = useState(route.params.complete)
    const [numberQuestions, setNumberQuestions] = useState(route.params.numberQuestions)
    const [trueAnswer, setTrueAnswer] = useState(route.params.trueAnswer)
    const [falseAnswer, setFalseAnswer] = useState(route.params.falseAnswer)
    const [scores, setScores] = useState(route.params.scores)
    return (

        <View style={styles.container}>

            <LinearGradient colors={['#FF6C65', '#E7A7FF']} style={styles.linearGradient}>
                <Button
                    type="clear"
                    onPress={() => navigation.navigate("Game")}
                    containerStyle={{ top: 0, left: 0, }}
                    buttonStyle={{ width: '10%', borderRadius: 50 }}
                    icon={
                        <Icon
                            name="keyboard-backspace"
                            size={32}
                            color="white"
                            type="MaterialIcons"
                        />
                    }
                />
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: "#F0ACD0", alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: '#F1BADC', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: '#F683C3' }}>Điểm</Text>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: '#F683C3' }}>{scores}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <View style={{
                        flex: 1,
                        height: 200,
                        width: '90%',
                        position: 'absolute',
                        top: '80%',
                        // width: 100, height: 100,
                        backgroundColor: '#fff',
                        // marginHorizontal: 30,
                        borderRadius: 40,
                        ...styles.boxShadow,
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ ...styles.inforContainer }}>
                                <View style={{ ...styles.containerText }}>
                                    <View style={{ ...styles.textStyle, backgroundColor: "#26DA86", }}></View>
                                    <Text >{complete} %</Text>
                                </View>
                                <Text >Hoàn thành</Text>
                            </View>
                            <View style={{ ...styles.inforContainer }}>
                                <View style={{ ...styles.containerText, }}>
                                    <View style={{ ...styles.textStyle, backgroundColor: "#26DA86", }}></View>
                                    <Text >{numberQuestions}</Text>
                                </View>
                                <Text >Câu hỏi</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ ...styles.inforContainer }}>
                                <View style={{ ...styles.containerText, }}>
                                    <View style={{ ...styles.textStyle, backgroundColor: "#1B8EF8", }}></View>
                                    <Text >{trueAnswer}</Text>
                                </View>
                                <Text >Chính xác</Text>
                            </View>
                            <View style={{ ...styles.inforContainer }}>
                                <View style={{ ...styles.containerText, }}>
                                    <View style={{ ...styles.textStyle, backgroundColor: "#F65E69", }}></View>
                                    <Text >{falseAnswer}</Text>
                                </View>
                                <Text >Sai</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    containerStyle={{ marginBottom: 10, marginTop: 30 }}
                    buttonStyle={{
                        backgroundColor: "#5493B4",
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                    }}
                    icon={<Icon
                        name="reload1"
                        size={20}
                        color="white"
                        type="antdesign"
                    />}

                />
                <Text>Chơi lại</Text>
            </View>

        </View >
    )
}

export default ResultGameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative'

    },
    linearGradient: {
        width: '100%',
        position: 'relative',
        flex: 1,
        height: Dimensions.get('window').height / 2,
        top: 0,
        left: 0,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        // position: 'absolute',
        // alignItems: "center",
        // justifyContent: 'center',
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
    inforContainer: { flex: 1, justifyContent: "center", paddingLeft: 40, },
    textStyle: {
        width: 15, height: 15, borderRadius: 8, marginRight: 5
    },
    containerText: { flexDirection: 'row', alignItems: "center", marginBottom: 5 }
})
