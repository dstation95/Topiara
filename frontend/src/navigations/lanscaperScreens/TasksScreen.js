import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLogin } from '../../contexts/LoginProvider';

const LandscaperTasksScreen = ({navigation}) => {
    const {userData, setUserData} = useLogin()
    console.log('userData', userData)
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{userData.name}</Text>
        <Text style={styles.text}>{userData.address}</Text>
        </View>
    )
}

export default LandscaperTasksScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,255,0, 0.25)'
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})