import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import LOGO from '../assets/LOGO.png'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}><Image source={LOGO} style={styles.image} /></View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    image: { width: 150, height: 150, marginLeft: 10, marginTop: 20, alignItems: 'center' }

})
