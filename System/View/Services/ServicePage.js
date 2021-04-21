import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity } from "react-native";
import { MyButton, mainColor, fetchGetFunction, ImageUrl } from "../../Utility/MyLib";
import { IconButton } from 'react-native-paper';
import Loader from "../../Utility/Loader";
import NoDataFound from "../NoDataFound";


const productCard = (itemImage,Name,qty,price,unit,i) => {
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
            <IconButton
              icon="minus"
              color={mainColor}
              size={15}
              onPress={() => console.log('Pressed')}
              style={{borderColor:mainColor,borderWidth:1}}
            />
          </View>
          <View style={{paddingTop:6}}>
            <Text>
              {qty}
            </Text>
          </View>
          <View>
            <IconButton
              icon="plus"
              color={mainColor}
              size={15}
              onPress={() => console.log('Pressed')}
              style={{borderColor:mainColor,borderWidth:1}}
            />
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
  const {categoryId} = route.params

  useEffect(() => {
    getProductsByCategoryId().then()
  },[])
  const getProductsByCategoryId = async () => {
    fetchGetFunction('product/'+categoryId).then(result => {
      setProducts(result)
    })
  }

  if (products === null){
    return <Loader />
  }
  else if(products.length > 0) {
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: '#eee' }}>
        <ScrollView style={{ marginTop: 5 }}>
          { products.map((data,i) =>
            productCard(ImageUrl+'uploads/'+data.image, data.product_name, 0, data.price,data.unit,i)
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
