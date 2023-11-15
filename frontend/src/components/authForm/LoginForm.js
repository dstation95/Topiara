import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLogin } from '../context/LoginProvider';
// import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput.js';
import FormSubmitButton from './FormSubmitButton';
import { API_URL_PROXY } from '@env'
import { useLogin } from '../../contexts/LoginProvider';

const LoginForm = ({navigation}) => {
  const { setIsLoggedIn, setUserData} = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidObjField = obj => {
    return Object.values(obj).every(value => value.trim());
  };
  
const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 2500);
  };
  
const isValidEmail = value => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(email)) return updateError('Invalid email!', setError);

    if (!password.trim() || password.length < 8)
      return updateError('Password is too short!', setError);

    return true;
  };

  const submitForm = async() => {
    console.log('called', email)
    if(isValidForm()) {
        console.log('works')
        const response = await fetch(`${API_URL_PROXY}/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email:email, password: password})
        })
        const json = await response.json()
        console.log(json)
        setError(null)
        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
          console.log('works2')
            setUserInfo({email: '', password: ''})
            setIsLoggedIn(true)
            setUserData(json)
            await AsyncStorage.setItem('token', json.token)
            navigation.disptach(
                StackActions.replace('Posts')
            )
        }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='example@email.com'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={value => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title='Login' />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;