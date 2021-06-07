import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import ImageGoogle from '../../../assets/google.png'

const ButtonGoogle = ({ width, onGoogleButtonPress, setIsLoading }) => {
    const styles = StyleSheet.create({

        button: {
            // borderWidth: 1,
            // borderColor: '#E5E5E5',
            // borderRadius: 11,
            // borderWidth: 0.5,
            // borderColor: '#BCBCBC',
            paddingVertical: 13,
            fontFamily: 'Roboto',
            backgroundColor: '#fff'
        },
        container: {

            width: width,
            backgroundColor: '#000',
            textTransform: 'lowercase', // Notice this updates the default style
            // borderRadius: 11,
            marginTop: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 1,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 4,
        },


        text: {
            color: '#F65E69',
            fontSize: 15,
            padding: 3,
        },
    });
    return (
        <Button
            title='Google'
            onPress={() => onGoogleButtonPress(setIsLoading).then(() => {
                setIsLoading(false);
            })}
            icon={
                <Image source={ImageGoogle} style={{ justifyContent: 'center', width: 20, height: 20, marginRight: 10, marginLeft: -22 }} />

            }
            buttonStyle={styles.button} titleStyle={{
                color: '#000',
                fontSize: 15,
                // padding:3

            }} containerStyle={styles.container}></Button>
    );
};

export default ButtonGoogle;


