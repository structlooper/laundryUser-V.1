import React, { useEffect } from "react";
import { View, Text,StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { fetchGetFunction, mainColor } from "../Utility/MyLib";
import MapView, {Marker} from "react-native-maps";
import NoDataFound from "./NoDataFound";
import Loader from "../Utility/Loader";
const Contact = () => {
  const [location, setLocation] = React.useState({
    latitude: 28.5743,
    longitude: 77.0716,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  });
  const [contact,setContact] = React.useState(null)
  useEffect(() => {
    getContactData().then()
  },[])
  const getContactData = async () => {
    fetchGetFunction('app_setting').then(response => {
      setContact(response.result)
      setLocation({
        latitude: response.result.address_lat,
        longitude: response.result.address_lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      })
    })
  }
  if (contact === null){
    return <Loader />
  }else if(contact === {}){
    return <NoDataFound />
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ContactDetailContainer}>
        <View style={styles.ContactDetailContainerChild}>
          <Text style={{color:'gray'}}>Call us</Text>
          <Text>+91 {contact.contact_number}</Text>
        </View>
        <View style={styles.ContactDetailContainerChildTwo}>
          <FontAwesome5 name={'phone-alt'} size={25} color={mainColor}/>
        </View>
      </View>
      <View style={styles.ContactDetailContainer}>
        <View style={styles.ContactDetailContainerChild}>
          <Text style={{color:'gray'}}>Mail us</Text>
          <Text>{contact.email}</Text>
        </View>
        <View style={styles.ContactDetailContainerChildTwo}>
          <FontAwesome5 name={'inbox'} size={25} color={mainColor}/>
        </View>
      </View>
      <View style={styles.AddressDetailContainer}>
        <View style={styles.ContactDetailContainerChild}>
          <Text style={{color:'gray'}}>Reach us</Text>
          <Text>{contact.address}</Text>
        </View>
        <View style={styles.ContactDetailContainerChildTwo}>
          <FontAwesome5 name={'route'} size={28} color={mainColor}/>
        </View>
      </View>
      <View style={styles.addressMainView}>
        <MapView
          style={styles.map}
          region={location}
          scrollEnabled={false}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    marginTop:5,
    height:'100%',
    backgroundColor:'#fff'
  },
  ContactDetailContainer:{
    flexDirection:'row',
    padding:15,
    borderBottomColor:'#eee',
    borderBottomWidth:5
  },
  ContactDetailContainerChild:{
    paddingVertical:10,
    flex:1,
    maxWidth:'90%'
  },
  ContactDetailContainerChildTwo:{
    justifyContent:'center',
    marginRight:5
  },
  AddressDetailContainer:{
    flexDirection:'row',
    padding:15,
  },
  addressMainView:{
    height: 350,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }, map: {
    ...StyleSheet.absoluteFillObject,
  },
})
export default Contact;
