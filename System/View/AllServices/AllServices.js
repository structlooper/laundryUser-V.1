import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { mainColor, MyOutlineButton } from "../../Utility/MyLib";
const whiteColor = '#fff';
const inputColor = mainColor;
const secondaryColor = '#eee';
const Home = ({navigation}) => {
  const serviceRow =  (data) => {
    return (
      <View style={Styles.innerContainer}>
        <TouchableOpacity style={Styles.innerContainerChild}
                          onPress={()=>{ navigation.navigate("SubServices") }}
        >
          <Image source={{uri:'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}} style={{
            width:wp('15'), height:hp('8'),
            resizeMode:'contain'
          }} />
          <Text style={Styles.ServiceText} >
            {data.name}
          </Text>
          <Text style={{ fontSize:wp('2') }}>Small description of category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.innerContainerChild}
                          onPress={()=>{ navigation.navigate("SubServices") }}
        >
          <Image source={{uri:'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}} style={{
            width:wp('15'), height:hp('8'),
            resizeMode:'contain'
          }} />
          <Text style={Styles.ServiceText}>
            {data.nameTwo}
          </Text>
          <Text style={{ fontSize:wp('2') }}>Small description of category</Text>

        </TouchableOpacity>
      </View>
    )
  }
  const serviceRowTwo =  () => {
    return (
      <View style={Styles.innerContainer}>
        <TouchableOpacity style={Styles.innerContainerChild}
                          onPress={()=>{ navigation.navigate("SubServices") }}
        >
          <Image source={{uri:'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}} style={{
            width:wp('15'), height:hp('8'),
            resizeMode:'contain'
          }} />
          <Text style={Styles.ServiceText} >
            Any Other
          </Text>
          <Text style={{ fontSize:wp('2') }}>Small description of category</Text>

        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.childContainer}>
        <Text style={Styles.headerText}>Services</Text>
      </View>
      <ScrollView>
        <View style={Styles.childContainerTwo}>
          {serviceRow({name:'Employee verification',nameTwo:'Night Guard check'})}
          {serviceRow({name:'Emergency drill',nameTwo:'Health care'})}
          {serviceRowTwo()}
        </View>
      </ScrollView>

    </View>
  );
};

const Styles = StyleSheet.create({
  mainContainer:{
    height:'100%',
    backgroundColor:whiteColor,
  },
  childContainer:{
    marginVertical:'5%',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontSize:wp('6'),
    fontWeight:'bold',
    color:inputColor
  },
  childContainerTwo:{
    flex:1,
    // height:'100%',
    alignItems: 'center'
  },
  innerContainer:{
    marginVertical: '1%',
    flexDirection:'row',
    paddingHorizontal:'15%',
  },
  innerContainerChild:{
    // flex:1.2,
    borderWidth:1,
    borderColor:secondaryColor,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10/2,
    backgroundColor:secondaryColor,
    height: hp('20%'),
    width:wp('35%'),
    padding:5,
    marginHorizontal:5,
    overflow:'hidden'

  },
  ServiceText:{
    textAlign:'center',
    color: inputColor,
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  bottomContainer:{
    // alignItems:'center'
    marginHorizontal: '6%',
    marginBottom:'2%'
  }
})

export default Home;
