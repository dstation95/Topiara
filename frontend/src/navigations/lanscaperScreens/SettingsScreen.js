import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Keyboard, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback,Button } from 'react-native';
import AddPosts from '../../components/AddPost';
import EditAddress from '../../components/editProfile/EditAddress';
import { useLogin } from '../../contexts/LoginProvider';
import { API_URL_PROXY, GOOGLE_MAPS_API_KEY } from '@env'

const SettingsScreen = ({navigation}) => {
    const {isLoggedIn, setIsLoggedIn, userData, setUserData} = useLogin()
    const [editAddressModal, setEditAddressModal] = useState(false)

    const updateUserData = async() => {
        console.log('updating user')
        const response = await fetch(`${API_URL_PROXY}/api/users/${userData._id}`)
        const user = await response.json()
        console.log('USER', user)
        if(response.ok) {
        setUserData(user)
        }
    }
    const handlePress = async() => {
        const token = await AsyncStorage.getItem('token')
        if(token !== null) {
            await AsyncStorage.removeItem('token')
        }
        setIsLoggedIn(false)
    }
    const submitAddress = async() => {
        updateUserData()
        setEditAddressModal(false)
    }
    console.log(editAddressModal)
    return (
        <View style={styles.container}>
        <Text style={{flex: 1}}>{userData.address}</Text>
        <TouchableOpacity style={styles.logoutButton}>
            <Text onPress={() => setEditAddressModal(true)}> Edit Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}
        onPress={handlePress}>
            <Text>Log Out</Text>
        </TouchableOpacity>
        <Text>Hello</Text>

        {/* Edit Address Modal*/}
        <Modal visible={editAddressModal} animationType='slide'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}}>
                    <View style={Platform.OS === 'ios' && {top: 40}}>
                 <Button title='Close' onPress={() => setEditAddressModal(false)}/>
                 </View>
                 <EditAddress onSumbitAddress={() =>submitAddress()}/>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    logoutButton: {
        // position: null,
        right: 0,
        left: 0,
        bottom: 50,
        backgroundColor: 'lightgreen',
        padding: 20,
    }
})