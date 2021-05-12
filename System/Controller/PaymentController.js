import React from 'react';
import {View,Text} from 'react-native';
import { logo } from "../Utility/Images";
import { mainColor, razorpay_key } from "../Utility/MyLib";
import RazorpayCheckout from "react-native-razorpay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaymentController = async (amount,forPay) => {
  let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'))
  let res;
  const options = {
    description: 'Payment towards '+forPay,
    image: logo,
    currency: 'INR',
    key: razorpay_key,
    amount: amount,
    name: 'KRYCHE',
    prefill: {
      email: userDetails.email,
      contact: userDetails.phone_number,
      name: userDetails.customer_name
    },
    theme: {color: mainColor}

  }
  await RazorpayCheckout.open(options).then((data) => {
    // handle success
    res = "true";
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
    res = "false";
  });
return res;
}

export default PaymentController;