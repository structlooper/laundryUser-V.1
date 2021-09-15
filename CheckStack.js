import React, { Component, useEffect } from "react";
import { ActivityIndicator, View, Text, Switch } from "react-native";
import GuestNavigation from "./System/Route/GuestNavigation";
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigation from "./System/Route/AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAuthPostFunction, fetchPostFunction, mainColor } from "./System/Utility/MyLib";
import {AuthContext} from "./System/Utility/AuthContext";

const CheckStack =  () =>
{

  const [userToken,setUserToken] = React.useState(null)
  const [isLoading,setIsLoading] = React.useState(true)
  const [notificationCount, setNotificationCount] = React.useState(0);

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
    },
    notiCount: () => {
      return notificationCount;
    }
  }));

 const setRetrieveUserToken = async () => {
   let UserDetails= await AsyncStorage.getItem('userDetails')
   if (UserDetails !== null) {
     let phone_number = JSON.parse(UserDetails).phone_number
     let response = await fetchPostFunction('refreshToken', { phone_number: phone_number })
     setUserToken(response.token)
     await AsyncStorage.setItem('token', (response.token).toString())
     await AsyncStorage.setItem('userDetails',JSON.stringify(response.user))
   }
   setIsLoading(false)
 }

  React.useEffect(() => {
    getNotifications().then()
  },[]);
  const getNotifications = async () => {
    let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'));
    let userId = userDetails.id;
    fetchAuthPostFunction('notifications',{user_id:userId}).then(response => {
      setNotificationCount(response.data.length)
    })
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
