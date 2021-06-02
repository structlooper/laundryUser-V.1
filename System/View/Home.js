import * as React from 'react';
import {
  Linking,
  Text,
  View,
  SafeAreaView , Image ,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  ImageBackground

} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {
  mainColor,
  MyButton,
  fetchGetFunction,
  ImageUrl,
  capitalizeFirstLetter,
  fetchAuthPostFunction, MyToast, MyOutlineButton, MyTransButton,
} from "../Utility/MyLib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PaymentController from "../Controller/PaymentController";
import RNRestart from 'react-native-restart';
const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;
const iconSize = 30;
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

const MemberShipCard = (data,index,image) => {
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
    <View style={styles.membershipCardContainer} key={index}>
      <View style={styles.imageWrapper}>
        <ImageBackground style={styles.theImage} source={{uri : image}}>
          <View style={{
            marginTop:'10%',
            marginLeft:'5%'
          }}>
            {MyTransButton(
              () => {console.log('get start')},
              'Get start',
              {
                width:'30%',
                backgroundColor: 'rgba(52, 52, 52, 0.6)',
                color:'#fff'
              },
              'lightbulb',
              '#fff'
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  )
  // return (
  //   <View style={[styles.pricingCardContainer,{alignItems: 'center'}]} key={index}>
  //     <Text style={styles.pricingCardHeader}>{capitalizeFirstLetter(data.title)}</Text>
  //     <View style={{flexDirection:'row'}}>
  //       <Text style={styles.pricingCardPrice}>₹{data.price}</Text>
  //       <Text style={{ marginVertical:15,fontSize:13}}>/{data.duration_name}</Text>
  //     </View>
  //     <Text style={styles.pricingCardDetails}>{data.desc_1}</Text>
  //     <Text style={styles.pricingCardDetails}>{data.desc_2}</Text>
  //     <Text style={styles.pricingCardDetails}>{data.desc_3 ?? ''}</Text>
  //
  //     <TouchableOpacity onPress={() => {
  //       let amount = (data.price * 100).toString();
  //     PaymentController(amount,data.title+' membership').then(res => {
  //       if (res === 'true'){
  //         saveMembership().then()
  //       }
  //     })
  //     }
  //     }>
  //       <Text style={styles.PriceButton}><FontAwesome5 name={'lightbulb'} size={iconSize-2} color={'#fff'}  />  GET STARTED</Text>
  //     </TouchableOpacity>
  //
  //   </View>
  // )
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
      activeSlide:0,
      services : [],
      members : [],
      serviceScrollViewWidth:10,
      serviceCurrentXOffset:0
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
  get pagination () {
    const { carouselItems, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: '#eee' , paddingVertical: 0 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          // marginHorizontal: 8,
          backgroundColor: '#000'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
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
  _handleScroll = (event) => {
    let newXOffset = event.nativeEvent.contentOffset.x
    this.setState({currentXOffset:newXOffset})
  }

  leftArrow = () => {
    let eachItemOffset = this.state.serviceScrollViewWidth / (this.state.services).length; // Divide by 10 because I have 10 <View> items
    let _serviceCurrentXOffset =  this.state.serviceCurrentXOffset - eachItemOffset;
    this.refs.scrollView.scrollTo({x: _serviceCurrentXOffset, y: 0, animated: true})
  }

  rightArrow = () => {
    let eachItemOffset = this.state.serviceScrollViewWidth /  (this.state.services).length; // Divide by 10 because I have 10 <View> items
    let _serviceCurrentXOffset =  this.state.serviceCurrentXOffset + eachItemOffset;
    this.refs.scrollView.scrollTo({x: _serviceCurrentXOffset, y: 0, animated: true})
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
        <View style={{ height:'100%' }}>
          <View style={{ height:'100%', width: '100%', backgroundColor: '#eee' }}>
            <ScrollView >

              <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>

                <View style={{ justifyContent: 'center', }}>
                  <Carousel
                    layout={"default"}
                    ref={(carousel) => { this._carousel = carousel; }}
                    data={this.state.carouselItems}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={index => this.setState({ activeSlide : index })}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={5000}
                  />
                  { this.pagination }
                  <View style={{
                    left:0,top:80,right:0,position:'absolute'
                  }}>
                    <TouchableOpacity onPress={() => {
                      this._carousel.snapToItem(this._carousel.currentIndex - 1)
                    }}>
                      <Text> <FontAwesome5 name={'arrow-left'} size={25} color={'rgba(23,29,46,0.3)'} /> </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    top:80,right:0,position:'absolute'
                  }}>
                    <TouchableOpacity onPress={() => {
                      this._carousel.snapToItem(this._carousel.currentIndex + 1)
                    }}>
                      <Text> <FontAwesome5 name={'arrow-right'} size={25} color={'rgba(23,29,46,0.3)'} /> </Text>
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={{ flexDirection:'row'}}>
                  <Text style={styles.Heading}>Select services</Text>
                  <TouchableOpacity style={{
                    marginRight:10,
                  }} onPress={() => {console.log('show all')}}>
                    <Text style={{

                      fontSize:14,
                      borderBottomWidth:1,
                      borderBottomColor:mainColor,
                      color:mainColor
                    }}>
                      See more
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection:'row',width:'100%'}}>
                  <TouchableOpacity
                    style={{alignItems: 'flex-start',justifyContent:'center',backgroundColor:'#fff',borderRadius:100/2 }}
                    onPress={this.leftArrow}>
                    <Text> <FontAwesome5 name={'arrow-left'} size={25} /> </Text>
                  </TouchableOpacity>
                  <ScrollView   horizontal={true}
                                pagingEnabled={true}
                                ref="scrollView"
                                onContentSizeChange={(w, h) => this.setState({serviceScrollViewWidth:w})}
                                onScroll={this._handleScroll}
                  >

                    <View style={styles.ServiceCardContainer}>
                      { ((this.state.services).length > 0) ? this.state.services.map((data, index) =>
                        ServiceCard(data, navigation, index)
                      ) : null}

                    </View>

                  </ScrollView>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end',justifyContent:'center',backgroundColor:'#fff',borderRadius:100/2}}
                    onPress={this.rightArrow}>
                    <Text>  <FontAwesome5 name={'arrow-right'} size={25} /> </Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  alignItems:'center',
                  marginVertical:10
                }}>
                  {MyButton(() => {navigation.navigate('process')},'Schedule pickup'
                    ,{width:'60%'},'clock'
                  )}

                </View>
                <Text style={styles.Heading}>Membership Offers</Text>
                {/*{ ((this.state.members).length > 0) ? this.state.members.map((mem, index) =>*/}
                {/*  MemberShipCard(mem, index,'')*/}
                {/*) : null }*/}
                {                    MemberShipCard("mem", 3,
                  'https://swapd.co/uploads/db6033/original/2X/0/00f7c5f0c80a5107cb072dada79cb4f5beb24ba5.jpg')}
                {                    MemberShipCard("mem", 1,
                  'https://biochemistry.blob.core.windows.net/public/2019/12/ExistingMenbers.png')}
                {                    MemberShipCard("mem", 2,
                  'https://www.fpsa.org/wp-content/uploads/FPSAWC-Membership-Banner.png')}
                {                    MemberShipCard("mem", 4,
                  'https://www.fpsa.org/wp-content/uploads/FPSAWC-Membership-Banner.png')}


              </SafeAreaView>

            </ScrollView>
            <View style={{ height:'10%', left:0,right:0,bottom:0, position:"absolute" ,paddingHorizontal:30, justifyContent:'center'  }}>
              <View style={styles.PrimeMemberBannerContainer}>
                <View style={[styles.CallButton,{flex:1,marginLeft:10}]}>
                  <TouchableOpacity  onPress={() => this.openCallApp()} >
                    <FontAwesome5 name={'phone-alt'} size={iconSize} color={'rgba(125,106,239,0.9 )'}
                    />
                    {/*<Text style={{ color:'black' }}>Call </Text>*/}
                  </TouchableOpacity>
                </View>
                <View  style={[styles.CallButton]}>
                  <TouchableOpacity onPress={() => this.openWhatsapp()} style={{alignItems:'center'}}>
                    <FontAwesome5 name={'whatsapp'} size={iconSize} color={'rgba(67,186,150,0.9)'}
                    />
                    {/*<Text >Whatsapp</Text>*/}
                  </TouchableOpacity>
                </View>

              </View>
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
    height:hp('19'),
    width:wp('25.8'),
    alignContent:'center',
    marginHorizontal: wp('1'),
    backgroundColor:'#fff',
    alignItems: 'center',
    borderRadius:40/2,
    justifyContent:'center',
    overflow: 'hidden'
  },
  ServiceImage:{
    width:90,
    height:70,
    resizeMode:'contain'
  },
  Heading:{
    marginHorizontal:10,
    fontSize:18,
    flex:1
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
    // padding:5,
    justifyContent:'center',
    alignItems:'center',
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
    fontSize:15,
    color:'#fff',
    paddingHorizontal:18,
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
  },
  membershipCardContainer:{
    width:'100%',
    backgroundColor:'#fff',
    marginVertical:'1%',
    marginHorizontal:'.5%'
  },
  imageWrapper: {
    height: 100,
    width: '100%',
    overflow : "hidden"
  },
  theImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  }
})

