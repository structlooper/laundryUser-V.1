import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { fetchGetFunction, mainColor, MyButton, MyOutlineButton, MyToast } from "../Utility/MyLib";
import {TouchableOpacity} from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";
import Loader from "../Utility/Loader";
import NoDataFound from "./NoDataFound";
import CartProductController from "../Controller/CartProductController";
import { useIsFocused } from "@react-navigation/native";

const cartLoader = () => {
  return (
    <View style={{ paddingHorizontal:7,paddingVertical:3 }}>
      <ActivityIndicator size="small" color={mainColor}  />
    </View>
  )
}

const bill = (labelName,price,style) => {
  return (
    <View style={{flexDirection:'row',marginVertical:4,}}>
      <View style={{flex:3 , paddingLeft:5}}>
        <Text style={style}>
          {labelName}
        </Text>
      </View>
      <View style={{flex:2}}></View>
      <View style={{flex:1,}}>
        <Text style={style}>
          {price}
        </Text>
      </View>
    </View>
  )
}
const product = (name,qty,price,productId,i,setLoader,loader,setCheckRequest) => {
  const Btn = (productId,setLoader,i,num) => {
    let icon;
    if(num === 1){
      icon = 'plus'
    }else if(num === -1){
      icon = 'minus'
    }else{
      icon = 'cross'
    }
    return (
      <IconButton
        icon={icon}
        color={mainColor}
        size={15}
        onPress={ () => {
          setLoader(i+icon)
          CartProductController(productId, num,setCheckRequest)
        }}
        style={{borderColor:mainColor,borderWidth:1,marginTop:1}}
      />
    )
  }
  const cross = (productId,setLoader,i,setCheckRequest) => {
    return (
      <TouchableOpacity onPress={()=> {
        setLoader(i+'cross')
        CartProductController(productId, 0,setCheckRequest);
      }}>
        <Text style={{ fontSize:15,color: 'red',textAlign:'right'}}>
          X
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{ paddingHorizontal:10}} key={i}>
      <View style={{flexDirection:'row',borderBottomColor: 'grey',borderBottomWidth:.2 ,paddingVertical:12 }}>
        <View style={{flex:2}}>
          <Text style={{ fontSize:15,color: 'black'}}>
            {name}
          </Text>
        </View>
        <View style={{flex:.8}}>
          <View style={Styles.AddCartBtn}>
            { (loader === i+'minus') ? cartLoader() : Btn(productId,setLoader,i,-1)}
            <View style={{marginTop:1}}>
              <Text>
                {qty}
              </Text>
            </View>
            { (loader === i+'plus') ? cartLoader() : Btn(productId,setLoader,i,1)}
          </View>

        </View>
        <View style={{flex:.5}}>
          <Text style={{ fontSize:15,color: 'black',textAlign:'center'}}>
            {price}
          </Text>
        </View>
        <View >
          { (loader === i+'cross') ? cartLoader() : cross(productId,setLoader,i,setCheckRequest)}
          </View>
      </View>
    </View>
  )
}

const Cart = ({navigation}) => {
  const [cart , setCart] = React.useState(null)
  const [loader , setLoader] = React.useState(false)
  const [loading , setLoading] = React.useState(false)
  const [defaultAddress , setDefaultAddress] = React.useState(false)
  const [checkRequest, setCheckRequest] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
      getCartData().then()
  },[isFocused,checkRequest])

  const getCartData = async () => {
      let UserDetails = await AsyncStorage.getItem('userDetails')
      setUserDetails(JSON.parse(UserDetails))
      let userId = JSON.parse(UserDetails).id
      // if (checkRequest === true) {
       await fetchGetFunction('cart/' + userId).then(result => {
          setCart(result)
          setLoader(false)
        })
      // }
      let Address = JSON.parse(UserDetails).default_address;
      setDefaultAddress(Address)
      setCheckRequest(false)
  }

  const promoCodeBtn =  () => {
      if (cart.promocode_id === 0) {
        return (
          <View style={{ marginLeft: 15 }}>

            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreenStack', { screen: 'Offers', params: { cartId: cart.id } })}
            >
              <Text style={{ fontSize: 17, color: mainColor }}>Apply promo</Text>
              <Text>Check offers</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 17, color: mainColor }}>Promotion Applied</Text>
            <Text>You are saving ₹ {cart.discount ?? '0.0'}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreenStack', { screen: 'Offers', params: { cartId: cart.id } })}
            >
              <Text style={{ fontSize: 12, color: mainColor }}>Change Promo</Text>

            </TouchableOpacity>
          </View>
        )
      }

  }
  const saveCartId = async (cartId) => {
     return new Promise(resolve => {
       fetchGetFunction('checkAddress/'+userDetails.id).then(async response => {
         if (response.status === 1){
           await AsyncStorage.setItem('cartId',cartId.toString())
           resolve(true)
         }else{
           MyToast(response.message)
           resolve(false)
         }
       })
     })
  }

  if (cart === null ){
    return <Loader />
  }else if(cart.length === 0 || (cart.cart_products).length === 0 || cart === {}){
    return <NoDataFound />
  }else{
    return (
      <View style={Styles.mainView}>
        <View style={Styles.headingView}>
          <Text style={Styles.heading}>
            Your Cloths
          </Text>

        </View>

        <View>
          <ScrollView style={{ minHeight:230}}>
            { (cart.cart_products).map((data,i) =>
              product(data.product_name+' ( ' +data.service_name+' )',data.qty,'₹ '+(data.price * data.qty),data.product_id,i,setLoader,loader,setCheckRequest)
            )}
          </ScrollView>

        </View>

        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>

          {/* Promotion apply section*/}
          {(userDetails.membership === null) ?
            <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:10}}>
              <View >
                <FontAwesome5 name={'user-tag'} size={45} color={'black'} style={{ marginTop:5 }} />
              </View>
              {
                promoCodeBtn()
              }
            </View>
            : null}


          {/*bill section*/}
          <View style={{padding:10,flex:1,borderTopColor:'gray',borderTopWidth:1}}>
            {bill('Subtotal','₹ '+cart.subtotal,Styles.priceLabel)}
            {(userDetails === null)?
              bill('Discount','₹ '+((cart.discount === 0)?"0.0" : cart.discount) ,Styles.priceLabel)
              :bill('Member discount','₹ '+((cart.mem_total_discount === 0)?"0.0" : cart.mem_total_discount) ,Styles.priceLabel)
            }
            { bill('Delivery Charges','₹ '+(cart.delivery_changes))}
            {(cart.additional_charges > 0)? bill('Additional Charge','₹ '+((cart.additional_charges === 0)?"00.0" : cart.additional_charges) ,Styles.priceLabel): null}
            {bill('Total','₹ '+cart.total_amt,Styles.priceLabelFinal)}
          </View>

          <View style={{borderTopWidth:1,borderTopColor:'gray'}}>
            {
              ((defaultAddress !== false) ? ((defaultAddress === null) ? addAddressFunctions(navigation) : addressFunctions(navigation,defaultAddress)) : loadAddressFunctions(navigation))
            }
            <View >
              {MyButton(() => {
                setLoading(true)
                saveCartId(cart.id).then(resolve => {
                  if (resolve === true){
                    setLoading(false)
                    navigation.navigate('HomeScreenStack',{screen:'TimeBar'})
                  }
                  setLoading(false)
                })
              },'Proceed',Styles.bottomView,'checkbox-marked-circle',loading)}
            </View>
          </View>

        </View>

      </View>
    )
  }

}
const addressFunctions = (navi,defaultAddress) => {
  return (
    <View style={{ flexDirection:'row'}}>
      <View style={{marginLeft:12,marginTop:15,flex:1}} >

        <View>
          <Text style={{fontSize:17,color: 'black' ,maxHeight:40}}>{defaultAddress.address ?? defaultAddress}</Text>
        </View>

      </View>
      <View>
        {MyOutlineButton(() => {navi.navigate('HomeScreenStack',{screen:'SelectAddress'})},'Change Address',Styles.bottomView,)}

      </View>
    </View>

  )
}
const addAddressFunctions = (navi) => {
  return (
    <View style={{ flexDirection:'row'}}>
      <View style={{marginLeft:12,marginTop:15,flex:1}} >

        <View>
          <Text style={{fontSize:17,color: 'black'}}>Add Address</Text>
          <Text >No Address found</Text>
        </View>

      </View>
      <View>
        {MyOutlineButton(() => {navi.navigate('HomeScreenStack',{screen:'SelectAddress'})
        },'Add Address',Styles.bottomView,)}

      </View>
    </View>

  )
}

const loadAddressFunctions = (navi) => {
  return (
    <View style={{ flexDirection:'row'}}>
      <View style={{marginLeft:12,marginTop:15,flex:1,alignItems:'center'}} >
          <Text style={{fontSize:17,color: 'black'}}>Loading Address .........</Text>
      </View>
    </View>

  )
}
const Styles = StyleSheet.create({
  mainView:{
    // flex:1,
    borderTopColor:'#eee',
    borderTopWidth:5,
    padding:5,
    height:'100%',
    backgroundColor:'#ffffff'
  },
  headingView:{
    alignItems:'center',
    borderBottomColor:'gray',
    borderBottomWidth:.1,
    // padding:5
  },
  heading:{
    fontSize:20,
    color:'black'
  },
  bottomView:{
    margin:10,
  },
  deliveryBtn:{
    padding:5,
    margin:12,
    borderWidth:1,
    borderColor:mainColor
  },
  priceLabel:{
    fontSize: 14
  },
  priceLabelFinal:{
    fontSize: 16,fontWeight:"bold"
  },
  ItemChild:{
    flex:.3,
    alignItems:'center',
    justifyContent:"center",
  },
  AddCartBtn:{
    flexDirection: 'row',
  },
})
export default Cart;
