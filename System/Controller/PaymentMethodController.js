import React from "react";
import { fetchAuthPostFunction } from "../Utility/MyLib";
const PaymentMethodController = (data) => {
  return new Promise(resolve => {
    fetchAuthPostFunction('payment/status',{
      order_id:data.order_id,
      payment_status:data.payment_status,
      payment_methods:data.payment_methods
    }).then(response => {
      resolve(response)
    })
  })
};

export default PaymentMethodController;
