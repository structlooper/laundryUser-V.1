import React from 'react';
import {View,Text,StyleSheet,Image,ScrollView} from 'react-native';
import {mainColor, MyButton,MyOutlineButton} from "../Utility/MyLib";
import {TouchableOpacity} from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const bill = (labelName,price,style) => {
  return (
    <View style={{flexDirection:'row',marginVertical:4,}}>
      <View style={{flex:1 , paddingLeft:4}}>
        <Text style={style}>
          {labelName}
        </Text>
      </View>
      <View style={{flex:1}}></View>
      <View style={{flex:1,alignItems: 'center'}}>
        <Text style={style}>
          {price}
        </Text>
      </View>
    </View>
  )
}
const product = (name,qty,price) => {
  return (
    <View style={{ paddingHorizontal:10}}>
      <View style={{flexDirection:'row',borderBottomColor: 'grey',borderBottomWidth:.2 ,paddingVertical:12 }}>
        <View style={{flex:.5}}>
          <Text style={{ fontSize:15,color: mainColor,fontWeight: 'bold'}}>
            {qty}
          </Text>
        </View>
        <View style={{flex:2}}>
          <Text style={{ fontSize:15,color: 'black'}}>
            {name}
          </Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{ fontSize:15,color: 'black',marginLeft:40}}>
            {price}
          </Text>
        </View>
      </View>
    </View>
  )
}

const Cart = ({navigation}) => {
  return (
    <View style={Styles.mainView}>
      <View style={Styles.headingView}>
        <Text style={Styles.heading}>
          Your Cloths
        </Text>

      </View>
      <View>
        <ScrollView style={{ minHeight:230}}>

          {product('Blazer (Dry Cleaning)','2x','₹ 4')}
          {product('Jens (Dry Cleaning)','3x','₹ 3')}
          {product('Shirt (Dry Cleaning)','5x','₹ 8')}
          {product('Mens Kurta (Dry Cleaning)','1x','₹ 10')}

        </ScrollView>

      </View>

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>

        {/* Promotion apply section*/}
        <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:10}}>
          <View >
            <FontAwesome5 name={'user-tag'} size={45} color={'black'} style={{ marginTop:5 }} />
          </View>
          <View style={{marginLeft:15}}>
            <Text style={{fontSize:17,color: mainColor}}>Promotion Applied</Text>
            <Text >You are saving $ 01.3</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreenStack',{screen:'Offers'})}
            >
              <Text  style={{fontSize:12,color: mainColor}}>Change Promo</Text>

            </TouchableOpacity>
          </View>
        </View>

        {/*bill section*/}
        <View style={{padding:10,flex:1,borderTopColor:'gray',borderTopWidth:1}}>

          {bill('Subtotal','₹ 10.0',Styles.priceLabel)}
          {bill('Discount','₹ 01.3',Styles.priceLabel)}
          {bill('Total','₹ 90.0',Styles.priceLabelFinal)}
        </View>

        <View style={{borderTopWidth:1,borderTopColor:'gray'}}>
          <View style={{ flexDirection:'row'}}>
            <View style={{marginLeft:12,marginTop:15,flex:1}} >

              <View>
                <Text style={{fontSize:17,color: 'black'}}>Flat no. 57, Sec 7</Text>
                <Text >Dwarka, New Delhi 110059</Text>
              </View>

            </View>
            <View>
              {MyOutlineButton(() => {navigation.navigate('HomeScreenStack',{screen:'SelectAddress'})},'Change Address',Styles.bottomView,)}

            </View>
          </View>

          <View >
            {MyButton(() => {navigation.navigate('HomeScreenStack',{screen:'TimeBar'})},'Proceed',Styles.bottomView,'checkbox-marked-circle')}
          </View>
        </View>

      </View>

    </View>
  )
}

const Styles = StyleSheet.create({
  mainView:{
    flex:1,
    padding:5,
    height:'100%',
    backgroundColor:'#ffffff'
  },
  headingView:{
    alignItems:'center',
    borderBottomColor:'gray',
    borderBottomWidth:.5,
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
  }
})
export default Cart;
