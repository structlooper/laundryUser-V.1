import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Picker } from "react-native";
import {
  fetchAuthPostFunction,
  fetchGetFunction,
  mainColor,
  MyButton,
  MyOutlineButton,
  MyToast,
} from "../../Utility/MyLib";
import Modal from 'react-native-modal';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RNPickerSelect from "react-native-picker-select";
import { getDateSlots, getTimeSlot } from "../../Controller/getDateSlots";
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addAddressFunctions, addressFunctions, loadAddressFunctions} from "../../Controller/addressController";
import { useIsFocused } from "@react-navigation/native";

const Process = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const {selectedServices} = route.params;
  const {selectedServicesNames} = route.params;
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
  const [ selectedDay, setSelectedDay] = React.useState(null);
  const [ modalContent, setModalContent] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = React.useState(false);
  const [defaultAddress , setDefaultAddress] = React.useState(false)
  const [addressList , setAddressList] = React.useState(null);
  React.useEffect(() => {
    callFunctionMethod().then()
  },[isFocused])

  const callFunctionMethod = async () => {
    await getDateSlots('pickup').then(response => {
      setPickupDateGet(response)
    })
    await getDateSlots('drop').then(response => {
      setDropDateGet(response)
    })
    let UserDetails = await AsyncStorage.getItem('userDetails')
    let Address = JSON.parse(UserDetails).default_address;
    setDefaultAddress(Address)

    let userId = JSON.parse(UserDetails).id
    await fetchGetFunction('address/' + userId).then(result => {
      setAddressList(result);
    })
  }
  const modal = () => {
    const modalContentHere =  () => {
      const modelBtn = (content,index,showModule,saveModule,selectedUnit) => {
        return (
          <View style={Styles.btnContainer} key={index} >
            <TouchableOpacity style={Styles.DateBtn}
                              onPress={() => {
                                showModule.method(showModule.data)
                                saveModule.method(saveModule.data)
                                setModalVisible(!isModalVisible)
                                setSelectedDay(selectedUnit)

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
              { method:setPickupDateSelected, data:pickupDateGet.day1 },'today')}
            {modelBtn(pickupDateGet.next_day, 2,{ method:setPickupDate, data:pickupDateGet.next_day },
              { method:setPickupDateSelected, data:pickupDateGet.day2 },'next_day')}
            {modelBtn(pickupDateGet.day_after_next, 3,{ method:setPickupDate, data:pickupDateGet.day_after_next },
              { method:setPickupDateSelected, data:pickupDateGet.day2 },'day_after_next_day')}
          </View>
        )
      }else if(modalContent === 'pickupTime'){
        if (pickupTimeGet === null){
          return Loader();
        }else if(pickupTimeGet.length  === 0){
          return NoDataFound();
        }
        return (
          <View>
            {pickupTimeGet.map((data,i) =>{
                let time = data.time_from + ' to '+data.time_to;
                return modelBtn(time,i,{ method:setPickupTime, data:time},{ method:setPickupTimeSelected, data:time },'time')
              })}
          </View>
        )
      }else if(modalContent === 'dropDate'){
        return (
          <View>
            {modelBtn(dropDateGet.today, 4,{ method:setDropDate, data:dropDateGet.today },
              { method:setDropDateSelected, data:dropDateGet.day1 },'tomorrow')}
            {modelBtn(dropDateGet.next_day, 5,{ method:setDropDate, data:dropDateGet.next_day },
              { method:setDropDateSelected, data:dropDateGet.day2 },'next_day')}
            {modelBtn(dropDateGet.day_after_next, 6,{ method:setDropDate, data:dropDateGet.day_after_next },
              { method:setDropDateSelected, data:dropDateGet.day2 },'day_after_next_day')}
          </View>
        )
        }else if(modalContent === 'dropTime'){
        if (dropTimeGet === null){
          return Loader();
        }else if(dropTimeGet.length  === 0){
          return NoDataFound();
        }
        return (
          <View>
            {dropTimeGet.map((data,i) =>{
              let time = data.time_from + ' to '+data.time_to;
              return modelBtn(time,i,{ method:setDropTime, data:time},{ method:setDropTimeSelected, data:time },'time')
            })}
          </View>
        )
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

  const addressModal = () => {
    const addressListRender = () => {
      const selectAddress = async (addressId,addressDesc ) => {
        let UserDetails= JSON.parse(await AsyncStorage.getItem('userDetails'))
        let userId = UserDetails.id
         fetchAuthPostFunction('select/address',{user_id:userId,address_id:addressId}).then(async response => {
          if (response.status === 1){
            MyToast(response.message)
            UserDetails.default_address = addressDesc;
            setDefaultAddress(addressDesc)
            await AsyncStorage.setItem('userDetails',JSON.stringify(UserDetails));
            setAddressModalVisible(!isAddressModalVisible)
          }else{
            MyToast(response.message)
          }
        })
      }
      if (addressList === null){
        return Loader();
      }else if(addressList.length === 0){
        return NoDataFound();
      }
      return(
        addressList.map((data,i)=>{
          return (
            <TouchableOpacity onPress={() => {selectAddress(data.id,data.address)}} key={i}>
              <View style={{ width:'100%',borderWidth:1,borderColor:mainColor,padding:'5%',borderRadius:100/2,marginBottom:'1%' }} key={i}>
                <Text style={{ color:mainColor,fontSize:17 }}>{data.door_no}</Text>
                <Text>{data.address}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      )
    }
    return (
      <Modal isVisible={isAddressModalVisible} >
        <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
          <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
            <View>
              {MyButton(() => {setAddressModalVisible(!isAddressModalVisible)},'Back','','arrow-left')}
            </View>
          </View>
          <View style={{ backgroundColor:'#fff',height:'88%',paddingVertical:20,alignItems:'center'}}>
            <ScrollView style={{width:'80%',}} >
                {addressListRender()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
  const NavigateToNextPage = () => {
    if (pickupDateSelected !== '---' && pickupTimeSelected !== '---'&& dropDateSelected !== '---'&& dropTimeSelected !== '---' ){
      if (defaultAddress !== false && defaultAddress !== null){
        navigation.navigate('ProcessNext',{
          pickupTimeSelected:pickupTimeSelected,
          pickupDateSelected:pickupDateSelected,
          dropDateSelected:dropDateSelected,
          dropTimeSelected:dropTimeSelected,
          pickupDate:pickupDate,
          pickupTime:pickupTime,
          dropDate:dropDate,
          dropTime:dropTime,
          selectedServices:selectedServices,
          selectedServicesNames:selectedServicesNames
        })
      }else{
        MyToast('Please select any address or add address')
      }
    }else{MyToast('Please fill all options')}
  }
  return (
    <View style={Styles.mainContainer}>
      {modal()}
      {addressModal()}
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
                getTimeSlot(selectedDay).then(response => {
                  setPickupTimeGet(response)
                })
                const callFunction  = () => {
                    if (dropDate === '---') {
                      setModalContent('pickupTime')
                      setModalVisible(true)
                    }else{MyToast('To change pickup slot first clear drop slot')}
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
                                  const openModal = () => {
                                    if (dropDate === '---'){
                                      setModalContent('pickupDate')
                                      setModalVisible(true)}
                                    else{MyToast('To change pickup slot first clear drop slot')}
                                  }
                                  openModal()
                                }}

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
              {MyOutlineButton(
                ()=>{
                  setPickupDate('---')
                  setPickupDateSelected('---')
                  setPickupTime('---')
                  setPickupTimeSelected('---')
                  setDropDate('---')
                  setDropDateSelected('---')
                  setDropTime('---')
                  setDropTimeSelected('---')
                },
                'clear slots',
                {width:'100%',marginLeft:'-20%'}
              )}
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{
                fontSize:17,
                fontWeight:'bold',
                color:'grey'
              }}>Time Slots</Text>
              <TouchableOpacity onPress={() => {
                getTimeSlot(selectedDay).then(response => {
                  setDropTimeGet(response)
                })
                const callFunction  = () => {
                  setModalContent('dropTime')
                  setModalVisible(true)
                }
                ((dropDate !== '---')?(
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
              {
                ((defaultAddress !== false) ? ((defaultAddress === null) ? addAddressFunctions() : addressFunctions(defaultAddress)) : loadAddressFunctions())
              }
            </View>
            </View>
            <View style={Styles.container}>
              <TouchableOpacity onPress={() => {setAddressModalVisible(!isAddressModalVisible)}} style={{
                borderWidth:.5,
                padding:10,
                width:'80%',
                alignItems:'center'
              }}>
                <Text>-- Change address --   <FontAwesome5 name={'sort-down'} color={'grey'} size={20} /></Text>
              </TouchableOpacity>
            </View>
          <View style={{ padding:10,marginTop:'8%'}}>
              <TouchableOpacity onPress={() => {navigation.navigate('HomeScreenStack',{screen:'CreateAddressFlag'})}} style={{marginLeft:'6%'}}>
                <Text> <FontAwesome5 name={'plus-circle'} color={'grey'} size={14} /> Add address </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
      <View style={Styles.bottomContainer}>
        {MyButton(
          ()=>{NavigateToNextPage()},
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
