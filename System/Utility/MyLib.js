import React from "react";
import { TextInput,Button } from 'react-native-paper';
import {View,TouchableOpacity,Text,  ToastAndroid,
} from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
export const MyTextInput = (name,onChangeFunction,placeHolder,style,icon) => {
  return (
    <View>

    <TextInput
      left={ icon ? <TextInput.Icon name={icon} size={20} color={mainColor}  /> : ''
      }
        name='IconSource'
        style={style}
        onChangeText={onChangeFunction}
        value={name}
        placeholder={placeHolder}
      />
    </View>

  )
}
export const MyNumericInput = (name,onChangeFunction,placeHolder,style,icon,autofocus) => {
  return (
    <View>

    <TextInput
      left={ icon ? <TextInput.Icon name={icon} size={20} color={mainColor}  /> : ''
      }
        name='IconSource'
        style={style}
        onChangeText={onChangeFunction}
        value={name}
        placeholder={placeHolder}
      keyboardType='numeric'
      autoFocus={autofocus ? autofocus :false}
      />
    </View>

  )
}
export const MyButton = (onPress,TextOnIt,style,icon,loading) => {
  return (
    <Button
      mode="contained"
      style={style}
      onPress={onPress}
      loading={loading?true:false}
      uppercase={false}
      contentStyle={{ height: 50 }}
      icon={icon}
    >
      {TextOnIt}
    </Button>
  )
}
export const MyOutlineButton = (onPress,TextOnIt,style,icon,loading) => {
  return (
    <Button
      mode="Outlined"
      style={style}
      onPress={onPress}
      loading={loading?true:false}
      uppercase={false}
      contentStyle={{ height: 50 }}
      icon={icon}
    >
      <Text>
        {TextOnIt}

      </Text>
    </Button>
  )
}

export const MyOptField = (name,onChangeFunction,placeHolder,style) => {
  return (
    <TextInput
      style={style}
      onChangeText={onChangeFunction}
      value={name}
      placeholder={placeHolder}
      maxLength={1}
      keyboardType='numeric'
    />
  )
}

export const MyToast = (message) => {
  return ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG,ToastAndroid.TOP,150,100);

}

export const mainColor = '#5414b3';
export const AppName = 'KRYCHE';
export const BaseUrl = 'http://192.168.1.14:8000/api/';

export const fetchPostFunction = async (route,dom) => {
  let res;
  await fetch(BaseUrl + route, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dom),
  })
    .then(response => response.json())
    .then(json => {
      res = json;
    })
    .catch(error => {
      ToastAndroid.show('Server connection error', ToastAndroid.SHORT);
      console.error(error);
      res = error;
    });
  return res;
}
