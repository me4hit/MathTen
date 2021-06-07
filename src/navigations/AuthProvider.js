import React, { createContext, useState } from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
                userProfile, setUserProfile,
                login: async (email, password, setErrorPassword, setIsLoading, setErrorLogin, setHaveErrorLogin) => {

                    try {
                        setIsLoading(true)
                        await auth().signInWithEmailAndPassword(email, password);
                        // setUser(auth.currentUser)
                        setIsLoading(false);
                    } catch (e) {
                        console.log(e)
                        setHaveErrorLogin(true)
                        if (e.code == 'auth/invalid-email') {
                            setErrorPassword('Email không chính xác')
                            setErrorLogin('Email không chính xác')

                        }
                        if (e.code == ' auth/user-disabled') {
                            setErrorPassword('Tài khoản bị vô hiệu hoá')
                            setErrorLogin('Tài khoản bị vô hiệu hoá')

                        }
                        if (e.code == 'auth/user-not-found') {
                            setErrorPassword('Không tìm thấy tài khoản')
                            setErrorLogin('Không tìm thấy tài khoản')

                        }
                        if (e.code == 'auth/wrong-password') {
                            setErrorPassword('Sai mật khẩu')
                            setErrorLogin('Sai mật khẩu')

                        }
                        if (e.code == 'auth/too-many-requests') {
                            setErrorPassword('Tài khoản đang bị chặn truy cập, thử lại sau')
                            setErrorLogin('Tài khoản đang bị chặn truy cập, thử lại sau')

                        }
                        setIsLoading(false)

                    }
                },
                register: async (email, password, username, setError, setIsloading, setHaveErrorLogin, setErrorLogin) => {
                    try {
                        setIsloading(true)
                        console.log('username' + username)
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(async () => {
                                // await auth().currentUser.sendEmailVerification();
                                await auth().currentUser.updateProfile({
                                    displayName: username,
                                    UrlAvatar: "",
                                    Score: 0
                                });
                                setUserProfile({
                                    displayName: username,
                                    photoURL: "",
                                    Score: 0
                                })
                                setIsloading(false)
                            })
                            .catch(e => {
                                setHaveErrorLogin(true)
                                if (e.code == 'auth/email-already-in-use') {
                                    setError('Email đã được đăng ký')
                                    setErrorLogin('Email đã được đăng ký')
                                }
                                if (e.code == 'auth/invalid-email') {
                                    setError('Email không hợp lệ')
                                    setErrorLogin('Email không hợp lệ')
                                }
                                if (e.code == 'auth/operation-not-allowed') {
                                    setError('Đã xảy ra lỗi')
                                    setErrorLogin('Đã xảy ra lỗi')
                                }
                                if (e.code == 'auth/weak-password') {
                                    setError('Mật khẩu quá yếu')
                                    setErrorLogin('Mật khẩu quá yếu')
                                }
                                setIsloading(false)
                                console.log('Something went wrong with sign up: ', e);

                            });
                    } catch (e) {
                        setIsloading(false)
                        console.log(e);
                    }
                },


                logout: async () => {
                    try {
                        await GoogleSignin.signOut()
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}
        >
            { children}
        </AuthContext.Provider >
    )
}

