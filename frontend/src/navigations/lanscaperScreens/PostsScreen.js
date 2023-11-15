import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button,
        TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Dimensions } from "react-native";
import { API_URL_PROXY } from '@env'
import AddPosts from '../../components/AddPost';
import { useLogin } from '../../contexts/LoginProvider';
// import PostDetails from '../../components/PostDetails';
import HaversineGeolocation from 'haversine-geolocation';
import LandscaperPostDetails from '../../components/LandscaperPostsDetails';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const PostsScreen = ({navigation}) => {
const [products, setProducts] = useState(null)
const [userFullInfo, setUserFullInfo] = useState(null)
const [user, setUser] = useState(null)
const [addPostModalOpen, setAddPostModalOpen] = useState(false)
const [postViewModalOpen, setPostViewModalOpen] = useState(false)
const [clickedPost, setClickedPost] = useState(0)
const {userData} = useLogin()

    const handlePostPress = (postId) => {
        setPostViewModalOpen(true)
        setClickedPost(postId)
    }
    useEffect(() => {
    console.log('USERDATA', userData)
    const fetchUserData = async() => {
        const response = await fetch(`${API_URL_PROXY}/api/users/${userData._id}`)
        const json = await response.json()
        // console.log('user', userJson)
        return json
    }
    const fetchPosts = async(userFullInfo) => {
        const response = await fetch(`${API_URL_PROXY}/api/posts/`)
        const json = await response.json()
        // if(response.ok) {
        // const points = [
        //     {
        //         latitude: json.addressGeocodeLat,
        //         longitude: json.addressGeocodeLng
        //     },
        //     {
        //         latitude: userFullInfo.addressGeocodeLat,
        //         longitude: userFullInfo.addressGeocodeLng
        //     }
        // ];
         
        // Distance in miles
        // console.log('points', points)
        // const distanceBetween = HaversineGeolocation.getDistanceBetween(points[0], points[1], 'mi')
        // console.log(distanceBetween)
        // json.push({distance: distanceBetween})
        // console.log(json)
        setProducts(json)
        const userResponse = await fetch(`${API_URL_PROXY}/api/users/${userData._id}`)
        const userJson = await userResponse.json()
        console.log('user', userJson)
        setUser(userJson)
    }
    const fetchUser = async() => {
        const userResponse = await fetch(`${API_URL_PROXY}/api/users/${userData._id}`)
        const userJson = await userResponse.json()
        console.log('user', userJson)
        setUser(userJson)
    }
    
    // const userFullInfo = fetchUserData()
     (Object.keys(userData).length != 0) && fetchPosts()
    }, [userData, addPostModalOpen , userFullInfo])   
    
    
    const AddNewPost = () => {
        setAddPostModalOpen(false)
    }

    const calculateDistance = (post) => {
            if(post && post !== null && user && user.addressGeocodeLat && post.addressGeocodeLat) {
            const points = [
                {
                    latitude: user.addressGeocodeLat,
                    longitude: user.addressGeocodeLng
                },
                {
                    latitude: post.addressGeocodeLat,
                    longitude: post.addressGeocodeLng
                }
            ];
             
            // Distance in miles
            if (points && Object.keys(points).length != 0) {
            return HaversineGeolocation.getDistanceBetween(points[0], points[1], 'mi')
            }
        }
    }

    const Item = ({ post }) => (
        <TouchableOpacity onPress={() => handlePostPress(post._id)}>
        <View style={styles.item}>
          <Text style={styles.title}>{post.title}</Text>
          {post.addressGeocodeLat && <Text style={styles.title}>{calculateDistance(post)} miles</Text>}
          <Text style={styles.title}>{post.address}</Text>
        </View>
        </TouchableOpacity>
      );
      const renderItem = ({ item }) => (
        <Item post={item} />
      );
    return (
        <View  style={styles.container}>
            <Button title='Add Post' onPress={() => setAddPostModalOpen(true)}/>
            <Modal visible={addPostModalOpen} animationType='slide'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}}>
                    <View style={Platform.OS === 'ios' && {top: 40}}>
                 <Button title='Close' onPress={() => setAddPostModalOpen(false)}/>
                 </View>
                 <AddPosts AddNewPost={AddNewPost}/>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
            <Modal visible={(clickedPost && postViewModalOpen)} animationType='slide'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}}>
                    <View style={Platform.OS === 'ios' && {top: 40}}>
                 <Button title='Close' onPress={() => setPostViewModalOpen(false)}/>
                 </View>
                 <LandscaperPostDetails postId={clickedPost}/>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default PostsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'lightgreen'
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    item: {
       height: 60,
       width: (0.75 * width),
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 3,
        
        marginVertical: 8,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
    },
    title: {


    }
})