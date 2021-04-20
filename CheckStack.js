import React, { Component, useEffect } from "react";
import { ActivityIndicator, View, Text, Switch } from "react-native";
import GuestNavigation from "./System/Route/GuestNavigation";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./System/Route/AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainColor } from "./System/Utility/MyLib";
import {AuthContext} from "./System/Utility/AuthContext";

const CheckStack =  () =>
{
const [userToken,setUserToken] = React.useState(null)
const [isLoading,setIsLoading] = React.useState(true)

  const authContext = React.useMemo(() => ({
    logIn:async  () => {
      setUserToken(await AsyncStorage.getItem('token'))
      setIsLoading(false)
    },
    logOut: () => {
      setUserToken(null)
      setIsLoading(false)
    },
    register:async () => {
      setUserToken(await AsyncStorage.getItem('token'))
      setIsLoading(false)
    }
  }));

 const setRetrieveUserToken = async () => {
   setUserToken(await AsyncStorage.getItem('token'))
    setIsLoading(false)
 }
  useEffect(() => {
    setRetrieveUserToken().then()
  },[])
  if(isLoading){
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    )
  }
  return(
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {(userToken !== null ) ? AuthNavigation():GuestNavigation() }
        </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default CheckStack;
