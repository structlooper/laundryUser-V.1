import React from "react";
import { View, Text } from "react-native";

const orderStatusImage = (order) => {
  let image;
  switch (order.label_name){
    case 'Order Placed':
      return image = require('../Public/Order_status/order_confirmed.png');
    case 'Assigned':
      return image = require('../Public/Order_status/assigned.png');
    case 'On the way to pickup':
      return image = require('../Public/Order_status/pickup.png');
    case 'Processing':
      return image = require('../Public/Order_status/processing.png');
    case "Ready to dispatch":
      return image = require('../Public/Order_status/ready_to_dispatch.png');
    case 'On the way to deliver':
      return image = require('../Public/Order_status/on_way_to deliver.png');
    case 'Completed':
      return image = require('../Public/Order_status/delivered.png');
    default:
      return image = require('../Public/Order_status/order_confirmed.png');

  }
}
export default orderStatusImage;
