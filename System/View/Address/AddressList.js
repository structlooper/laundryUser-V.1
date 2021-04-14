import React from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {mainColor, MyButton} from "../../Utility/MyLib";
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';

const AddressCard = (addressNumber,lat,lng,addressDesc,) => {
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    const MapComponent = () => {
        return (
            <View style={styles.addressMainView}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude:lat,
                        longitude:lng,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.04,
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
        <View style={styles.container}>
            <Text style={styles.heading}>
                Address#{addressNumber}
            </Text>
            {MapComponent()}
            <Text style={styles.addressDesc}>
                {addressDesc}
            </Text>
            <View style={styles.actionButtons}>
                <View style={{flex:.3}}>
                    <TouchableOpacity onPress={() => {console.log('Edit')}}>
                        <Text style={styles.actionBtn}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View >

                    <TouchableOpacity onPress={() => { console.log('Delete')}}>
                        <Text style={styles.actionBtn}>{(routeName === 'ServicesSlider') ? 'Select' : 'Delete'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const AddressList =  ({navigation}) => {
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    const addAddress = () => {
        if (routeName === 'ServicesSlider'){
            return MyButton(() => {navigation.navigate('HomeScreenStack',{screen:'CreateAddress'})},'Add address',styles.bottomView,'map-marker')
        }else{
            return MyButton(() => {navigation.navigate('AddressScreenStack',{screen:'CreateAddress'})},'Add address',styles.bottomView,'map-marker')
        }
    }
    return (
        <View style={{flex:1, backgroundColor:'#eee',paddingVertical:10}}>
            <Text style={{ textAlign:'center',fontSize:18 }}>Your Address</Text>
            <ScrollView style={{marginBottom:30}}>
                {AddressCard(1,28.325343826348004,77.25692136213183,'Flat no. 57, Sec 7 , Dwarka, New Delhi 110059')}
                {AddressCard(2,28.6843,77.0716,'341 /, Punja Sharif, Kashmere Gate')}
                {AddressCard(3,28.5953,77.0716,'46 , Dadiseth, Agiary Lane, Kalbadev')}
                {AddressCard(4,28.5843,77.0716,'Flat no. 57, Sec 7 , Dwarka, New Delhi 110059')}

            </ScrollView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,padding: 15}}>
                {addAddress()}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
   container:{
        backgroundColor:'#fff',
        paddingHorizontal: 20,
        marginVertical:10,
    },
    addressMainView:{
        // ...StyleSheet.absoluteFillObject,
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
