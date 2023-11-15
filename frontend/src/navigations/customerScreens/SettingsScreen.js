import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView} from 'react-native';
import EditCustomerProfile from '../../components/EditCustomerProfile';
import { useLogin } from '../../contexts/LoginProvider';

const SettingsScreen = ({navigation}) => {
    const {isLoggedIn, setIsLoggedIn, userData} = useLogin()
    const [modalOpen, setModalOpen] = useState(false)

    const handlePress = async() => {
        const token = await AsyncStorage.getItem('token')
        if(token !== null) {
            await AsyncStorage.removeItem('token')
        }
        setIsLoggedIn(false)
    }
    const EditProfile = async() => {
        console.log(values)
    }
    return (
        <View style={styles.container}>
        <Modal visible={modalOpen} animationType='slide'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}}>
                    <View style={Platform.OS === 'ios' && {top: 40}}>
                 <Button title='Close' onPress={() => setModalOpen(false)}/>
                 </View>
                 <EditCustomerProfile EditProfile={EditProfile}/>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* <View style={{flex: 1, flexDirection: "column"}}> */}
            
                <View style={styles.inputs}>
                  <View style={{flex: 1}}>
                   <Text style={{ marginBottom: 10,}}>Username</Text>
                   <Text style={{ fontWeight : "bold" }}>{userData.name}</Text>
                  </View>
                  <View style={{flex: 1,}}>
                    <Text style={{alignSelf: 'flex-end'}}>
                        Edit
                    </Text>
                  </View>
                </View>
                <View style={styles.inputs}>
                  <View style={{flex: 1}}>
                   <Text style={{ marginBottom: 10,}}>Username</Text>
                   <Text style={{ fontWeight : "bold" }}>{userData.name}</Text>
                  </View>
                  <View style={{flex: 1,}}>
                    <Text style={{alignSelf: 'flex-end'}}>
                        Edit
                    </Text>
                  </View>
                </View>
                <View style={styles.inputs}>
                  <View style={{flex: 1}}>
                   <Text style={{ marginBottom: 10,}}>Username</Text>
                   <Text style={{ fontWeight : "bold" }}>{userData.name}</Text>
                  </View>
                  <View style={{flex: 1,}}>
                    <Text style={{alignSelf: 'flex-end'}}>
                        Edit
                    </Text>
                  </View>
                </View>
            {/* </View> */}
            {/* </ScrollView> */}
            <View style={styles.profileInfo}>
                <Text>{userData.name}</Text>
                <Text>{userData.email}</Text>
                {userData.address ? <Text>{userData.address}</Text> : <Text> No Address Available</Text>}
                <TouchableOpacity style={styles.editButton} onPress={() => setModalOpen(true)}>
                    <Text> Edit Profile</Text>
                </TouchableOpacity>
            </View>
        <TouchableOpacity style={styles.logoutButton}
        onPress={handlePress}>
            <Text>Log Out?</Text>
        </TouchableOpacity>
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
    editButton: {
        right: 0,
        left: 0,
        bottom: 100,
        backgroundColor: 'lightgreen',
        padding: 20,
    },
    logoutButton: {
        // position: null,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'lightgreen',
        padding: 20,
    },
    inputs: {
        // marginTop: 25,
        // paddingHorizontal: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row", 
        justifyContent:'space-between', 
        alignItems: 'flex-start', 
        flex: 1
      },
})