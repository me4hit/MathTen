import React from 'react'
import {  StyleSheet ,TouchableWithoutFeedback, Keyboard } from 'react-native'

const DismissKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
}

export default DismissKeyboard

const styles = StyleSheet.create({})
