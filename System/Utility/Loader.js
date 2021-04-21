import React from "react";
import { View, ActivityIndicator } from "react-native";
import {mainColor} from "./MyLib";

const Loader = () => {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
      <ActivityIndicator size="large" color={mainColor} />
    </View>
  )
};
export default Loader;
