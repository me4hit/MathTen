import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import chekcImage from '../../assets/checked.png'
import { Button } from 'react-native-elements';
const SucessScreen = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/checked.png')}
            />
            <Text style={{ fontSize: 20, fontWeight: '700', marginVertical: 10 }}>Hãy kiểm tra email của bạn</Text>
            <Text style={{ marginHorizontal: 20, textAlign: 'center' }}>Chúng tôi đã gửi email đến <Text style={{ fontWeight: 'bold' }}>{route.params.email}</Text>. Nếu vẫn chưa nhận được thư
            hãy kiểm tra trong hòm thư rác hoặc thử lại</Text>
            <Button
                onPress={() => navigation.navigate("LoginScreen")}
                buttonStyle={{ paddingHorizontal: 30, }}
                containerStyle={{ marginTop: 10 }}
                title="Đồng ý"
                type="outline"
            />
        </View>
    )
}

export default SucessScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
})
