import { StyleSheet, Text, View } from 'react-native'
import HaversineGeolocation from 'haversine-geolocation';
import React, { useEffect, useState } from 'react'
import { API_URL_PROXY } from '@env'
import { useLogin } from '../contexts/LoginProvider'

const LandscaperPostDetails = ({postId}) => {
    const [post, setPost] = useState(null)
    const [user, setUser] = useState(null)
    const [userDistance, setUserDistance] = useState(null)
    const {userData} = useLogin()
    console.log(postId)


    const fetchPosts = async() => {
        const response = await fetch(`${API_URL_PROXY}/api/posts/singlepost/${postId}`)
        const json = await response.json()
        console.log(json)
        setPost(json)
        const userResponse = await fetch(`${API_URL_PROXY}/api/users/${userData._id}`)
        const userJson = await userResponse.json()
        console.log('user', userJson)
        setUser(userJson)
    }
    useEffect(() => {
    fetchPosts()
    }, [])
    useEffect(() => {
        if(post !== null && user && user.addressGeocodeLat && post.addressGeocodeLat) {
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
        if (points && points != {}) {
        console.log('points', points)
        setUserDistance(HaversineGeolocation.getDistanceBetween(points[0], points[1], 'mi'))
        }
    }
    }, [post, user])

  return (
    <View>
    {post &&
    <View>
      <Text>{post.title}</Text>
      <Text>{post.description}</Text>
      <Text>{post.addressGeocodeLat}</Text>
      <Text>{post.addressGeocodeLng}</Text>
      <Text>{post.fullAddress}</Text>
      <Text>{userData.name}</Text>
    </View>
    }
    {userDistance && 
    <Text style={{fontWeight: 'bold'}}>{userDistance} miles</Text>
    }
    </View>
  )
}

export default LandscaperPostDetails

const styles = StyleSheet.create({})