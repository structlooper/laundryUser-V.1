import React from 'react';
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import TopLogo from "../../Utility/TopLogo";
import { BaseUrl, MyButton, MyNumericInput, MyTextInput, MyToast } from "../../Utility/MyLib";



const submitOtpFrom =  (number,pin,navi) => {
  let dom = {}
  dom.phone_number = number
  dom.otp = pin

  fetch(BaseUrl+'customer/otp',{
    method:"post",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dom)
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status == 0){
        MyToast(json.message)
      }else if(json.status == 1){
        MyToast(json.message)
        navi.navigate('AuthNavigation',{mobile:number})
      }else{
        ToastAndroid.show('Server error', ToastAndroid.SHORT);
        console.log(json);
      }
    })
    .catch((error) => {
      ToastAndroid.show('Server connection error', ToastAndroid.SHORT);
      console.error(error);
    });
}


const Otp =   ({ route, navigation }) => {

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
          { MyNumericInput(pin,onChangePin,'',Styles.otpInput) }

        </View>
        <View style={Styles.buttons}>
          { MyButton( () => {submitOtpFrom(mobile,pin,navigation)}
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
