import React from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {mainColor} from "../Utility/MyLib";

const offerCard = (offer,heading,desc) => {
  const state = useNavigationState(state => state);
  const routeName = (state.routeNames[state.index]);
  const btn = () => {
    if (routeName === 'ViewCart'){
      return (
        <View style={{flex:1}}>
          <TouchableOpacity
            onPress={() => {console.log('applied')}}
          >
            <Text style={{textAlign:'right',color:mainColor}}>
              APPLY
            </Text>
          </TouchableOpacity>

        </View>
      )
    }else{
      return (
        <View></View>
      )
    }
  }
  return (
    <View style={{flex:1, marginVertical:10,padding:20 , backgroundColor:'#fff'}}>
      <View style={{flexDirection:'row',marginBottom:10}}>
        <View style={{}}>
          <View style={styles.offerCode}>
            <Text style={{color:'green',fontSize:16}}>{offer}</Text>

          </View>
        </View>
        {/*apply btn here*/}
        {btn()}

      </View>

      <View>
        <Text style={{ fontSize:19,fontWeight:"bold"}}>
          {heading}
        </Text>
        <Text style={{textAlign:"justify"}}>
          {desc}
        </Text>
      </View>

    </View>
  )
}


const Offers =  () => {


  return (
    <View style={{ backgroundColor:'#eee'}}>
      <ScrollView>

        { offerCard('RITH50','Get 50% discount','For each tab to have its own title (since the tab navigator is nested inside the stack navigator), you have to determine the title for a specific tab screen based on the navigation state from the property') }
        { offerCard('ASI0','Get 10% discount','This is because the Profile screen is a child of the tab navigator and not the stack navigator.') }
        { offerCard('UM30','30% discount for first user','Right now, the title for each tab screen is going to be the same.') }
        { offerCard('RITH50','Get 50% discount','For each tab to have its own title (since the tab navigator is nested inside the stack navigator), you have to determine the title for a specific tab screen based on the navigation state from the property') }

      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  offerCode:{
    padding:10,paddingHorizontal:15,
    borderWidth:1,borderColor:'green',
  }
})
export default Offers;
