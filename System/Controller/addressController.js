import { Text, View } from "react-native";
import { MyOutlineButton } from "../Utility/MyLib";
import React from "react";

export const addressFunctions = (defaultAddress) => {
  return (
        <View style={{ marginLeft:10 }}>
          <Text style={{fontSize:17,color: 'black' ,maxHeight:"100%"}}>{defaultAddress.address ?? defaultAddress}</Text>
        </View>
  )
}
export const addAddressFunctions = () => {
  return (
    <View style={{ marginLeft:10 }}>
      <Text style={{fontSize:17,color: 'black' ,maxHeight:"100%"}}>Sorry No address found!</Text>
    </View>
  )
}

export const loadAddressFunctions = () => {
  return (
    <View style={{ flexDirection:'row'}}>
      <View style={{marginLeft:12,marginTop:15,flex:1,alignItems:'center'}} >
        <Text style={{fontSize:17,color: 'black'}}>Loading Address .........</Text>
      </View>
    </View>

  )
}
