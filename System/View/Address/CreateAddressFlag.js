import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  fetchAuthPostFunction,
  fetchGetFunction,
  mainColor,
  MyNumericInput,
  MyButton,
  MyTextInput,
  MyToast,
} from "../../Utility/MyLib";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HERE_API_KEY} from "../../Utility/MyLib";
import Loader from "../../Utility/Loader";
import Geolocation from "react-native-geolocation-service";


function getAddressFromCoordinates({ latitude, longitude }) {
  return new Promise((resolve) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${HERE_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then((resJson) => {
        // the response had a deeply nested structure :/
        if (resJson
          && resJson.results
          && resJson.results[0].formatted_address) {
          let zipcode = (resJson.results[0].address_components[9] ?? resJson.results[0].address_components[8]) ?? resJson.results[0].address_components[9] ?? resJson.results[0].address_components[6]
          // zipcode = zipcode ?? "00"
          console.log(resJson.results[0].address_components[9] ?? resJson.results[0].address_components)
          resolve({address:resJson.results[0].formatted_address , zip:zipcode})
        } else {
          resolve()
        }
      })
      .catch((e) => {
        console.log('Error in getAddressFromCoordinates', e)
        resolve()
      })
  })
}
const GooglePlacesInput = (location, setLocation) => {
  return (
    <View style={{ flexDirection:'row',paddingTop:5 }}>
      <View style={{backgroundColor:'#fff',justifyContent:'center',paddingLeft:15,height:44}}>
        <Text style={{ fontWeight:'bold' }}>Search: </Text>
      </View>
      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data.description, (details));
          getLatLngFromAddress(data.description).then(response => {
            const latitudeDelta= 0.0080;
            const  longitudeDelta= 0.008;
            if (response.lat !== '' && response.lat !== undefined && response.lat !== null){
              setLocation({
                latitude: response.lat,
                longitude: response.lng,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              })
            }
          })
        }}
        query={{
          key: HERE_API_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0,
          },
          description: {
            fontWeight: 'bold',
          },
          textInput: {
            marginRight: 0,
            // height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
      />
    </View>
  );
};

const getLatLngFromAddress = (address) => {
  return new Promise((resolve) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${HERE_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then((resJson) => {
        // the response had a deeply nested structure :/
        if (resJson
          && resJson.results
          && resJson.results[0].geometry) {
          resolve(resJson.results[0].geometry.location)
        } else {
          resolve()
        }
      })
      .catch((e) => {
        console.log('Error in getAddressFromCoordinates', e)
        resolve()
      })
  })
}

const CreateAddressFlag = ({navigation,route}) => {
  const [location, setLocation] = React.useState(null);
  const [formattedAddress,setFormattedAddress] = React.useState(null)
  const [zipcode,setZipcode] = React.useState(null)
  const [landMark,setLandMark] = React.useState(null)

  const saveUserEnteredAddress = async (navigation,location,landMark,formattedAddress) => {
    let UserDetails= await AsyncStorage.getItem('userDetails')
    let userId = JSON.parse(UserDetails).id
    await fetchAuthPostFunction('address/add',{user_id:userId,door_no:landMark,address:formattedAddress,lat:(location.latitude),lng:(location.longitude),pincode:zipcode}).then(response => {
      if (response.status === 1){
        MyToast(response.message)
        navigation.goBack()
      }else{
        MyToast(response.message)
      }
    })
  }
  // if (location === null){
  //   return Loader();
  // }
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.004,
        })
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        setLocation({
          latitude: 28.5743,
          longitude: 77.0716,
          latitudeDelta: 0.002,
          longitudeDelta: 0.004,
        })
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  },[])
  return (
    <View style={{ height:'100%' }}>
      {GooglePlacesInput(location, setLocation) }

      <ScrollView>

        <View style={styles.addressMainView}>
          <MapView
            style={styles.map}
            region={location}

            onRegionChangeComplete={async region => {
              setLocation({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              })
              await getAddressFromCoordinates(region).then((result) => {
                setFormattedAddress(result.address)
                // setZipcode(result.zip.long_name)
              })
            }}
          >

          </MapView>

          <View style={{ top:'50%' ,left:'50%',marginLeft:-24,marginTop:-48,position:'absolute' }}>
            <FontAwesome5 name={'map-marker-alt'} size={30} color={mainColor} />
          </View>

        </View>
        <View style={[styles.addressContainer,{marginTop:20}]}>

          <View style={styles.nearLabelContainer}>
            <Text style={styles.nearLabel}>Door no / Landmark</Text>
            {MyTextInput(landMark,setLandMark,'Enter Door no/Landmark',styles.landMarkInput)}
          </View>
          <View style={[styles.nearLabelContainer,{marginVertical:0,marginTop:5}]}>
            <Text style={styles.nearLabel}>Pin code</Text>
            {MyNumericInput(zipcode,setZipcode,'Enter Pincode',styles.landMarkInput)}
          </View>
          <View style={styles.nearLabelContainer}>
            <Text style={styles.nearLabel}>Address</Text>
            <Text style={styles.address}>
              {formattedAddress}
            </Text>
          </View>
          <View style={styles.bottomBtn}>
            {MyButton(()=>{
                  saveUserEnteredAddress(navigation, location, landMark, formattedAddress).then()
              },
              (route.params !== undefined) ?'Update Address':'Save Address',
              '','map-marker')}
          </View>

        </View>
      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({
  addressMainView:{
    height: 280,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addressContainer:{
    padding:10,
  },
  nearLabelContainer:{
    marginTop:15,
  },
  nearLabel:{
    fontSize:17,
    fontWeight:'bold',
  },
  landMarkInput:{
    backgroundColor:'#fff',
    marginVertical: 5
  },
  address:{
    marginVertical:5
  },
  bottomBtn:{
    marginTop:40,
    // position: 'absolute', left: 0, right: 0, bottom: 0
  }
})
export default CreateAddressFlag;
