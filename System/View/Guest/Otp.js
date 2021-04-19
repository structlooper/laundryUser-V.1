import React from 'react';
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import {  MyButton, MyNumericInput,  MyToast,fetchPostFunction } from "../../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../Utility/AuthContext";

const submitOtpFrom =  async (number,pin,navi) => {
  // const {logIn} = React.useContext(AuthContext)

  let dom = {}
  dom.phone_number = number
  dom.otp = pin

  let result = await fetchPostFunction('customer/otp',dom)
  if (result.status == 0){
    MyToast(result.message)
  }else if(result.status == 1){
    MyToast(result.message)
    await AsyncStorage.setItem('token',JSON.stringify(result.token))
    console.log('storage data',await AsyncStorage.getItem('token'))
    // navi.navigate('AuthNavigation',{mobile:number})

  }else{
    ToastAndroid.show('Server error', ToastAndroid.SHORT);
    console.log(result);
  }
}



const Otp =   ({ route, navigation }) => {
  const {logIn} = React.useContext(AuthContext)
  const {mobile} = route.params;
  const [pin, onChangePin] = React.useState(null);

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{alignItems:'center',borderBottomWidth:.5,padding:10}}><Text
      style={{fontSize: 17}}
      >
        Enter OTP
      </Text></View>

      <View style={{ padding:50  }}>

        <Text style={{textAlign: 'center' , }}>
          Let us Know One time password (OTP)
          We have sent you OTP on your entered mobile number
        </Text>
        <View style={{}}>
          { MyNumericInput(pin,onChangePin,'',Styles.otpInput,'',true) }

        </View>
        <View style={Styles.buttons}>
          { MyButton( async ()  => {
            await submitOtpFrom(mobile,pin,navigation)
              logIn()
            }
            ,'Submit','',)  }
        </View>
      </View>
    </View>
  )
}
const Styles = StyleSheet.create({
  otpInput : {
    fontSize:18,
    textAlign:'center',
    backgroundColor:'#fff',

  },
  buttons:{
    marginVertical:30
  }
})
export default Otp;
