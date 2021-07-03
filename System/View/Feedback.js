import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fetchAuthPostFunction, MyButton, MyTextInput, MyToast } from "../Utility/MyLib";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Feedback = () => {
  const [feedback, onChangeFeedback] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={{
      flex:1,
      backgroundColor:'#fff'
    }}>
      <ScrollView style={{ flex:1 }}>
        <View style={{ padding:'5%' }}>
          <Text style={{ justifyContent:'space-between', fontSize:wp('4') }}>Dear Customer, We value your feedback and suggestions. For any queries, complaints or feedback.</Text>
          <Text style={{ justifyContent:'space-between', fontSize:wp('4') }}> Please feel free to enter below and we will get back to you shortly.</Text>
        </View>
        <View style={{ flex:.5,padding:'5%' }}>
          <View style={styles.textAreaContainer} >
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Enter your message here ..."
              placeholderTextColor="grey"
              onChangeText={onChangeFeedback}
              value={feedback}
              numberOfLines={6}
              multiline={true}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ flex:.2,alignItems:'center', justifyContent:'center' }}>
        {
          MyButton(async ()=>{
            setLoading(true)
            if (feedback){
              let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
              await fetchAuthPostFunction('feedback/send',{
                user_id:userDetails.id,
                message:feedback
              }).then(res=>{
                MyToast(res.message)
                if (res.status === 1){
                  onChangeFeedback(null)
                }
              })
            }else{
              MyToast('Please enter your concerns!')
            }setLoading(false)
            },
          'Send',
            {
              width:wp('50')
            },
            'email',
            loading
          )
        }
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'grey',
    borderWidth: .5,
    borderRadius:20/2,
    padding: '1%'
  },
  textArea: {
    height: 200,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    color:'#000',
    lineHeight:hp('2')
  }
})

export default Feedback;
