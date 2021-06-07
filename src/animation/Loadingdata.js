import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';

const Loadingdata = () => {
    return (
        // <AnimatedLoader
        //     visible={true}
        //     overlayColor="rgba(255,255,255,1)"
        //     source={require("../assets/loading.json")}
        //     animationStyle={styles.lottie}
        // // speed={1.5}
        // >
        //     {/* <Text style={styles.text}>{text}</Text> */}
        // </AnimatedLoader>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <LottieView style={styles.lottie} source={require("../assets/loading3.json")} autoPlay loop />
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    lottie: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Loadingdata
