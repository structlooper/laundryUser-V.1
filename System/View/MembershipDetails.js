import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { mainColor, MyButton } from "../Utility/MyLib";

const MembershipDetails = () => {
  return (
    <View style={{
      height:'100%',
      backgroundColor:'#fff',
      marginTop:'1%',
      padding:'5%',
    }}>
     <View style={{ height:'20%', }}>
       <Image source={{uri:'https://swapd.co/uploads/db6033/original/2X/0/00f7c5f0c80a5107cb072dada79cb4f5beb24ba5.jpg'}}
              style={{
                width:wp('90'),
                height:hp('15'),
                resizeMode:'contain'
              }}
       />
     </View>
      <View style={{ height: '72%' }} >
        <View style={{
          flexDirection:'row'
        }}>
          <View style={{
            flex:1
          }}>
            <Text style={{
              fontSize:18,
              fontWeight:'bold',
              color:'grey'
            }}>Premium Membership plan</Text>
          </View>
          <View style={{
            flex:1,
            alignItems:'flex-end'
          }}>
            <Text style={{
              fontSize:25,
              fontWeight:'bold',
              color:'black'
            }}>₹150</Text>
          </View>
          {/*<View style={{flex:.1}} />*/}
        </View>
        <View style={{
          marginVertical:'5%',
          alignItems:'center'
        }} >
          <Text style={{
            width:wp('80'),
            color:mainColor,
            fontSize:15,
            textAlign:'center'
          }}>10% discount in premium membership for 1 month.</Text>
        </View>
        <View style={{
          marginVertical:10,
          // alignItems:'center'
        }}>
          <Text style={{
            fontSize:16,
            fontWeight:'bold',
            borderBottomColor:'grey',
            borderBottomWidth:1
          }} >Applied Services</Text>
          <ScrollView style={{
            flexDirection:'row',
            marginTop:'5%'
          }}
                      horizontal={true}
          >
            <View style={{
              width:wp('35'),
              padding:5,
              backgroundColor:'rgba(83,203,154,0.87)',marginHorizontal:5,
              height:hp('6'),
              borderRadius:100/2,
              justifyContent:'center'
            }}>
              <Text style={{
                color:'#fff',
                textAlign:'center'
              }}> Wash only</Text>
            </View>
            <View style={{
              width:wp('45'),
              padding:5,
              backgroundColor:'rgba(83,203,154,0.87)',marginHorizontal:5,
              height:hp('6'),
              borderRadius:100/2,
              justifyContent:'center'
            }}>
              <Text style={{
                color:'#fff',
                textAlign:'center'
              }}> Dry cleaning</Text>
            </View>
          </ScrollView>
        </View>
        <ScrollView style={{ marginVertical:'2%' }} >
          <Text style={{ marginTop:'2%',lineHeight:20 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          </Text>
          <Text style={{ marginTop:'2%',lineHeight:20 }}>
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
          </Text>
          <Text style={{ marginTop:'2%',lineHeight:20 }}>
            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
            quasi aliquam eligendi, placeat qui corporis!
          </Text>


        </ScrollView>
      </View>
      <View style={{
        justifyContent:'center',
        alignItems:'center'
      }}>
        {MyButton(
          ()=>{console.log('buy plan')},
          'Purchase plan',
          '',
          'home-currency-usd'
        )}
      </View>


    </View>
  );
};

export default MembershipDetails;
