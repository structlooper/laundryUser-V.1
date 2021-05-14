import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { fetchAuthPostFunction, fetchGetFunction, mainColor, MyButton, MyToast,razorpay_key } from "../../Utility/MyLib";
import PaymentController from "../../Controller/PaymentController";
import NoDataFound from "../NoDataFound";
import Loader from "../../Utility/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SlotBtnActive = (time,timeId,j) => {
  return (
    <View style={styles.btnContainer} key={j}>
      <TouchableOpacity style={styles.DateBtnActive}
                        onPress={() => {console.log('pressed')}}
      >
        <View><Text style={styles.btnTextWhite}>{time}</Text></View>
      </TouchableOpacity>
    </View>
  )
}
const SlotBtn = (time,timId,setTimeId, itsTime,pageName,j,dateId,time_to) => {


  let value = (itsTime === true) ? 'time' : 'date';
  const saveTimeServer = async () => {
      const functionSave = async () => {

          let cartId=await AsyncStorage.getItem('cartId');
          let dom ={cart_id:cartId,type:pageName,value:value,data:time};
        // console.log('dom1',dom)
          await fetchAuthPostFunction('save_date_time',dom).then(async response => {
            if (response.status == 1){
              setTimeId(timId)
            }else{
              MyToast(response.message)
            }
          })
      }

    // console.log(userVal,' =>'+now)
    if (dateId === null){
      MyToast('Please select date first!')
    }else {
      if (pageName === 'drop'){
        functionSave().then()
      } else if(dateId === 'today'){
        const now = new Date();
        const dt = (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + time_to.replace(' ',':00 ');
        const userVal = new Date(dt);
        if (now < userVal) {
          functionSave().then()
        } else {
          MyToast('Time Slot greater then current time')
        }
      }else{
        functionSave().then()
      }
    }


  }

  return (
    <View style={styles.btnContainer} key={j}>
      <TouchableOpacity style={styles.DateBtn}
                        onPress={() => {
                          // console.log('time',time_to)
                          saveTimeServer().then()
                        }}
      >
        <View><Text style={styles.btnTextBlack}>{time}</Text></View>
      </TouchableOpacity>
    </View>
  )
}
const DateSlotBtn = (time,timId,setDateId,pageName,Date,setTimeId) => {

  let value =  'date';
  const saveTimeServer = async () => {
    let cartId=await AsyncStorage.getItem('cartId');
    let dom = {cart_id:cartId,type:pageName,value:value,data:Date};
    await fetchAuthPostFunction('save_date_time',dom).then(response => {
     if (response.status == 1){
       setDateId(timId)
       setTimeId(null)
     }else{
       MyToast(response.message)
     }
    })
  }

  return (
    <View style={styles.btnContainer} >
      <TouchableOpacity style={styles.DateBtn}
                        onPress={() => {
                          saveTimeServer().then()
                        }}
      >
        <View><Text style={styles.btnTextBlack}>{time}</Text></View>
      </TouchableOpacity>
    </View>
  )
}

const TimeSlotCart = (timeChild,i,timeId,setTimeId,pageName,dateId) => {

  return (
    <View style={styles.TimeSlotPatternContainer} key={i}>
      {
        timeChild.map((timeChildChild,j) => {
          return  (timeId === timeChildChild.id) ? SlotBtnActive(timeChildChild.time_from + ' to '+ timeChildChild.time_to,timeChildChild.id,j) :
            SlotBtn(timeChildChild.time_from + ' to '+timeChildChild.time_to,
              timeChildChild.id,setTimeId,
              true,pageName,j,dateId,timeChildChild.time_from)
        })

      }

    </View>
  )
}

const TimeSlot = ({navigation,route}) => {
  const {pageName} = route.params
  const [cart,
    setCart] = React.useState(null)
  const [time,setTimeSlot] = React.useState(null);
  const [date,setDateSlot] = React.useState(null);
  const [timeId,setTimeId] = React.useState(null);
  const [dateId,setDateId] = React.useState(null);
  const [loader,setLoader] = React.useState(false);
  const [checked,setChecked] = React.useState(null);

  const clearSlotFunction = async () => {
    let cartId=await AsyncStorage.getItem('cartId')
    fetchAuthPostFunction('slots/clear',{type:pageName,cart_id:cartId}).then(response => {
        setDateId(null)
        setTimeId(null)
    })
  }

  useEffect(() => {
    getDateTimeSlots().then()
    clearSlotFunction().then()
  },[])
  const getDateTimeSlots = async () => {
    await fetchGetFunction('time_slots').then(time => {
      setTimeSlot(time)
    })
    await fetchGetFunction('date_slots/'+pageName).then(date => {
      setDateSlot(date)
    })
    let UserDetails = await AsyncStorage.getItem('userDetails')
    let userId = JSON.parse(UserDetails).id
    await fetchGetFunction('cart/' + userId).then(result => {
      setCart(result)
    })
  }

  const clearSlotBtn = () => {
    if (pageName === 'drop'){
      return (
        <TouchableOpacity style={[styles.DateLabel,{borderRadius:100/2 ,borderColor:mainColor ,borderWidth:1,padding:2}]}
                          onPress={() => {
                            clearSlotFunction()
                          }}
        >

          <Text style={{color:mainColor}}>Clear {pageName} slots</Text>
        </TouchableOpacity>
      )
    }else{
      return <View></View>
    }

  }


  const onlinePayFunction = async () => {
    let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
    let amount = (cart.total_amt * 100).toString();
    const CheckOutFunction = async () => {
      await fetchAuthPostFunction('cart/checkout',{cart_id:cart.id,user_id:userDetails.id}).then(response => {
        console.log('order_response',response)
        const removeCart = async () => {
          await AsyncStorage.removeItem('cartId');
        }
        if (response.status === 1){
          removeCart()
          navigation.navigate('HomeScreenStack',{screen:'newOrderDetails',params:{order_id:(response.data.order_id)}})
        }else{
          MyToast(response.message)
        }
      })
    }
    PaymentController(amount,'Laundry').then(res => {
      if (res == "true"){
        setLoader(true)
        CheckOutFunction()
      }
    })
  }
  const dropPageBtn = () => {
    const proBtn = () => {
      return MyButton(() => {
        if (timeId !== null && dateId !== null){
          onlinePayFunction().then()
        }else{
          MyToast('Please Select pickup and drop time slot')
        }
      },'Proceed to Pay ',styles.bottomView,'cash-multiple')
    }
    return (
      <View>
        <View style={{paddingHorizontal:10,marginVertical:5}}>
        <View style={[{ flexDirection:'row'}]} >
          <View style={{  marginHorizontal:4 ,flex:1}}>
          <TouchableOpacity
            style={[{ justifyContent:'center',alignItems:'center' , paddingVertical:5,borderRadius:50/2},
              ((checked === 0) ? { backgroundColor:mainColor,}:{borderColor:mainColor,borderWidth:1 })]}
                onPress={() => {
                  setChecked(0);
                 }}
          >
            <Text style={[{ fontSize:25 },
              ((checked === 0) ? { color:'#fff',}:{color:mainColor })
            ]}>Online</Text>
            <View style={{ flex:1 }}>
              <Image source={{uri:'https://cdn1.iconfinder.com/data/icons/shopping-and-commerce-17/64/32-512.png'}} style={{width:50,height:50,resizeMode:'contain'}} />
            </View>
          </TouchableOpacity>
          </View>
          <View style={{  marginHorizontal:4 ,flex:1}}>
          <TouchableOpacity
            style={[{ justifyContent:'center',alignItems:'center' , paddingVertical:5,borderRadius:50/2},
              ((checked === 1) ? { backgroundColor:mainColor,}:{borderColor:mainColor,borderWidth:1 })]}
                onPress={() => {
                  setChecked(1);
                 }}
          >
            <Text style={[{ fontSize:25 },
              ((checked === 1) ? { color:'#fff',}:{color:mainColor })
            ]}>Cash</Text>
            <View style={{ flex:1 }}>
              <Image source={{uri:'https://image.flaticon.com/icons/png/512/438/438526.png'}} style={{width:50,height:50,resizeMode:'contain'}} />
            </View>
          </TouchableOpacity>
          </View>

        </View>
        </View>

        {proBtn()}
      </View>

    )

  }

  if (time === null || date === null || loader === true){
    return <Loader />
  }else if(time === [] || date === []){
    return <NoDataFound />
  }else{
    return (
      <View style={styles.MainContainer}>
        <View style={styles.DateContainer}>
          <View style={{ flexDirection:'row'}}>
            <Text style={[styles.DateLabel,{flex:1}]}>
              Select {pageName} Date
            </Text>
            { clearSlotBtn() }
          </View>

          <ScrollView  horizontal={true} style={styles.dateBtnScroller}>
            <View style={styles.DateBtnContainer}>
              {(dateId === "today") ? SlotBtnActive(date.today) : DateSlotBtn(date.today,"today",setDateId,pageName,date.day1,setTimeId)}
              {(dateId === "next_day") ? SlotBtnActive(date.next_day) : DateSlotBtn(date.next_day,"next_day",setDateId,pageName,date.day2,setTimeId)}
              {(dateId === "after_next_date") ? SlotBtnActive(date.day_after_next) : DateSlotBtn(date.day_after_next,"after_next_date",setDateId,pageName,date.day3,setTimeId)}
            </View>
          </ScrollView>
          <View style={styles.TimeContainer}>
            <Text style={styles.DateLabel}>
              Select {pageName} Time
            </Text>
            <View style={{alignItems:'center',marginTop:10,}}>
              { time.map((timeParent,i) =>
                TimeSlotCart(timeParent,i,timeId,setTimeId,pageName,dateId))}
            </View>
          </View>
        </View>

        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          {
            (pageName === 'drop')?
            dropPageBtn()
              : null
          }


        </View>
      </View>
    )
  }

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
