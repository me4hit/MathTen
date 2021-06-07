import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

const GameStartScreen = ({ navigation }) => {
    const gameOn = () => {
        console.log("game on")
        navigation.navigate("PlayGameScreen")
    }
    return (
        <View style={styles.container}>
            <View >
                <LottieView style={styles.lottie} source={require("../../assets/game.json")} autoPlay loop />

            </View>
            <View style={styles.information}>
                <Text>Làm 10 câu hỏi ôn tập trong vòng 15 phút bao gồm:</Text>
                <Text>- 5 câu hỏi lí thuyết</Text>
                <Text>- 5 câu hỏi bài tập </Text>
                <Text>* Mini game sẽ tính điểm trong bảng thành tích</Text>
            </View>
            <TouchableOpacity onPress={gameOn} style={styles.cricle}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Bắt đầu</Text>
            </TouchableOpacity>
        </View >
    )
}

export default GameStartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    cricle: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#ff7096',
        marginVertical: 20

    },
    information: {
        // backgroundColor: '#DE3C4B',
        paddingVertical: 20,
        opacity: 0.7
    },
    lottie: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
