import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";

const Loadingcat = ({ isVisible, text }) => {
    return (
        <AnimatedLoader
            visible={isVisible}
            overlayColor="rgba(255,255,255,1)"
            source={require("../assets/cat.json")}
            animationStyle={styles.lottie}
            speed={1.5}
        >
            <Text style={styles.text}>{text}</Text>
        </AnimatedLoader>
    )
}

export default Loadingcat

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    lottie: {
        width: 300,
        height: 300
    }
})
