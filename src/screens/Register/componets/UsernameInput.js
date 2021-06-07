import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

const UsernameInput = ({ placeholder, icon, styles, setUsername }) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <Input
                containerStyle={{
                    // backgroundColor: 'blue',
                    justifyContent: 'center',
                }}
                inputContainerStyle={{
                    borderWidth: 2,
                    borderRadius: 5,
                    // marginTop: 20,
                    borderColor: "#DFDFDF",
                    backgroundColor:'#F7F7F7'
                    //  marginBottom: 0
                }}
                onFocus={() => {
                    setIsFocus(true)

                }}
                onBlur={() => {

                    setIsFocus(false)
                }}
                inputStyle={{
                    fontSize: 15,
                }}
                placeholder={placeholder}
                leftIcon={icon}

                onChangeText={(text) => {
                    setUsername(text)
                }}
            />
        </View>
    )
}

export default UsernameInput

const styles = StyleSheet.create({})
