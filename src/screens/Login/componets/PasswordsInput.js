import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

const PasswordsInput = ({ placeholder, icon, styles, setPassword, errorPassword }) => {
    return (
        <Input
            inputContainerStyle={{
                marginTop: 0,
                borderWidth: 2,
                borderRadius: 5,
                borderColor: '#DFDFDF',
                backgroundColor:'#F7F7F7'


            }}

            errorMessage={errorPassword}

            inputStyle={{
                fontSize: 15,
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
