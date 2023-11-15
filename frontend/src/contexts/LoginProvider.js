import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL_PROXY } from '@env'

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const fetchUser = async() => {
    const token = await AsyncStorage.getItem('token');
    if(token !== null) {
        console.log('token', token)
        const response = await fetch(`${API_URL_PROXY}/api/users/loginWithToken`, {
            method: 'GET',
            headers: { authorization: token },
        })
        const json = await response.json()
        if(response.ok) {
            setIsLoggedIn(true)
            console.log('json',json)
            setUserData(json)  // remove passwords from the user data
        }
        else{
            setIsLoggedIn(false)
            setUserData({}) 
        }
    }
  }
  useEffect(() => {
  fetchUser()
  }, [])
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;