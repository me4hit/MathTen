import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native'
import Routes from './src/navigations/Routes';
import {AuthProvider} from './src/navigations/AuthProvider';



const App = () => {
  return (
    <AuthProvider >
      <Routes />
    </AuthProvider >

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
