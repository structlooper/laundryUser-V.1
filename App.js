import React, { Component } from 'react';
import { Platform, StyleSheet, View,Text } from 'react-native';
import Splash from "./System/Utility/Splash";

import CheckStack from "./CheckStack";

export default class App extends Component
{
  constructor(){
    super();
    this.state={
      isVisible : true,
    }
  }

  Hide_Splash_Screen=()=>{
    this.setState({
      isVisible : false
    });
  }
  componentDidMount =  () =>{
    const that = this;
    setTimeout(function(){
      that.Hide_Splash_Screen();
    }, 1000);
  }

  render()
  {
    if (this.state.isVisible === true){
      return (
        <View style={ styles.MainContainer }>
          {Splash}
        </View>
      )
    }else{
      return (
          <CheckStack/>
      )
    }
  }
}

const styles = StyleSheet.create({
  MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

})
