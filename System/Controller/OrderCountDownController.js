import React from "react";
import { View, Text } from "react-native";
import { mainColor } from "../Utility/MyLib";
import CountDown from 'react-native-countdown-component';

const OrderCountDownController = (order_label,delivery_duration) => {
  if (delivery_duration > 0) {
    if (order_label === "Processing" || order_label === "Ready to dispatch" || order_label === "On the way to deliver") {
      return (
        <View>
          <Text style={{
            marginVertical: 2,
            fontSize: 15,
            color: '#000',
          }}>
            Till Drop -
          </Text>
          <CountDown
            until={delivery_duration}
            onFinish={() => console.log('finished')}
            onPress={() => console.log('hello')}
            digitStyle={{ backgroundColor: '#eee' }}
            digitTxtStyle={{ color: mainColor }}
            timeLabels={{ m: 'MM', s: 'SS', h: 'HH', d: 'DD' }}
            size={20}
          />
        </View>
      );
    }
  }
};
export default OrderCountDownController;
