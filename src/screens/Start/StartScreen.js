import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonLogin from './componets/ButtonLogin';
import ButtonRegister from './componets/ButtonRegister';
const StartScreen = ({navigation}) => {
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Text style={styles.title}>mathten learning</Text>
        <Text style={styles.subtitle}>
          Ứng dụng ôn thi toán vào 10 hiệu quả và miễn phí
        </Text>
      </View>
      <View style={styles.button}>
        <ButtonLogin title='Đăng nhập' width={'90%'} navigation={navigation} />
        <ButtonRegister  navigation={navigation}/>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  },
  button: { flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' },

  title: {
    fontSize: 30,
    color: '#F65E69'
  },
  subtitle: {
    opacity: 0.5

  },

  header: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
