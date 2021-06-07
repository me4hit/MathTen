import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Icon, Button } from 'react-native-elements';

import ImagePlaceholder from '../../assets/placeholder.png'
import LOGO from '../../assets/LOGO.png'

import EmailInput from './componets/EmailInput';
import PasswordsInput from './componets/PasswordsInput';
import ButtonLogin from './componets/ButtonLogin';
import ButtonGoogle from './componets/ButtonGoogle';

import { AuthContext } from '../../navigations/AuthProvider'

import { checkLogin } from '../../validate/validate'

import Spinner from 'react-native-loading-spinner-overlay';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import Loadingcat from '../../animation/Loadingcat'
import Notify from '../../animation/Notify';
import errorAnimator from '../../assets/error.json'
import DismissKeyboard from '../../help/DismissKeyboard';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorLogin, setErrorLogin] = useState();
    const [haveerrorLogin, setHaveErrorLogin] = useState(false);

    const { login, setUser } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);


    async function onGoogleButtonPress(setIsLoading,) {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        setIsLoading(true)
        await auth().signInWithCredential(googleCredential).then(() => {
            console.log("login bằng google")
            // setUser(auth.currentUser)
            setIsLoading(false)
            console.log('log xong')
        }).catch(err => {
            console.log('log xong lỗi')
            setIsLoading(false)
        });

    }


    const handleLogin = async () => {
        console.log(email)
        console.log(password)

        setErrorPassword(checkLogin(email, password).message)

        if (checkLogin(email, password).check) {
            await login(email, password, setErrorPassword, setIsLoading, setErrorLogin, setHaveErrorLogin)

        } else {
            console.log('sai')

        }
    }




    return (
        <DismissKeyboard style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}><Image source={LOGO} style={styles.image} /></View>

                <View style={{ flex: 4, alignItems: 'flex-start' }}>
                    <View style={styles.input}>
                        <EmailInput placeholder={'Email'}
                            setEmail={setEmail}
                            errorEmail={errorEmail}
                            icon={
                                <Icon name='email'
                                    type='fontisto'
                                    size={23}
                                    color='#666666'
                                    style={styles.icon} />
                            }></EmailInput>
                        <PasswordsInput placeholder={'Mật khẩu'}
                            setPassword={setPassword}
                            errorPassword={errorPassword}

                            icon={
                                <Icon name='lock'
                                    type='feather'
                                    size={23}
                                    color='#666666'
                                    style={styles.icon} />
                            }></PasswordsInput>
                    </View>
                    <View style={styles.button}>
                        <ButtonLogin title={'Đăng nhập'} width={'100%'} handleLogin={handleLogin} />


                        <Text style={styles.text}>hoặc</Text>
                        <ButtonGoogle width={'100%'}
                            onGoogleButtonPress={onGoogleButtonPress}
                            setIsLoading={setIsLoading}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Button title='Quên mật khẩu?' type="clear"
                                onPress={() => navigation.navigate("ForgotPasswordScreen")}
                                buttonStyle={{
                                    paddingHorizontal: 2
                                }}
                                titleStyle={{
                                    // fontWeight: 'bold',
                                    fontSize: 14,
                                    color: '#F65E69',
                                    opacity: 1
                                }}>

                            </Button>
                            <Button title='Đăng ký' type="clear"
                                onPress={() => navigation.navigate('RegisterScreen')}
                                buttonStyle={{
                                    paddingHorizontal: 2
                                }}
                                titleStyle={{
                                    fontSize: 14,
                                    color: '#F65E69',
                                    opacity: 0.9

                                }}>

                            </Button>

                        </View>

                    </View>

                </View>
                <View style={{ flex: 2, alignItems: 'flex-start' }}>
                </View>

                <Loadingcat isVisible={isLoading} text={'Chờ tí bạn ơi ...'} />
                <Notify text={errorLogin} animation={errorAnimator} isVisible={haveerrorLogin} setVisible={setHaveErrorLogin} />
            </View>
        </DismissKeyboard>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center'
    },
    icon: {
        marginLeft: 15
    },
    input: {
        flex: 4,
        alignSelf: 'stretch',
        // backgroundColor:'red'
    },
    button: {
        //  backgroundColor: 'green',
        paddingHorizontal: 10,
        flex: 6,
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    text: {
        marginTop: 10,
        // fontWeight: 'bold',
        color: '#919191'

    },
    image: { width: 120, height: 120, marginLeft: 10, marginTop: 20, alignItems: 'center' }

})
