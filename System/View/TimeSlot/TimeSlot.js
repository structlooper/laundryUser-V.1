import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import {mainColor, MyButton} from "../../Utility/MyLib";
import RazorpayCheckout from 'react-native-razorpay';
import {logo} from "../../Utility/Images";


const SlotBtnActive = (time) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.DateBtnActive}
                        onPress={() => {console.log('pressed')}}
      >
        <View><Text style={styles.btnTextWhite}>{time}</Text></View>
      </TouchableOpacity>
    </View>
  )
}
const SlotBtn = (time) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.DateBtn}
                        onPress={() => {console.log('pressed')}}
      >
        <View><Text style={styles.btnTextBlack}>{time}</Text></View>
      </TouchableOpacity>
    </View>
  )
}

const TimeSlot = ({navigation}) => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.DateContainer}>
        <Text style={styles.DateLabel}>
          Select Pickup Date
        </Text>
        <ScrollView  horizontal={true} style={styles.dateBtnScroller}>
          <View style={styles.DateBtnContainer}>
            {SlotBtnActive('Today, 08 Sep')}
            {SlotBtn('Tomorrow, 09 Sep')}
            {SlotBtn('10 Sep')}
          </View>
        </ScrollView>
        <View style={styles.TimeContainer}>
          <Text style={styles.DateLabel}>
            Select Pickup Time
          </Text>
          <View style={{alignItems:'center',marginTop:10,}}>
            <View style={styles.TimeSlotPatternContainer}>
              {SlotBtn('9 am to 10 am')}
              {SlotBtn('10 am to 11 am')}
            </View>

            <View style={styles.TimeSlotPatternContainer}>
              {SlotBtnActive('11 am to 12 pm')}
              {SlotBtn('12 pm to 01 pm')}
            </View>

            <View style={styles.TimeSlotPatternContainer}>
              {SlotBtn('01 pm to 02 pm')}
              {SlotBtn('02 pm to 03 pm')}
            </View>

            <View style={styles.TimeSlotPatternContainer}>
              {SlotBtn('03 pm to 04 pm')}
              {SlotBtn('04 pm to 05 pm')}
            </View>
          </View>
        </View>
      </View>

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        {MyButton(() => {
            const options = {
              description: 'Payment towards Laundry',
              image: logo,
              currency: 'INR',
              key: 'rzp_test_CdseL953bSWnYB',
              amount: '5000',
              name: 'KRYCHE',
              prefill: {
                email: 'ashwin.kumar@example.com',
                contact: '9191919191',
                name: 'Ashwin Kumar'
              },
              theme: {color: mainColor}

            }
            RazorpayCheckout.open(options).then((data) => {
              // handle success
              console.log(navigation)
              navigation.navigate('HomeScreenStack',{screen:'newOrderDetails'})

            }).catch((error) => {
              // handle failure
              console.log(navigation)

              alert(`Error: ${error.code} | ${error.description}`);
            });
          },'Proceed to Pay ',styles.bottomView,'cash-multiple')}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  MainContainer:{
    backgroundColor:'#fff',
    height:'100%',
    padding:10
  },
  DateContainer:{
  },
  DateLabel:{
    fontSize:16,
  },
  DateBtnContainer:{
    flexDirection:'row',
    marginVertical:10,
  },
  DateBtn:{
    borderColor:'grey',
    backgroundColor:'#eee',

    borderWidth:2,
    paddingVertical:5,
    paddingHorizontal:25,
    borderRadius:100/2
  },
  DateBtnActive:{
    borderColor:mainColor,
    backgroundColor: mainColor,
    borderWidth:2,
    paddingVertical:5,
    paddingHorizontal:25,
    borderRadius:100/2,
  },
  btnTextWhite:{
    color:'#fff'
  },
  btnTextBlack:{
    color:'#000',
  },
  btnContainer:{
    marginHorizontal:4,
  },
  dateBtnScroller:{
    borderBottomWidth:.5,
    paddingVertical:10,
    height: 80
  },
  TimeContainer:{
    marginVertical: 20,
  },
  TimeSlotPatternContainer:{
    flexDirection: 'row',
    paddingVertical:12,
    paddingHorizontal:2
  },
  bottomView:{
    margin:10
  },
})
export default TimeSlot;
