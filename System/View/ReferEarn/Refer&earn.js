import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { mainColor } from "../../Utility/MyLib";

const ReferAndEarn = () => {
  const iconsSize = 25;
  return (
    <View style={{ flex:1,backgroundColor:'#fff',marginTop:'1%' }}>
      <View style={{ flex:1 }}></View>
      <View style={{ flex:.5 }}></View>
      <View style={{ flex:.2,alignItems:'center',justifyContent:'center' }}>
        <TouchableOpacity
          onPress={()=>{

          }}
          style={{
            width:wp('90'),
            borderWidth:.5,
            borderColor:'grey',
            borderRadius:20/2,
            height:hp('8'),
            justifyContent:'center',
            paddingHorizontal:wp('5')
          }}
        >
          <Text>
            <FontAwesome5 name={'wallet'} size={iconsSize} color={'green'} style={{marginRight:15}} />
            ReferAndEarn
          </Text>
        </TouchableOpacity>
      </View>
     </View>
  );
};

export default ReferAndEarn;
