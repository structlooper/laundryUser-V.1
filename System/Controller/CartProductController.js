import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAuthPostFunction, MyToast } from "../Utility/MyLib";

const CartProductController = async (productId,qty) => {
  let UserDetails= await AsyncStorage.getItem('userDetails')
  let userId = JSON.parse(UserDetails).id
  let dom = {};
  dom.product_id = productId;
  dom.qty = qty;
  dom.user_id = userId
  fetchAuthPostFunction('cart',dom).then(result => {
    console.log('response',result)
    MyToast(result.message)

  })
}
export default CartProductController;
