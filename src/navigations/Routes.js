import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

import { AuthContext } from './AuthProvider';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

const Routes = () => {
    const { user, setUser, setUserProfile } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {

        if (user != null) {
            setUserProfile({
                displayName: user.displayName,
                photoURL: user.photoURL
            })
        }
        setUser(user);

        if (initializing) setInitializing(false);


    };

    useEffect(() => {
        console.log('khởi tạo')
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        GoogleSignin.configure({
            webClientId: '398087111571-ncc628d5van02rnmsecr64j1juknf5h5.apps.googleusercontent.com',
        });
        return subscriber; // unsubscribe on unmount


    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>

    )
}

export default Routes
