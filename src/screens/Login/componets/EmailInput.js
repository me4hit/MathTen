import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

const EmailInput = ({ placeholder, icon, styles, email, setEmail }) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <Input
            inputContainerStyle={{
                borderWidth: 2,
                borderRadius: 5,
                marginTop: 20,
                borderColor: "#DFDFDF",
                backgroundColor:'#F7F7F7'

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
            // placeholderStyle={{ color: 'red' }}
            leftIcon={icon}

            onChangeText={(text) => {
                setEmail(text)
            }}
        />
    )
}

export default EmailInput

const styles = StyleSheet.create({})
