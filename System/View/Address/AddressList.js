import React, { useEffect } from "react";
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import { fetchGetFunction, mainColor, MyButton,fetchAuthPostFunction,MyToast } from "../../Utility/MyLib";
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressCard = (addressNumber,lat,lng,doorNumber,addressDesc,state,routeName,navi,addressId) => {
  const editAddress = () => {
    if (routeName === 'ServicesSlider'){
      return(
      <TouchableOpacity onPress={() => {navi.navigate('HomeScreenStack',{screen:'CreateAddress',params: { addressId: addressId }})}}>
        <Text style={styles.actionBtn}>Edit</Text>
      </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity onPress={() => {navi.navigate('AddressScreenStack',{screen:'CreateAddress',params: { addressId: addressId }})}}>
          <Text style={styles.actionBtn}>Edit</Text>
        </TouchableOpacity>
      )
    }
  }

    const MapComponent = (addressNumber) => {
        return (
            <View style={styles.addressMainView} key={addressNumber}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude:lat,
                        longitude:lng,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.002,
                    }}
                    // options={{ scrollEnabled:false }}
                    scrollEnabled={false}
                >
                    <Marker coordinate={{ latitude: lat, longitude: lng }} />
                </MapView>

            </View>
        )
    }
    return (
        <View style={styles.container} key={addressNumber}>
            <Text style={styles.heading}>
                Address#{addressNumber+1}
            </Text>
            {MapComponent(addressNumber)}
            <Text style={styles.addressDesc}>
                {doorNumber}
            </Text>
            <Text style={styles.addressDesc}>
                {addressDesc}
            </Text>
            <View style={styles.actionButtons}>
                <View style={{flex:.3}}>
                  {
                    editAddress()}
                </View>
                <View>

                    <TouchableOpacity onPress={() => {
                      Alert.alert(
                      "Delete address",
                      "Are you sure want to delete this address?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "ok", onPress: () => {deleteAddress(addressId)} }
                      ]
                    )}
                    }>
                        <Text style={styles.actionBtn}>{(routeName === 'ServicesSlider') ? 'Select' : 'Delete'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const deleteAddress = async (addressId) => {
  let UserDetails= await AsyncStorage.getItem('userDetails')
  let userId = JSON.parse(UserDetails).id
  await fetchAuthPostFunction('address/delete',{address_id:addressId,user_id:userId}).then(response => {
    MyToast(response.message)
  })
}

const AddressList =  ({navigation}) => {

    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    const [addressList , setAddressList] = React.useState(null);
    const addAddress = () => {
        if (routeName === 'ServicesSlider'){
            return MyButton(() => {navigation.navigate('HomeScreenStack',{screen:'CreateAddress'})},'Add address',styles.bottomView,'map-marker')
        }else{
            return MyButton(() => {navigation.navigate('AddressScreenStack',{screen:'CreateAddress'})},'Add address',styles.bottomView,'map-marker')
        }
    }

    useEffect(() => {
      getAddressList().then()
    },)

    const getAddressList = async () => {
      let UserDetails= await AsyncStorage.getItem('userDetails')
      let userId = JSON.parse(UserDetails).id
      await fetchGetFunction('address/'+userId).then(result => {
        setAddressList(result);
      })
    }
    if (addressList === null) {
      return <Loader />
    }else if(addressList !== []){
      return (
        <View style={{flex:1, backgroundColor:'#fff',borderTopColor:'#eee',borderTopWidth:5}}>
          <Text style={{ textAlign:'center',fontSize:18,borderBottomColor:'#eee',borderBottomWidth:.5 }}>Your Address</Text>
          <ScrollView style={{marginBottom:80}}>
            {addressList.map((data,i) => {
               return AddressCard(i, parseFloat(data.latitude), parseFloat(data.longitude), data.door_no,data.address,state,routeName,navigation,data.id)

              })}

          </ScrollView>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,padding: 15}}>
            {addAddress()}
          </View>
        </View>
      )
    }else{
      return <NoDataFound />
    }

}
const styles = StyleSheet.create({
   container:{
        backgroundColor:'#fff',
        paddingHorizontal: 20,
        // marginVertical:10,
     borderBottomWidth:5,
     borderBottomColor:'#eee'
    },
    addressMainView:{
        height: 120,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginVertical:5,
        color:'black'
    },
    addressDesc:{
        marginVertical:5
    },
    actionButtons:{
        flex:1,
        flexDirection:'row',
        marginVertical:5,
    },
    actionBtn:{
        fontSize: 18,
        color: mainColor,
        fontWeight: 'bold'
    }

})
export default AddressList;
