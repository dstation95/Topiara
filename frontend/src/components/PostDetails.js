import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import haversine from 'haversine-distance'
import { API_URL_PROXY } from '@env'

const PostDetails = ({postId}) => {
    const [post, setPost] = useState(null)
    console.log(postId )


    const fetchPosts = async() => {
        const response = await fetch(`${API_URL_PROXY}/api/posts/singlepost/${postId}`)
        const json = await response.json()
        console.log(json)
        setPost(json)
    }
    useEffect(() => {
    fetchPosts()
    }, [])
    useEffect(() => {
      
    })

  return (
    <View>
    {post &&
    <View>
      <Text>{post.title}</Text>
      <Text>{post.description}</Text>
      <Text>{post.addressGeocodeLat}</Text>
      <Text>{post.addressGeocodeLng}</Text>
      <Text>{post.fullAddress}</Text>
    </View>
    }
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({})