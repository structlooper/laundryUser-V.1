import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {mainColor, MyButton, MyTextInput} from "../../Utility/MyLib";


function getAddressFromCoordinates({ latitude, longitude }) {
    const HERE_API_KEY = 'AIzaSyAhJW0BL0uuVzXfhkhiQb3ZXF8f4pQ0vYQ';
    return new Promise((resolve) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${HERE_API_KEY}`
        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                // the response had a deeply nested structure :/
                if (resJson
                    && resJson.results
                    && resJson.results[0].formatted_address) {
                    resolve(resJson.results[0].formatted_address)
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


const Create = ({navigation}) => {
    const [location, setLocation] = React.useState({
        latitude: 28.5743,
        longitude: 77.0716,
        latitudeDelta: 0.02,
        longitudeDelta: 0.04,
    });
    const [formatedAddress,setFormatedAddress] = React.useState(null)
    const [landMark,setLandMark] = React.useState(null)
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
                        getAddressFromCoordinates(region).then((result) => {setFormatedAddress(result)})
                    }}
                >

                </MapView>
                <View style={{ top:'50%' ,left:'50%',marginLeft:-24,marginTop:-48,position:'absolute' }}>
                    <FontAwesome5 name={'map-marker-alt'} size={30} color={mainColor} />
                </View>

            </View>
            <View style={styles.addressContainer}>
                <View style={styles.nearLabelContainer}>
                    <Text style={styles.nearLabel}>Door no / Landmark</Text>
                    {MyTextInput(landMark,setLandMark,'Enter Landmark',styles.landMarkInput)}
                </View>
                <View style={styles.nearLabelContainer}>
                    <Text style={styles.nearLabel}>Address</Text>
                    <Text style={styles.address}>
                        {formatedAddress}
                    </Text>
                </View>
                <View style={styles.bottomBtn}>
                    {MyButton(()=>{navigation.goBack()},'Save Address','','map-marker')}
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    addressMainView:{
        height: 350,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }, map: {
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
