import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

const ButtonRegister = ({ navigation }) => {
  return (
    <Button title='Đăng ký'
      onPress={() => {
        navigation.navigate('RegisterScreen')
      }}
      buttonStyle={styles.button}
      titleStyle={{
        color: '#F65E69',
        fontSize: 15,
        margin: 3

      }}
      containerStyle={styles.container}></Button>
  );
};

export default ButtonRegister;

const styles = StyleSheet.create({

  button: {
    // borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
    borderWidth: 0.8,
    paddingVertical: 10,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
  },
  container: {
    width: '90%',
    backgroundColor: '#ffff',
    textTransform: 'lowercase', // Notice this updates the default style
    // borderRadius: 11,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 4,
  },


  text: {
    color: '#F65E69',
    fontSize: 20,
    padding: 3,
  },
});
