import React from "react";
import { View, Text, ScrollView } from "react-native";
import { mainColor, MyButton, MyOutlineButton } from "../../Utility/MyLib";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const wallet = () => {
  return (
    <View style={{ flex:1,backgroundColor:'#fff',marginTop:'1%' }}>
        <View style={{ flex:.3 }}>
          <View style={{ flexDirection:'row',width:wp('90'),height:hp('13'), borderRadius:20/2,margin:'5%',alignItems:'center' }}>
            <View style={{ }}>
              <Text style={{ color:'grey' }}>Balance</Text>
              <Text style={{ color:mainColor,fontWeight:'bold',fontSize:wp('10'),marginTop:hp('.3') }}>$ 350,20.00</Text>
            </View>
          </View>

        </View>
        <View style={{ justifyContent:'center',padding:wp(5) }}>
          {
            MyOutlineButton(
              ()=>{},
              'Top up',
              {
                width:wp('30'),
                borderRadius:40/2,
                borderColor:mainColor,
                borderWidth:.5
              },
            )
          }
        </View>
        <View style={{  paddingHorizontal:wp('5'),flex:1 }}>
          <View style={{ }}>
            <Text style={{ fontSize:wp('5') }}>Statements</Text>
          </View>
          <ScrollView>
            <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2,borderWidth:.5 }}>
              <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(0,207,255)' }}>
                <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>$200</Text>
                <Text style={{ color:'#fff' }}>Created</Text>
              </View>
              <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
                <Text style={{ fontSize:wp('3.1') }}>Rs 200 added in your wallet via razorpay.</Text>
                <Text style={{ color:'grey' }}>1 day ago</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2 ,borderWidth:.5}}>
              <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(221,122,124)' }}>
                <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>$50</Text>
                <Text style={{ color:'#fff' }}>Debited</Text>
              </View>
              <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
                <Text style={{ fontSize:wp('3.1') }}>Rs 50 debited from your wallet for Order (ORD124876).</Text>
                <Text style={{ color:'grey' }}>2 days ago</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2,borderWidth:.5 }}>
              <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(0,207,255)' }}>
                <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>$200</Text>
                <Text style={{ color:'#fff' }}>Created</Text>
              </View>
              <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
                <Text style={{ fontSize:wp('3.1') }}>Rs 200 added in your wallet via razorpay.</Text>
                <Text style={{ color:'grey' }}>1 day ago</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2,borderWidth:.5 }}>
              <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(0,207,255)' }}>
                <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>$200</Text>
                <Text style={{ color:'#fff' }}>Created</Text>
              </View>
              <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
                <Text style={{ fontSize:wp('3.1') }}>Rs 200 added in your wallet via razorpay.</Text>
                <Text style={{ color:'grey' }}>1 day ago</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', marginVertical:hp('1') ,alignItems:'center',height:hp('9'),backgroundColor:'#fff',borderRadius:10/2 ,borderWidth:.5}}>
              <View style={{ flex:.3,borderRightWidth:.3,height:hp('8.9'),justifyContent:'center',alignItems:'center',borderRadius:10/2,backgroundColor:'rgb(221,122,124)' }}>
                <Text style={{ color:'#fff',fontWeight:'bold',fontSize:wp('4') }}>$50</Text>
                <Text style={{ color:'#fff' }}>Debited</Text>
              </View>
              <View style={{ flex:1,marginLeft:wp(2),paddingHorizontal:wp(4), }}>
                <Text style={{ fontSize:wp('3.1') }}>Rs 50 debited from your wallet for Order (ORD124876).</Text>
                <Text style={{ color:'grey' }}>2 days ago</Text>
              </View>
            </View>
          </ScrollView>
        </View>

     </View>
  );
};

export default wallet ;
