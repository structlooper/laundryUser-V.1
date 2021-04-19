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

 const initialLoginState = {
   userToken:null,
 }

 const loginReducer = (previousState,action) => {
   switch(action.type){
     case "LOGIN":
       return {}
     case "LOGOUT":
       return {}
     case "REGISTER":
       return {}
   }
 }

  const authContext = React.useMemo(() => ({

    logIn:async  () => {
      setUserToken(await AsyncStorage.getItem('token'))
      setIsLoading(false)
    },
    logOut: () => {
      setUserToken(null)
      setIsLoading(false)
    },
    register: () => {
      setUserToken( AsyncStorage.getItem('token'))
      setIsLoading(false)
    }
  }));

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   },1000)
  // },[])
  // if(isLoading){
  //   return (
  //     <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
  //       <Text>
  //         text hai
  //       </Text>
  //       <ActivityIndicator size='large'  />
  //     </View>
  //
  //   )
  // }
  console.log('token',userToken)

  return(
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {(userToken !== null ) ? AuthNavigation():GuestNavigation() }
        </NavigationContainer>
    </AuthContext.Provider>

  )
}

export default CheckStack;
