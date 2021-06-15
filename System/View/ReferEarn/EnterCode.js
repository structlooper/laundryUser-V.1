import React from "react";
import { View, Text, Image } from "react-native";
import { MyButton, MyOutlineButton, MyTextInput } from "../../Utility/MyLib";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const EnterCode = () => {
  const [referCode, setReferCode] = React.useState(null)
  return (
    <View style={{ backgroundColor:'#fff',flex:1,marginTop:'1%' }}>
      <View style={{ flex:.5 }}>
        <View style={{ flex:1,alignItems:'center',justifyContent:'center',}}>

          <View style={{borderColor:'grey',borderWidth:1,width:'90%',height:'80%',justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
            <Image source={require('../../Public/Images/referandearn/animation_640_kpu4ekjd.gif')} style={{ width:'100%',height:'100%', }} />
          </View>
          <Text style={{ marginTop:'5%',fontSize:16,fontWeight:'bold',color:'black' }}>Got a referral code?</Text>
        </View>
        <View style={{ alignItems:'center',justifyContent:'center',}}>
          <Text>Enter your invitation code to clam the</Text>
          <Text>referral reward of Rs 100</Text>

        </View>
      </View>
      <View style={{ flex:.5,padding:'5%', }}>
        { MyTextInput(
          referCode,
          setReferCode,
          'Enter code here',
          {
            backgroundColor:'#fff'
          }
        ) }
        {
          MyButton(
            ()=>{},
            'Redeem now',
            {
              marginVertical:'5%'
            },
            'gift'
          )
        }
        <View style={{ alignItems:'center' }}>
          { MyOutlineButton(() => {},
            'T&C',
            {
              width:wp('30')
            },

          ) }
        </View>

      </View>

    </View>
  );
};

export default EnterCode;
