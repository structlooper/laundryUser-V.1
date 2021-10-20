import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fetchGetFunction, mainColor, MyButton, ImageUrl, fetchAuthPostFunction, MyToast } from "../Utility/MyLib";
import NoDataFound from "./NoDataFound";
import Loader from "../Utility/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';
import PaymentController from "../Controller/PaymentController";

const MembershipDetails = ({navigation,route}) => {
  const {memberShipId} = route.params;
  const [loader,setLoader] = React.useState(true)
  const [memberShipDetails,setMemberShipDetails] = React.useState(null)
  React.useEffect(() => {
    getMemberShipDetails().then()
  },[])
  const getMemberShipDetails = async () => {
    fetchGetFunction('membership/'+memberShipId).then(response=>{
      setMemberShipDetails(response)
      setLoader(false)
    })
  }
  const saveMembership = async () => {
    let userId = JSON.parse(await AsyncStorage.getItem('userDetails')).id;
    fetchAuthPostFunction('membership/save',{membership_id:memberShipDetails.id,user_id:userId}).then(response => {
      MyToast(response.message)
      if (response.status === 1){
        RNRestart.Restart();
      }
    })

  }
  if (loader){
    return Loader();
  }else if(memberShipDetails.length === 0){
    return NoDataFound();
  }
  return (
    <View style={{
      height:'100%',
      backgroundColor:'#fff',
      marginTop:'1%',
      padding:'5%',
    }}>
      <ScrollView >

      <View style={{   height: hp('22.5'),
       width: '100%', }}>
       <Image source={{uri: ImageUrl+memberShipDetails.banner_image}}
              style={{
                width:'100%',
                height:'100%',
                resizeMode:'cover'
              }}
       />
     </View>
      <View style={{ height: '72%' }} >
        <View style={{
          flexDirection:'row'
        }}>
          <View style={{
            flex:1
          }}>
            <Text style={{
              fontSize:18,
              fontWeight:'bold',
              color:'grey'
            }}>{memberShipDetails.title}</Text>
          </View>
          <View style={{
            flex:1,
            alignItems:'flex-end'
          }}>
            <Text style={{
              fontSize:25,
              fontWeight:'bold',
              color:'black'
            }}>₹{memberShipDetails.price}</Text>
          </View>
          {/*<View style={{flex:.1}} />*/}
        </View>
        <View style={{
          marginVertical:'5%',
          alignItems:'center'
        }} >
          {/*<Text style={{*/}
          {/*  width:wp('80'),*/}
          {/*  color:mainColor,*/}
          {/*  fontSize:15,*/}
          {/*  textAlign:'center'*/}
          {/*}}>{memberShipDetails.discount}% discount in premium membership for {memberShipDetails.duration_name}.</Text>*/}
        </View>
        <View style={{
          marginVertical:10,
          // alignItems:'center'
        }}>
          <Text style={{
            fontSize:16,
            fontWeight:'bold',
            borderBottomColor:'grey',
            borderBottomWidth:1
          }} >Applied Services</Text>
          <ScrollView style={{
            flexDirection:'row',
            marginTop:'5%'
          }}
                      horizontal={true}
          >
            {
              (memberShipDetails.service_id).map((data,i)=>
                <View style={{
                  width:wp('35'),
                  padding:5,
                  backgroundColor:'rgba(83,203,154,0.87)',marginHorizontal:5,
                  height:hp('6'),
                  borderRadius:100/2,
                  justifyContent:'center'
                }} key={i}>
                  <Text style={{
                    color:'#fff',
                    textAlign:'center'
                  }}> {data}</Text>
                </View>
              )
            }

          </ScrollView>
        </View>
        {/*<ScrollView style={{ marginVertical:'2%' }} >*/}
          <Text style={{ marginTop:'2%',lineHeight:20 }}>
            {memberShipDetails.desc_1}
          </Text>
          <Text style={{ marginTop:'2%',lineHeight:20 }}>
            {memberShipDetails.desc_2}
          </Text>
          <Text style={{ marginTop:'2%',lineHeight:20 }}>
            {memberShipDetails.desc_3}
          </Text>


        {/*</ScrollView>*/}
      </View>
      </ScrollView>
      <View style={{
        justifyContent:'center',
        alignItems:'center'
      }}>
        {MyButton(
          ()=>{
                  let amount = (memberShipDetails.price * 100).toString();
                PaymentController(amount,memberShipDetails.title+' membership').then(res => {
                  if (res === 'true'){
                    saveMembership().then()
                  }
                })
                },
          'Purchase plan',
          '',
          'home-currency-usd'
        )}
      </View>


    </View>
  );
};

export default MembershipDetails;
