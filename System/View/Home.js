import * as React from 'react';
import {
  Linking,
  Text,
  View,
  SafeAreaView , Image , StyleSheet,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  mainColor,
  MyButton,
  fetchGetFunction,
  ImageUrl,
  capitalizeFirstLetter,
  fetchAuthPostFunction, MyToast,
} from "../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PaymentController from "../Controller/PaymentController";
import RNRestart from 'react-native-restart';
const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;
const iconSize = 18;
import Loader from "../Utility/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceCard = (data,navi,index) => {

  return (
    <View style={styles.ServiceCard} key={index}>
      <TouchableOpacity onPress={() => {navi.navigate('ServicesSlider',{serviceId:data.id,serviceName:data.name})}}>
        <Image source={{uri:data.image}} style={styles.ServiceImage}/>
        <Text style={styles.ServiceHeading}>{data.name}</Text>
        <Text style={styles.ServiceDescription}>{data.description}</Text>
      </TouchableOpacity>
      </View>
  )
}

const MemberShipCard = (data,index) => {
  const saveMembership = async () => {
    let userId = JSON.parse(await AsyncStorage.getItem('userDetails')).id;
    fetchAuthPostFunction('membership/save',{membership_id:data.id,user_id:userId}).then(response => {
      MyToast(response.message)
      if (response.status === 1){
        RNRestart.Restart();
      }
    })

  }
  return (
    <View style={[styles.pricingCardContainer,{alignItems: 'center'}]} key={index}>
      <Text style={styles.pricingCardHeader}>{capitalizeFirstLetter(data.title)}</Text>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.pricingCardPrice}>₹{data.price}</Text>
        <Text style={{ marginVertical:15,fontSize:13}}>/{data.duration_name}</Text>
      </View>
      <Text style={styles.pricingCardDetails}>{data.desc_1}</Text>
      <Text style={styles.pricingCardDetails}>{data.desc_2}</Text>
      <Text style={styles.pricingCardDetails}>{data.desc_3 ?? ''}</Text>

      <TouchableOpacity onPress={() => {
        let amount = (data.price * 100).toString();
      PaymentController(amount,data.title+' membership').then(res => {
        if (res == 'true'){
          saveMembership().then()
        }
      })
      }
      }>
        <Text style={styles.PriceButton}><FontAwesome5 name={'lightbulb'} size={iconSize-2} color={'#fff'}  />  GET STARTED</Text>
      </TouchableOpacity>

    </View>
  )
}



export default class Home extends React.Component {


  constructor(props){

    super(props);
    this.state = {
      didMount:false,
      activeIndex:0,
      loader:true,
      whatsAppNumber:null,
      callNumber:null,
      carouselItems: [],
      services : [],
      members : [],

    }
  }

  componentDidMount =  () =>{

    this.setState({
      didMount:true
    })
    this.callFunctions()
    return () => {this.setState({didMount:false})}
  }
  callFunctions = () => {
    if (this.state.activeIndex === 0){
      this.getHomeBanners().then()
      this.getServices().then()
      this.getAppSettings().then()
      this.getMembershipDetails().then()
    }
    this.setState({
      activeIndex:1
    })
  }
  getAppSettings = async () => {
    await fetchGetFunction('app_setting').then(response => {
      this.setState({
        whatsAppNumber:response.result.whatsapp_number,
        callNumber:response.result.contact_number
      })
    })
  }
   getHomeBanners = async  () => {
     await fetchGetFunction('servicesBanners').then(result => {
       let final = [];
      result.forEach(element => {
        element.banner_image =  ImageUrl + element.banner_image
        final.push(element)
      });
      this.setState({
        carouselItems: final
      })
    })
  }
  getServices = async  () => {
     await fetchGetFunction('service').then(result => {

      let final = [];
      result.forEach(element => {
        element.image =  ImageUrl + element.image
        element.navi = this.state.navigation
        final.push(element)
      });

      this.setState({
        services: final
      })
    })
    this.setState({
      loader:false,
    })
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
        }} key={index}>
        <View style={{ flexDirection:'row'}}>
          <View style={{ flex:.9 }}>
            <Text style={{fontSize: 20}}>{item.title}</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ServicesSlider',{serviceId:item.service_id,serviceName:item.service_name})}}>
              <Text style={{ marginVertical:30,color:mainColor }}>{item.text}   <FontAwesome5 name={'arrow-right'} size={18} color={mainColor} /></Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems:'center' }}>
            <Image source={{ uri:item.banner_image }} style={{ width:150,height:150,resizeMode:'contain' }} />

          </View>

        </View>
      </View>

    )
  }

 openWhatsapp = () =>{
   let msg ="";
   let mobile = this.state.whatsAppNumber;
       let url =
         "whatsapp://send?text=" +
         msg +
         "&phone=91" +
         mobile;
       Linking.openURL(url)
         .then(data => {
           console.log("WhatsApp Opened successfully " + data);
         })
         .catch(() => {
           alert("Make sure WhatsApp installed on your device");
         });

  }
  openCallApp = () =>{
   let mobile = this.state.callNumber;
        Linking.openURL(`tel:${mobile}`)
         .then(data => {
           console.log("Call Opened successfully " + data);
         })
         .catch(() => {
           alert("Some error");
         });

  }

  getMembershipDetails = async () => {
    fetchGetFunction('membership').then(response => {
      this.setState({
        members:response
      })
    })
  }

  render() {
    if(!this.state.didMount) {
      return null;
    }

    const navigation = this.props.navigation;
    if (this.state.loader) {
      return <Loader />
    } else {
      return (
        <View style={{ flex: 1, width: '100%', backgroundColor: '#eee' }}>
          <ScrollView style={{ marginBottom: 50 }}>

            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}

                  data={this.state.carouselItems}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={this._renderItem.bind(this)}
                  onSnapToItem={index => this.setState({ activeIndex: index })}
                  loop={true}
                  autoplay={true}
                  autoplayInterval={5000}
                />
              </View>
              <Text style={styles.Heading}>Services</Text>
              <ScrollView horizontal={true} style={{ maxHeight: "50%" }}>

                <View style={styles.ServiceCardContainer}>
                  { ((this.state.services).length > 0) ? this.state.services.map((data, index) =>
                    ServiceCard(data, navigation, index)
                  ) : null}
                </View>
              </ScrollView>
              <Text style={styles.Heading}>Membership Offers</Text>
              <View >
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                  { ((this.state.members).length > 0) ? this.state.members.map((mem, index) =>
                    MemberShipCard(mem, index)
                  ) : null }
                </ScrollView>
              </View>
            </SafeAreaView>

          </ScrollView>
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <View style={[styles.PrimeMemberBannerContainer]}>
              <TouchableOpacity  onPress={() => this.openCallApp()} style={{ flex:1}}>
                <Text style={[styles.CallButton]}><FontAwesome5 name={'phone-alt'} size={iconSize} color={'white'}
                                                                style={{ marginRight: 10 }} /> Call </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.openWhatsapp()} style={{flex:1}}>
                <Text style={[styles.CallButton,{backgroundColor:'green'}]}><FontAwesome5 name={'whatsapp'} size={iconSize} color={'white'}
                                                                style={{ marginRight: 10 }} /> Whatsapp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      );
    }
  }
}
const styles = StyleSheet.create({
  ServiceCardContainer:{
    flexDirection:'row',
    // margin:5,
  },
  ServiceCard:{
    flex:1,
    // height:'100%',
    // minWidth:'40%',
    alignContent:'center',
    marginHorizontal: 5,
    backgroundColor:'#fff',paddingHorizontal:30,
    paddingVertical: 20,
    // paddingHorizontal:10,
    // paddingVertical:2,
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
    marginTop:5,
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
    fontSize:15,
    color:'#fff',
    paddingHorizontal:18,
    paddingVertical: 12,
    borderRadius:100/2
  },
  pricingCardContainer:{
    marginVertical:5,
    marginLeft:5,
    // height:210,
    width:200,
    flex:.5,
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
    fontWeight:'bold',

  },
  pricingCardDetails:{
    marginVertical:1,
    color:'gray',
    textAlign:'center',
    // height:28
  },
  PriceButton:{
    marginTop: 5,
    padding:6,
    backgroundColor:'#4f9deb',
    color:'#fff',
    borderRadius:10/2,
  }
})

