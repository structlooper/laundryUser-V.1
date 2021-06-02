import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AppName, MyButton } from "../../Utility/MyLib";
const OrderPlaced = ({ navigation }) => {
  return (
    <View style={Styles.mainContainer}>
      <View style={{
        height:'50%',
        padding:'10%',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <View style={{
          padding:'10%',
          borderWidth:1,
          borderRadius:500/2,
          borderColor:'green',
          width:wp('55'),
          height:hp('30'),
          alignItems:'center',
          backgroundColor:'#C9F6CD'
          // justifyContent:'center'
        }}>
          <Text style={{
            marginVertical:hp('2')
          }}>Order Id: ORD127628</Text>
          <Text style={{
            marginVertical:hp('2'),
            fontWeight:'bold'
          }}>Order placed</Text>
          <Text style={{
            marginVertical:hp('2'),
            fontWeight:'bold'
          }}> <FontAwesome5 name={'check-circle'} color={'black'} size={30} /></Text>
        </View>
      </View>
      <View style={{
        height:'50%',
        alignItems:'center'
      }}>
        <Text style={{
          fontWeight:'bold',
          fontSize:18,
          marginBottom:hp('2')
        }}>Keep your cloths ready</Text>
        <Text style={{
        color:'grey',
          marginBottom:hp('2')
        }}>Our delivery execute will be arriving shortly</Text>
        <View style={{
          marginVertical:hp('2'),
          alignItems:'center'
        }}>
          <Text style={{
            color:'grey',
          }}>
            2, May 2021
          </Text>
          <Text style={{
            color:'grey',
          }}>
            9:00 am to 10:00 am
          </Text>
        </View>
        <View style={{
          marginTop:hp('2'),
          marginBottom:hp('1'),
          flexDirection:'row'
        }}>

          {MyButton(
            ()=>{console.log('reschedule')},
            'Reschedule',
            {
              width:wp('40')
            },
            'clock'
          )}
          {MyButton(
            ()=>{console.log('Cancel')},
            'Cancel',
            {
              marginHorizontal:2,
              width:wp('40')
            },
            'cart-remove'
          )}
        </View>
        {MyButton(
          ()=>{navigation.navigate('HomeScreenStack',{screen:AppName})},
          'Home',
          {
            width:wp('40')
          },
          'home'
        )}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  mainContainer:{
    marginTop:'1%',
    height:'100%',
    backgroundColor:'#fff'
  }
})

export default OrderPlaced;
