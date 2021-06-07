import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
const ButtonLogin = ({ width, title, handleRegister }) => {
  const styles = StyleSheet.create({

    button: {
      borderRadius: 5,

      paddingVertical: 13,
      fontFamily: 'Roboto',
      backgroundColor: '#F65E69'
    },
    container: {
      width: width,
      backgroundColor: '#ffff',
      textTransform: 'lowercase', // Notice this updates the default style
      borderRadius: 5,
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
    },


    text: {
      color: '#F65E69',
      fontSize: 15,
      padding: 3,
    },
  });
  return (
    <Button title={title}
      onPress={() => {
        handleRegister()
      }}

      buttonStyle={styles.button}
      titleStyle={{
        color: '#ffff',
        fontSize: 15,
        // padding:3

      }}
      containerStyle={styles.container}></Button>
  );
};

export default ButtonLogin;


