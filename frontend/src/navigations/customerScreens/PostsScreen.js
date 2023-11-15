import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button,
        TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Dimensions } from "react-native";
import { API_URL_PROXY } from '@env'
import AddPosts from '../../components/AddPost';
import { useLogin } from '../../contexts/LoginProvider';
import PostDetails from '../../components/postDetails'; 



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const PostsScreen = ({navigation}) => {
const [products, setProducts] = useState(null)
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
    const fetchPosts = async() => {
        const response = await fetch(`${API_URL_PROXY}/api/posts/${userData._id}`)
        const json = await response.json()
        console.log(json)
        setProducts(json)
    }
    Object.keys(userData).length != 0 && fetchPosts()
    }, [userData, addPostModalOpen])   

    const AddNewPost = () => {
        setAddPostModalOpen(false)
    }

    const Item = ({ post }) => (
        <TouchableOpacity onPress={() => handlePostPress(post._id)}>
        <View style={styles.item}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.title}>{post.addressGeocodeLat} {post.addressGeocodeLng}</Text>
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
                 <PostDetails postId={clickedPost}/>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <Text
            onPress={() => alert('this is home')}
            style={styles.text}
            > Post Screen
            </Text>
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