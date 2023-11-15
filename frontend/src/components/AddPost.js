import { View, Text, StyleSheet, TextInput, Button, Input } from 'react-native'
import React, { useState } from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import FlatButton from './button'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { API_URL_PROXY, GOOGLE_MAPS_API_KEY } from '@env'
import { useLogin } from '../contexts/LoginProvider'

const postSchema = yup.object({
  title: yup.string().required().min(4),
  description: yup.string(),
  price: yup.string().required().test('is-price','Must be valid number', (val) => {
    return parseInt(val) > 0;
  })

})

const AddPosts = ({AddNewPost}) =>  {
  const {userData} = useLogin()
  const [newPost, setNewPost] = useState(null)
  const [address, setAddress] = useState(null)
  const [fullAddress, setFullAddress] = useState(null)
  const [addressGeocodeLat, setAddressGeocodeLat] = useState(null)
  const [addressGeocodeLng, setAddressGeocodeLng] = useState(null)
  const [addressUrl, setAddressUrl] = useState(null)

  const addPost = async(post) => {
    setNewPost(post)
    const {description, title, price} = post
    console.log(description)
    const response = await fetch(`${API_URL_PROXY}/api/posts/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({description, title, price, posterId: userData._id, address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl: addressUrl })
  })
  const json = await response.json()
  console.log('json',json)
  }
  return (
    <View style={styles.container}>
    <View>
      <Formik
        initialValues={{title: '', description: '', price: 0}}
        validationSchema={postSchema}
        onSubmit={(values, actions) => {
          addPost(values)
          actions.resetForm()
          AddNewPost()
        }}
      >
        {(props) => (
          <View>
            <TextInput 
            style={styles.titleInput}
            placeholder='Post Title/Task'
            onChangeText={props.handleChange('title')}
            value={props.values.title}
            />
            <Text style={styles.error}>{props.touched.title && props.errors.title}</Text>
            <TextInput 
            multiline
            style={styles.descriptionInput}
            placeholder='Post description'
            onChangeText={props.handleChange('description')}
            value={props.values.description}
            />
            <Text style={styles.error}>{props.touched.description && props.errors.description}</Text>
            <TextInput 
            keyboardType='numeric'
            style={styles.priceInput}
            placeholder='Asking Price'
            onChangeText={props.handleChange('price')}
            value={props.values.price}
             />
            <Text style={styles.error}>{props.touched.price && props.errors.price}</Text>

             <GooglePlacesAutocomplete 
                placeholder='Address'
                styles={styles.addressInput}
                onPress={(data, details = null) => {
                  setAddress(details.name)
                  setFullAddress(data.description)
                  setAddressGeocodeLat(details.geometry.location.lat)
                  setAddressGeocodeLng(details.geometry.location.lng)
                  setAddressUrl(details.url)
                  console.log('address', details.name)
                  console.log('fulleadress', data.description)
                  console.log('details.url', details.url)
                  console.log('details.lat', details.geometry.location.lat)
                  console.log('details.lat', details.geometry.location.lng)
                }}
                fetchDetails={true}
                query={{
                  key:GOOGLE_MAPS_API_KEY,
                  language: 'en'
                }}
                enablePoweredByContainer={false}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={100}
             />
             <View style={styles.sumbit}>
             <FlatButton text='submit' onPress={props.handleSubmit}/>
             </View>
          </View>
        )}
      </Formik>
    </View>
    </View>
  )
}

export default AddPosts

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    top: 40,
    
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10
  },
  addressInput: {
    container: {
      marginTop: 30,
      flex: 0,
      
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
    },
    textInput: {
      fontSize: 18
    }
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 3,
    textAlign: 'center'
  },
  sumbit: {
    marginTop: 20,
  }
})