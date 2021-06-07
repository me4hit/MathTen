import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements';
import ImagePlaceholder from '../../assets/placeholder.png'
import LOGO from '../../assets/LOGO.png'

import EmailInput from './componets/EmailInput';
import PasswordsInput from './componets/PasswordsInput';
import ButtonLogin from './componets/ButtonLogin';

import { AuthContext } from '../../navigations/AuthProvider'
import UsernameInput from './componets/UsernameInput';

import { checkRegister } from '../../validate/validate'
import Spinner from 'react-native-loading-spinner-overlay';
import Loadingcat from '../../animation/Loadingcat'
import Notify from '../../animation/Notify';
import DismissKeyboard from '../../help/DismissKeyboard';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cofirmpassword, setCofirmPassword] = useState();
    const [username, setUsername] = useState();
    const [isLoading, setIsloading] = useState(false);
    const { register } = useContext(AuthContext);
    const [haveerrorLogin, setHaveErrorLogin] = useState(false);

    const [errorLogin, setErrorLogin] = useState();

    const [error, setError] = useState()

    const handleRegister = () => {
        setError(checkRegister(username, email, password, cofirmpassword).message)
        if (checkRegister(username, email, password, cofirmpassword).check) {
            register(email, password, username, setError, setIsloading, setHaveErrorLogin, setErrorLogin)

        }

        // register(email, password)
    }


    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View style={{ alignItems: 'center' }}>
                    <Image source={LOGO} style={styles.image} />
                </View>
                <View style={{ flex: 3 }}>
                    <View style={styles.input}>
                        <UsernameInput placeholder={'Họ và tên'}
                            setUsername={setUsername}
                            icon={
                                <Icon name='user'
                                    type='feather'
                                    size={23}
                                    color='#666666'
                                    style={styles.icon} />
                            }></UsernameInput>
                        <EmailInput placeholder={'Email'}
                            setEmail={setEmail}
                            icon={
                                <Icon name='email'
                                    type='fontisto'
                                    size={23}
                                    color='#666666'
                                    style={styles.icon} />
                            }></EmailInput>
                        <PasswordsInput placeholder={'Mật khẩu'}
                            setPassword={setPassword}
                            icon={
                                <Icon name='lock'
                                    type='feather'
                                    size={23}
                                    color='#666666'
                                    style={styles.icon} />
                            }></PasswordsInput>
                        <PasswordsInput placeholder={'Nhập lại mật khẩu'}
                            error={error}
                            setPassword={setCofirmPassword}
                            icon={
                                <Icon name='lock'
                                    type='feather'
                                    size={23}
                                    color='#666666'
                                    style={styles.icon} />
                            }></PasswordsInput>
                    </View>
                    <View style={styles.button}>
                        <ButtonLogin title="Đăng ký" width={'100%'} handleRegister={handleRegister} />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Button disabled='true' disabledTitleStyle={
                                {
                                    // fontWeight: 'bold',
                                    color: '#686868',
                                    fontSize: 14,
                                    opacity: 0.7

                                }
                            } title='Đã có tài khoản ?' type="clear"
                                buttonStyle={{
                                    paddingHorizontal: 2
                                }}
                                titleStyle={{
                                    // fontWeight: 'bold',
                                    color: '#F65E69',
                                    fontSize: 14,
                                    opacity: 0.9

                                }}>

                            </Button>
                            <Button title='Đăng nhập' type="clear"
                                onPress={() => navigation.navigate('LoginScreen')} buttonStyle={{
                                    paddingHorizontal: 2
                                }}
                                titleStyle={{
                                    // fontWeight: 'bold',
                                    color: '#F65E69',
                                    opacity: 0.9,
                                    fontSize: 14,

                                }}>

                            </Button>

                        </View>

                    </View>

                </View>
                <View style={{ flex: 2, alignItems: 'flex-start' }}>
                </View>
                <Loadingcat isVisible={isLoading} text={'Chờ tí bạn ơi ...'} />
                <Notify text={errorLogin} isVisible={haveerrorLogin} setVisible={setHaveErrorLogin} />
            </View>
        </DismissKeyboard>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    image: { width: 120, height: 120, marginLeft: 10, marginTop: 20 },
    container: {
        flex: 1,

        backgroundColor: '#fff'
    },
    icon: {
        marginLeft: 15
    },
    input: {
        // marginTop: 20,
        flex: 6,
        // alignSelf: 'stretch',
        // backgroundColor:'red'
    },
    button: {
        // backgroundColor:'red',
        paddingHorizontal: 10,
        flex: 3,
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    text: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#919191'
    }

})
