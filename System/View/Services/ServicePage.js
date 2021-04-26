import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { MyButton, mainColor, fetchGetFunction, ImageUrl, fetchAuthPostFunction, MyToast } from "../../Utility/MyLib";
import { IconButton } from 'react-native-paper';
import Loader from "../../Utility/Loader";
import NoDataFound from "../NoDataFound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartProductController from "../../Controller/CartProductController";




const productCard = (itemImage,Name,qty,price,unit,productId,i,setLoader,loader) => {
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
        onPress={() => {
          setLoader(i+icon)
          CartProductController(productId, num);
        }}
        style={{borderColor:mainColor,borderWidth:1}}
      />
    )
  }
  return (
    <View style={styles.ItemMain} key={i}>
      <View style={styles.ItemChild}>
        <Image source={{ uri:itemImage }} style={styles.ItemImage}>
        </Image>
      </View>
      <View style={styles.ItemChild}>
        <Text style={styles.ItemName}>
          {Name}
        </Text>
      </View>
      <View style={styles.ItemChild}>
        <View style={styles.AddCartBtn}>
          <View>
            { (loader === i+'minus') ? Loader() : Btn(productId,setLoader,i,-1)}
          </View>
          <View style={{paddingTop:6}}>
            <Text>
              {qty}
            </Text>
          </View>
          <View>
            { (loader === i+'plus') ? Loader() : Btn(productId,setLoader,i,1)}
          </View>
        </View>

      </View>
      <View style={styles.ItemChild}>
        <Text style={styles.PriceLabel}>
          ₹ {price} /
        </Text>
        <Text style={styles.PriceLabel}>
          {unit}
        </Text>
      </View>
    </View>
  )
}

const ServicePage = ({navigation,route}) => {
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(false);
  const [cartProducts, setCartProducts] = useState({});
  const {categoryId} = route.params

  useEffect(() => {
    getProductsByCategoryId().then()
  },[cartProducts])
  const getProductsByCategoryId = async () => {
   await fetchGetFunction('product/'+categoryId).then(result => {
      setProducts(result)
    })
    let UserDetails= await AsyncStorage.getItem('userDetails')
    let userId = JSON.parse(UserDetails).id
    await fetchGetFunction('cart/'+userId).then(result => {
      let obj = {};
      (result.cart_products).forEach(element => {
        let key = element.product_id
        obj[key] = element.qty;
      });
      setCartProducts(obj)
      setLoader(false)

    })
  }

  if (products === null ){
    return <Loader />
  }
  else if(products.length > 0) {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: '#eee' }}>
        <ScrollView style={{ marginTop: 5 }}>
          { products.map((data,i) => {
            let Q = 0;
              if (Object.keys(cartProducts).some(v => v == (data.id).toString())){
                Q = cartProducts[data.id]
              }
              return productCard(ImageUrl + 'uploads/' + data.image, data.product_name, Q, data.price, data.unit,data.id, i,setLoader,loader)

            }
          )}
        </ScrollView>

        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          {MyButton(() => {
            navigation.navigate('HomeScreenStack', { screen: 'ViewCart' })
          }, 'View Cart', styles.bottomView, 'cart')}
        </View>
      </View>
    )
  }
  else{
    return (
      <NoDataFound />
    )
  }
}
const styles = StyleSheet.create({
  bottomView:{
    // padding:5,
    margin:10
  },
  ItemMain :{
    width:'100%',
    backgroundColor:'#fff',
    flexDirection:'row',
    marginVertical:1,
    padding:5,

  },
  ItemChild:{
    flex:.3,
    alignItems:'center',
    justifyContent:"center",
  },
  ItemImage:{
    height: 70,
    width: 70,
    resizeMode: 'contain'
  },
  ItemName:{
    fontSize:15,
    fontWeight:'bold',
  },
  PriceLabel:{
    fontSize: 15,
    color:mainColor
  },
  AddCartBtn:{
    flexDirection: 'row',
    padding:5,
    marginLeft:10
  },
  ItemService:{
    fontSize:12,
    color: mainColor
  },
  ItemServiceContainer:{
    flexDirection:'row'
  },
  ItemServiceIcon:{
    marginLeft: 2,
    marginTop:-3
  }

})
export default ServicePage;
