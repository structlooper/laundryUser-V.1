import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  fetchAuthPostFunction,
  fetchGetFunction,
  mainColor,
  MyButton,
  MyTextInput,
  MyToast,
} from "../../Utility/MyLib";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {HERE_API_KEY} from "../../Utility/MyLib";


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
                  let zipcode = resJson.results[0].address_components[9] ?? resJson.results[0].address_components[8]
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
      <GooglePlacesAutocomplete
        placeholder='Search in map'
        onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data.description, (details));
            getLatLngFromAddress(data.description).then(response => {
              const latitudeDelta= 0.008;
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
      />
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

const Create = ({navigation,route}) => {
  const [location, setLocation] = React.useState({
    latitude: 28.5743,
    longitude: 77.0716,
    latitudeDelta: 0.02,
    longitudeDelta: 0.04,
  });
  const [formattedAddress,setFormattedAddress] = React.useState(null)
  const [landMark,setLandMark] = React.useState(null)
  const [zipcode,setZipcode] = React.useState(null)
  const [addressId,setAddressId] = React.useState(null)
  useEffect(() => {
    addressLoadFunction().then();
  },[])
  const addressLoadFunction = async () => {
    if (route.params !== undefined) {
      const { addressId } = route.params;
      setAddressId(addressId)
        await fetchGetFunction('address_id/' + addressId,).then(response => {
          const latitudeDelta = 0.008;
          const longitudeDelta = 0.008;
          setLandMark(response.door_no)
          setFormattedAddress(response.address)
          setLocation({
            latitude: parseFloat(response.latitude),
            longitude: parseFloat(response.longitude),
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          })
        })
    }
  }


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
  const updateUserEnteredAddress = async (navigation,location,landMark,formattedAddress,addressId) => {
    let UserDetails= await AsyncStorage.getItem('userDetails')
    let userId = JSON.parse(UserDetails).id
    await fetchAuthPostFunction('address/update',{address_id:addressId,user_id:userId,door_no:landMark,address:formattedAddress,lat:(location.latitude),lng:(location.longitude),pincode:zipcode}).then(response => {
      if (response.status === 1){
        MyToast(response.message)
        navigation.goBack()
      }else{
        MyToast(response.message)
      }
    })
  }
    return (
      <View>

            <View style={styles.addressMainView}>
                <MapView
                    style={styles.map}
                    region={location}

                    onRegionChangeComplete={region => {
                        setLocation({
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: region.latitudeDelta,
                                longitudeDelta: region.longitudeDelta,
                            })
                        getAddressFromCoordinates(region).then((result) => {
                          setFormattedAddress(result.address)
                          setZipcode(result.zip.long_name)
                        })
                    }}
                >

                </MapView>
                {GooglePlacesInput(location, setLocation) }

                <View style={{ top:'50%' ,left:'50%',marginLeft:-24,marginTop:-48,position:'absolute' }}>
                    <FontAwesome5 name={'map-marker-alt'} size={30} color={mainColor} />
                </View>

            </View>
          <ScrollView>

            <View style={styles.addressContainer}>
                <View style={styles.nearLabelContainer}>
                    <Text style={styles.nearLabel}>Door no / Landmark</Text>
                    {MyTextInput(landMark,setLandMark,'Enter Landmark',styles.landMarkInput)}
                </View>
                <View style={styles.nearLabelContainer}>
                    <Text style={styles.nearLabel}>Address</Text>
                    <Text style={styles.address}>
                        {formattedAddress}
                    </Text>
                </View>
                <View style={styles.bottomBtn}>
                    {MyButton(()=>{
                        (route.params !== undefined) ?
                          updateUserEnteredAddress(navigation,location,landMark,formattedAddress,addressId)
                          :
                      saveUserEnteredAddress(navigation,location,landMark,formattedAddress)
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
        marginTop:30,
        ...StyleSheet.absoluteFillObject,
    },
    addressContainer:{
        padding:10,
    },
    nearLabelContainer:{
        marginVertical:15,
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
export default Create;
