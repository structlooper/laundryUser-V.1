import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  mainColor,
  MyButton,
  MyOutlineButton,
  MyTextInput,
  MyToast,
  fetchAuthPostFunction,
  fetchGetFunction,
} from "../../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { placeOrder } from "../../Controller/CartController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import Loader from "../../Utility/Loader";
import NoDataFound from "../NoDataFound";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ProcessNext = ({navigation,route}) => {
  const [ promoCodeInput, setPromoCodeInput ] = React.useState("");
  const [ promoCodeSelected, setPromoCodeSelected ] = React.useState(null);
  const [ promoCodeSelectedShow, setPromoCodeSelectedShow ] = React.useState(null);
  const [ promoCodeGet, setPromoCodeGet ] = React.useState(null);
  const [ promoCodeLoading, setPromoCodeLoading ] = React.useState(false);
  const [ selectedServiceIds, setSelectedServiceIds ] = React.useState(null);
  const [ selectedEsCloths, setSelectedEsCloths ] = React.useState(null);
  const [ selectedAdItems, setSelectedAdItems ] = React.useState([]);
  const [ additionalItems, setAdditionalItems ] = React.useState([]);
  const [ update, setUpdate ] = React.useState(null);
  const [ isVisible, changeIsVisible ] = React.useState(false);
  const {pickupTimeSelected} = route.params;
  const {pickupDateSelected} = route.params;
  const {dropDateSelected} = route.params;
  const {dropTimeSelected} = route.params;
  const {pickupDate} = route.params;
  const {pickupTime} = route.params;
  const {dropDate} = route.params;
  const {dropTime} = route.params;
  const {selectedServices} = route.params;
  const {selectedServicesNames} = route.params;

  React.useEffect(() => {
    callFunctions()
  },[update])
  const getServicesIds = async () => {
    let ids = '';
    await selectedServices.map((serviceId,i) => {
      if (i === 0){
        ids = serviceId;
      }else{
        ids= ids+','+serviceId;
      }
    })
    setSelectedServiceIds(ids)
  }

 const getPromoCodes = async () => {
    await fetchAuthPostFunction('promo',{lang:'en'}).then(response => {
      setPromoCodeGet(response.result)
    })
 }
  const callFunctions = () => {
    getServicesIds().then()
    getPromoCodes().then()
    getAdditionalItems().then()
  }
  const getAdditionalItems =async () =>{
    fetchGetFunction('additional-items').then(res => {
      setAdditionalItems(res)
    })
  }

  const PlaceOrder = async () => {
    if (selectedEsCloths === null){
      MyToast('Please select estimated cloths')
    }else{
      let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
      let data = {
        customer_id:userDetails.id,
        selected_service_ids:selectedServiceIds,
        pickup_time:pickupTimeSelected,
        expected_pickup_date:pickupDateSelected,
        drop_time:dropTimeSelected,
        expected_delivery_date:dropDateSelected,
        estimated_cloths:selectedEsCloths
      }
      if (selectedAdItems && selectedAdItems != ''){
        data.additional_item_ids=selectedAdItems.join(',')
      }
      if (promoCodeSelected){
        data.promo_code_id=promoCodeSelected
      }
      placeOrder(data).then(response => {
        MyToast(response.message);
        if(response.status === 1){
          navigation.navigate('OrderPlaced',{orderId:response.order_id,pickupDate:pickupDate,pickupTime:pickupTime})
        }
      })
    }

  }
  const es_cloths = (text) => {
    return (
      <TouchableOpacity onPress={()=>{setSelectedEsCloths(text)}} style={{
        flex:1,
        padding:5,
        backgroundColor:(selectedEsCloths === text)?mainColor :'rgba(83,203,154,0.87)',marginHorizontal:5,
        borderRadius:10/2
      }}>
        {/*<TouchableOpacity onPress={() => {console.log('thia')}}>*/}
        <Text style={{
          color:'#fff',
          textAlign:'center'
        }}>{text}</Text>
      </TouchableOpacity>
    )
  }
  const ad_items = (text,i) => {
    let ad_items = selectedAdItems;
    return (
      <TouchableOpacity style={{
        flex:1,
        padding:5,
        borderRadius:100/2,
        backgroundColor:(selectedAdItems.includes(text))? mainColor :'rgba(107,248,189,0.87)',marginHorizontal:5
      }}
                        onPress={() => {
                          if (ad_items.includes(text)){
                            const index = ad_items.indexOf(text);
                            ad_items.splice(index, 1);
                            setUpdate(text+'plus')
                          }else{
                            ad_items.push(text)
                            setUpdate(text+'minus')

                          }
                          setSelectedAdItems(ad_items)

                        }}
                        key={i}
      >

        <Text style={{
          color:(selectedAdItems.includes(text))? '#fff' :'#000',
          textAlign:'center',
          width:wp('25')

        }}> {text}</Text>
      </TouchableOpacity>
    )
  }
  const checkPromoCode =  () => {
    return new Promise(async resolve => {
      await fetchAuthPostFunction('promo/check',{
        promo_code:promoCodeInput
      }).then(response => {
        resolve(response)
      })
    })
  }
  const promoCodeModal = () => {
    const promoCodeListRender = () => {
      const promoCard = (offer,i) => {
        return (
          <View style={{  padding: 20, marginBottom:'1%' , backgroundColor: '#fff' }} key={i} >
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{}}>
                <View style={{
                  padding:10,paddingHorizontal:15,
                  borderWidth:1,borderColor:'green',borderRadius:50/2
                }}>
                  <Text style={{ color: 'green', fontSize: 16 }}><FontAwesome5 name={'tag'} color={'black'} size={15} />  {offer.promo_code}</Text>

                </View>
              </View>

              <View style={{ flex:1,alignItems:'flex-end'}}>
                {MyOutlineButton(
                  () => {
                    setPromoCodeSelected(offer.id)
                    setPromoCodeSelectedShow(offer.promo_code)
                    changeIsVisible(!isVisible)
                    MyToast('Promo code applied successfully')
                  },
                  'Apply'
                )}
              </View>
            </View>

            <View>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                {offer.promo_name}
              </Text>
              <Text style={{ textAlign: "justify"  }}>
                {offer.description}
              </Text>
            </View>
          </View>

        )
      }
      if (promoCodeGet === null){
        return Loader()
      }else if(promoCodeGet.length > 0){
        return (
          <View>
            {promoCodeGet.map((data,i)=>{
              return promoCard(data,i)
            })}

          </View>
        )
      }else{
        return NoDataFound();
      }
    }
    return (
      <Modal isVisible={isVisible} >
        <View style={{flex: .7,borderWidth:.2,backgroundColor:'#eee',}}>
          <View style={{borderBottomWidth:.5,paddingBottom:10,padding:10}}>
            <View>
              {MyButton(() => {changeIsVisible(!isVisible)},'Back','','arrow-left')}
            </View>
          </View>
          <View style={{ backgroundColor:'#eee',height:'88%',alignItems:'center'}}>
            <ScrollView style={{width:'100%',}} >
              {promoCodeListRender()}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
  const applyPromoCode = () => {
    return (
      <View style={{
        marginTop:'5%'
      }}>
        <TouchableOpacity onPress={() => {
          changeIsVisible(!isVisible)}}>
          <Text style={{color:mainColor}}>
            <FontAwesome5 name={'percent'} color={'grey'} size={20} />   Select a promo code
          </Text>
        </TouchableOpacity>

        <View style={{
          flexDirection:'row',
          marginTop: '2%'
        }}>
          { MyTextInput(
            promoCodeInput,
            setPromoCodeInput,
            'enter promo code here',
            {
              width:'100%',
              height:50,
              backgroundColor: '#fff',
            }
          ) }
          {
            MyOutlineButton(
              ()=>{
                setPromoCodeLoading(true)
                checkPromoCode().then(res => {
                  setPromoCodeLoading(false)
                  if (res.status === 1){
                    setPromoCodeSelected(res.data.id)
                    setPromoCodeSelectedShow(res.data.promo_code)
                    setPromoCodeInput('')
                  }
                  MyToast(res.message)
              })},
              'Apply',
              '',
              '',
              promoCodeLoading
            )
          }
        </View>

      </View>
    )
  }
  const changePromoCode =()=> {
    return (
      <View style={{
        marginTop:'5%'
      }}>
        <TouchableOpacity onPress={() => {
          setPromoCodeSelected(null)
          setPromoCodeSelectedShow(null)
          setPromoCodeInput('')
        }}>
          <Text style={{color:'red'}}>
            <FontAwesome5 name={'percent'} color={'grey'} size={20} />   Remove promo code
          </Text>
        </TouchableOpacity>

        <View style={{
          flexDirection:'row',
          marginTop: '2%'
        }}>
          <Text style={{
            padding:'4%',
            color:'green',
            borderColor:'green',
            borderWidth:1,
            borderRadius:50/2
          }}> <FontAwesome5 name={'tag'} color={'black'} size={15} />  {promoCodeSelectedShow}</Text>
          {
            MyOutlineButton(
              ()=>{changeIsVisible(!isVisible)},
              'Change'
            )
          }
        </View>

      </View>
    )
  }
  return (
    <View style={Styles.mainContainer}>
      {promoCodeModal()}
      <View style={Styles.topContainer}>
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          textAlign:'center',
          marginBottom:'3%'
        }}>Slot Details</Text>
        <View style={{
          marginVertical:'1%',
          marginHorizontal:'1%'
        }}>
          <Text>Pickup {pickupDate} | {pickupTime}</Text>
        </View>
        <View style={{
          marginVertical:'1%',
          marginHorizontal:'1%'
        }}>
          <Text>Drop {dropDate} | {dropTime}</Text>
        </View>
      </View>
      <View style={Styles.topContainerOne}>
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          textAlign:'center'
        }}>Service Details</Text>
        <ScrollView>
          {selectedServicesNames.map((name,i)=>{
            return (
              <Text style={{
                paddingVertical:4,
              }} key={i}>{name}</Text>
            )
          })}

        </ScrollView>
        <View>
          <Text style={{
            fontWeight:'bold',
            fontSize:16,
            textAlign:'center',
            marginVertical:'2%'
          }}>Estimated cloths</Text>
          <View style={{
            flexDirection:'row'
          }}>
            {es_cloths('<20')}
            {es_cloths('20-40')}
            {es_cloths('>40')}
          </View>
          <View style={{
            flexDirection:'row',
            marginTop:10,
          }}>
            <ScrollView horizontal={true}>
              {(additionalItems.length > 0)?
                additionalItems.map((data,i) =>
                  ad_items(data.item_name,i)
                )
              :null}
            </ScrollView>

          </View>
        </View>
      </View>
      <View style={Styles.middleContainer}>
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          // textAlign:'center'
        }}>Offers</Text>
        {(promoCodeSelected === null)? applyPromoCode() : changePromoCode()}
      </View>
      <View style={Styles.bottomContainer}>
        {MyButton(
          ()=>{PlaceOrder().then()},
          'Place order',
          {width:wp('40'), },
          'cart'
        )}
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
    marginTop:'1%',
    backgroundColor:'#fff'
  },
  topContainer:{
    height: '20%',
    padding:'3%',
    paddingHorizontal:'5%',
    borderBottomWidth:.5,
    overflow:'hidden'

  },
  topContainerOne:{
    height: '40%',
    padding:'3%',
    paddingHorizontal:'5%',
    borderBottomWidth:.5,
    overflow: 'hidden'

  },
  middleContainer:{
    height: '30%',
    padding:'3%',
    paddingHorizontal:'5%'
  },
  bottomContainer:{
    height:'10%',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:10,
  }
})
export default ProcessNext;
