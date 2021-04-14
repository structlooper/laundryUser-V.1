import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView , Image , StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import {mainColor} from '../Utility/MyLib';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { PricingCard } from "react-native-elements";

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;

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

const iconSize = 18;


export default class Home extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      activeIndex:0,
      carouselItems: [
        {
          title:"Flat 50% off on first order",
          text: "View all offers",
        },
        {
          title:"Item 2",
          text: "Text 2",
        },
        {
          title:"Item 3",
          text: "Text 3",
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
        height:height-800,
        }}>
        <View style={{ flexDirection:'row'}}>
          <View style={{ flex:.9 }}>
            <Text style={{fontSize: 20}}>{item.title}</Text>
            <Text style={{ marginVertical:30,color:mainColor }}>{item.text}   <FontAwesome5 name={'arrow-right'} size={18} color={mainColor} /></Text>
          </View>
          <View style={{ alignItems:'center' }}>
            <Image source={require('../Public/Images/banner-example.jpg')} style={{ width:150,height:150 }} />
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
      <ScrollView>

      <SafeAreaView style={{flex: 1, backgroundColor:'#eee', }}>

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
        <Text style={[styles.Heading,{flex:1}]}>Membership Offers</Text>
        <View style={{flexDirection:'row'}}>
          <ScrollView horizontal={true} >


            <PricingCard
              color="#4f9deb"
              title="Free"
              price="₹0"
              info={['1 User', 'Basic Support', 'All Core Features']}
              button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
              containerStyle={{marginHorizontal:2,height:'87%'}}
            />
            <PricingCard
              color={mainColor}
              title="Stater"
              price="₹10"
              info={['1 User', 'Basic Support', 'All Core Features']}
              button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
              containerStyle={{marginHorizontal:2,height:'87%'}}
            />
            <PricingCard
              color="#4f9deb"
              title="Free"
              price="₹0"
              info={['1 User', 'Basic Support', 'All Core Features']}
              button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
              containerStyle={{marginHorizontal:2,height:'87%'}}
            />
          </ScrollView>

        </View>

<View style={{ alignItems:"center" }}>

        <View style={styles.PrimeMemberBannerContainer}>
          <TouchableOpacity>
            <Text style={[styles.CallButton]}><FontAwesome5 name={'phone-alt'} size={iconSize} color={'white'} style={{marginRight:15}} />  Call (Toll Free)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{textAlign:'right'}}>
            <Text style={[styles.CallButton]}><FontAwesome5 name={'whatsapp'} size={iconSize} color={'white'} style={{marginRight:15}} />  Whatsapp</Text>
          </TouchableOpacity>
        </View>
</View>

      </SafeAreaView>
      </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  ServiceCardContainer:{
    flexDirection:'row',
    margin:5,
  },
  ServiceCard:{
    alignContent:'center',
    marginHorizontal: 5,
    backgroundColor:'#fff',
    paddingHorizontal:20,
    paddingVertical:5,
    borderRadius:40/2,
  },
  ServiceImage:{
    width:90,
    height:90,
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
    padding:5,
    borderRadius: 40/2,
    flexDirection:'row'
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
    width:180,
    fontSize:17,
    marginHorizontal:5,
    color:'#fff',
    paddingHorizontal:18,
    paddingVertical: 12,
    borderRadius:100/2
  }
})

