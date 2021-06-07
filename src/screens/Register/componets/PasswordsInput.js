import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

const PasswordsInput = ({ placeholder, icon, styles, setPassword, error }) => {
    return (
        <Input
            containerStyle={{
                // backgroundColor: 'blue',
                flex: 1,
            }}
            inputContainerStyle={{
                // marginTop: -15,
                backgroundColor:'#F7F7F7',
                borderWidth: 2,
                borderRadius: 5,
                borderColor: '#DFDFDF'
            }}
            errorMessage={error}
            inputStyle={{
                fontSize: 15
            }}
            secureTextEntry={true}
            placeholder={placeholder}
            leftIcon={icon}
            style={{
            }}
            onChangeText={(text) => {
                setPassword(text)
            }}
        />
    )
}

export default PasswordsInput

const styles = StyleSheet.create({})
