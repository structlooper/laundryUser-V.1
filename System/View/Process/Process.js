import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker } from "react-native";
import { mainColor, MyButton, MyOutlineButton } from "../../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RNPickerSelect from "react-native-picker-select";
const Process = ({navigation}) => {
  const [ language, setLanguage ] = React.useState("");
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.topContainer}>
        <ScrollView>
          <View style={Styles.DateTimeContainer}>
            <View style={{flex:1,justifyContent:'center'}}>
              <FontAwesome5 name={'luggage-cart'} color={'grey'} size={50} />
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Pick-up Slot</Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Time Slots</Text>
              <TouchableOpacity onPress={() => {console.log('time')}}
                style={{
                  marginVertical:'10%'
                }}
              >
                <FontAwesome5 name={'clock'} color={mainColor} size={50} />
              </TouchableOpacity>
              <Text style={{
               width:'60%'
             }}>
               9:00 am - 10:00 am
             </Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Date</Text>
              <TouchableOpacity style={{
                marginVertical:'10%'
              }}
              onPress={() => {console.log('date')}}
              >
                <FontAwesome5 name={'calendar-alt'} color={mainColor} size={50} />

              </TouchableOpacity>
              <Text style={{
                width:'80%'
              }}>
               2, May 2021 (Today)
              </Text>
            </View>
          </View>
          <View style={Styles.DateTimeContainer}>
            <View style={{flex:1,justifyContent:'center'}}>
              <FontAwesome5 name={'luggage-cart'} color={'grey'} size={50} />
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Drop Slot</Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Time Slots</Text>
              <TouchableOpacity onPress={() => {console.log('time')}}
                style={{
                  marginVertical:'10%'
                }}
              >
                <FontAwesome5 name={'clock'} color={mainColor} size={50} />
              </TouchableOpacity>
              <Text style={{
               width:'60%'
             }}>
               11:00 am - 12:00 am
             </Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Date</Text>
              <TouchableOpacity style={{
                marginVertical:'10%'
              }}
              onPress={() => {console.log('date')}}
              >
                <FontAwesome5 name={'calendar-alt'} color={mainColor} size={50} />

              </TouchableOpacity>
              <Text style={{
                width:'80%'
              }}>
               3, May 2021 (Tomorrow)
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={Styles.middleContainer}>
        <ScrollView>
          <View style={{
            flexDirection:'row',
            padding:'10%'
          }}>
            <View style={{
              alignItems:'center',
            }}>
              <FontAwesome5 name={'map-marker-alt'} color={'grey'} size={40} />
              <Text>Address</Text>
            </View>
            <View style={{
              justifyContent:'center',
              alignItems:'center',
              marginHorizontal:10,
              flex:1
            }}>
              <Text>Flat 48 new street area, locality </Text>
              <Text>Dwarka, New Delhi India </Text>
            </View>
            </View>
            <View style={Styles.container}>
              <TouchableOpacity onPress={() => {console.log('select address')}} style={{
                borderWidth:.5,
                padding:10,
                width:'80%',
                alignItems:'center'
                // paddingHorizontal:20
                // border
              }}>
                <Text>-- Change address --   <FontAwesome5 name={'sort-down'} color={'grey'} size={20} /></Text>
              </TouchableOpacity>
            </View>
          <View style={{ padding:10,marginTop:'8%'}}>
              <TouchableOpacity onPress={() => {console.log('select address')}} style={{marginLeft:'6%'}}>
                <Text> <FontAwesome5 name={'plus-circle'} color={'grey'} size={14} /> Add address </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
      <View style={Styles.bottomContainer}>
        {MyButton(
          ()=>{navigation.navigate('ProcessNext')},
          'Proceed',
          {width:'30%',
          }
        )}
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  mainContainer:{
    marginTop:"1%",
    height:'100%',
    backgroundColor: '#fff'
  },
  topContainer:{
    height: '45%',
    borderBottomWidth:.5,
  },
  middleContainer:{
    height:'45%'
  },
  bottomContainer:{
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:10,

  },
  DateTimeContainer:{
    flexDirection:'row',
    paddingHorizontal:'8%',
    paddingTop:'5%',
  },
  container : {
    alignItems      : "center",
    justifyContent  : "center",
  },
})
export default Process;
