import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements';
import LottieView from 'lottie-react-native';

const Notify = ({ animation, text, isVisible, setVisible }) => {
    return (
        <Overlay overlayStyle={styles.overlay} isVisible={isVisible} onBackdropPress={() => { setVisible(false) }}>
            <LottieView
                style={styles.LottieView}
                autoPlay loop
                source={require('../assets/caterr.json')}
            />
            <Text style={styles.text}>{text}</Text>
        </Overlay>
    )
}

export default Notify

const styles = StyleSheet.create({
    LottieView: {
        alignSelf: 'center',
        height: 250,
        width: 250,
    },
    overlay: {
        width: 350,
        height: 300,
        borderRadius:20
        // backgroundColor:'rgba(0, 0, 0, 0.3)'

    }
    , text: {
        textAlign: 'center',
        color: "#F65E69",
        fontSize:15,
        fontWeight:'bold'
    }
})
