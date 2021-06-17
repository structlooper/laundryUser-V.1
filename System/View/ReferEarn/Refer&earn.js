import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { fetchGetFunction, mainColor, MyOutlineButton } from "../../Utility/MyLib";

const ReferAndEarn = ({ navigation })  => {
  const iconsSize = 25;
  const [appSettings,setAppSettings] = React.useState({})

  React.useEffect(() => {
    getAppSettings().then()
  },[]);
  const getAppSettings = async () => {
    await fetchGetFunction('app_setting').then(res => {
      setAppSettings(res.result)
    })
  }
  const buttonDesign = (icon, name, redirect,amount) => {
    return (
      <TouchableOpacity
        onPress={()=>{
        }}
        style={{
          width:wp('90'),
          borderWidth:wp('.05'),
          borderColor:'grey',
          borderRadius:10/2,
          height:hp('8'),
          justifyContent:'center',
          paddingHorizontal:wp('5')
        }}
      >
        <View style={{ flexDirection:'row' }}>
          <View style={{  }}>
            <FontAwesome5 name={icon.name} size={iconsSize} color={icon.style.color} style={{marginRight:15}} />
          </View>
          <View style={{ justifyContent:'center' }}>
            <Text style={{color:'grey'}}>

              {name}
            </Text>
          </View>
          {(amount !== null) ?
            <View style={{ justifyContent:'center',flex:1 }}>
              <Text style={{ color:'green' }}>{amount}</Text>
            </View>:null
          }

          <View style={{ justifyContent:'center' }}>
            <FontAwesome5 name={'chevron-right'} size={iconsSize-10} color={'grey'} style={{marginRight:15}} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ flex:1,backgroundColor:'#fff',marginTop:'1%' }}>
      <View style={{ flex:.5 }}>
        <View style={{ flex:1,alignItems:'center',justifyContent:'center',}}>
          <Image source={require('../../Public/Images/referandearn/referAndearn.jpg')} style={{ width:'60%',height:'60%',resizeMode:'contain',borderRadius:200/2 }} />
          <Text style={{ marginTop:'5%',fontSize:16,fontWeight:'bold',color:'black' }}>Earn upto Rs 5000</Text>
        </View>
        <View style={{ alignItems:'center',justifyContent:'center',}}>
          {(appSettings.refer_earn_amt !== undefined)?
            (appSettings.refer_earn_amt > 0) ?
              <Text>Get Rs {appSettings.refer_earn_amt} for every friend you invite</Text>
              :
              <Text>Invite your friends</Text>
            :
            null

          }
          {/*<Text>Your friend also earns Rs 100</Text>*/}
          { MyOutlineButton(() => {},
            'T&C',
            {
              width:wp('30')
            },

          ) }
        </View>
      </View>
      <View style={{ flex:.5 }}>
        <View style={{ margin:'5%', }}>
          { buttonDesign({name:'whatsapp',style:{color:'rgb(128,242,99)'}},' Whatsapp invite','', )}
          { buttonDesign({name:'envelope',style:{color:'rgb(247,177,35)'}},' Text invite','', )}
          { buttonDesign({name:'share-alt',style:{color:'black'}},' Social media invite','', )}
        </View>
        <View style={{ alignItems:'center' }}>

          { MyOutlineButton(() => {navigation.navigate('EnterCode')},
            'Got a referral code ?',
            {
              width:wp('80')
            },

          ) }
        </View>
      </View>
      <View style={{ flex:.2,alignItems:'center',justifyContent:'center' }}>
        { buttonDesign({name:'wallet',style:{color:'rgba(125,106,239,1 )'}},' Wallet amount :','', ' $890')}
      </View>
     </View>
  );
};

export default ReferAndEarn;
