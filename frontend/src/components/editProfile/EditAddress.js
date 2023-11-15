import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLogin } from '../../contexts/LoginProvider'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { API_URL_PROXY, GOOGLE_MAPS_API_KEY } from '@env'

const EditAddress = ({onSumbitAddress}) => {
    const {userData} = useLogin()
    const [error, setError] = useState(null)
    const [address, setAddress] = useState(null)
    const [fullAddress, setFullAddress] = useState(null)
    const [addressGeocodeLat, setAddressGeocodeLat] = useState(null)
    const [addressGeocodeLng, setAddressGeocodeLng] = useState(null)
    const [addressUrl, setAddressUrl] = useState(null)

    const editAddress = async() => {
        if(!addressUrl || !addressGeocodeLng || !addressGeocodeLat) {
            setError('Input Valid Address')
            return
        }
        console.log('USERDATA', userData)
        setError(null)
        const response = await fetch(`${API_URL_PROXY}/api/users/editAddress/${userData._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({address, fullAddress, addressGeocodeLat, addressGeocodeLng, addressGoogleMapsUrl: addressUrl})
        })
        console.log('RESPONSE', response)
        if (response.ok) {
            onSumbitAddress()
        }
        if(!response.ok) {
            setError('Error Adding Address')
        }
    }
  return (
    <View>
             <GooglePlacesAutocomplete 
                placeholder='Address'
                styles={styles.addressInput}
                onPress={(data, details = null) => {
                  setAddress(details.name)
                  setFullAddress(data.description)
                  setAddressGeocodeLat(details.geometry.location.lat)
                  setAddressGeocodeLng(details.geometry.location.lng)
                  setAddressUrl(details.url)
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
             <Button onPress={() => editAddress()} title='Edit Address'/>
             {error && <Text>{error}</Text>}
    </View>
  )
}

export default EditAddress

const styles = StyleSheet.create({
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
})