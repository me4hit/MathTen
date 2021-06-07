import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

const EmailInput = ({ placeholder, icon, styles, setEmail }) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <Input
            containerStyle={{
                // backgroundColor: 'green',
                flex:1,

            }}
            inputContainerStyle={{
                borderWidth: 2,
                borderRadius: 5,
                backgroundColor:'#F7F7F7',
                borderColor: "#DFDFDF",

            }}
            onFocus={() => {
                setIsFocus(true)

            }}
            onBlur={() => {

                setIsFocus(false)
            }}
            inputStyle={{
                fontSize: 15
            }}
            placeholder={placeholder}
            leftIcon={icon}

            onChangeText={(text) => {
                setEmail(text)
            }}
        />
    )
}

export default EmailInput

const styles = StyleSheet.create({})
