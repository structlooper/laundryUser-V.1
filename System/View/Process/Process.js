import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker } from "react-native";
import { mainColor, MyButton, MyOutlineButton, MyToast } from "../../Utility/MyLib";
import Modal from 'react-native-modal';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RNPickerSelect from "react-native-picker-select";
import { getDateSlots, getTimeSlot } from "../../Controller/getDateSlots";
const Process = ({navigation,route}) => {
  const {selectedServices} = route.params;
  const [ pickupDate, setPickupDate ] = React.useState('---');
  const [ pickupTime, setPickupTime ] = React.useState('---');
  const [ dropDate, setDropDate] = React.useState('---');
  const [ dropTime, setDropTime] = React.useState('---');
  const [ pickupDateSelected, setPickupDateSelected ] = React.useState('---');
  const [ pickupTimeSelected, setPickupTimeSelected ] = React.useState('---');
  const [ dropDateSelected, setDropDateSelected] = React.useState('---');
  const [ dropTimeSelected, setDropTimeSelected] = React.useState('---');
  const [ pickupDateGet, setPickupDateGet ] = React.useState(null);
  const [ pickupTimeGet, setPickupTimeGet ] = React.useState(null);
  const [ dropDateGet, setDropDateGet] = React.useState(null);
  const [ dropTimeGet, setDropTimeGet] = React.useState(null);
  const [ modalContent, setModalContent] = React.useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    callFunctionMethod().then()
  },[])

  const callFunctionMethod = async () => {
    await getDateSlots('pickup').then(response => {
      console.log('resasadad',response)
      setPickupDateGet(response)
    })
    await getDateSlots('drop').then(response => {
      setDropDateGet(response)
    })
    await getTimeSlot().then(response => {
      setPickupTimeGet(response)
    })
  }
  const modal = () => {
    console.log('ceh',pickupDateGet)

    const modalContentHere =  () => {
      const modelBtn = (content,index,showModule,saveModule) => {
        return (
          <View style={Styles.btnContainer} key={index} >
            <TouchableOpacity style={Styles.DateBtn}
                              onPress={() => {
                                showModule.method(showModule.data)
                                saveModule.method(saveModule.data)
                                setModalVisible(!isModalVisible)
                              }}
            >
              <View><Text style={Styles.btnTextBlack}>{content}</Text></View>
            </TouchableOpacity>
          </View>
        )
      }
      if (modalContent === 'pickupDate'){

        return (
          <View>
            {modelBtn(pickupDateGet.today, 1,{ method:setPickupDate, data:pickupDateGet.today },
              { method:setPickupDateSelected, data:pickupDateGet.day1 })}
            {modelBtn(pickupDateGet.next_day, 2,{ method:setPickupDate, data:pickupDateGet.next_day },
              { method:setPickupDateSelected, data:pickupDateGet.day2 })}
            {modelBtn(pickupDateGet.day_after_next, 3,{ method:setPickupDate, data:pickupDateGet.day_after_next },
              { method:setPickupDateSelected, data:pickupDateGet.day2 })}
          </View>
        )
      }else if(modalContent === 'pickupTime'){
        return (
          <View>
            {
              pickupTimeGet.map((data,i) =>{
                let time = data.time_from + ' to '+data.time_to;
                return modelBtn(time,i,{ method:setPickupTime, data:time},{ method:setPickupTimeSelected, data:time })
              })
              }
          </View>
        )
      }else if(modalContent === 'dropDate'){

      }else if(modalContent === 'dropTime'){

      }else{
        console.log('drop time')
      }
    }
    return (
      <Modal isVisible={isModalVisible} >
        <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
          <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
            <View>
              {MyButton(() => {setModalVisible(!isModalVisible)},'Back','','arrow-left')}
            </View>
          </View>
          <View style={{ backgroundColor:'#fff',height:'88%',paddingVertical:20,alignItems:'center'}}>
            <ScrollView style={{width:'80%',}} >
              {modalContentHere()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
  return (
    <View style={Styles.mainContainer}>
      {modal()}
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
              <TouchableOpacity onPress={() => {
                const callFunction  = () => {
                  setModalContent('pickupTime')
                  setModalVisible(true)
                }
                ((pickupDate !== '---')?(
                    callFunction()
                )
                  :MyToast('Select pickup date first!'))
              }}
                style={{
                  marginVertical:'10%'
                }}
              >
                <FontAwesome5 name={'clock'} color={mainColor} size={50} />
              </TouchableOpacity>
              <Text style={{
               width:'60%',
                textAlign:'center'
             }}>
                {pickupTime}
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
                                onPress={() => {
                                  setModalContent('pickupDate')
                                  setModalVisible(true)}}
              >
                <FontAwesome5 name={'calendar-alt'} color={mainColor} size={50} />

              </TouchableOpacity>
              <Text style={{
                width:'80%',
                textAlign:'center'
              }}>
                {pickupDate}
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
              <TouchableOpacity onPress={() => {
                const callFunction  = () => {
                  setModalContent('dropTime')
                  setModalVisible(true)
                }
                ((pickupDate !== '---')?(
                    callFunction()
                  )
                  :MyToast('Select drop date first!'))
              }}
                style={{
                  marginVertical:'10%'
                }}
              >
                <FontAwesome5 name={'clock'} color={mainColor} size={50} />
              </TouchableOpacity>
              <Text style={{
               width:'60%',
                textAlign:'center'
             }}>
                {dropTime}
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
                                onPress={() => {
                                  const callFunction  = () => {
                                    if (pickupDate !== '---' && pickupTime !== '---'){
                                      setModalContent('dropDate')
                                      setModalVisible(true)
                                    }else{
                                      MyToast('Select pickup slot first!')
                                    }
                                  }
                                  callFunction()

                                }}
              >
                <FontAwesome5 name={'calendar-alt'} color={mainColor} size={50} />

              </TouchableOpacity>
              <Text style={{
                width:'80%',
                textAlign:'center'
              }}>
                {dropDate}
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
  DateLabel:{
    fontSize:16,
  },
  btnContainer:{
    marginVertical:'5%',
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
  btnTextBlack:{
    textAlign:'center'
  }
})
export default Process;
