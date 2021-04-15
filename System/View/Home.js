import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView , Image , StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { mainColor, MyButton } from "../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { PricingCard } from "react-native-elements";

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;
const iconSize = 18;

const ServiceCard = (data,navi) => {
  return (
    <View style={styles.ServiceCard}>
      <TouchableOpacity onPress={() => {navi.navigate('ServicesSlider')}}>
        <Image source={data.image} style={styles.ServiceImage}/>
        <Text style={styles.ServiceHeading}>{data.name}</Text>
        <Text style={styles.ServiceDescription}>{data.description}</Text>
      </TouchableOpacity>
      </View>
  )
}

const MemberShipCard = () => {
  return (
    <View style={[styles.pricingCardContainer,{alignItems: 'center'}]}>

      <Text style={styles.pricingCardHeader}>Stater</Text>
      <Text style={styles.pricingCardPrice}>$30</Text>
      <Text style={styles.pricingCardDetails}>50 User</Text>
      <Text style={styles.pricingCardDetails}>stater user Support</Text>
      <Text style={styles.pricingCardDetails}>Get all features</Text>


      <TouchableOpacity onPress={() => {console.log('started')}}>
        <Text style={styles.PriceButton}><FontAwesome5 name={'lightbulb'} size={iconSize-2} color={'#fff'}  />  GET STARTED</Text>
      </TouchableOpacity>

    </View>
  )
}



export default class Home extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      activeIndex:0,
      carouselItems: [
        {
          title:"Flat 50% off on first order",
          text: "View all offers",
          image:require('../Public/Images/banner-example.jpg')
        },
        {
          title:"Item 2",
          text: "Text 2",
          image:require('../Public/Images/banner-example.jpg')
        },
        {
          title:"Item 3",
          text: "Text 3",
          // image:require('../Public/Images/banner-example.jpg')
        },

      ]
    }
  }

  _renderItem({item,index}){
    return (
      <View style={{
        backgroundColor:'#fff',
        borderRadius: 5,
        padding:10,
        paddingTop:20,
        marginVertical:5,
        height:180,
        }}>
        <View style={{ flexDirection:'row'}}>
          <View style={{ flex:.9 }}>
            <Text style={{fontSize: 20}}>{item.title}</Text>
            <Text style={{ marginVertical:30,color:mainColor }}>{item.text}   <FontAwesome5 name={'arrow-right'} size={18} color={mainColor} /></Text>
          </View>
          <View style={{ alignItems:'center' }}>
            <Image source={item.image} style={{ width:150,height:150 }} />
          </View>

        </View>
      </View>

    )
  }



  render() {
    const { navigation } = this.props;
    let data = {
      image:require("../Public/Images/banner-example.jpg"),
      name:'Wash & Fold',
      description:'Min 12 Hours'
    }
    return (
      <View style={{ flex: 1,width: '100%',backgroundColor:'#eee'}} >

      <ScrollView style={{marginBottom:50}}>

      <SafeAreaView style={{flex: 1, backgroundColor:'#eee' }}>

        <View style={{ flexDirection:'row', justifyContent: 'center', }}>
          <Carousel
            layout={"default"}

            data={this.state.carouselItems}
            sliderWidth={width}
            itemWidth={width}
            renderItem={this._renderItem}
            onSnapToItem = { index => this.setState({activeIndex:index}) } />
        </View>
        <Text style={styles.Heading}>Services</Text>
        <ScrollView horizontal={true} style={{ maxHeight: "50%"}}>

        <View style={styles.ServiceCardContainer}>

          {ServiceCard(data,navigation)}
          {ServiceCard(data,navigation)}
          {ServiceCard(data,navigation)}
          {ServiceCard(data,navigation)}
          {ServiceCard(data,navigation)}

        </View>
      </ScrollView>
        <Text style={styles.Heading}>Membership Offers</Text>
        <View style={{flexDirection:'row'}}>
          <ScrollView horizontal={true} >
              {MemberShipCard()}
              {MemberShipCard()}
              {MemberShipCard()}
          </ScrollView>

        </View>




      </SafeAreaView>

      </ScrollView>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <View style={[styles.PrimeMemberBannerContainer,{marginLeft:35}]}>
            <TouchableOpacity>
              <Text style={[styles.CallButton]}><FontAwesome5 name={'phone-alt'} size={iconSize} color={'white'} style={{marginRight:10}} />  Call </Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Text style={[styles.CallButton]}><FontAwesome5 name={'whatsapp'} size={iconSize} color={'white'} style={{marginRight:10}} />  Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
       </View>

    );
  }
}
const styles = StyleSheet.create({
  ServiceCardContainer:{
    flexDirection:'row',
    margin:5,
  },
  ServiceCard:{
    height:150,
    width:'20%',
    alignContent:'center',
    marginHorizontal: 5,
    backgroundColor:'#fff',
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:40/2,
  },
  ServiceImage:{
    width:90,
    height:70,
    resizeMode:'contain'
  },
  Heading:{
    marginHorizontal:10,
    fontSize:18
  },
  ServiceHeading:{
    marginTop:20,
    fontSize: 15,
    fontWeight:'bold',
    textAlign: 'center'
  },
  ServiceDescription:{
    fontSize:12,
    textAlign:'center'
  },
  PrimeMemberBannerContainer:{
    // marginBottom:8,
    padding:5,
    borderRadius: 40/2,
    flexDirection:'row',
  },
  OrderCardContainer:{
    marginHorizontal:10,
    marginVertical:5,
  },

  orderCart:{
    padding:5,
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection:'row',
    borderRadius:20/2
  },
  statusImageContainer:{
    borderWidth:3,
    borderRadius: 100/2,
    padding:5,
    borderColor:'grey'
  },
  statusImage:{
    width:50,
    height:50,
    borderRadius: 50/ 2
  },
  orderLabelContainer : {
    flex:.9,
    marginLeft:10,
    justifyContent:'center'
  },
  orderLabelHeader:{
    fontSize:18,
    fontWeight:'bold',
  },
  orderStatusLabel:{
    fontSize: 13,
    color:mainColor,
  },
  priceContainer:{
    justifyContent: 'center'
  },
  priceLabel:{
    textAlign:'right',
    fontSize:20,
    fontWeight: 'bold',
    color: 'black'
  },

  CallButton:{
    textAlign:'center',
    backgroundColor:mainColor,
    width:140,
    fontSize:15,
    marginHorizontal:5,
    color:'#fff',
    paddingHorizontal:18,
    paddingVertical: 12,
    borderRadius:100/2
  },
  pricingCardContainer:{
    marginVertical:5,
    marginLeft:5,
    height:210,
    width:140,
    backgroundColor:'#fff',
    padding:5,
  },
  pricingCardHeader:{
    fontSize:20,
    color:'#4f9deb',
    fontWeight:'bold'
  },
  pricingCardPrice:{
    marginVertical:5,
    fontSize:25,
    fontWeight:'bold'
  },
  pricingCardDetails:{
    marginVertical:3,
    color:'gray'
  },
  PriceButton:{
    marginTop: 5,
    padding:6,
    backgroundColor:'#4f9deb',
    color:'#fff',
    borderRadius:10/2,
  }
})

